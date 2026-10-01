import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { formatCurrency } from '../services/financialEngine';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sprout,
  TrendingUp,
  MapPin,
  Sliders,
  Landmark,
  Sparkles,
  CheckCircle2,
  Droplets,
  Coins,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export const PresentationMode: React.FC = () => {
  const {
    presentationOpen,
    setPresentationOpen,
    orangers,
    manguiers,
    geese,
    hens,
    financials,
    currency,
    simulation,
    updateSimulation,
    resetSimulation,
    setActiveTab
  } = useFarm();

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  if (!presentationOpen) return null;

  const slides = [
    {
      step: 1,
      title: '1. Où en sommes-nous ?',
      subtitle: 'La situation de départ de notre exploitation familiale au Mali',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  Le Terrain
                </span>
                <span className="text-3xl font-extrabold text-stone-900 mt-1 block">
                  1 Hectare (10 000 m²)
                </span>
                <p className="text-xs text-stone-600 mt-1">
                  Terrain déjà sécurisé, accessible par piste carrossable, disponible immédiatement pour valorisation intégrée.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-stone-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Aucun coût d'acquisition foncière initial nécessaire</span>
                </div>
                <div className="flex items-center gap-2 text-stone-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Sol fertile adapté aux agrumes, mangues et légumes</span>
                </div>
                <div className="flex items-center gap-2 text-stone-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Proximité relative des marchés de consommation urbains</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-md border border-stone-200 aspect-video">
              <img
                src="/images/hero_mali_farm.jpg"
                alt="Vue de l'exploitation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      step: 2,
      title: '2. Ce que nous possédons déjà',
      subtitle: 'Un socle d\'actifs existants vérifiés qui réduit drastiquement les risques',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="text-2xl mb-2">💧</div>
              <span className="text-xs font-bold text-blue-700 uppercase">Atout Maître</span>
              <h4 className="font-display font-bold text-lg text-stone-900 mt-1">
                Forage d'Eau Douce
              </h4>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Forage fonctionnel en place sur la parcelle. Dans le contexte sahélien, l'accès à l'eau est la clé de voûte de toute rentabilité agricole continue.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 mt-4 block">
              &bull; Économie : 6 à 8 millions FCFA déjà épargnés
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="text-2xl mb-2">🍊</div>
              <span className="text-xs font-bold text-emerald-700 uppercase">Verger Vivant</span>
              <h4 className="font-display font-bold text-lg text-stone-900 mt-1">
                ~{orangers.count} Orangers + ~{manguiers.count} Manguiers
              </h4>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Des arbres adultes en âge de produire. Pas d'attente de 4 à 6 ans de croissance végétative : la production est exploitable immédiatement.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 mt-4 block">
              &bull; Potentiel : Plus de 6 tonnes de fruits par an
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="text-2xl mb-2">🪿</div>
              <span className="text-xs font-bold text-amber-700 uppercase">Cheptel Initial</span>
              <h4 className="font-display font-bold text-lg text-stone-900 mt-1">
                3 Oies (2 Femelles + 1 Mâle)
              </h4>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Noyau de reproduction déjà sur place, adapté au climat local, se nourrissant de l'herbe du verger sans frais d'aliment industriel.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 mt-4 block">
              &bull; Multiplication naturelle planifiée
            </span>
          </div>
        </div>
      )
    },
    {
      step: 3,
      title: '3. Ce que nous pouvons produire',
      subtitle: 'Valorisation des 1 000 m² libres et des espaces sous les arbres',
      content: (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-stone-800 leading-relaxed">
            <strong>Le principe clé :</strong> Aucun mètre carré ne doit être laissé improductif. Les 1 000 m² de terre libre accueillent des légumes à forte rotation, tandis que les lignes entre les orangers reçoivent des cultures d'ombrage adaptées.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
              <span className="font-bold text-stone-900 block">Oignon Violet de Galmi</span>
              <span className="text-xs text-emerald-700 font-semibold block">500 m² dédiés</span>
              <p className="text-xs text-stone-500 mt-2">
                2 récoltes par an. Conservation longue, produit de base le plus vendu au Mali.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
              <span className="font-bold text-stone-900 block">Piment Habanero / Antillais</span>
              <span className="text-xs text-emerald-700 font-semibold block">300 m² dédiés</span>
              <p className="text-xs text-stone-500 mt-2">
                1 200 FCFA/kg. Très forte rentabilité au m², récoltes échelonnées toutes les 2 semaines.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
              <span className="font-bold text-stone-900 block">Gombo &amp; Aromates</span>
              <span className="text-xs text-emerald-700 font-semibold block">200 m² + interlignes</span>
              <p className="text-xs text-stone-500 mt-2">
                Cycle ultra-court (60 jours), flux régulier d'argent frais pour financer l'exploitation courante.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      step: 4,
      title: '4. Les activités proposées & le rôle de l\'aviculture',
      subtitle: 'Pourquoi l\'élevage de 2 000 poules pondeuses change tout',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-4">
            <h4 className="font-display font-bold text-lg text-stone-900">
              Le cœur financier : Des rentrées d'argent quotidiennes
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              L'agriculture traditionnelle attend plusieurs mois entre le semis et la récolte. L'aviculture moderne produit des œufs chaque matin :
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-stone-500 block">Production quotidienne :</span>
                <strong className="text-stone-900 font-bold">~1 640 œufs / jour</strong>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-stone-500 block">Plateaux de 30 œufs :</span>
                <strong className="text-stone-900 font-bold">~54 plateaux / jour</strong>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-emerald-800 block">Recette brute journalière :</span>
                <strong className="text-emerald-800 font-extrabold text-sm">~130 000 FCFA / jour</strong>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-amber-900 block">Engrais organique bio :</span>
                <strong className="text-amber-900 font-bold">350 sacs de fientes</strong>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 rounded-2xl overflow-hidden shadow-md aspect-video">
            <img
              src="/images/poultry_farming.jpg"
              alt="Bâtiment avicole"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )
    },
    {
      step: 5,
      title: '5. Les investissements requis (CapEx)',
      subtitle: 'Ce qu\'il faut financer pour passer à l\'action en Année 1',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-xs text-stone-500 block">Pompage Solaire &amp; Cuve :</span>
              <strong className="text-base font-extrabold text-stone-900">2 200 000 FCFA</strong>
              <span className="text-[11px] text-stone-400 block mt-1">Pompe 3m³/h + cuve 5 000L</span>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-xs text-stone-500 block">Goutte-à-goutte (1 ha) :</span>
              <strong className="text-base font-extrabold text-stone-900">1 400 000 FCFA</strong>
              <span className="text-[11px] text-stone-400 block mt-1">Économise 70% d'eau</span>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-xs text-stone-500 block">Bâtiment Poulailler 2 000 :</span>
              <strong className="text-base font-extrabold text-stone-900">6 500 000 FCFA</strong>
              <span className="text-[11px] text-stone-400 block mt-1">200 m² bio-sécurisé</span>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-xs text-stone-500 block">Clôture &amp; Sécurité :</span>
              <strong className="text-base font-extrabold text-stone-900">1 800 000 FCFA</strong>
              <span className="text-[11px] text-stone-400 block mt-1">400 mètres linéaires</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-900 text-white flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-emerald-300 uppercase">
                Budget Total Investissement Initial
              </span>
              <div className="text-2xl font-extrabold">
                {formatCurrency(financials.totalInitialInvestmentsFcfa, currency)}
              </div>
            </div>
            <div className="text-right text-xs text-stone-300">
              Option logement exploitant intégrée &bull; Amorti en ~{financials.paybackPeriodYears} an(s)
            </div>
          </div>
        </div>
      )
    },
    {
      step: 6,
      title: '6. Les revenus potentiels & rentabilité',
      subtitle: 'La démonstration économique du modèle en vitesse de croisière',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-stone-500 uppercase">Chiffre d'Affaires</span>
              <div className="text-3xl font-extrabold text-stone-900 mt-2">
                {formatCurrency(financials.annualRevenueFcfa, currency, true)}
              </div>
              <p className="text-xs text-stone-500 mt-2">
                Par an à plein régime. Soit environ {formatCurrency(financials.annualRevenueFcfa / 12, currency, true)} de CA mensuel.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-red-50 border border-red-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-red-700 uppercase">Charges Annuelles</span>
              <div className="text-3xl font-extrabold text-red-700 mt-2">
                {formatCurrency(financials.annualExpensesFcfa, currency, true)}
              </div>
              <p className="text-xs text-stone-600 mt-2">
                Aliment volaille, vaccins vétérinaires, salaires des 2 ouvriers, entretien et transport.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase">Bénéfice Net Projeté</span>
              <div className="text-3xl font-extrabold text-emerald-700 mt-2">
                +{formatCurrency(financials.netAnnualMarginFcfa, currency, true)}
              </div>
              <p className="text-xs text-stone-700 mt-2">
                Marge nette de <strong>{financials.netMarginPercent}%</strong> permettant d'autofinancer les phases d'extension.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      step: 7,
      title: '7. La projection à 5 ans',
      subtitle: 'Passer de 1 hectare à 3,5 hectares grâce aux bénéfices réinvestis',
      content: (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-emerald-900 text-white">
            <span className="text-xs font-bold uppercase text-emerald-300">Jalon 5 Ans</span>
            <h4 className="font-display text-xl font-bold mt-1">
              Acquisition de nouvelles terres &amp; Séchage Solaire
            </h4>
            <p className="text-xs text-stone-200 mt-2 leading-relaxed">
              En réinvestissant 50% des bénéfices annuels, la ferme achète 2,5 hectares supplémentaires attenants. Doublement de la capacité à 4 000 poules et valorisation des mangues séchées.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-stone-500 block">Superficie :</span>
              <strong className="text-base text-stone-900">3,5 Hectares</strong>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-stone-500 block">Revenu Net Annuel visé :</span>
              <strong className="text-base text-emerald-700">+25 000 000 FCFA</strong>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-stone-500 block">Emplois permanents :</span>
              <strong className="text-base text-stone-900">6 salariés formés</strong>
            </div>
          </div>
        </div>
      )
    },
    {
      step: 8,
      title: '8. La projection à 10 ans',
      subtitle: 'Structuration d\'un Agro-Business avec marque commerciale et transformation',
      content: (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-teal-900 text-white">
            <span className="text-xs font-bold uppercase text-teal-300">Jalon 10 Ans</span>
            <h4 className="font-display text-xl font-bold mt-1">
              Transformation locale &amp; Baisse des coûts
            </h4>
            <p className="text-xs text-stone-200 mt-2 leading-relaxed">
              Installation d'une mini-fabrique d'aliments à la ferme (broyage maïs et tourteau) pour réduire de 20% la facture d'aliment. Unité de jus de fruits frais en bouteilles pour Bamako.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-stone-500 block">Superficie :</span>
              <strong className="text-base text-stone-900">10 Hectares</strong>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-stone-500 block">Unités avicoles :</span>
              <strong className="text-base text-stone-900">10 000 poules</strong>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-stone-500 block">Marque familiale :</span>
              <strong className="text-base text-emerald-700">Fournisseur certifié Bamako</strong>
            </div>
          </div>
        </div>
      )
    },
    {
      step: 9,
      title: '9. La vision à 20 ans',
      subtitle: 'Bâtir une entreprise agro-industrielle intégrée et transmissible',
      content: (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 text-white border border-stone-800">
            <span className="text-xs font-bold uppercase text-amber-400">Vision Long Terme (Non contractuelle)</span>
            <h4 className="font-display text-2xl font-bold mt-1">
              Un pôle d'excellence agricole au Mali
            </h4>
            <p className="text-xs text-stone-300 mt-3 leading-relaxed">
              Ce n'est pas une simple promesse, c'est une boussole. En partant de notre hectare actuel, nous construisons méthodiquement un patrimoine tangible : terres productives, maîtrise technique, réseau de paysans sous contrat et marque respectée.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="font-bold text-stone-900 block">Patrimoine transmis :</span>
              <p className="text-stone-500 mt-1">
                Une entreprise solide, rentable et immunisée contre la dépendance aux importations.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="font-bold text-stone-900 block">Impact familial &amp; local :</span>
              <p className="text-stone-500 mt-1">
                Des dizaines d'emplois créés au pays et une source de fierté pour toute la famille.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      step: 10,
      title: '10. Simuler soi-même en direct',
      subtitle: 'Teste toi-même les paramètres pour te faire ta propre opinion',
      content: (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-stone-800">
            <strong>Mon frère, à toi de jouer !</strong> Déplace les curseurs ci-dessous pour voir comment les revenus changent si nous avons 1 500 ou 3 000 poules, ou si le prix de l'œuf baisse.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Slider 1: Poules */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Nombre de poules pondeuses :</span>
                <span className="text-emerald-700">{simulation.hensCount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="4000"
                step="100"
                value={simulation.hensCount}
                onChange={(e) => updateSimulation({ hensCount: Number(e.target.value) })}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Slider 2: Prix plateau */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Prix du plateau de 30 œufs :</span>
                <span className="text-emerald-700">{simulation.eggTrayPriceFcfa} FCFA</span>
              </div>
              <input
                type="range"
                min="1800"
                max="3000"
                step="50"
                value={simulation.eggTrayPriceFcfa}
                onChange={(e) => updateSimulation({ eggTrayPriceFcfa: Number(e.target.value) })}
                className="w-full accent-emerald-600"
              />
            </div>
          </div>

          {/* Quick Output */}
          <div className="p-5 rounded-2xl bg-stone-900 text-white flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-stone-400 block">Bénéfice Net Annuel avec tes réglages :</span>
              <strong className="text-2xl font-extrabold text-emerald-400">
                +{formatCurrency(financials.netAnnualMarginFcfa, currency)}
              </strong>
            </div>
            <div className="flex gap-2">
              <button
                onClick={resetSimulation}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={() => {
                  setPresentationOpen(false);
                  setActiveTab('simulateur');
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1"
              >
                <span>Ouvrir simulateur complet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )
    }
  ];

  const current = slides[currentSlide] || slides[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Modal Bar */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-display font-bold text-sm text-stone-900">
              Mode Présentation &bull; Plan d'Affaires Familial
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-stone-500">
              Étape {currentSlide + 1} sur {slides.length}
            </span>
            <button
              onClick={() => setPresentationOpen(false)}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
              title="Fermer la présentation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          <div className="mb-6">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900">
              {current.title}
            </h3>
            <p className="text-stone-500 text-sm mt-1">{current.subtitle}</p>
          </div>

          {current.content}
        </div>

        {/* Bottom Nav Bar with Previous / Next */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>&larr; Précédent</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === i
                    ? 'w-6 bg-emerald-600'
                    : 'bg-stone-300 hover:bg-stone-400'
                }`}
                title={`Aller à l'étape ${i + 1}`}
              />
            ))}
          </div>

          {currentSlide < slides.length - 1 ? (
            <button
              onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-700/20 transition-all"
            >
              <span>Suivant &rarr;</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                setPresentationOpen(false);
                setActiveTab('simulateur');
              }}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-md transition-all"
            >
              <span>Terminer &amp; Explorer l'App</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
