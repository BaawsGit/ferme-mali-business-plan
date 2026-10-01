import React from 'react';
import { useFarm } from '../context/FarmContext';
import { formatCurrency } from '../services/financialEngine';
import {
  Sprout,
  TrendingUp,
  Landmark,
  Sliders,
  Presentation,
  CheckCircle,
  ArrowRight,
  Layers,
  MapPin,
  Clock,
  Sparkles,
  Droplets,
  HelpCircle
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const {
    financials,
    currency,
    orangers,
    manguiers,
    geese,
    setActiveTab,
    setPresentationOpen,
    scenario
  } = useFarm();

  return (
    <div className="space-y-8">
      {/* Hero Banner with Authentic Aerial Photo */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-200/80 bg-stone-900 text-white min-h-[460px] flex flex-col justify-end">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/hero_mali_farm.jpg"
            alt="Exploitation agricole intégrée au Mali"
            className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08] transform scale-[1.01] transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-stone-900/20" />
          <div className="absolute inset-0 bg-emerald-950/20 mix-blend-multiply" />
        </div>

        {/* Floating Top Badges */}
        <div className="relative z-10 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-bold tracking-wide backdrop-blur-md shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              Projet Agricole Familial &bull; Mali
            </span>
            <span className="px-3 py-1 rounded-full bg-black/40 text-stone-200 text-xs font-medium backdrop-blur-md border border-white/10">
              Scénario actif : <strong className="text-emerald-300 capitalize">{scenario}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30 font-semibold backdrop-blur-md">
              Terrain 100% disponible &bull; Forage présent
            </span>
          </div>
        </div>

        {/* Hero Main Content (Under 30 Seconds Pitch) */}
        <div className="relative z-10 px-6 sm:px-8 pb-8 pt-4 max-w-4xl">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            De 1 hectare existant à une exploitation agricole intégrée et hautement rentable
          </h1>
          <p className="mt-3 text-stone-200 text-base sm:text-lg leading-relaxed max-w-3xl drop-shadow-sm font-normal">
            Transformer notre verger familial et forage d'eau en une ferme agro-écologique moderne :
            arboriculture optimisée, maraîchage intensif sur 1 000 m², unité avicole de 2 000 poules pondeuses,
            et élevages intégrés.
          </p>

          {/* Quick Action CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setPresentationOpen(true)}
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-900/40 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Presentation className="w-5 h-5 text-emerald-100" />
              <span>Lancer la Présentation Interactive (10 étapes)</span>
            </button>

            <button
              onClick={() => setActiveTab('simulateur')}
              className="px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-semibold text-sm backdrop-blur-md border border-white/25 flex items-center gap-2 transition-all"
            >
              <Sliders className="w-4 h-4 text-amber-300" />
              <span>Tester le Simulateur Financier</span>
            </button>

            <button
              onClick={() => setActiveTab('exploitation')}
              className="px-4 py-3 rounded-2xl bg-stone-900/70 hover:bg-stone-900 text-stone-200 font-medium text-sm backdrop-blur-md border border-white/10 flex items-center gap-2 transition-all"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Voir la Carte du Terrain</span>
            </button>
          </div>
        </div>
      </div>

      {/* 30-Second Elevator Pitch Card (Section 19 of prompt) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-3">
          <Clock className="w-4 h-4 text-emerald-600" />
          <span>Comprendre le projet en moins de 30 secondes</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {/* 1. Où sommes-nous */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-emerald-300 transition-colors">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              1. OÙ SOMMES-NOUS ?
            </div>
            <div className="text-xl font-extrabold text-stone-900 mt-1 flex items-baseline gap-1">
              <span>1 Hectare</span>
              <span className="text-xs font-normal text-stone-500">(10 000 m²)</span>
            </div>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Terrain sécurisé au Mali, déjà disponible, sol fertile exploitable immédiatement sans achat foncier initial.
            </p>
          </div>

          {/* 2. Ce qui existe */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 hover:border-emerald-400 transition-colors">
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center justify-between">
              <span>2. CE QUI EXISTE DÉJÀ</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-200 text-emerald-900 font-bold">
                RÉEL
              </span>
            </div>
            <div className="text-sm font-bold text-stone-900 mt-2 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-900">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>~{orangers.count} orangers adultes</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-900">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>~{manguiers.count} manguiers adultes</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-900">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>3 oies (2F + 1M)</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-900">
                <Droplets className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-semibold text-blue-900">Forage d'eau fonctionnel</span>
              </div>
            </div>
          </div>

          {/* 3. Ce qui est disponible */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 hover:border-amber-400 transition-colors">
            <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              3. CE QUI EST DISPONIBLE
            </div>
            <div className="text-xl font-extrabold text-amber-950 mt-1">
              1 000 m² cultivables
            </div>
            <p className="text-xs text-stone-700 mt-2 leading-relaxed">
              Plus des bandes libres entre les arbres pour cultures maraîchères rentables (oignons, piment, gombo, aromates).
            </p>
          </div>

          {/* 4. Ce que nous voulons faire */}
          <div className="p-4 rounded-2xl bg-stone-900 text-white border border-stone-800">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              4. OBJECTIF CENTRAL
            </div>
            <div className="text-base font-bold text-white mt-1 leading-snug">
              Ferme Intégrée &amp; Rentable
            </div>
            <p className="text-xs text-stone-300 mt-2 leading-relaxed">
              Autofinancement rapide grâce aux poules pondeuses et maraîchage, réinvestissement progressif vers plusieurs hectares.
            </p>
          </div>
        </div>
      </div>

      {/* Key Financial Impact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Chiffre d'Affaires Annuel */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
              <span>Chiffre d'Affaires Annuel (Plein régime)</span>
              <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                CA
              </span>
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-stone-900 mt-2">
              {formatCurrency(financials.annualRevenueFcfa, currency, true)}
            </div>
            <div className="text-xs text-stone-500 mt-1 flex items-center gap-1">
              <span>Soit</span>
              <strong className="text-emerald-700 font-bold">
                {formatCurrency(financials.annualRevenueFcfa / 12, currency, true)}/mois
              </strong>
            </div>
          </div>
        </div>

        {/* Bénéfice Net Annuel */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
              <span>Bénéfice Net Projeté / An</span>
              <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                NET
              </span>
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-emerald-700 mt-2">
              {formatCurrency(financials.netAnnualMarginFcfa, currency, true)}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              Marge nette : <strong className="text-stone-800 font-bold">{financials.netMarginPercent}%</strong>
            </div>
          </div>
        </div>

        {/* Investissements Initiaux */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
              <span>Investissement Initial (CapEx)</span>
              <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                INV
              </span>
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-stone-900 mt-2">
              {formatCurrency(financials.totalInitialInvestmentsFcfa, currency, true)}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              Poulailler, pompe solaire, goutte-à-goutte, logement
            </div>
          </div>
        </div>

        {/* Retour sur Investissement */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
              <span>Retour sur Investissement (Payback)</span>
              <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                ROI
              </span>
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-purple-700 mt-2">
              ~{financials.paybackPeriodYears} an{financials.paybackPeriodYears > 1 ? 's' : ''}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              Remboursement rapide grâce au flux régulier des œufs
            </div>
          </div>
        </div>
      </div>

      {/* 4 Grand Navigation Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Exploitation & Carte */}
        <div
          onClick={() => setActiveTab('exploitation')}
          className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
              L'Exploitation &amp; Carte 2D
            </h3>
            <p className="text-stone-500 text-xs mt-2 leading-relaxed">
              Consultez le plan d'aménagement spatial, le diagnostic du forage, la disposition des vergers et les accès.
            </p>
          </div>
          <div className="mt-4 flex items-center text-xs font-bold text-emerald-700 gap-1">
            <span>Explorer le terrain</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Modules d'Activités */}
        <div
          onClick={() => setActiveTab('activites')}
          className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
              Activités &amp; Fiches Modules
            </h3>
            <p className="text-stone-500 text-xs mt-2 leading-relaxed">
              Orangers, manguiers, maraîchage 1 000 m², poules pondeuses, oies, canards, couveuse et pisciculture.
            </p>
          </div>
          <div className="mt-4 flex items-center text-xs font-bold text-amber-800 gap-1">
            <span>Découvrir les 11 modules</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Simulateur */}
        <div
          onClick={() => setActiveTab('simulateur')}
          className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Sliders className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
              Simulateur Dynamique
            </h3>
            <p className="text-stone-500 text-xs mt-2 leading-relaxed">
              Ajustez le nombre de poules, le prix des œufs, les rendements des arbres et observez les résultats en direct.
            </p>
          </div>
          <div className="mt-4 flex items-center text-xs font-bold text-blue-700 gap-1">
            <span>Faire une simulation</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: Projections & Vision */}
        <div
          onClick={() => setActiveTab('projections')}
          className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
              Projections 1 à 20 ans
            </h3>
            <p className="text-stone-500 text-xs mt-2 leading-relaxed">
              Timeline stratégique montrant le passage progressif de 1 hectare à une entreprise agro-industrielle intégrée.
            </p>
          </div>
          <div className="mt-4 flex items-center text-xs font-bold text-purple-700 gap-1">
            <span>Voir la timeline</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
