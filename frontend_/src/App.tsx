import React, { useState, useEffect } from 'react';
import { GraduationCap, Users, Settings, LogOut, BookOpen, BarChart3 } from 'lucide-react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import StudentManagement from './components/StudentManagement';
import AdminPanel from './components/AdminPanel';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('https://gestion-d-ecole.onrender.com/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Erreur lors de la récupération de l’utilisateur');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      }
    };
  
    if (token) {
      fetchUser();
    }
  }, [token]);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setActiveTab('dashboard');
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">GENESIXX</h1>
            <p className="text-gray-600">Système de gestion scolaire</p>
          </div>
          <Login onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  const navigation = [
    { id: 'dashboard', name: 'Tableau de bord', icon: BarChart3 },
    { id: 'students', name: 'Étudiants', icon: Users },
    
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-8 border-b border-gray-200">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl mr-3">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">École </h1>
              <p className="text-sm text-gray-500">Gestion scolaire</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              );
            })}
            {user?.role === 'admin' && (
            <button
              key="admin"
              onClick={() => setActiveTab('admin')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                activeTab === 'admin'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Settings className="w-5 h-5 mr-3" />
              Administration
            </button>
          )}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64">
        <div className="min-h-screen">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'students' && <StudentManagement token={token} />}
          {activeTab === 'admin' && <AdminPanel token={token} />}
        </div>
      </div>
    </div>
  );
}

export default App;