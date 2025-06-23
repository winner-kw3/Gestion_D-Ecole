import React, { useState, useEffect } from 'react';
import { X, User, Mail, Calendar, ArrowLeft } from 'lucide-react';

interface Student {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  age: number;
}

interface StudentFormProps {
  token: string;
  fetchStudents: () => void;
  editing?: boolean;
  student?: Student | null;
  onCancel: () => void;
}

export default function StudentForm({ token, fetchStudents, editing = false, student = null, onCancel }: StudentFormProps) {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    age: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editing && student) {
      setForm({
        nom: student.nom,
        prenom: student.prenom,
        email: student.email,
        age: student.age.toString()
      });
    }
  }, [editing, student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!form.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
    if (!form.email.trim()) newErrors.email = 'L\'email est requis';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email invalide';
    if (!form.age.trim()) newErrors.age = 'L\'âge est requis';
    else if (parseInt(form.age) < 16 || parseInt(form.age) > 100) newErrors.age = 'L\'âge doit être entre 16 et 100 ans';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const url = editing && student
        ? `https://gestion-d-ecole.onrender.com/api/etudiants/${student.id}`
        : `https://gestion-d-ecole.onrender.com/api/etudiants`;

      const method = editing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          age: parseInt(form.age)
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde');
      }

      fetchStudents();
      setForm({ nom: '', prenom: '', email: '', age: '' });
      onCancel();
    } catch (error) {
      console.error('Error saving student:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onCancel}
                className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors mr-3"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {editing ? 'Modifier un étudiant' : 'Ajouter un étudiant'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {editing ? 'Modifiez les informations de l\'étudiant' : 'Remplissez les informations de l\'étudiant'}
                </p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de famille *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="nom"
                    type="text"
                    name="nom"
                    placeholder="Dupont"
                    value={form.nom}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.nom ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
              </div>

              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="prenom"
                    type="text"
                    name="prenom"
                    placeholder="Jean"
                    value={form.prenom}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.prenom ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.prenom && <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="jean.dupont@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                Âge *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="age"
                  type="number"
                  name="age"
                  placeholder="25"
                  value={form.age}
                  onChange={handleChange}
                  min="16"
                  max="100"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.age ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
            </div>
          </div>

          <div className="flex space-x-4 pt-8 border-t border-gray-200 mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sauvegarde...
                </>
              ) : (
                editing ? 'Mettre à jour' : 'Ajouter l\'étudiant'
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}