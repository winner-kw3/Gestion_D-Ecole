import React from 'react';
import { Users, BookOpen, TrendingUp, Award, Calendar, Clock } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      name: 'Étudiants inscrits',
      value: '1,247',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Cours actifs',
      value: '23',
      change: '+3',
      changeType: 'increase',
      icon: BookOpen,
      color: 'bg-green-500',
    },
    {
      name: 'Taux de réussite',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      name: 'Certifications',
      value: '856',
      change: '+18%',
      changeType: 'increase',
      icon: Award,
      color: 'bg-orange-500',
    },
  ];

  const recentActivities = [
    { id: 1, action: 'Nouvel étudiant inscrit', user: 'Marie Dubois', time: 'Il y a 2 minutes' },
    { id: 2, action: 'Cours JavaScript complété', user: 'Pierre Martin', time: 'Il y a 15 minutes' },
    { id: 3, action: 'Certification obtenue', user: 'Sophie Laurent', time: 'Il y a 1 heure' },
    { id: 4, action: 'Nouveau cours créé', user: 'Admin', time: 'Il y a 2 heures' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
        <p className="text-gray-600">Vue d'ensemble de l'école </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">ce mois</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Activités récentes</h2>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Actions rapides</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-3" />
                <span className="font-medium text-blue-900">Ajouter un étudiant</span>
              </div>
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white text-sm">+</span>
              </div>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-green-600 mr-3" />
                <span className="font-medium text-green-900">Créer un cours</span>
              </div>
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white text-sm">+</span>
              </div>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group">
              <div className="flex items-center">
                <Award className="w-5 h-5 text-purple-600 mr-3" />
                <span className="font-medium text-purple-900">Gérer les certifications</span>
              </div>
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white text-sm">→</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}