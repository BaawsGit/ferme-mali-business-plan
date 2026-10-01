import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { X, ShieldCheck, Eye, Lock, Check } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    role,
    setRole
  } = useFarm();

  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!authModalOpen) return null;

  const handleAdminSwitch = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1234 or empty in dev
    if (pin === '1234' || pin === 'mali' || pin === '') {
      setRole('ADMIN');
      localStorage.setItem('agri_role', 'ADMIN');
      setAuthModalOpen(false);
      setPin('');
      setError('');
    } else {
      setError('Code PIN incorrect (Indice : 1234)');
    }
  };

  const handleConsultationSwitch = () => {
    setRole('CONSULTATION');
    localStorage.setItem('agri_role', 'CONSULTATION');
    setAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-stone-700" />
            <h3 className="font-display font-bold text-base text-stone-900">
              Gestion des Accès &amp; Profils
            </h3>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="p-1 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Mode Consultation */}
          <div
            onClick={handleConsultationSwitch}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              role === 'CONSULTATION'
                ? 'border-emerald-600 bg-emerald-50/50'
                : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-stone-200 text-stone-700 flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900">Mode Consultation (Frère / Invité)</h4>
                  <span className="text-xs text-stone-500">Navigation, simulations libres, aucun risque</span>
                </div>
              </div>
              {role === 'CONSULTATION' && (
                <Check className="w-5 h-5 text-emerald-600 font-bold" />
              )}
            </div>
          </div>

          {/* Mode Admin Form */}
          <div
            className={`p-4 rounded-2xl border-2 transition-all ${
              role === 'ADMIN'
                ? 'border-emerald-600 bg-emerald-50/50'
                : 'border-stone-200 bg-stone-50/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900">Mode Administrateur</h4>
                  <span className="text-xs text-stone-500">Modification permanente des hypothèses &amp; coûts</span>
                </div>
              </div>
              {role === 'ADMIN' && (
                <Check className="w-5 h-5 text-emerald-600 font-bold" />
              )}
            </div>

            {role !== 'ADMIN' && (
              <form onSubmit={handleAdminSwitch} className="mt-3 space-y-2">
                <label className="text-xs text-stone-600 font-semibold block">
                  Entrez le code PIN administrateur :
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="Code PIN (1234)"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                  >
                    Activer
                  </button>
                </div>
                {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
                <p className="text-[10px] text-stone-400">Code par défaut : 1234</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
