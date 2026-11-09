import Image from 'next/image';
import Link from 'next/link';
export default function HomePage() {
  return (
    <main className="home-page">
      <section className="home-copy">
        <p className="home-kicker">Maple Ridge Ward</p>
        <h1 className="home-title">Make room for what matters.</h1>
        <p className="home-description">A simple place to prepare, share, and revisit our Sunday meeting programs.</p>
        <div className="home-actions">
          <Link href="/meetings/current" className="home-button home-button-primary">This Sunday’s program <span aria-hidden="true">→</span></Link>
          <Link href="/meetings" className="home-button home-button-secondary">Browse past meetings</Link>
        </div>
      </section>
      <figure className="home-illustration">
        <Image src="/meeting-art.svg" alt="A quiet chapel framed by trees in the morning light" width={720} height={560} priority className="home-image" />
        <figcaption className="home-caption">Gather, worship, and find peace in Christ.</figcaption>
      </figure>
    </main>
  );
}
