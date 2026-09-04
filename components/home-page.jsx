import {ArrowRight,ArrowUpRight,Compass,ScanLine,Route,FileCheck2,LockKeyhole} from 'lucide-react';

const phases = [
  ['Diagnóstico', 'Seu ponto de partida'],
  ['Time AI Enablers', 'Quem conduz a mudança'],
  ['Time piloto', 'Um experimento mensurável'],
  ['Gargalos', 'Prioridades para destravar'],
  ['Adoção progressiva', 'IA em cada etapa do trabalho'],
  ['Governança', 'Limites, controles e confiança'],
  ['Escala', 'Expansão com evidências'],
];

export default function HomePage() {
  return <div className="home-page">
    <a className="home-skip" href="#home-content">Ir para o conteúdo</a>
    <header className="home-header">
      <a href="/" className="home-brand" aria-label="Bússola — início"><Compass size={30} strokeWidth={1.6}/><span>Bússola<small>ADOÇÃO DE IA</small></span></a>
      <nav className="home-nav" aria-label="Navegação principal">
        <a className="home-path-link" href="#caminho">Conheça o caminho</a>
        <a className="home-nav-action" href="/wizard">Acessar wizard <ArrowUpRight size={17}/></a>
      </nav>
    </header>
    <main className="home-main" id="home-content" tabIndex={-1}>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <span className="home-eyebrow"><i aria-hidden="true"/> FRAMEWORK DE ADOÇÃO DE IA <span>V2</span></span>
          <h1 id="home-title">Sua jornada de IA.<br/><em>Com direção.</em></h1>
          <p className="home-description">Transforme a intenção de adotar IA em um plano para a sua engenharia. Do primeiro diagnóstico à expansão, uma decisão de cada vez.</p>
          <div className="home-cta-group">
            <a href="/wizard?start=1" className="home-primary">Começar meu plano <ArrowRight size={20}/></a>
            <a href="/wizard" className="home-resume">Retomar planejamento <ArrowUpRight size={16}/></a>
          </div>
          <p className="home-access-note"><LockKeyhole size={14}/> Acesso com sua conta autorizada do ChatGPT.</p>
          <div className="home-hero-facts" aria-label="O que compõe o planejamento">
            <div><strong>07</strong><span>fases para orientar<br/>sua jornada</span></div>
            <div><strong>09</strong><span>dimensões no<br/>diagnóstico inicial</span></div>
            <div><strong>01</strong><span>plano conectado<br/>à sua realidade</span></div>
          </div>
        </div>
        <section className="home-journey" id="caminho" aria-labelledby="home-journey-title">
          <div className="home-journey-heading"><span>DA INTENÇÃO À PRÁTICA</span><Compass size={24} strokeWidth={1.4}/></div>
          <h2 id="home-journey-title">Um caminho. Sete fases.</h2>
          <ol className="home-phases">
            {phases.map(([title,description],index)=><li key={title} className={index===0?'home-phase-first':undefined}>
              <span className="home-phase-number">{String(index+1).padStart(2,'0')}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
              {index===0&&<ArrowUpRight size={20} aria-hidden="true"/>}
            </li>)}
          </ol>
          <p className="home-journey-note">Comece pelo seu contexto.<br/>As respostas dão forma ao próximo passo.</p>
        </section>
      </section>
      <section className="home-outcomes" aria-label="Do diagnóstico ao plano">
        <article><span className="home-outcome-icon"><ScanLine size={23}/></span><div><h2>Entenda onde você está.</h2><p>Avalie cultura, maturidade operacional e capacidade técnica do seu time.</p></div></article>
        <article><span className="home-outcome-icon"><Route size={23}/></span><div><h2>Escolha o próximo passo.</h2><p>Defina responsáveis, um piloto e as prioridades que fazem sentido para sua engenharia.</p></div></article>
        <article><span className="home-outcome-icon"><FileCheck2 size={23}/></span><div><h2>Leve um plano para o time.</h2><p>Reúna decisões, critérios e evidências em um relatório que você pode exportar.</p></div></article>
      </section>
    </main>
    <footer className="home-footer"><span>Bússola <span aria-hidden="true">/</span> Adoção de IA</span><p>Adaptação independente do framework Tech Leads Club.</p><span className="home-footer-edition">V2 · 2026</span></footer>
  </div>;
}

