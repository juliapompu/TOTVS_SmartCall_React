import { Link, useParams } from 'react-router-dom';
import '../styles/Noticia.css';

const noticias = {
  1: {
    title: 'TOTVS + ESPM: uma combinação de sucesso',
    summary: 'TOTVS e ESPM unem tecnologia e marketing para preparar profissionais para o futuro.',
    content: 'A parceria aproxima o conhecimento de mercado da formação acadêmica, com conteúdos voltados à inovação, ao marketing e às novas tecnologias.',
  },
  2: {
    title: 'BTG e TOTVS: uma nova movimentação no mercado',
    summary: 'Confira os detalhes da movimentação envolvendo as empresas.',
    content: 'A operação reforça o interesse do mercado por empresas brasileiras de tecnologia e movimenta o setor de soluções digitais para negócios.',
  },
  3: {
    title: 'Prêmio TOTVS Brasil',
    summary: 'Conheça o evento que celebra inovação e resultados.',
    content: 'O Prêmio TOTVS Brasil reconhece empresas e profissionais que transformam seus negócios por meio da tecnologia, da colaboração e da inovação.',
  },
};

export default function Noticia() {
  const { id } = useParams();
  const noticia = noticias[id] || noticias[1];

  return (
    <article className="news-page container">
      <Link to="/" className="news-back-link">Voltar para notícias</Link>
      <p className="news-page-kicker">Notícia TOTVS</p>
      <h1>{noticia.title}</h1>
      <p className="news-page-summary">{noticia.summary}</p>
      <div className="news-page-divider" />
      <p className="news-page-content">{noticia.content}</p>
    </article>
  );
}