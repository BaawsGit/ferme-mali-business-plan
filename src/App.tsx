import React from 'react';
import { useFarm } from './context/FarmContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FarmMap2D } from './components/FarmMap2D';
import { ModulesOverview } from './components/ModulesOverview';
import { ParcelManager } from './components/ParcelManager';
import { SimulatorView } from './components/SimulatorView';
import { ProjectionsTimeline } from './components/ProjectionsTimeline';
import { FinancialsView } from './components/FinancialsView';
import { InfrastructuresView } from './components/InfrastructuresView';
import { VisionView } from './components/VisionView';
import { PresentationMode } from './components/PresentationMode';
import { AddActivityModal } from './components/AddActivityModal';
import { AuthModal } from './components/AuthModal';
import { ExportModal } from './components/ExportModal';
import {
  Sprout,
  Heart,
  Globe2,
  Phone,
  Mail,
  ShieldCheck,
  Coins
} from 'lucide-react';

export const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, setPresentationOpen, currency, toggleCurrency } = useFarm();

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top sticky Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'accueil' && (
          <div className="space-y-10">
            <HeroSection />
            <FarmMap2D />
          </div>
        )}

        {activeTab === 'exploitation' && (
          <div className="space-y-8">
            <FarmMap2D />
            <ParcelManager />
          </div>
        )}

        {activeTab === 'activites' && (
          <div className="space-y-8">
            <ModulesOverview />
          </div>
        )}

        {activeTab === 'simulateur' && (
          <div className="space-y-8">
            <SimulatorView />
          </div>
        )}

        {activeTab === 'projections' && (
          <div className="space-y-8">
            <ProjectionsTimeline />
          </div>
        )}

        {activeTab === 'finances' && (
          <div className="space-y-8">
            <FinancialsView />
          </div>
        )}

        {activeTab === 'infrastructures' && (
          <div className="space-y-8">
            <InfrastructuresView />
          </div>
        )}

        {activeTab === 'vision' && (
          <div className="space-y-8">
            <VisionView />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-16 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand column */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                  🌱
                </div>
                <span className="font-display font-extrabold text-xl text-white tracking-tight">
                  AgriMali 360°
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Mali &bull; 1 Hectare
                </span>
              </div>
              <p className="text-xs text-stone-400 max-w-md leading-relaxed">
                Plateforme interactive de modélisation économique, simulation financière et pilotage stratégique
                pour l'exploitation agricole familiale intégrée au Mali. Conçue pour permettre une prise de décision
                éclairée, transparente et partagée à distance.
              </p>
              <div className="pt-2 text-xs text-stone-400 flex items-center gap-2">
                <span>Devise d'affichage :</span>
                <button
                  onClick={toggleCurrency}
                  className="px-2 py-0.5 rounded bg-stone-800 text-stone-200 border border-stone-700 font-bold hover:bg-stone-700 text-[11px]"
                >
                  {currency} (Cliquer pour basculer)
                </button>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Navigation Rapide
              </h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li>
                  <button onClick={() => setActiveTab('accueil')} className="hover:text-emerald-400">
                    Accueil &amp; Synthèse 30s
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('exploitation')} className="hover:text-emerald-400">
                    Carte du Terrain (1 ha)
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('activites')} className="hover:text-emerald-400">
                    Modules de Production
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('simulateur')} className="hover:text-emerald-400">
                    Simulateur Financier
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('projections')} className="hover:text-emerald-400">
                    Timeline 1 à 20 ans
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('infrastructures')} className="hover:text-emerald-400">
                    Infrastructures &amp; Checklist
                  </button>
                </li>
              </ul>
            </div>

            {/* Presentation & Contact */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Partage Fraternel
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed mb-3">
                Ce dossier a été conçu pour être parcouru étape par étape avec notre frère à distance.
              </p>
              <button
                onClick={() => setPresentationOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Ouvrir la Présentation (10 étapes)</span>
              </button>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400">
            <div>
              &copy; {new Date().getFullYear()} AgriMali 360° &bull; Projet Agricole Intégré &bull; Tous droits réservés.
            </div>
            <div className="flex items-center gap-2 text-stone-400">
              <span>Projet conçu avec rigueur technique et vision entrepreneuriale</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Interactive Modals */}
      <PresentationMode />
      <AddActivityModal />
      <AuthModal />
      <ExportModal />
    </div>
  );
};
