import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { formatCurrency } from '../services/financialEngine';
import {
  Wrench,
  CheckSquare,
  Square,
  Clock,
  AlertCircle,
  PlusCircle,
  ExternalLink,
  Droplets,
  Zap,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';
import { InfraStatus } from '../types';

export const InfrastructuresView: React.FC = () => {
  const {
    infrastructures,
    checklist,
    toggleChecklistItem,
    currency
  } = useFarm();

  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const getStatusBadge = (status: InfraStatus) => {
    switch (status) {
      case 'EXISTANT':
        return (
          <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
            EXISTANT
          </span>
        );
      case 'A_REAMENAGER':
        return (
          <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
            À RÉAMÉNAGER
          </span>
        );
      case 'A_ACHETER':
        return (
          <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-blue-100 text-blue-900 border border-blue-300">
            À ACHETER
          </span>
        );
      case 'A_CONSTRUIRE':
        return (
          <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-purple-100 text-purple-900 border border-purple-300">
            À CONSTRUIRE
          </span>
        );
      case 'PROJET_FUTUR':
        return (
          <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-stone-100 text-stone-700 border border-stone-300">
            PROJET FUTUR
          </span>
        );
    }
  };

  const getPriorityBadge = (priority: 'HAUTE' | 'MOYENNE' | 'FAIBLE') => {
    switch (priority) {
      case 'HAUTE':
        return <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Priorité Haute</span>;
      case 'MOYENNE':
        return <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Priorité Moyenne</span>;
      case 'FAIBLE':
        return <span className="text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded">Priorité Faible</span>;
    }
  };

  const completedChecklistCount = checklist.filter((item) => item.done).length;
  const progressPercent = Math.round((completedChecklistCount / checklist.length) * 100);

  const filteredInfras = filterStatus === 'ALL'
    ? infrastructures
    : infrastructures.filter((i) => i.status === filterStatus);

  const totalCapEx = infrastructures.reduce((acc, i) => acc + i.estimatedCostFcfa, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Wrench className="w-4 h-4 text-emerald-600" />
            <span>Équipements &amp; Aménagements</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-stone-900 mt-1">
            Infrastructures &amp; Checklist de Déploiement
          </h2>
          <p className="text-stone-500 text-sm mt-0.5">
            Suivi des chantiers techniques : réaménagement hydraulique, pompage solaire, clôture, bâtiment avicole et logement.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-stone-500 block">Budget Total CapEx Projeté :</span>
          <strong className="text-2xl font-extrabold text-stone-900">
            {formatCurrency(totalCapEx, currency)}
          </strong>
        </div>
      </div>

      {/* Interactive Investment Checklist (Section 40) */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold text-stone-900 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-600" />
              <span>Checklist d'Investissement &amp; Réalisations de Terrain</span>
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Cochez les jalons réalisés au fur et à mesure de l'avancement des travaux sur le site.
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full sm:w-64 bg-stone-100 rounded-full h-3 overflow-hidden p-0.5 border border-stone-200">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-emerald-800">
            {completedChecklistCount} / {checklist.length} validés ({progressPercent}%)
          </span>
        </div>

        {/* Checklist Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleChecklistItem(item.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                item.done
                  ? 'bg-emerald-50/80 border-emerald-300 text-stone-900'
                  : 'bg-stone-50/70 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
              }`}
            >
              <div className="mt-0.5 text-emerald-700">
                {item.done ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-stone-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-xs font-bold ${item.done ? 'line-through text-stone-500' : 'text-stone-900'}`}>
                  {item.title}
                </div>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                  <span className="font-semibold text-stone-700">
                    {formatCurrency(item.costEstimateFcfa, currency, true)}
                  </span>
                  <span>&bull;</span>
                  <span className="text-stone-500">{item.priority}</span>
                </div>
                <div className="text-[10px] text-stone-400 mt-1 italic">{item.notes}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infrastructure Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['ALL', 'EXISTANT', 'A_REAMENAGER', 'A_ACHETER', 'A_CONSTRUIRE', 'PROJET_FUTUR'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterStatus === st
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {st === 'ALL' ? 'Toutes les infrastructures' : st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Infrastructures Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-700 font-bold border-b border-stone-200">
              <tr>
                <th className="p-4">Infrastructure &amp; Aménagement</th>
                <th className="p-4">Catégorie</th>
                <th className="p-4">Statut</th>
                <th className="p-4">Priorité</th>
                <th className="p-4 text-center">Année Prévue</th>
                <th className="p-4 text-right">Coût Estimé</th>
                <th className="p-4">Source / Justification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
              {filteredInfras.map((infra) => (
                <tr key={infra.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-stone-900 text-sm">{infra.name}</div>
                    <div className="text-[11px] text-stone-500 mt-0.5 max-w-md">{infra.description}</div>
                  </td>
                  <td className="p-4 text-stone-600 font-semibold">{infra.category}</td>
                  <td className="p-4">{getStatusBadge(infra.status)}</td>
                  <td className="p-4">{getPriorityBadge(infra.priority)}</td>
                  <td className="p-4 text-center font-bold text-stone-700">
                    {infra.plannedYear === 0 ? 'Existant' : `Année ${infra.plannedYear}`}
                  </td>
                  <td className="p-4 text-right font-extrabold text-stone-900">
                    {infra.estimatedCostFcfa === 0
                      ? '0 (Déjà acquis)'
                      : formatCurrency(infra.estimatedCostFcfa, currency)}
                  </td>
                  <td className="p-4 text-[11px] text-stone-500 max-w-xs">{infra.sourceHypothesis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
