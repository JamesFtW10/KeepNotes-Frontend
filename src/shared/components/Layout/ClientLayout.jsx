import { Outlet } from 'react-router-dom';
import Header from '../Partial/Header';
import Sidebar from '../Partial/Sidebar';

const ClientLayout = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <Sidebar />
        <main className="pt-16 pl-20">
          <Outlet />
        </main>
    </div>
  );
}

export default ClientLayout;