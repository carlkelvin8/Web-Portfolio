const projects = [
  { no: "01", title: "Brand systems that feel alive", tag: "Identity / Direction", className: "project-orange" },
  { no: "02", title: "Digital products, made human", tag: "Product / Experience", className: "project-dark" },
  { no: "03", title: "Stories designed to move", tag: "Campaign / Content", className: "project-light" },
  { no: "04", title: "Culture made visible", tag: "Editorial / Community", className: "project-blue" },
];

export default function Home() {
  return (
    <main>
      <header className="nav shell">
        <a className="wordmark" href="#top" aria-label="Carl Kelvin Manahan, home">CKM<span>®</span></a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a><a href="#about">About</a><a className="pill dark" href="mailto:hello@carlkelvin.com">Let&apos;s talk ↗</a>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <div className="eyebrow"><span>01/04</span><span>Manila, PH</span><span>Scroll ↓</span></div>
        <h1>HEY, I&apos;M<br/><em>CARL KELVIN</em><br/>A CREATIVE<br/>STRATEGIST.</h1>
        <p className="hero-copy">I turn ideas into clear, memorable brands—bridging strategy, design, and digital experiences that move people.</p>
        <a className="round-link" href="#work" aria-label="Explore selected work">Selected<br/>work<br/><b>↓</b></a>
      </section>

      <section className="signal" aria-label="Creative abstract graphic">
        <div className="orb orb-one"/><div className="orb orb-two"/><div className="orb orb-three"/>
        <div className="signal-copy"><span>Strategy</span><span>Identity</span><span>Experience</span></div>
      </section>

      <section className="work shell" id="work">
        <div className="section-head"><span>02/04 — SELECTED WORK</span><h2>Ideas with<br/><em>intent.</em></h2></div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project" key={project.no}>
              <div className={`project-art ${project.className}`}><span>{project.no}</span><i>CKM</i></div>
              <div className="project-meta"><h3>{project.title}</h3><span>{project.tag}</span><b>↗</b></div>
            </article>
          ))}
        </div>
      </section>

      <section className="about shell" id="about">
        <div className="about-label">03/04 — ABOUT</div>
        <div><h2>Curious by nature.<br/><em>Clear by design.</em></h2><p>I&apos;m Carl Kelvin Manahan, a multidisciplinary creative based in Manila. I help ambitious people and teams find the sharpest version of their story, then bring it to life with care, character, and craft.</p></div>
        <div className="services"><span>Brand strategy</span><span>Creative direction</span><span>Visual identity</span><span>Digital experiences</span></div>
      </section>

      <section className="capabilities shell">
        <span>What I bring to the table</span>
        <h2>Transforming complexity into <em>intuitive, responsive, and human</em> brand experiences.</h2>
        <div className="cap-map"><div><b>STRATEGY</b><p>POSITIONING / RESEARCH / BRAND ARCHITECTURE</p></div><div><b>DIRECTION</b><p>CONCEPTS / CAMPAIGNS / STORYTELLING</p></div><i>+</i><div><b>DESIGN</b><p>IDENTITY / DIGITAL / SOCIAL SYSTEMS</p></div><div><b>TOOLS</b><p>FIGMA / ADOBE CC / NOTION / AI</p></div></div>
      </section>

      <footer className="footer shell">
        <span>04/04 — CONTACT</span><h2>HAVE A GOOD<br/>IDEA? <em>LET&apos;S TALK.</em></h2>
        <a className="email" href="mailto:hello@carlkelvin.com">hello@carlkelvin.com ↗</a>
        <form className="contact-form" action="mailto:hello@carlkelvin.com" method="post" encType="text/plain"><label htmlFor="message">Write me a note</label><div><input id="message" name="message" placeholder="Your idea starts here…"/><button type="submit">Send ↗</button></div></form>
        <div className="footer-bottom"><span>© 2026 Carl Kelvin Manahan</span><div><a href="#">LinkedIn ↗</a><a href="#">Instagram ↗</a></div><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
