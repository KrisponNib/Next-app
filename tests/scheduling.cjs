const { test } = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const fs = require('node:fs');
const vm = require('node:vm');
function load(file, globals = {}) {
  const module = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports, require, Date, Intl, process, ...globals });
  return module.exports;
}
const scheduling = load('lib/scheduling.ts');
const { DEFAULT_LESSON_SCHEDULE } = load('lib/cloud/supabaseRest.ts');
const now = new Date('2026-09-06T09:00:00Z'); // noon in Israel
const schedule = () => ({ ...structuredClone(DEFAULT_LESSON_SCHEDULE), offersPerDay: 100,
  availability: Array.from({length: 7}, (_, weekday) => ({weekday, enabled: true, start: '10:00', end: '16:00'})) });
test('24-hour boundary includes exactly 24 hours, excludes one millisecond less', () => {
  assert.equal(scheduling.canStudentBook('2026-09-07', '12:00', now.getTime()), true);
  assert.equal(scheduling.canStudentBook('2026-09-07', '12:00', now.getTime() + 1), false);
  assert.equal(scheduling.canStudentBook('2026-01-07', '12:00', Date.parse('2026-01-06T10:00Z')), true);
});
test('offers exclude today and tomorrow morning in Israel, independently of host timezone', () => {
  const days = scheduling.upcomingBookableDays(schedule(), now);
  assert.equal(days[0].date, '2026-09-07');
  assert.equal(days[0].times[0], '12:00');
  assert.ok(days.every(d => d.times.every(t => scheduling.canStudentBook(d.date, t, now.getTime()))));
});
test('another student booking hides every overlapping start; cancellation frees them', () => {
  const s = schedule();
  s.bookings.push({studentId: 'other', date: '2026-09-07', startTime: '13:00', endTime: '13:55', status: 'booked'});
  const times = scheduling.upcomingBookableDays(s, now)[0].times;
  for (const time of ['12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45']) assert.ok(!times.includes(time));
  assert.ok(times.includes('12:00')); assert.ok(times.includes('14:00'));
  s.bookings[0].status = 'cancelled';
  assert.ok(scheduling.upcomingBookableDays(s, now)[0].times.includes('13:00'));
});
test('concurrent saves accept one booking and reject stale writes', async () => {
  let stored = { ...schedule(), updatedAt: '2026-09-01T00:00:00.000Z' };
  const api = load('lib/cloud/supabaseRest.ts', {
    process: { env: { SUPABASE_URL: 'https://example.test', SUPABASE_SERVICE_ROLE_KEY: 'test' } },
    fetch: async (url, options) => {
      const expected = new URL(url).searchParams.get('data->>updatedAt').slice(3);
      if (stored.updatedAt !== expected) return { ok: true, json: async () => [] };
      stored = JSON.parse(options.body).data;
      return { ok: true, json: async () => [{data: stored}] };
    },
  });
  const first = structuredClone(stored), second = structuredClone(stored);
  first.bookings.push({ id: 'first' }); second.bookings.push({ id: 'second' });
  const results = await Promise.allSettled([api.saveLessonSchedule(first), api.saveLessonSchedule(second)]);
  assert.equal(results[0].status, 'fulfilled'); assert.equal(results[1].status, 'rejected');
  assert.equal(results[1].reason.constructor.name, 'ScheduleConflictError');
  assert.equal(stored.bookings[0].id, 'first');
});

test('weekly availability endpoint requires admin and preserves existing bookings', async () => {
  const stored = schedule();
  stored.bookings = [{ id: 'existing', status: 'booked' }];
  let saved;
  const api = load('app/api/schedule/route.ts', {
    process: { env: { NEXT_STUDENTS_ADMIN_TOKEN: 'admin' } },
    require: name => {
      if (name === 'next/server') return { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } };
      if (name === '@/lib/cloud/supabaseRest') return {
        getLessonSchedule: async () => structuredClone(stored),
        saveLessonSchedule: async value => { saved = value; },
        ScheduleConflictError: class extends Error {},
      };
      if (name === '@/lib/googleCalendar') return {};
      throw new Error(name);
    },
  });
  const availability = Array.from({length: 7}, (_, weekday) => ({weekday, enabled: weekday === 5, start: '09:00', end: '14:00'}));
  const request = (value, token = 'admin') => ({cookies: {get: () => ({value: token})}, json: async () => ({availability: value})});
  assert.equal((await api.PATCH(request(availability, 'wrong'))).status, 401);
  assert.equal(saved, undefined);
  assert.equal((await api.PATCH(request(availability))).status, 200);
  assert.deepEqual(saved.bookings, stored.bookings);
  assert.equal(saved.availability.length, 7);
  assert.equal(saved.availability[5].enabled, true);
  for (const invalid of [availability.slice(0, 3), availability.map(d => ({...d, weekday: 0})), availability.map(d => ({...d, enabled: true, start: '18:00', end: '09:00'}))]) {
    assert.equal((await api.PATCH(request(invalid))).status, 400);
  }
  assert.equal((await api.PATCH(request(availability.map(d => ({...d, enabled: false}))))).status, 200);
  assert.ok(saved.availability.every(d => !d.enabled));
});

test('saving custom availability is reflected in student GET instead of defaults', async () => {
  let stored = { ...structuredClone(DEFAULT_LESSON_SCHEDULE), updatedAt: '2026-09-01T00:00:00.000Z' };
  const cloud = load('lib/cloud/supabaseRest.ts', {
    process: { env: { SUPABASE_URL: 'https://example.test', SUPABASE_SERVICE_ROLE_KEY: 'test' } },
    fetch: async (url, options) => {
      if (url.includes('/students_v1?')) return {ok: true, json: async () => [{id: 'student', share_token: 'token', data: {name: 'Student'}}]};
      if (options.method === 'PATCH') {
        stored = JSON.parse(options.body).data;
        return {ok: true, json: async () => [{data: structuredClone(stored)}]};
      }
      return {ok: true, json: async () => [{data: structuredClone(stored)}]};
    },
  });
  const globals = {
    process: { env: { NEXT_STUDENTS_ADMIN_TOKEN: 'admin' } },
    require: name => {
      if (name === 'next/server') return {NextResponse: {json: (body, options) => ({body, status: options?.status || 200})}};
      if (name === '@/lib/cloud/supabaseRest') return cloud;
      if (name === '@/lib/scheduling') return scheduling;
      if (name === '@/lib/googleCalendar') return {};
      throw new Error(name);
    },
  };
  const admin = load('app/api/schedule/route.ts', globals);
  const student = load('app/api/student/[token]/schedule/route.ts', globals);
  // A morning window on every day cannot be mistaken for the original defaults.
  const availability = Array.from({length: 7}, (_, weekday) => ({weekday, enabled: true, start: '07:00', end: '09:00'}));
  assert.equal((await admin.PATCH({cookies: {get: () => ({value: 'admin'})}, json: async () => ({availability})})).status, 200);
  const result = await student.GET({}, {params: {token: 'token'}});
  assert.equal(result.status, 200);
  assert.ok(result.body.days.length > 0);
  assert.ok(result.body.days.every(day => day.times.every(time => time >= '07:00' && time < '09:00')));
  assert.equal((await cloud.getLessonSchedule()).availability[0].start, '07:00');
});

test('an added Friday remains visible after the three default weekdays', () => {
  const s = structuredClone(DEFAULT_LESSON_SCHEDULE);
  s.availability.find(day => day.weekday === 5).enabled = true;
  const days = scheduling.upcomingBookableDays(s, new Date('2026-09-05T06:00:00Z'));
  assert.ok(days.some(day => day.date === '2026-09-11'), 'New Friday availability must not be hidden after Sunday, Tuesday and Thursday');
});

test('week choices use Sunday through Saturday in Israel across month and year boundaries', () => {
  const weeks = scheduling.bookingWeeks(new Date('2026-12-31T12:00:00Z'));
  assert.equal(weeks[0].start, '2026-12-27');
  assert.equal(weeks[0].end, '2027-01-02');
  assert.equal(weeks[1].start, '2027-01-03');
  assert.equal(weeks[1].end, '2027-01-09');
  // Still Saturday in UTC, already Sunday in Israel.
  const rollover = scheduling.bookingWeeks(new Date('2026-09-05T21:30:00Z'));
  assert.equal(rollover[0].start, '2026-09-06');
  assert.equal(scheduling.bookingWeeks(new Date('2026-09-05T20:30:00Z'))[0].end, '2026-09-05');
});

test('each selected week contains only its own available dates', () => {
  const weeks = scheduling.bookingWeeks(now);
  const days = scheduling.upcomingBookableDays(schedule(), now);
  const current = days.filter(day => day.date >= weeks[0].start && day.date <= weeks[0].end);
  const next = days.filter(day => day.date >= weeks[1].start && day.date <= weeks[1].end);
  assert.ok(current.length && next.length);
  assert.ok(current.every(day => day.date < weeks[1].start));
  assert.ok(next.every(day => day.date > weeks[0].end));
  assert.ok(!current.some(day => next.some(other => other.date === day.date)));
});
