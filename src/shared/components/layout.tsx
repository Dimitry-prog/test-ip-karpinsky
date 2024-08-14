import { Outlet } from 'react-router-dom';
import Sidebar from '@/shared/components/sidebar.tsx';
import Header from '@/shared/components/header.tsx';

const Layout = () => {
  return (
    <div className="my-5 grid grid-cols-[max-content_1fr_1fr] gap-4">
      <Sidebar />

      <div className="col-span-2 flex w-full flex-1 flex-col gap-10 pr-4">
        <Header />
        <main className="w-full flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
