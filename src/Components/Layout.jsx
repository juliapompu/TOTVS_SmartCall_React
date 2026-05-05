import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';

export default function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: '50px' }}>
        <Outlet />
        <Body/>
      </main>
      <Footer />
    </div>
  );
}
