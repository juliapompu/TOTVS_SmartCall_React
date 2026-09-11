import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/variables.css';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Sobre from './pages/Sobre';
import Empresa from './Pages/Empresa';
import Noticia from './pages/Noticia';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="empresa" element={<Empresa />} />
          <Route path="noticia/:id" element={<Noticia />} />
          <Route path="/empresa" element={<Empresa />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
