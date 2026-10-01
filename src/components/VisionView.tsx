import React from 'react';
import { useFarm } from '../context/FarmContext';
import {
  Sparkles,
  ShieldAlert,
  ArrowDown,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Building2,
  TreePine,
  Factory,
  Compass,
  Award
} from 'lucide-react';

export const VisionView: React.FC = () => {
  const { risks, setActiveTab, setPresentationOpen } = useFarm();

  const steps = [
    {
      period: 'AUJOURD\'HUI',
      title: '1 Hectare Exploité Partiellement',
      subtitle: 'Notre socle patrimonial initial',
      badge: 'Point de départ réel',
      color: 'bg-stone-800 text-stone-200',
      borderColor: 'border-stone-700',
      icon: Compass,
      points: [
        '1 hectare de terrain disponible et sécurisé au Mali',
        'Forage d\'eau douce existant (ressource clé)',
        'Verger de 90 orangers et 20 manguiers adultes',
        'Noyau initial de 3 oies reproductrices',
        '1 000 m² cultivables non encore aménagés'
      ]
    },
    {
      period: 'DEMAIN (ANNÉE 1 - 2)',
      title: 'Exploitation Diversifiée & Première Rentabilité',
      subtitle: 'Autofinancement rapide par l\'aviculture et le maraîchage',
      badge: 'Phase structurante',
      color: 'bg-emerald-900 text-white',
      borderColor: 'border-emerald-600',
      icon: TreePine,
      points: [
        'Installation du pompage solaire et château d\'eau 5 000L',
        'Réseau d\'irrigation goutte-à-goutte sur tout le hectare',
        'Bâtiment poulailler moderne de 2 000 poules pondeuses',
        'Maraîchage intensif de contre-saison (oignon, piment, gombo)',
        'Logement exploitant sur site pour gestion H24'
      ]
    },
    {
      period: '5 ANS',
      title: 'Exploitation Agricole Structurée & Extension',
      subtitle: 'Acquisition de terres et valorisation post-récolte',
      badge: 'Échelle commerciale',
      color: 'bg-emerald-800 text-white',
      borderColor: 'border-emerald-500',
      icon: Building2,
      points: [
        'Extension foncière à 3,5 hectares attenants',
        'Doublement du cheptel pondeuses à 4 000 sujets',
        'Atelier de séchage solaire de mangues et conditionnement',
        'Production aquacole en bassins et couveuse industrielle active',
        'Création d\'un point de vente direct demi-gros à Bamako'
      ]
    },
    {
      period: '10 ANS',
      title: 'Agro-Business Intégré & Marque Familiale',
      subtitle: 'Transformation agroalimentaire & autonomie en intrants',
      badge: 'Consolidation',
      color: 'bg-teal-900 text-white',
      borderColor: 'border-teal-500',
      icon: Factory,
      points: [
        'Domaine de 10 hectares arborés, maraîchers et pastoraux',
        'Unité de pressage et pasteurisation de jus de fruits frais',
        'Mini-fabrique d\'aliment bétail/volaille à la ferme (maïs/soja)',
        'Flotte de distribution logistique propre pour hôtels et supermarchés',
        '15 emplois locaux qualifiés créés pour les jeunes de la région'
      ]
    },
    {
      period: '20 ANS',
      title: 'Entreprise Agro-Industrielle de Référence',
      subtitle: 'Patrimoine familial pérenne et modèle sous-régional',
      badge: 'Vision long terme',
      color: 'bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white',
      borderColor: 'border-amber-500',
      icon: Award,
      points: [
        'Groupe agro-industriel de plus de 25-50 hectares en réseau',
        'Contrats d\'agrégation avec 50 producteurs villageois partenaires',
        'Exportation sous label bio vers l\'Afrique de l\'Ouest et l\'international',
        'Centre d\'excellence et de formation aux métiers agricoles modernes',
        'Transmission d\'un actif économique majeur aux générations futures'
      ]
    }
  ];

  return (
    <div className="space-y-10">
      {/* Vision Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Feuille de Route &amp; Philosophie</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-stone-900 mt-1">
            Vision Stratégique à 20 Ans
          </h2>
          <p className="text-stone-500 text-sm mt-0.5 max-w-2xl">
            "Nous avons déjà une base solide. Maintenant, comment la transformer progressivement en une entreprise agricole rentable, durable et transmissible ?"
          </p>
        </div>

        <button
          onClick={() => setPresentationOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
        >
          <span>Parcourir la Présentation Interactive</span>
        </button>
      </div>

      {/* Vertical Step-by-Step Evolution Cards */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-8 before:w-0.5 before:bg-stone-200 before:hidden md:before:block">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div key={idx} className="relative flex flex-col md:flex-row gap-6 items-start">
              {/* Timeline marker icon */}
              <div className="hidden md:flex w-16 h-16 rounded-2xl bg-white border-2 border-stone-200 shadow-sm items-center justify-center shrink-0 z-10 text-emerald-700">
                <Icon className="w-7 h-7" />
              </div>

              {/* Main Card */}
              <div
                className={`flex-1 w-full rounded-3xl p-6 sm:p-8 border shadow-sm transition-all hover:shadow-md ${st.borderColor} ${
                  idx === 0 ? 'bg-white' : 'bg-white'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-stone-100 text-stone-800 border border-stone-300">
                      {st.period}
                    </span>
                    <span className="text-xs font-bold text-emerald-800">{st.badge}</span>
                  </div>
                  <span className="text-xs text-stone-400 font-medium">Étape {idx + 1} sur 5</span>
                </div>

                <div className="mt-4">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                    {st.title}
                  </h3>
                  <p className="text-stone-500 text-sm mt-1">{st.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  {st.points.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs text-stone-700 font-medium"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section 39: Risk Matrix & Surveillance */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <span>Gestion des Risques &amp; Mesures Préventives</span>
            </div>
            <h3 className="font-display text-xl font-bold text-stone-900 mt-1">
              Tableau de Surveillance &amp; Plans B
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Anticiper les aléas climatiques, vétérinaires et économiques pour sécuriser le capital investi.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {risks.map((r) => (
            <div
              key={r.id}
              className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3 hover:border-stone-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-stone-900">{r.title}</span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    r.impact === 'Critique'
                      ? 'bg-red-100 text-red-800'
                      : r.impact === 'Élevé'
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-blue-100 text-blue-900'
                  }`}
                >
                  Impact {r.impact}
                </span>
              </div>

              <div className="text-xs space-y-2">
                <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100 text-emerald-900">
                  <strong className="block text-[11px] text-emerald-800 mb-0.5">
                    Mesure Préventive :
                  </strong>
                  <span>{r.preventiveMeasure}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-100 text-amber-950">
                  <strong className="block text-[11px] text-amber-900 mb-0.5">
                    Plan B en cas d'urgence :
                  </strong>
                  <span>{r.planB}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
