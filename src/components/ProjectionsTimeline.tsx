import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { formatCurrency } from '../services/financialEngine';
import {
  TrendingUp,
  Calendar,
  Layers,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Landmark,
  Coins
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

export const ProjectionsTimeline: React.FC = () => {
  const { financials, currency, setActiveTab } = useFarm();
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(1); // Default Year 1

  const projections = financials.projections;
  const currentProjection = projections[selectedYearIndex] || projections[1];

  const chartData = projections.map((p) => ({
    name: `An ${p.year}`,
    label: p.label,
    CA: currency === 'EUR' ? Math.round(p.revenueFcfa / 655.957) : p.revenueFcfa,
    Charges: currency === 'EUR' ? Math.round(p.operatingExpensesFcfa / 655.957) : p.operatingExpensesFcfa,
    Benefice: currency === 'EUR' ? Math.round(p.netResultFcfa / 655.957) : p.netResultFcfa,
    Hectares: p.hectares
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Feuille de Route Stratégique Multi-Décennale</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-stone-900 mt-1">
            Projection &amp; Timeline d'Évolution (1 / 3 / 5 / 10 / 20 Ans)
          </h2>
          <p className="text-stone-500 text-sm mt-0.5">
            Du terrain familial de 1 hectare jusqu'à la création d'une entreprise agro-industrielle intégrée et reconnue.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-amber-50 text-amber-900 px-3 py-1 rounded-full border border-amber-200 font-semibold flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Vision prospective &bull; Hypothèses d'investissement</span>
          </span>
        </div>
      </div>

      {/* Interactive Timeline Stepper Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {projections.map((p, idx) => {
          const isSelected = selectedYearIndex === idx;
          return (
            <button
              key={p.year}
              onClick={() => setSelectedYearIndex(idx)}
              className={`p-4 rounded-2xl text-left border transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500/50'
                  : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className={isSelected ? 'text-emerald-200' : 'text-stone-500'}>
                  {p.year === 0 ? 'Actuel' : `Année ${p.year}`}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                }`}>
                  {p.hectares} ha
                </span>
              </div>
              <div className="font-extrabold text-sm truncate">
                {p.year === 0 ? 'Situation Initiale' : p.year === 1 ? 'Lancement Avicole' : p.year === 3 ? 'Diversification' : p.year === 5 ? 'Extension Foncier' : p.year === 10 ? 'Agro-Business' : 'Agro-Industrie'}
              </div>
              <div className={`text-xs mt-2 font-bold ${isSelected ? 'text-amber-300' : 'text-emerald-700'}`}>
                +{formatCurrency(p.netResultFcfa, currency, true)}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Year Milestone Detail Card */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-stone-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">
                {currentProjection.label}
              </span>
              <span className="text-xs text-stone-500">
                Superficie exploitée : <strong>{currentProjection.hectares} hectare{currentProjection.hectares > 1 ? 's' : ''}</strong>
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-stone-900 mt-2">
              Objectifs Stratégiques &amp; Livrables Clés
            </h3>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div>
              <span className="text-xs text-stone-500 block">Résultat Net Annuel :</span>
              <strong className="text-2xl font-extrabold text-emerald-700">
                {formatCurrency(currentProjection.netResultFcfa, currency)}
              </strong>
            </div>
            {currentProjection.investmentsFcfa > 0 && (
              <div className="border-l border-stone-200 pl-4 hidden sm:block">
                <span className="text-xs text-stone-500 block">Investissements Prévus :</span>
                <strong className="text-lg font-bold text-stone-800">
                  {formatCurrency(currentProjection.investmentsFcfa, currency, true)}
                </strong>
              </div>
            )}
          </div>
        </div>

        {/* Milestones Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {currentProjection.keyMilestones.map((m, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-xl bg-stone-50 border border-stone-200/80 hover:bg-emerald-50/50 hover:border-emerald-200 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-sm text-stone-800 font-medium leading-relaxed">
                {m}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Charts: Evolution CA, Charges & Bénéfices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Area Chart CA vs Charges vs Bénéfice */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-stone-900">
                Trajectoire Financière Prévisionnelle ({currency})
              </h3>
              <p className="text-xs text-stone-500">
                Croissance cumulée du Chiffre d'Affaires et du Résultat Net sur 20 ans
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="colorBenefice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(val) => `${(val / (currency === 'EUR' ? 1000 : 1000000)).toFixed(0)}${currency === 'EUR' ? 'k' : 'M'}`} />
                <Tooltip
                  formatter={(val: number) => [
                    `${val.toLocaleString()} ${currency}`,
                    ''
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="CA" stroke="#10b981" fillOpacity={1} fill="url(#colorCA)" name="Chiffre d'Affaires" />
                <Area type="monotone" dataKey="Benefice" stroke="#f59e0b" fillOpacity={1} fill="url(#colorBenefice)" name="Bénéfice Net" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Évolution des Superficies (Hectares) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-stone-900">
              Évolution du Patrimoine Foncier
            </h3>
            <p className="text-xs text-stone-500">
              Extension progressive de la superficie (Hectares)
            </p>

            <div className="h-60 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip formatter={(val: number) => [`${val} Hectare(s)`, 'Superficie']} />
                  <Bar dataKey="Hectares" fill="#047857" radius={[6, 6, 0, 0]} name="Hectares exploités" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
            <strong>Règle d'or :</strong> L'extension foncière est financée par la réinjection des excédents dégagés par les 2 000 poules et le maraîchage sans endettement toxique.
          </div>
        </div>
      </div>
    </div>
  );
};
