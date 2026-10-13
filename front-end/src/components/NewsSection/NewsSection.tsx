import { useEffect, useState } from 'react';
import EastIcon from '@mui/icons-material/East';
import { Link } from 'react-router-dom';
import { newsService } from '../../services/newsService';
import type { NewsItem } from '../../types/news';

const excerpt = (text: string) => `${text.slice(0, 105).trimEnd()}...`;

export const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    newsService.getAllNews()
      .then((items) => {
        if (active) setNews(items);
      })
      .catch(() => {
        if (active) setError('Não foi possível carregar as notícias.');
      });
    return () => {
      active = false;
    };
  }, []);

  const featured = news.find((item) => item.id === 3) ?? news[0];
  const otherNews = news.filter((item) => item.id !== featured?.id);

  return (
    <section className="news-section" id="noticias">
      <div className="content-width">
        <h2 className="section-heading">Principais Notícias</h2>
        {error && <p className="state-message state-message--error" role="alert">{error}</p>}
        {!error && featured && (
          <div className="news-layout">
            <article className="featured-news">
              <Link to={`/noticias/${featured.id}`} className="featured-news-image">
                <img src={featured.imageUrl} alt="" />
                <h3>{featured.title}</h3>
              </Link>
              <div className="featured-news-summary">
                <p>{excerpt(featured.summary)}</p>
                <Link to={`/noticias/${featured.id}`} aria-label={`Ler notícia: ${featured.title}`}>
                  <EastIcon />
                </Link>
              </div>
            </article>
            <div className="news-list">
              {otherNews.map((item) => (
                <article className="news-list-item" key={item.id}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{excerpt(item.summary)}</p>
                    <Link to={`/noticias/${item.id}`}>Ler notícia <EastIcon /></Link>
                  </div>
                  <Link className="news-list-image" to={`/noticias/${item.id}`} aria-label={`Ler notícia: ${item.title}`}>
                    <img src={item.imageUrl} alt="" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};