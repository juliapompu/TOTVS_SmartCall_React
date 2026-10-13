import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { Partners } from '../pages/Partners/Partners';
import { PartnerDetail } from '../pages/PartnerDetail/PartnerDetail';
import { NewsDetail } from '../pages/NewsDetail/NewsDetail';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parcerias" element={<Partners />} />
        <Route path="/parcerias/:id" element={<PartnerDetail />} />
        <Route path="/noticias/:id" element={<NewsDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};