import MarketingShell, { MarketingCta } from "./MarketingShell";

const SITE = "https://www.omriberger.com";

export type IndexGroup = { title: string; items: { href: string; label: string; note?: string }[] };

export default function IndexPage({
  h1,
  lead,
  label,
  path,
  groups,
  intro,
}: {
  h1: string;
  lead: string;
  label: string;
  path: string;
  groups: IndexGroup[];
  intro?: string[];
}) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "דף הבית", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: label, item: SITE + path },
      ],
    },
  ];
  return (
    <MarketingShell jsonLd={jsonLd}>
      <nav className="mk-crumbs wrap" aria-label="פירורי לחם">
        <a href="/">דף הבית</a>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{label}</span>
      </nav>
      <section className="mk-hero wrap" aria-labelledby="page-title">
        <div className="mk-hero-copy">
          <h1 id="page-title">{h1}</h1>
          <p className="mk-lead">{lead}</p>
        </div>
      </section>
      <div className="mk-index wrap">
        {intro?.length ? (
          <div className="mk-block">
            {intro.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        ) : null}
        {groups.map((g) => (
          <section key={g.title} aria-label={g.title}>
            <h2>{g.title}</h2>
            <ul className="mk-cards">
              {g.items.map((it) => (
                <li key={it.href}>
                  <a href={it.href}>
                    {it.label}
                    {it.note ? <small>{it.note}</small> : null}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <MarketingCta title="בואו לשיעור ניסיון בסטודיו" button="קובעים שיעור ניסיון" />
    </MarketingShell>
  );
}
