import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { X, PlusCircle, Sparkles } from 'lucide-react';
import { ActivityCategory, CustomActivity } from '../types';

export const AddActivityModal: React.FC = () => {
  const {
    addActivityModalOpen,
    setAddActivityModalOpen,
    addCustomActivity
  } = useFarm();

  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<ActivityCategory>('elevage');
  const [description, setDescription] = useState<string>('');
  const [startYear, setStartYear] = useState<number>(2);
  const [initialInvestmentFcfa, setInitialInvestmentFcfa] = useState<number>(500000);
  const [annualRevenueFcfa, setAnnualRevenueFcfa] = useState<number>(1200000);
  const [annualCostsFcfa, setAnnualCostsFcfa] = useState<number>(400000);

  if (!addActivityModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newActivity: CustomActivity = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      category,
      description: description.trim() || 'Activité ajoutée par l\'utilisateur',
      startYear: Number(startYear),
      initialInvestmentFcfa: Number(initialInvestmentFcfa),
      annualRevenueFcfa: Number(annualRevenueFcfa),
      annualCostsFcfa: Number(annualCostsFcfa),
      status: 'HYPOTHESE'
    };

    addCustomActivity(newActivity);
    setAddActivityModalOpen(false);
    // Reset form
    setName('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-600" />
            <h3 className="font-display font-bold text-lg text-stone-900">
              Ajouter une Nouvelle Activité
            </h3>
          </div>
          <button
            onClick={() => setAddActivityModalOpen(false)}
            className="p-1 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Nom de l'activité *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Élevage de Pintades, Apiculture, Séchoir à bananes..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Catégorie *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ActivityCategory)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-emerald-600 bg-white"
              >
                <option value="agriculture">Agriculture / Verger</option>
                <option value="maraichage">Maraîchage</option>
                <option value="elevage">Élevage / Aviculture</option>
                <option value="aquaculture">Aquaculture / Pisciculture</option>
                <option value="transformation">Transformation &amp; Séchage</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Année de Démarrage
              </label>
              <select
                value={startYear}
                onChange={(e) => setStartYear(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-emerald-600 bg-white"
              >
                <option value={1}>Année 1 (Immédiat)</option>
                <option value={2}>Année 2</option>
                <option value={3}>Année 3</option>
                <option value={5}>Année 5</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Description &amp; Objectif
            </label>
            <textarea
              rows={2}
              placeholder="Expliquer brièvement comment cette activité s'intègre à la ferme..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Investissement (FCFA)
              </label>
              <input
                type="number"
                step="50000"
                value={initialInvestmentFcfa}
                onChange={(e) => setInitialInvestmentFcfa(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-emerald-600 font-semibold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                CA Annuel (FCFA)
              </label>
              <input
                type="number"
                step="50000"
                value={annualRevenueFcfa}
                onChange={(e) => setAnnualRevenueFcfa(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-emerald-600 font-semibold text-emerald-700"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Charges Annuelles (FCFA)
              </label>
              <input
                type="number"
                step="25000"
                value={annualCostsFcfa}
                onChange={(e) => setAnnualCostsFcfa(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-emerald-600 font-semibold text-red-700"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex justify-between font-bold">
            <span>Bénéfice Net Projeté / an :</span>
            <span>+{Number(annualRevenueFcfa - annualCostsFcfa).toLocaleString()} FCFA</span>
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setAddActivityModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              Créer &amp; Intégrer l'Activité
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
