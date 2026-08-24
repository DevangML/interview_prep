import { Outlet } from 'react-router';
import Header from './components/layout/Header';

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      <Header />
      <Outlet />
    </div>
  );
}
