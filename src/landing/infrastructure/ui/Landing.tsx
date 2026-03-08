import styles from './Landing.module.css';

export function LandingContainer() {
  return <Landing />;
}

export function Landing() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.logo}>Nexus</h1>
      </header>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h2 className={styles.headline}>
            <b>Extrae el hook perfecto de 3 segundos</b> de cualquier video
          </h2>
          <p className={styles.description}>
            Analiza videos de <b>YouTube</b>, <b>Twitch</b> y almacenamiento en la nube. Nexus identifica y genera el
            momento de mayor impacto para captar la atención de tu audiencia desde el primer instante.
          </p>
        </section>
      </main>
    </div>
  );
}
