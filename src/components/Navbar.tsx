import React from 'react';
import { useFarm } from '../context/FarmContext';
import {
  Sprout,
  Presentation,
  PlusCircle,
  ShieldCheck,
  Eye,
  Download,
  Coins,
  Compass,
  Sliders,
  TrendingUp,
  Landmark,
  Wrench,
  Sparkles,
  MapPin
} from 'lucide-react';
import { ScenarioType } from '../types';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currency,
    toggleCurrency,
    role,
    setAuthModalOpen,
    setPresentationOpen,
    setAddActivityModalOpen,
    setExportModalOpen,
    scenario,
    setScenario,
    isSimulatedModified,
    resetSimulation
  } = useFarm();

  const navItems = [
    { id: 'accueil', label: 'Accueil', icon: Compass },
    { id: 'exploitation', label: 'Exploitation', icon: MapPin },
    { id: 'activites', label: 'Activités', icon: Sprout },
    { id: 'simulateur', label: 'Simulateur', icon: Sliders, badge: isSimulatedModified ? 'Modifié' : undefined },
    { id: 'projections', label: 'Projections', icon: TrendingUp },
    { id: 'finances', label: 'Finances', icon: Landmark },
    { id: 'infrastructures', label: 'Infrastructures', icon: Wrench },
    { id: 'vision', label: 'Vision 20 ans', icon: Sparkles }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all">
      {/* Top Banner for brother & scenario selector */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-stone-900 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Projet Familial Mali
          </span>
          <span className="text-stone-300 hidden md:inline">
            1 hectare en exploitation intégrée &bull; Forage & Vergers &bull; Projet Avicole
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {/* Scénario quick switcher */}
          <div className="flex items-center gap-1 bg-black/30 rounded-lg p-0.5 border border-white/10">
            <span className="text-[11px] text-stone-300 px-1.5 hidden sm:inline">Scénario :</span>
            {(['prudent', 'central', 'dynamique'] as ScenarioType[]).map((sc) => (
              <button
                key={sc}
                onClick={() => setScenario(sc)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                  scenario === sc
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {sc === 'prudent' ? 'Prudent' : sc === 'central' ? 'Central' : 'Dynamique'}
              </button>
            ))}
          </div>

          {/* Reset simulation indicator */}
          {isSimulatedModified && (
            <button
              onClick={resetSimulation}
              className="text-[11px] text-amber-300 hover:text-amber-200 underline font-medium"
              title="Réinitialiser les paramètres simulés"
            >
              Reset simu
            </button>
          )}

          {/* Currency Toggle */}
          <button
            onClick={toggleCurrency}
            className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-[11px] font-bold tracking-wide transition-colors"
            title="Basculer entre FCFA (XOF) et Euro (€)"
          >
            <Coins className="w-3.5 h-3.5 text-amber-300" />
            <span>{currency}</span>
          </button>

          {/* Role badge */}
          <button
            onClick={() => setAuthModalOpen(true)}
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 transition-colors"
          >
            {role === 'ADMIN' ? (
              <>
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-300 font-semibold">Admin</span>
              </>
            ) : (
              <>
                <Eye className="w-3 h-3 text-stone-400" />
                <span>Consultation</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & title */}
          <div
            className="flex items-center gap-3 cursor-pointer shrink-0"
            onClick={() => setActiveTab('accueil')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <Sprout className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl text-stone-900 tracking-tight">
                  AgriMali
                </span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  360°
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium hidden sm:block">
                Plan d'Affaires &amp; Simulateur Agricole Intégré
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 shadow-sm border border-emerald-200'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 w-2 h-2 rounded-full bg-amber-500"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Presentation Mode button (designed specifically for his brother) */}
            <button
              onClick={() => setPresentationOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold text-sm shadow-md shadow-emerald-700/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Presentation className="w-4 h-4 text-emerald-200" />
              <span className="hidden sm:inline">Mode Présentation</span>
            </button>

            {/* Add activity button */}
            <button
              onClick={() => setAddActivityModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-300 hover:border-emerald-500 text-stone-700 hover:text-emerald-700 bg-white font-medium text-sm transition-colors shadow-sm"
              title="Ajouter une nouvelle activité agricole ou d'élevage"
            >
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              <span className="hidden xl:inline">+ Activité</span>
            </button>

            {/* Export modal trigger */}
            <button
              onClick={() => setExportModalOpen(true)}
              className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors"
              title="Exporter ou imprimer le dossier financier"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile horizontal navigation bar */}
        <div className="flex lg:hidden overflow-x-auto gap-1 py-2 border-t border-stone-100 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
