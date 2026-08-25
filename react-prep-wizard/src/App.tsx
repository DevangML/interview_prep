import { Outlet, Navigate } from 'react-router';
import Header from './components/layout/Header';
import { useAuth } from './contexts/AuthContext';

export default function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50 text-slate-500">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      <Header />
      <Outlet />
    </div>
  );
}
