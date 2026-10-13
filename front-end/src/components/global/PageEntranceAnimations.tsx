import { useEffect } from 'react';

const animatedElements = [
  '.page-shell > header',
  '.page-shell > main > *',
  '.page-shell > footer',
  '.featured-news',
  '.news-list-item',
  '.ranking-card',
  '.company-card',
  '.company-profile',
  '.company-overview',
  '.meeting-card',
  '.news-detail-page > article',
].join(', ');

export const PageEntranceAnimations = () => {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    const observeElement = (element: Element) => {
      if (!element.hasAttribute('data-entrance')) {
        element.setAttribute('data-entrance', '');
      }
      if (!element.classList.contains('is-visible')) observer.observe(element);
    };

    const observeElements = (root: ParentNode) => {
      if (root instanceof Element && root.matches(animatedElements)) observeElement(root);
      root.querySelectorAll(animatedElements).forEach((element) => {
        observeElement(element);
      });
    };

    observeElements(document);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) observeElements(node);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
};
