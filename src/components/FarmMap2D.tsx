import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { formatCurrency } from '../services/financialEngine';
import {
  MapPin,
  Layers,
  Info,
  Droplets,
  Sun,
  Home,
  Egg,
  Fish,
  Trees,
  Warehouse,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface ZoneInfo {
  id: string;
  name: string;
  category: string;
  surface: string;
  status: 'EXISTANT' | 'EN_PROJET' | 'AMENAGEABLE';
  description: string;
  revenueEst: string;
  details: string[];
}

export const FarmMap2D: React.FC = () => {
  const {
    orangers,
    manguiers,
    hens,
    fishFarming,
    currency,
    financials,
    setActiveTab
  } = useFarm();

  const [selectedZone, setSelectedZone] = useState<string>('verger-oranges');

  const zones: Record<string, ZoneInfo> = {
    'verger-oranges': {
      id: 'verger-oranges',
      name: 'Verger d\'Orangers (Arboriculture)',
      category: 'Arboriculture Fruitière',
      surface: 'Env. 5 000 m² (0,5 ha)',
      status: 'EXISTANT',
      description: `${orangers.count} orangers adultes déjà implantés. Besoin prioritaire : réhabilitation du réseau d'arrosage goutte-à-goutte pour maximiser le calibre des fruits.`,
      revenueEst: formatCurrency(
        financials.modules.find((m) => m.id === 'orangers')?.revenueFcfa || 1620000,
        currency
      ),
      details: [
        `${orangers.count} pieds en production`,
        `Rendement estimé : ${orangers.yieldPerTreeKg} kg / pied`,
        'Récolte : Novembre à Février',
        'Interlignes propices au piment et herbes aromatiques'
      ]
    },
    'verger-mangues': {
      id: 'verger-mangues',
      name: 'Verger de Manguiers',
      category: 'Arboriculture Fruitière',
      surface: 'Env. 2 000 m²',
      status: 'EXISTANT',
      description: `${manguiers.count} manguiers adultes greffés. Ombrage naturel pour l'élevage des oies et forte production saisonnière.`,
      revenueEst: formatCurrency(
        financials.modules.find((m) => m.id === 'manguiers')?.revenueFcfa || 739200,
        currency
      ),
      details: [
        `${manguiers.count} manguiers en pleine maturité`,
        'Rendement : ~120 kg / arbre',
        'Récolte : Avril à Juillet',
        'Synergie : Pâturage naturel des oies sous les manguiers'
      ]
    },
    'zone-maraichage': {
      id: 'zone-maraichage',
      name: 'Périmètre Maraîcher Intensif',
      category: 'Maraîchage & Légumes',
      surface: '1 000 m² divisibles en planches',
      status: 'AMENAGEABLE',
      description: 'Terrain plat à proximité immédiate de la tête de réseau d\'irrigation. 2 à 3 rotations par an d\'oignons de Galmi, piments et gombos.',
      revenueEst: formatCurrency(
        financials.modules.find((m) => m.id === 'cultures-1000m2')?.revenueFcfa || 3150000,
        currency
      ),
      details: [
        '500 m² : Oignon Violet de Galmi (haute conservation)',
        '300 m² : Piment Habanero (haute rentabilité/kg)',
        '200 m² : Gombo & légumes à cycle ultra-court',
        'Rendement moyen : 2,5 à 3,5 kg/m²'
      ]
    },
    poulailler: {
      id: 'poulailler',
      name: 'Complexe Avicole Bio-Sécurisé (2 000 Sujets)',
      category: 'Élevage Avicole',
      surface: '250 m² (bâtiment 200m² + sas sanitaire)',
      status: 'EN_PROJET',
      description: `Bâtiment moderne orienté est-ouest avec toiture ventilée et isolation thermique. Cœur de la rentabilité mensuelle de la ferme.`,
      revenueEst: formatCurrency(
        financials.modules.find((m) => m.id === 'poules-pondeuses')?.revenueFcfa || 38000000,
        currency
      ),
      details: [
        `${hens.subjectCount.toLocaleString()} poules pondeuses haute performance`,
        'Production : ~1 640 œufs/jour (54 plateaux/jour)',
        'Vente des poules réformées en fin de cycle',
        'Production annuelle de ~350 sacs de fientes valorisées'
      ]
    },
    forage: {
      id: 'forage',
      name: 'Station Hydraulique & Forage Solaire',
      category: 'Infrastructure Vitale',
      surface: '40 m²',
      status: 'EXISTANT',
      description: 'Forage d\'eau douce existant à fort potentiel. À équiper d\'une pompe solaire immergée et d\'un réservoir tampon de 5 000 L surélevé à 4 m.',
      revenueEst: 'Ressource vitale (Eau gratuite)',
      details: [
        'Forage tubé existant',
        'Château d\'eau 5m³ gravitaire prévu',
        'Générateur photovoltaïque 2,5 kWc',
        'Alimente vergers, maraîchage, aviculture et habitat'
      ]
    },
    logement: {
      id: 'logement',
      name: 'Logement de Gestion & Exploitant',
      category: 'Habitation & Sécurité',
      surface: '60 m²',
      status: 'EN_PROJET',
      description: 'Chambre, salle d\'eau moderne, bureau de gestion et véranda. Garantit la surveillance humaine H24 des animaux et des récoltes.',
      revenueEst: 'Investissement Sécurité & Confort',
      details: [
        'Présence permanente 24h/24',
        'Alimentation électrique solaire dédiée',
        'Bureau de suivi des stocks et des pontes',
        'Clôture rapprochée de sûreté'
      ]
    },
    aquaculture: {
      id: 'aquaculture',
      name: 'Station Aquacole (Bassins Hors-Sol)',
      category: 'Pisciculture Écologique',
      surface: '120 m²',
      status: 'EN_PROJET',
      description: '2 bassins circulaires de 30m³ pour l\'élevage de Tilapia du Nil et silures. L\'eau enrichie en déjections de poissons est vidangée vers le verger (fertirrigation).',
      revenueEst: formatCurrency(
        financials.modules.find((m) => m.id === 'pisciculture')?.revenueFcfa || 3740000,
        currency
      ),
      details: [
        '2 x 2 000 alevins par an (4 000 au total)',
        'Production : ~1 700 kg de poisson frais',
        'Recyclage 100% de l\'eau riche en azote',
        'Alimentation complémentée par vers et fientes traitées'
      ]
    },
    magasin: {
      id: 'magasin',
      name: 'Hangar de Stockage, Aliments & Couveuse',
      category: 'Logistique & Incubation',
      surface: '80 m²',
      status: 'EN_PROJET',
      description: 'Espace sécurisé, aéré et frais pour le stockage des plateaux d\'œufs, des sacs d\'aliments pour poules, et emplacement de la couveuse automatique 1 000 œufs.',
      revenueEst: 'Centre logistique',
      details: [
        'Capacité de stockage : 2 mois d\'aliment volaille',
        'Chambre tempérée pour conservation des œufs',
        'Emplacement de la couveuse électrique/solaire',
        'Atelier d\'outillage agricole et pièces détachées'
      ]
    }
  };

  const current = zones[selectedZone] || zones['verger-oranges'];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-stone-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-sm font-semibold uppercase tracking-wider">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Visualisation Cadastrale Pédagogique</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-stone-900 mt-1">
            Plan d'Aménagement Spatial du Hectare (10 000 m²)
          </h2>
          <p className="text-stone-500 text-sm mt-0.5">
            Cliquez sur n'importe quelle parcelle pour examiner son statut, sa production et son intégration écologique.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            Existant vérifié
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            Aménagement prioritaire
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            Projet structurant
          </span>
        </div>
      </div>

      {/* Grid: Map on Left, Detail Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Interactive SVG Map */}
        <div className="lg:col-span-8 p-4 md:p-6 bg-stone-100/70 border-b lg:border-b-0 lg:border-r border-stone-200 flex flex-col justify-center items-center">
          <div className="w-full max-w-2xl aspect-[4/3] bg-gradient-to-b from-[#e8dec8] to-[#dfd2b8] rounded-xl shadow-inner border-2 border-stone-300/80 p-3 relative overflow-hidden select-none">
            {/* Compass rose */}
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-stone-600 border border-stone-200 shadow-sm flex items-center gap-1">
              <span>↑ NORD</span>
            </div>

            {/* Perimeter & Access Road */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-amber-900/10 px-3 py-0.5 rounded text-[10px] text-amber-900 font-semibold tracking-wider">
              PISTE D'ACCÈS &amp; PORTAIL PRINCIPAL (SUD)
            </div>

            {/* Scale indicator */}
            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-medium text-stone-600 border border-stone-200">
              Échelle : 100m x 100m = 1 Hectare
            </div>

            {/* SVG Plot Graphic */}
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full drop-shadow-sm transition-all"
            >
              {/* Defs for patterns */}
              <defs>
                <pattern id="treePattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="14" fill="#15803d" opacity="0.35" />
                  <circle cx="20" cy="20" r="10" fill="#16a34a" opacity="0.7" />
                  <circle cx="20" cy="20" r="4" fill="#f59e0b" />
                </pattern>
                <pattern id="mangoPattern" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="22" fill="#047857" opacity="0.35" />
                  <circle cx="30" cy="30" r="16" fill="#059669" opacity="0.75" />
                  <circle cx="30" cy="30" r="6" fill="#fbbf24" />
                </pattern>
                <pattern id="cropRows" width="20" height="10" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="5" x2="20" y2="5" stroke="#10b981" strokeWidth="3" strokeDasharray="3 2" />
                </pattern>
              </defs>

              {/* 1. Verger Orangers (Top-Left & Center-Left ~50%) */}
              <g
                className="cursor-pointer transition-all hover:opacity-95"
                onClick={() => setSelectedZone('verger-oranges')}
              >
                <rect
                  x="20"
                  y="20"
                  width="440"
                  height="340"
                  rx="10"
                  fill="#dcfce7"
                  stroke={selectedZone === 'verger-oranges' ? '#15803d' : '#86efac'}
                  strokeWidth={selectedZone === 'verger-oranges' ? 4 : 2}
                  className="transition-all"
                />
                <rect x="20" y="20" width="440" height="340" rx="10" fill="url(#treePattern)" />
                <rect x="35" y="35" width="200" height="32" rx="6" fill="rgba(255,255,255,0.9)" />
                <text x="45" y="56" fill="#166534" fontWeight="bold" fontSize="14">
                  VERGER D'ORANGERS ({orangers.count} pieds)
                </text>
                <text x="35" y="340" fill="#15803d" fontWeight="bold" fontSize="12">
                  Goutte-à-goutte + Cultures intercalaires
                </text>
              </g>

              {/* 2. Verger Manguiers (Top-Right ~20%) */}
              <g
                className="cursor-pointer transition-all hover:opacity-95"
                onClick={() => setSelectedZone('verger-mangues')}
              >
                <rect
                  x="480"
                  y="20"
                  width="300"
                  height="220"
                  rx="10"
                  fill="#d1fae5"
                  stroke={selectedZone === 'verger-mangues' ? '#047857' : '#6ee7b7'}
                  strokeWidth={selectedZone === 'verger-mangues' ? 4 : 2}
                  className="transition-all"
                />
                <rect x="480" y="20" width="300" height="220" rx="10" fill="url(#mangoPattern)" />
                <rect x="495" y="35" width="210" height="32" rx="6" fill="rgba(255,255,255,0.9)" />
                <text x="505" y="56" fill="#065f46" fontWeight="bold" fontSize="14">
                  MANGUIERS ({manguiers.count} pieds) + OIES
                </text>
              </g>

              {/* 3. Forage & Station Pompage (Center Hub) */}
              <g
                className="cursor-pointer transition-all hover:scale-[1.02] origin-center"
                onClick={() => setSelectedZone('forage')}
              >
                <rect
                  x="370"
                  y="240"
                  width="90"
                  height="90"
                  rx="12"
                  fill="#e0f2fe"
                  stroke={selectedZone === 'forage' ? '#0284c7' : '#38bdf8'}
                  strokeWidth={selectedZone === 'forage' ? 4 : 2}
                  className="transition-all"
                />
                <circle cx="415" cy="275" r="22" fill="#0284c7" />
                <text x="415" y="280" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="18">
                  💧
                </text>
                <text x="415" y="318" fill="#0369a1" textAnchor="middle" fontWeight="bold" fontSize="11">
                  FORAGE + SOLAIRE
                </text>
              </g>

              {/* 4. Zone Maraîchère 1 000 m² (Center-Right) */}
              <g
                className="cursor-pointer transition-all hover:opacity-95"
                onClick={() => setSelectedZone('zone-maraichage')}
              >
                <rect
                  x="480"
                  y="260"
                  width="300"
                  height="160"
                  rx="10"
                  fill="#fef3c7"
                  stroke={selectedZone === 'zone-maraichage' ? '#d97706' : '#fcd34d'}
                  strokeWidth={selectedZone === 'zone-maraichage' ? 4 : 2}
                  className="transition-all"
                />
                <rect x="480" y="260" width="300" height="160" rx="10" fill="url(#cropRows)" />
                <rect x="495" y="275" width="220" height="30" rx="6" fill="rgba(255,255,255,0.92)" />
                <text x="505" y="295" fill="#92400e" fontWeight="bold" fontSize="13">
                  MARAÎCHAGE INTENSIF (1 000 m²)
                </text>
                <text x="495" y="405" fill="#78350f" fontWeight="600" fontSize="11">
                  Oignons (500m²) &bull; Piments (300m²) &bull; Gombo (200m²)
                </text>
              </g>

              {/* 5. Poulailler Moderne 2 000 Pondeuses (Bottom-Left) */}
              <g
                className="cursor-pointer transition-all hover:opacity-95"
                onClick={() => setSelectedZone('poulailler')}
              >
                <rect
                  x="20"
                  y="380"
                  width="320"
                  height="160"
                  rx="10"
                  fill="#fef2f2"
                  stroke={selectedZone === 'poulailler' ? '#dc2626' : '#f87171'}
                  strokeWidth={selectedZone === 'poulailler' ? 4 : 2}
                  className="transition-all"
                />
                {/* Roof pattern */}
                <path d="M 25 410 L 180 390 L 335 410 L 335 530 L 25 530 Z" fill="#fee2e2" />
                <rect x="35" y="420" width="250" height="30" rx="6" fill="rgba(255,255,255,0.92)" />
                <text x="45" y="440" fill="#991b1b" fontWeight="bold" fontSize="13">
                  🐔 POULAILLER ({hens.subjectCount.toLocaleString()} PONDEUSES)
                </text>
                <text x="35" y="520" fill="#b91c1c" fontWeight="600" fontSize="11">
                  Bâtiment aéré 200m² &bull; Biosécurisé &bull; Évacuation fientes
                </text>
              </g>

              {/* 6. Magasin & Couveuse (Bottom-Center) */}
              <g
                className="cursor-pointer transition-all hover:opacity-95"
                onClick={() => setSelectedZone('magasin')}
              >
                <rect
                  x="360"
                  y="380"
                  width="120"
                  height="160"
                  rx="8"
                  fill="#f5f3ff"
                  stroke={selectedZone === 'magasin' ? '#7c3aed' : '#c4b5fd'}
                  strokeWidth={selectedZone === 'magasin' ? 4 : 2}
                />
                <rect x="368" y="390" width="104" height="26" rx="4" fill="white" />
                <text x="420" y="407" fill="#6d28d9" textAnchor="middle" fontWeight="bold" fontSize="10">
                  MAGASIN & COUVEUSE
                </text>
                <text x="420" y="460" fill="#5b21b6" textAnchor="middle" fontSize="24">
                  📦
                </text>
                <text x="420" y="525" fill="#4c1d95" textAnchor="middle" fontSize="10" fontWeight="600">
                  Stock Aliments &amp; Œufs
                </text>
              </g>

              {/* 7. Logement Exploitant (Bottom-Right) */}
              <g
                className="cursor-pointer transition-all hover:opacity-95"
                onClick={() => setSelectedZone('logement')}
              >
                <rect
                  x="500"
                  y="440"
                  width="130"
                  height="100"
                  rx="8"
                  fill="#fff7ed"
                  stroke={selectedZone === 'logement' ? '#ea580c' : '#fdba74'}
                  strokeWidth={selectedZone === 'logement' ? 4 : 2}
                />
                <rect x="508" y="450" width="114" height="24" rx="4" fill="white" />
                <text x="565" y="466" fill="#c2410c" textAnchor="middle" fontWeight="bold" fontSize="10">
                  LOGEMENT EXPLOITANT
                </text>
                <text x="565" y="505" fill="#9a3412" textAnchor="middle" fontSize="22">
                  🏡
                </text>
                <text x="565" y="530" fill="#9a3412" textAnchor="middle" fontSize="10" fontWeight="600">
                  Présence 24/7
                </text>
              </g>

              {/* 8. Pisciculture (Far Bottom-Right) */}
              <g
                className="cursor-pointer transition-all hover:opacity-95"
                onClick={() => setSelectedZone('aquaculture')}
              >
                <rect
                  x="650"
                  y="440"
                  width="130"
                  height="100"
                  rx="8"
                  fill="#ecfeff"
                  stroke={selectedZone === 'aquaculture' ? '#0891b2' : '#67e8f9'}
                  strokeWidth={selectedZone === 'aquaculture' ? 4 : 2}
                />
                <circle cx="685" cy="495" r="22" fill="#0891b2" opacity="0.3" stroke="#0891b2" strokeWidth="2" />
                <circle cx="745" cy="495" r="22" fill="#0891b2" opacity="0.3" stroke="#0891b2" strokeWidth="2" />
                <rect x="658" y="450" width="114" height="22" rx="4" fill="white" />
                <text x="715" y="465" fill="#0e7490" textAnchor="middle" fontWeight="bold" fontSize="10">
                  PISCICULTURE (2 BASSINS)
                </text>
                <text x="715" y="530" fill="#155e75" textAnchor="middle" fontSize="9" fontWeight="600">
                  Eau rejetée vers vergers
                </text>
              </g>
            </svg>
          </div>
          <div className="mt-3 text-xs text-stone-500 text-center flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-stone-400" />
            <span>Plan interactif orienté &bull; Cliquez sur une zone pour afficher la fiche technique</span>
          </div>
        </div>

        {/* Selected Zone Detail Panel */}
        <div className="lg:col-span-4 p-6 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                {current.category}
              </span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  current.status === 'EXISTANT'
                    ? 'bg-emerald-100 text-emerald-800'
                    : current.status === 'AMENAGEABLE'
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-blue-100 text-blue-900'
                }`}
              >
                {current.status === 'EXISTANT'
                  ? 'Actif & Existant'
                  : current.status === 'AMENAGEABLE'
                  ? 'À aménager'
                  : 'Projet d\'investissement'}
              </span>
            </div>

            <h3 className="font-display text-xl font-bold text-stone-900">{current.name}</h3>

            <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div className="text-xs text-stone-500 font-medium">Revenu Annuel Projeté :</div>
              <div className="text-xl font-extrabold text-emerald-700 mt-0.5">
                {current.revenueEst}
              </div>
              <div className="text-xs text-stone-400 mt-0.5">Superficie : {current.surface}</div>
            </div>

            <p className="text-stone-600 text-sm mt-4 leading-relaxed">{current.description}</p>

            <div className="mt-5">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                Points clés &amp; Synergies :
              </h4>
              <ul className="space-y-2">
                {current.details.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
            <button
              onClick={() => setActiveTab('activites')}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <span>Voir le module détaillé</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTab('simulateur')}
              className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold transition-colors"
            >
              Simuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
