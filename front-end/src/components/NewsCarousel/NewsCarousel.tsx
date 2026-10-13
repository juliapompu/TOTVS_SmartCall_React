import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { newsService } from '../../services/newsService';
import type { NewsItem } from '../../types/news';

export const NewsCarousel = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    newsService.getAllNews()
      .then((items) => {
        if (active) {
          const featured = items.find((item) => item.id === 3);
          const carouselItems = featured
            ? [featured, ...items.filter((item) => item.id !== featured.id)]
            : items;
          setNews(carouselItems.slice(0, 3));
        }
      })
      .catch(() => {
        if (active) setError('Não foi possível carregar as notícias em destaque.');
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (news.length < 2) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % news.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [news.length]);

  const activeNews = news[activeIndex];

  if (error) {
    return <p className="hero-news-error state-message state-message--error" role="alert">{error}</p>;
  }

  if (!activeNews) {
    return <div className="hero-news-carousel hero-news-carousel--loading" aria-label="Carregando notícias" />;
  }

  return (
    <div className="hero-news-carousel">
      <Link
        className="award-card award-card--enter"
        key={activeNews.id}
        to={`/noticias/${activeNews.id}`}
        aria-label={`Leia a notícia ${activeNews.title}`}
      >
        <img src={activeNews.imageUrl} alt="" />
        <div className="award-card-copy">
          <h2>{activeNews.title}</h2>
          <p>{activeNews.summary}</p>
        </div>
      </Link>
      <div className="news-carousel-dots" role="group" aria-label="Selecionar notícia em destaque">
        {news.map((item, index) => (
          <button
            className={`news-carousel-dot${index === activeIndex ? ' is-active' : ''}`}
            type="button"
            key={item.id}
            aria-label={`Mostrar notícia ${index + 1}: ${item.title}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
