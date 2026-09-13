import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/variables.css';
import Layout from '../src/Components/Layout';
import Home from '../src/Pages/Home';
import Sobre from '../src/Pages/Sobre';
import Empresa from '../src/Pages/Empresa';
import Noticia from '../src/Pages/Noticia';

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
