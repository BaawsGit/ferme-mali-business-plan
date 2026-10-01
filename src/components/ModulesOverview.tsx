import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { formatCurrency } from '../services/financialEngine';
import {
  Sprout,
  Egg,
  Fish,
  Home,
  Layers,
  Sparkles,
  Info,
  Calendar,
  AlertCircle,
  PlusCircle,
  Settings2,
  Trash2,
  ChevronRight,
  TrendingUp,
  Droplets
} from 'lucide-react';
import { DataStatus } from '../types';

export const ModulesOverview: React.FC = () => {
  const {
    orangers,
    manguiers,
    cropParcels,
    companionCrops,
    hens,
    geese,
    ducks,
    localChickens,
    incubator,
    fishFarming,
    housing,
    customActivities,
    removeCustomActivity,
    financials,
    currency,
    setAddActivityModalOpen,
    role,
    setActiveTab
  } = useFarm();

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedModuleModal, setSelectedModuleModal] = useState<string | null>(null);

  const getStatusBadge = (status: DataStatus) => {
    switch (status) {
      case 'REEL':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
            DONNÉE RÉELLE
          </span>
        );
      case 'ESTIMATION':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
            ESTIMATION
          </span>
        );
      case 'HYPOTHESE':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-300">
            HYPOTHÈSE
          </span>
        );
      case 'A_CONFIRMER':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-900 border border-purple-300">
            À CONFIRMER
          </span>
        );
    }
  };

  const categories = [
    { id: 'all', label: 'Toutes les activités' },
    { id: 'arboriculture', label: 'Arbres & Vergers' },
    { id: 'maraichage', label: 'Maraîchage (1 000 m²)' },
    { id: 'elevage', label: 'Aviculture & Élevages' },
    { id: 'aquaculture', label: 'Pisciculture' },
    { id: 'transformation', label: 'Transformation & Autres' }
  ];

  const mOrangersFin = financials.modules.find((m) => m.id === 'orangers');
  const mManguiersFin = financials.modules.find((m) => m.id === 'manguiers');
  const mCropsFin = financials.modules.find((m) => m.id === 'cultures-1000m2');
  const mCompFin = financials.modules.find((m) => m.id === 'cultures-intercalaires');
  const mHensFin = financials.modules.find((m) => m.id === 'poules-pondeuses');
  const mGeeseFin = financials.modules.find((m) => m.id === 'oies');
  const mFishFin = financials.modules.find((m) => m.id === 'pisciculture');
  const mIncubFin = financials.modules.find((m) => m.id === 'couveuse');

  return (
    <div className="space-y-6">
      {/* Top Banner & Filters */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>Catalogue Intégré des Activités</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-stone-900 mt-1">
            Toutes les Activités Productives de la Ferme
          </h2>
          <p className="text-stone-500 text-sm mt-0.5">
            Chaque module détaille sa production, ses coûts d'exploitation et sa marge nette estimée.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAddActivityModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Ajouter une Activité</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterCategory === cat.id
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Module A: Orangers */}
        {(filterCategory === 'all' || filterCategory === 'arboriculture') && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="relative h-44 overflow-hidden">
                <img
                  src="/images/orchard_citrus_mango.jpg"
                  alt="Orangers en production"
                  className="w-full h-full object-cover object-left"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-stone-800 backdrop-blur-sm">
                    Arboriculture
                  </span>
                  {getStatusBadge(orangers.countStatus)}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                  {orangers.count} Arbres en place
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg font-bold text-stone-900">
                      Module A — Verger d'Orangers
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Agrumes &bull; Récolte {orangers.harvestMonths}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs">
                  <div>
                    <span className="text-stone-500 block">Production estimée :</span>
                    <strong className="text-stone-900 font-bold">
                      {Math.round(orangers.count * orangers.yieldPerTreeKg * 0.92).toLocaleString()} kg
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Prix moyen au kg :</span>
                    <strong className="text-stone-900 font-bold">
                      {orangers.pricePerKgFcfa} FCFA
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Chiffre d'Affaires :</span>
                    <strong className="text-emerald-700 font-bold">
                      {formatCurrency(mOrangersFin?.revenueFcfa || 0, currency)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Marge nette estimée :</span>
                    <strong className="text-emerald-700 font-bold">
                      {formatCurrency(mOrangersFin?.netMarginFcfa || 0, currency)}
                    </strong>
                  </div>
                </div>

                <p className="text-xs text-stone-600 mt-3 line-clamp-2">
                  {orangers.notes}
                </p>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-stone-400" />
                Marge nette : <strong>{mOrangersFin?.marginPercent}%</strong>
              </span>
              <button
                onClick={() => setActiveTab('simulateur')}
                className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
              >
                <span>Ajuster</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Module B: Manguiers */}
        {(filterCategory === 'all' || filterCategory === 'arboriculture') && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="relative h-44 overflow-hidden">
                <img
                  src="/images/orchard_citrus_mango.jpg"
                  alt="Manguiers"
                  className="w-full h-full object-cover object-right"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-stone-800 backdrop-blur-sm">
                    Arboriculture
                  </span>
                  {getStatusBadge(manguiers.countStatus)}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                  {manguiers.count} Grands Arbres
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg font-bold text-stone-900">
                      Module B — Verger de Manguiers
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Mangues greffées &bull; Récolte {manguiers.harvestMonths}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs">
                  <div>
                    <span className="text-stone-500 block">Rendement/arbre :</span>
                    <strong className="text-stone-900 font-bold">{manguiers.yieldPerTreeKg} kg</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Prix moyen :</span>
                    <strong className="text-stone-900 font-bold">{manguiers.pricePerKgFcfa} FCFA/kg</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Chiffre d'Affaires :</span>
                    <strong className="text-emerald-700 font-bold">
                      {formatCurrency(mManguiersFin?.revenueFcfa || 0, currency)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Bénéfice net :</span>
                    <strong className="text-emerald-700 font-bold">
                      {formatCurrency(mManguiersFin?.netMarginFcfa || 0, currency)}
                    </strong>
                  </div>
                </div>

                <p className="text-xs text-stone-600 mt-3 line-clamp-2">
                  {manguiers.notes} Possibilité de séchage solaire pour tripler la valeur ajoutée.
                </p>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">
                Pertes estimées : {manguiers.lossRatePercent}% (piégeage mouches)
              </span>
              <button
                onClick={() => setActiveTab('simulateur')}
                className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
              >
                <span>Ajuster</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Module C: Cultures sur 1 000 m² */}
        {(filterCategory === 'all' || filterCategory === 'maraichage') && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="p-5 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/20">
                    Maraîchage Intensif
                  </span>
                  <span className="text-xs font-bold text-amber-300">1 000 m²</span>
                </div>
                <h3 className="font-display text-lg font-bold mt-2">
                  Module C — Parcelles 1 000 m² Divisibles
                </h3>
                <p className="text-xs text-emerald-100 mt-1">
                  Oignons (500m²), Piment (300m²), Gombo (200m²)
                </p>
              </div>

              <div className="p-5">
                <div className="space-y-2 mb-4">
                  {cropParcels.map((p) => (
                    <div
                      key={p.id}
                      className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-stone-900">{p.name}</span>
                        <div className="text-[11px] text-stone-500">
                          {p.areaM2} m² &bull; {p.campaignsPerYear} campagnes/an
                        </div>
                      </div>
                      <span className="font-semibold text-emerald-700">
                        {p.pricePerKgFcfa} F/kg
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 text-xs">
                  <div>
                    <span className="text-stone-500 block">CA Total Maraîcher :</span>
                    <strong className="text-stone-900 font-bold">
                      {formatCurrency(mCropsFin?.revenueFcfa || 0, currency)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Bénéfice Net :</span>
                    <strong className="text-emerald-700 font-bold">
                      {formatCurrency(mCropsFin?.netMarginFcfa || 0, currency)}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">
                Rentabilité : ~{Math.round((mCropsFin?.netMarginFcfa || 0) / 1000)} F/m²/an
              </span>
              <button
                onClick={() => setActiveTab('exploitation')}
                className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
              >
                <span>Gérer les parcelles</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Module D: Cultures intercalaires */}
        {(filterCategory === 'all' || filterCategory === 'maraichage') && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="p-5 bg-gradient-to-br from-amber-600 to-amber-800 text-white">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/20">
                  Agro-écologie
                </span>
                <h3 className="font-display text-lg font-bold mt-2">
                  Module D — Cultures Intercalaires sous Verger
                </h3>
                <p className="text-xs text-amber-100 mt-1">
                  Valorisation des espaces libres entre les arbres
                </p>
              </div>

              <div className="p-5">
                <p className="text-xs text-stone-600 mb-3">
                  Plantation de piments, gombos et herbes aromatiques (menthe, basilic) dans les interlignes du verger, profitant de l'ombrage partiel et de l'irrigation goutte-à-goutte.
                </p>

                <div className="space-y-1.5 text-xs">
                  {companionCrops.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-100"
                    >
                      <span className="font-medium text-stone-800">{c.name}</span>
                      <strong className="text-emerald-700">
                        +{formatCurrency(c.annualRevenueFcfa - c.annualCostFcfa, currency, true)}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                  <div className="flex justify-between font-bold text-amber-900">
                    <span>Revenu d'appoint net :</span>
                    <span>{formatCurrency(mCompFin?.netMarginFcfa || 0, currency)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 text-xs text-stone-500">
              Aucun besoin de foncier supplémentaire
            </div>
          </div>
        )}

        {/* Module E: Poules Pondeuses (2 000 sujets) - Star Module */}
        {(filterCategory === 'all' || filterCategory === 'elevage') && (
          <div className="bg-white rounded-2xl border-2 border-emerald-500 overflow-hidden shadow-md flex flex-col justify-between relative group">
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Moteur de Rentabilité
              </span>
            </div>

            <div>
              <div className="relative h-44 overflow-hidden">
                <img
                  src="/images/poultry_farming.jpg"
                  alt="Élevage de poules pondeuses"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-stone-800 backdrop-blur-sm">
                    Aviculture Moderne
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-stone-900">
                  Module E — Poules Pondeuses ({hens.subjectCount.toLocaleString()} Sujets)
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Projet structurant &bull; Flux de trésorerie quotidien
                </p>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between p-2 rounded bg-stone-50 border border-stone-100">
                    <span className="text-stone-600">Production journalière :</span>
                    <strong className="text-stone-900 font-bold">
                      ~{Math.round(hens.subjectCount * (hens.layingRatePercent / 100))} œufs/jour (
                      {Math.round((hens.subjectCount * (hens.layingRatePercent / 100)) / 30)} plateaux)
                    </strong>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-stone-50 border border-stone-100">
                    <span className="text-stone-600">Prix plateau (30 œufs) :</span>
                    <strong className="text-stone-900 font-bold">
                      {hens.eggPricePerTrayFcfa.toLocaleString()} FCFA
                    </strong>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-stone-50 border border-stone-100">
                    <span className="text-stone-600">Valorisation fientes &amp; réformes :</span>
                    <strong className="text-stone-900 font-bold">
                      +5 200 000 FCFA / an
                    </strong>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs">
                  <div>
                    <span className="text-stone-600 block">CA Total Annuel :</span>
                    <strong className="text-stone-900 font-extrabold text-sm">
                      {formatCurrency(mHensFin?.revenueFcfa || 0, currency, true)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-600 block">Bénéfice Net :</span>
                    <strong className="text-emerald-700 font-extrabold text-sm">
                      {formatCurrency(mHensFin?.netMarginFcfa || 0, currency, true)}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-emerald-100/60 border-t border-emerald-200 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-900">
                Temps de retour sur investissement : ~1.2 an
              </span>
              <button
                onClick={() => setActiveTab('simulateur')}
                className="text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1"
              >
                <span>Simuler</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Module F: Oies (Situation réelle 3 oies) */}
        {(filterCategory === 'all' || filterCategory === 'elevage') && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="relative h-44 overflow-hidden">
                <img
                  src="/images/fish_geese_farm.jpg"
                  alt="Élevage d'oies"
                  className="w-full h-full object-cover object-left"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-stone-800 backdrop-blur-sm">
                    Élevage Aquatique
                  </span>
                  {getStatusBadge('REEL')}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                  Cheptel actuel : 3 oies (2F + 1M)
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-stone-900">
                  Module F — Élevage &amp; Multiplication d'Oies
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Situation actuelle : 2 femelles + 1 mâle en liberté sous les arbres
                </p>

                <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                  L'oie est un excellent désherbant naturel pour le verger et un animal de garde. Avec une ponte de 35 œufs/an par femelle et une incubation protégée, le cheptel passera à 25-30 oisons en Année 1 puis 80 oisons en Année 2.
                </p>

                <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-stone-500 block">Prix vente sujet adulte :</span>
                    <strong className="text-stone-900 font-bold">18 000 FCFA</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Marge potentielle An 2 :</span>
                    <strong className="text-emerald-700 font-bold">
                      {formatCurrency(mGeeseFin?.netMarginFcfa || 0, currency)}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">Coût d'alimentation minime (herbes)</span>
              <button
                onClick={() => setActiveTab('projections')}
                className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
              >
                <span>Projection 1-5 ans</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Module G: Canards */}
        {(filterCategory === 'all' || filterCategory === 'elevage') && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="p-5 bg-gradient-to-br from-teal-700 to-teal-900 text-white">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/20">
                  Démarrage Année 2
                </span>
                <h3 className="font-display text-lg font-bold mt-2">
                  Module G — Canards (Barbarie / Pékin)
                </h3>
                <p className="text-xs text-teal-100 mt-1">
                  Complément d'élevage très rustique
                </p>
              </div>

              <div className="p-5">
                <p className="text-xs text-stone-600 leading-relaxed">
                  Démarrage prévu en Année 2 avec 20 sujets reproducteurs. Forte rusticité, résistant aux maladies sahéliennes, valorise les sous-produits de cuisine et insectes du verger.
                </p>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between p-2 rounded bg-stone-50 border border-stone-100">
                    <span className="text-stone-600">Production annuelle visée :</span>
                    <strong className="text-stone-900 font-bold">180 canards de chair</strong>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-stone-50 border border-stone-100">
                    <span className="text-stone-600">Prix unitaire de vente :</span>
                    <strong className="text-stone-900 font-bold">5 000 FCFA</strong>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-stone-50 border border-stone-100">
                    <span className="text-stone-600">Bénéfice annuel net :</span>
                    <strong className="text-emerald-700 font-bold">+504 000 FCFA</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 text-xs text-stone-500">
              Statut : Modélisé pour lancement après le poulailler
            </div>
          </div>
        )}

        {/* Module I: Couveuse industrielle */}
        {(filterCategory === 'all' || filterCategory === 'elevage') && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="p-5 bg-gradient-to-br from-indigo-700 to-indigo-900 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/20">
                    Outil Transversal
                  </span>
                  <span className="text-xs font-bold text-amber-300">1 056 œufs</span>
                </div>
                <h3 className="font-display text-lg font-bold mt-2">
                  Module I — Couveuse Automatique Solaire
                </h3>
                <p className="text-xs text-indigo-100 mt-1">
                  Incubation pour canards, oies, pintades et poules locales
                </p>
              </div>

              <div className="p-5">
                <p className="text-xs text-stone-600 leading-relaxed">
                  L'achat de la couveuse (1 200 000 FCFA) transforme la ferme en centre d'éclosion pour toute la zone. Elle permet à la fois de renouveler nos propres cheptels et de vendre des prestations d'incubation aux éleveurs voisins (100 FCFA/œuf).
                </p>

                <div className="mt-4 p-3 bg-indigo-50 rounded-xl border border-indigo-200 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Taux d'éclosion moyen :</span>
                    <strong className="text-stone-900 font-bold">78%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Revenu de service estimé :</span>
                    <strong className="text-indigo-900 font-bold">+1 060 000 FCFA/an</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 text-xs text-stone-500">
              Alimentée par la centrale solaire hybride
            </div>
          </div>
        )}

        {/* Module J: Pisciculture Hors-Sol */}
        {(filterCategory === 'all' || filterCategory === 'aquaculture') && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="relative h-44 overflow-hidden">
                <img
                  src="/images/fish_geese_farm.jpg"
                  alt="Bassins piscicoles hors-sol"
                  className="w-full h-full object-cover object-right"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-stone-800 backdrop-blur-sm">
                    Pisciculture
                  </span>
                  {getStatusBadge('HYPOTHESE')}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                  2 Bassins de 30m³
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-stone-900">
                  Module J — Pisciculture Hors-Sol (Tilapia &amp; Silure)
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Option activable dès l'Année 2 ou 3
                </p>

                <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                  2 bassins circulaires en bâche armée de 30m³. 4 000 alevins par an. L'eau de vidange riche en matière organique fertilise directement le verger d'orangers sans engrais de synthèse.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 bg-sky-50 p-3 rounded-xl border border-sky-200 text-xs">
                  <div>
                    <span className="text-stone-500 block">Production annuelle :</span>
                    <strong className="text-stone-900 font-bold">1 700 kg de poisson</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Prix moyen frais :</span>
                    <strong className="text-stone-900 font-bold">2 200 FCFA/kg</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">CA annuel :</span>
                    <strong className="text-sky-900 font-bold">3 740 000 FCFA</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Bénéfice net :</span>
                    <strong className="text-emerald-700 font-bold">+1 650 000 FCFA</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">Investissement : 2 800 000 FCFA</span>
              <button
                onClick={() => setActiveTab('simulateur')}
                className="text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1"
              >
                <span>Activer / Simuler</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Module K: Logement Exploitants */}
        {(filterCategory === 'all' || filterCategory === 'transformation') && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="p-5 bg-gradient-to-br from-stone-800 to-stone-950 text-white">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/20">
                  Investissement Confort &amp; Sécurité
                </span>
                <h3 className="font-display text-lg font-bold mt-2">
                  Module K — Logement Exploitants sur Site
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  Chambre, bureau, salle d'eau moderne, solaire
                </p>
              </div>

              <div className="p-5">
                <p className="text-xs text-stone-600 leading-relaxed">
                  Classé en <strong>INVESTISSEMENT (CapEx)</strong> et non en activité de revenu direct. Indispensable pour assurer la surveillance permanente H24 des 2 000 poules, du matériel de pompage et des récoltes.
                </p>

                <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Coût estimatif construction :</span>
                    <strong className="text-stone-900 font-bold">
                      {formatCurrency(housing.estimatedCostFcfa, currency)}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Année programmée :</span>
                    <strong className="text-stone-900 font-bold">Année {housing.targetYear}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Bénéfice indirect :</span>
                    <span className="text-emerald-700 font-bold">Zéro vol &amp; réactivité totale</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 text-xs text-stone-500">
              Permet à notre gérant ou famille d'habiter confortablement sur place
            </div>
          </div>
        )}

        {/* Custom User Added Activities */}
        {customActivities.map((act) => (
          <div
            key={act.id}
            className="bg-white rounded-2xl border border-purple-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="p-5 bg-gradient-to-br from-purple-800 to-purple-950 text-white flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/20">
                    Activité Personnalisée
                  </span>
                  <h3 className="font-display text-lg font-bold mt-2">{act.name}</h3>
                  <p className="text-xs text-purple-200 mt-1 capitalize">
                    Catégorie : {act.category}
                  </p>
                </div>
                {role === 'ADMIN' && (
                  <button
                    onClick={() => removeCustomActivity(act.id)}
                    className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500 text-white transition-colors"
                    title="Supprimer cette activité"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="p-5">
                <p className="text-xs text-stone-600 leading-relaxed">{act.description}</p>

                <div className="mt-4 grid grid-cols-2 gap-2 bg-purple-50 p-3 rounded-xl border border-purple-100 text-xs">
                  <div>
                    <span className="text-stone-500 block">CA Annuel :</span>
                    <strong className="text-purple-950 font-bold">
                      {formatCurrency(act.annualRevenueFcfa, currency)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Charges :</span>
                    <strong className="text-stone-700 font-bold">
                      {formatCurrency(act.annualCostsFcfa, currency)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Bénéfice Net :</span>
                    <strong className="text-emerald-700 font-bold">
                      +{formatCurrency(act.annualRevenueFcfa - act.annualCostsFcfa, currency)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Investissement :</span>
                    <strong className="text-stone-900 font-bold">
                      {formatCurrency(act.initialInvestmentFcfa, currency)}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 text-xs text-stone-500 flex justify-between">
              <span>Démarrage : Année {act.startYear}</span>
              {getStatusBadge(act.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
