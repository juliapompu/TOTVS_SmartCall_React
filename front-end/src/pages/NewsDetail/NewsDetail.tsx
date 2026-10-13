import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Footer } from '../../components/global/Footer';
import { Header } from '../../components/global/Header';
import { newsService } from '../../services/newsService';
import type { NewsItem } from '../../types/news';

const formatPublishedDate = (publishedAt: string) =>
  new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(publishedAt));

export const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const newsId = Number(id);
    const request = Number.isInteger(newsId) && newsId > 0
      ? newsService.getNewsById(newsId)
      : Promise.resolve(undefined);
    request
      .then((item) => {
        if (active) setNews(item ?? null);
      })
      .catch(() => {
        if (active) setError('Não foi possível carregar esta notícia.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <div className="page-shell">
      <Header />
      <main className="news-detail-page content-width">
        <Link className="back-link" to="/">← Voltar ao início</Link>
        {loading && <p className="state-message" role="status">Carregando notícia...</p>}
        {error && <p className="state-message state-message--error" role="alert">{error}</p>}
        {!loading && !error && !news && <p className="state-message">Notícia não encontrada.</p>}
        {news && !error && (
          <article>
            <p className="eyebrow">{news.category}</p>
            <h1>{news.title}</h1>
            <p className="news-byline">
              {news.author} <span aria-hidden="true">·</span>{' '}
              <time dateTime={news.publishedAt}>{formatPublishedDate(news.publishedAt)}</time>
            </p>
            <img className="news-detail-cover" src={news.imageUrl} alt="" />
            <p className="news-detail-summary">{news.summary}</p>
            <div className="news-article-body">
              {news.paragraphs.map((paragraph, index) => <p key={`${news.id}-${index}`}>{paragraph}</p>)}
            </div>
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
};