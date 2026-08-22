import { Outlet } from 'react-router-dom';
import Header from '../Partial/Header';
import Sidebar from '../Partial/Sidebar';

const ClientLayout = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <Sidebar />
        <main className="pb-16 pt-16 md:pl-20 md:pb-0">
          <Outlet />
        </main>
    </div>
  );
}

export default ClientLayout;