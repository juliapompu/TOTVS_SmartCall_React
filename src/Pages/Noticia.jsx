import { Link, useParams } from 'react-router-dom';
import '../styles/Noticia.css';

const noticias = {
  1: {
    title: 'TOTVS e ESPM lançam pós-graduação em marketing com foco em IA e receita',
    summary: 'A parceria reforça a formação de profissionais para o futuro do mercado digital e tecnológico.',
    paragraphs: [
      'A TOTVS, por meio de sua operação RD Station, e a Escola Superior de Propaganda e Marketing (ESPM) anunciaram parceria para o lançamento de cursos de pós-graduação, com desenvolvimento conjunto da grade e dos conteúdos, voltados à formação de profissionais de marketing, negócios e tecnologia.',
      'A iniciativa marca um movimento para responder às transformações do setor, com foco em temas como inteligência artificial, geração de receita, experiência do cliente e crescimento sustentável. A parceria aproxima o conhecimento de mercado da formação acadêmica, com conteúdos voltados à inovação, ao marketing e às novas tecnologias.',
      'Entre os programas a serem desenvolvidos está um foco em estratégias digitais, análise de dados, automação, liderança e construção de negócios com previsibilidade e escala. Ao unir duas referências do setor, a proposta cria uma base sólida para a próxima geração de executivos e especialistas.',
      'Em um mercado em constante transformação, a parceria reforça a importância de alinhar educação, tecnologia e estratégia para formar profissionais mais preparados para atender às demandas do futuro.',
    ],
  },
  2: {
    title: 'BTG e TOTVS: uma nova movimentação no mercado',
    summary: 'Confira os detalhes da movimentação envolvendo as empresas.',
    paragraphs: [
      'A operação reforça o interesse do mercado por empresas brasileiras de tecnologia e movimenta o setor de soluções digitais para negócios.',
      'A iniciativa também abre espaço para discussões sobre integração de dados, eficiência operacional e novas estratégias de crescimento digital.',
    ],
  },
  3: {
    title: 'Prêmio TOTVS Brasil',
    summary: 'Conheça o evento que celebra inovação e resultados.',
    paragraphs: [
      'O Prêmio TOTVS Brasil reconhece empresas e profissionais que transformam seus negócios por meio da tecnologia, da colaboração e da inovação.',
      'A premiação destaca histórias de impacto, eficiência e uso estratégico de soluções digitais em diferentes setores da economia.',
    ],
  },
};

export default function Noticia() {
  const { id } = useParams();
  const noticia = noticias[id] || noticias[1];

  return (
    <div className="news-layout-shell">
      <header className="news-shell-header">
        <div className="news-shell-brand">PagNoticias</div>
        <div className="news-shell-actions" aria-label="Ações">
          <span className="news-shell-icon">◌</span>
          <span className="news-shell-icon news-shell-icon--dark">◍</span>
        </div>
      </header>

      <main className="news-shell-body">
        <article className="news-article-card">
          <h1>{noticia.title}</h1>

          <div className="news-page-content-wrap">
            <div className="news-page-content">
              {noticia.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="news-visual" aria-label="Imagem ilustrativa da notícia">
              <div className="news-visual-figure" />
              <div className="news-visual-badge">ESPM</div>
            </div>
          </div>
        </article>
      </main>

      <footer className="news-shell-footer">
        <div className="news-shell-footer-copy">
          <span>Tempo de uso e privacidade</span>
          <strong>Termos de uso</strong>
        </div>
        <div className="news-shell-footer-copy">
          <span>Atualizado em</span>
          <strong>10/05/2026</strong>
        </div>
        <div className="news-shell-footer-copy">
          <span>Portal</span>
          <strong>TOTVS SmartCall</strong>
        </div>
        <div className="news-shell-brand-mark">S</div>
      </footer>
    </div>
  );
}