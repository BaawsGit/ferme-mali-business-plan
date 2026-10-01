import React from 'react';
import { useFarm } from '../context/FarmContext';
import { formatCurrency } from '../services/financialEngine';
import {
  Landmark,
  PieChart as PieIcon,
  TrendingUp,
  Download,
  CheckCircle,
  HelpCircle,
  DollarSign,
  Coins,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

export const FinancialsView: React.FC = () => {
  const {
    financials,
    currency,
    infrastructures,
    scenario,
    setExportModalOpen
  } = useFarm();

  const revData = financials.revenueByCategory.map((c) => ({
    name: c.name,
    value: currency === 'EUR' ? Math.round(c.valueFcfa / 655.957) : c.valueFcfa,
    color: c.color
  }));

  const expData = financials.expensesByCategory.map((c) => ({
    name: c.name,
    value: currency === 'EUR' ? Math.round(c.valueFcfa / 655.957) : c.valueFcfa,
    color: c.color
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Landmark className="w-4 h-4 text-emerald-600" />
            <span>États Financiers Prévisionnels</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-stone-900 mt-1">
            Compte de Résultat &amp; Structure Budgétaire
          </h2>
          <p className="text-stone-500 text-sm mt-0.5">
            Détail exhaustif des flux : Chiffre d'Affaires, Charges d'Exploitation (OpEx) et Investissements (CapEx).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setExportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Télécharger / Imprimer Dossier</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold block">Chiffre d'Affaires Annuel</span>
          <div className="text-2xl font-extrabold text-stone-900 mt-1">
            {formatCurrency(financials.annualRevenueFcfa, currency)}
          </div>
          <span className="text-xs text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            Scénario : {scenario}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold block">Charges d'Exploitation (OpEx)</span>
          <div className="text-2xl font-extrabold text-red-700 mt-1">
            {formatCurrency(financials.annualExpensesFcfa, currency)}
          </div>
          <span className="text-xs text-stone-500 mt-1 block">
            Dont 62% aliment volaille &amp; intrants
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold block">Résultat Net / Marge</span>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1">
            {formatCurrency(financials.netAnnualMarginFcfa, currency)}
          </div>
          <span className="text-xs text-stone-700 font-semibold mt-1 block">
            Taux de marge nette : <strong>{financials.netMarginPercent}%</strong>
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold block">CapEx Année 1 (Investissement)</span>
          <div className="text-2xl font-extrabold text-stone-900 mt-1">
            {formatCurrency(financials.totalInitialInvestmentsFcfa, currency)}
          </div>
          <span className="text-xs text-purple-700 font-semibold mt-1 block">
            Retour sur investissement : <strong>~{financials.paybackPeriodYears} ans</strong>
          </span>
        </div>
      </div>

      {/* Two Donut Charts: Revenue by Activity & Expenses by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-display text-base font-bold text-stone-900 flex items-center justify-between">
            <span>Répartition du Chiffre d'Affaires</span>
            <span className="text-xs text-stone-400 font-normal">Par catégorie</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {revData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: number) => [`${val.toLocaleString()} ${currency}`, 'Revenu']} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expenses Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-display text-base font-bold text-stone-900 flex items-center justify-between">
            <span>Répartition des Charges d'Exploitation</span>
            <span className="text-xs text-stone-400 font-normal">Par poste de dépense</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {expData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: number) => [`${val.toLocaleString()} ${currency}`, 'Charges']} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed P&L Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-stone-900">
            Détail des Activités &amp; Marges Opérationnelles
          </h3>
          <span className="text-xs text-stone-500">
            Données calculées en temps réel
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-700 font-bold border-b border-stone-200">
              <tr>
                <th className="p-3.5">Activité / Module</th>
                <th className="p-3.5">Catégorie</th>
                <th className="p-3.5 text-right">Chiffre d'Affaires</th>
                <th className="p-3.5 text-right">Charges Directes</th>
                <th className="p-3.5 text-right">Marge Nette</th>
                <th className="p-3.5 text-right">Taux de Marge</th>
                <th className="p-3.5">Statut de la Donnée</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
              {financials.modules.map((m) => (
                <tr key={m.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-stone-900">{m.name}</td>
                  <td className="p-3.5 text-stone-500">{m.category}</td>
                  <td className="p-3.5 text-right font-semibold text-stone-900">
                    {formatCurrency(m.revenueFcfa, currency)}
                  </td>
                  <td className="p-3.5 text-right text-red-600">
                    {formatCurrency(m.expensesFcfa, currency)}
                  </td>
                  <td className="p-3.5 text-right font-bold text-emerald-700">
                    +{formatCurrency(m.netMarginFcfa, currency)}
                  </td>
                  <td className="p-3.5 text-right">
                    <span className="px-2 py-0.5 rounded font-bold bg-stone-100">
                      {m.marginPercent}%
                    </span>
                  </td>
                  <td className="p-3.5 text-stone-500 text-[11px]">{m.statusNote}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-stone-900 text-white font-bold border-t-2 border-stone-950">
              <tr>
                <td className="p-4" colSpan={2}>TOTAL EXPLOITATION (ANNUEL)</td>
                <td className="p-4 text-right text-emerald-300">
                  {formatCurrency(financials.annualRevenueFcfa, currency)}
                </td>
                <td className="p-4 text-right text-red-300">
                  {formatCurrency(financials.annualExpensesFcfa, currency)}
                </td>
                <td className="p-4 text-right text-emerald-400 text-sm font-extrabold">
                  +{formatCurrency(financials.netAnnualMarginFcfa, currency)}
                </td>
                <td className="p-4 text-right text-amber-300">
                  {financials.netMarginPercent}%
                </td>
                <td className="p-4 text-stone-400 text-[11px]">Consolidé</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Uncertainty & Hypothesis Documentation (Section 28 of prompt) */}
      <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-3">
        <h4 className="font-bold text-stone-900 flex items-center gap-1.5 uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-stone-500" />
          <span>Documentation des Sources &amp; Gestion des Incertitudes</span>
        </h4>
        <p className="leading-relaxed">
          Conformément aux principes de rigueur de ce plan d'affaires, aucune estimation n'est présentée comme une certitude absolue.
        </p>
        <ul className="space-y-1.5 list-disc list-inside text-stone-700">
          <li><strong>DONNÉES RÉELLES :</strong> Superficie de 1 ha vérifiée, existence et fonctionnement du forage d'eau, présence physique des 90 orangers, 20 manguiers et du trio d'oies.</li>
          <li><strong>ESTIMATIONS TECHNIQUES :</strong> Rendement moyen des orangers (45 kg/arbre) et manguiers (120 kg/arbre) fondé sur les standards de l'Institut d'Économie Rurale (IER) du Mali pour arbres adultes irrigués.</li>
          <li><strong>HYPOTHÈSES DE MARCHÉ :</strong> Prix de vente des œufs (2 400 FCFA/plateau de 30) et coût du sac d'aliment ponte (17 500 FCFA) basés sur les mercuriales des marchés de gros avicoles de Bamako et banlieues (2024-2025). Modifiables en un clic dans l'onglet <em>Simulateur</em>.</li>
        </ul>
      </div>
    </div>
  );
};
