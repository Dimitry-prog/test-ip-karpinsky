import { Outlet } from 'react-router-dom';
import Header from '@/shared/components/header.tsx';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
