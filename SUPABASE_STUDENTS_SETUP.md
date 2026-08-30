# Students Cloud V1 — setup

This version keeps the rest of NEXT in localStorage, but stores **student data** in Supabase so teacher and student can use different devices.

## 1. Create the table
Open Supabase -> SQL Editor and run:

`supabase/students_v1.sql`

## 2. Get two Supabase values
Supabase -> Project Settings -> API:
- Project URL
- service_role key (secret; never put it in NEXT_PUBLIC_* or client code)

## 3. Add Netlify environment variables
Netlify -> Site configuration -> Environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_STUDENTS_ADMIN_PASSWORD` — password you will type when opening Students
- `NEXT_STUDENTS_ADMIN_TOKEN` — a long random secret, different from the password

Example random token command on Mac:
`openssl rand -hex 32`

Redeploy after saving variables.

## 4. First login
Open `/students`. You will be redirected to `/students/login`.
Enter `NEXT_STUDENTS_ADMIN_PASSWORD`.

## 5. Existing local students
On the first successful cloud sync:
- if Supabase has no students yet, your existing local students are uploaded automatically;
- afterwards Supabase becomes the source of truth for Students.

## 6. Give a student access
Open the student's teacher page and click **פתח לינק תלמיד ↗**.
Copy that URL and send it privately to that student.

Student can:
- see current goal
- choose available practice time
- receive a practice plan + reason
- complete practice
- submit Reflection + optional recording link

When you next open Students, the latest cloud data is loaded.

## Security model in this V1
- Teacher student routes require an httpOnly admin cookie created by your password.
- Supabase service-role key stays server-side only.
- The Supabase table has RLS enabled and no public policies.
- Student access is via a long random private share token.

For a larger rollout, replace share-token access with Supabase Auth student accounts.
