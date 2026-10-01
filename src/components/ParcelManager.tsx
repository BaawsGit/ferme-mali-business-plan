import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { formatCurrency } from '../services/financialEngine';
import {
  Layers,
  PlusCircle,
  Trash2,
  AlertCircle,
  Sprout,
  BarChart2,
  Calendar,
  Check
} from 'lucide-react';
import { CropParcel } from '../types';

export const ParcelManager: React.FC = () => {
  const {
    cropParcels,
    setCropParcels,
    currency,
    role
  } = useFarm();

  const [newCropName, setNewCropName] = useState<string>('');
  const [newAreaM2, setNewAreaM2] = useState<number>(200);
  const [newYieldKgM2, setNewYieldKgM2] = useState<number>(2.5);
  const [newPriceKg, setNewPriceKg] = useState<number>(500);
  const [newCycleDays, setNewCycleDays] = useState<number>(75);
  const [newCampaigns, setNewCampaigns] = useState<number>(2);

  const totalAllocatedM2 = cropParcels.reduce((acc, p) => acc + p.areaM2, 0);
  const remainingM2 = 1000 - totalAllocatedM2;

  const handleAddParcel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCropName.trim()) return;

    const newParcel: CropParcel = {
      id: `parcel-${Date.now()}`,
      name: newCropName.trim(),
      areaM2: Number(newAreaM2),
      cycleDays: Number(newCycleDays),
      yieldKgPerM2: Number(newYieldKgM2),
      pricePerKgFcfa: Number(newPriceKg),
      seedCostFcfa: 15000,
      fertilizerCostFcfa: 20000,
      treatmentCostFcfa: 10000,
      laborCostFcfa: 25000,
      irrigationCostFcfa: 10000,
      transportCostFcfa: 15000,
      campaignsPerYear: Number(newCampaigns),
      status: 'HYPOTHESE',
      notes: 'Nouvelle culture ajoutée par l\'exploitant'
    };

    setCropParcels((prev) => [...prev, newParcel]);
    setNewCropName('');
  };

  const handleRemoveParcel = (id: string) => {
    setCropParcels((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="bg-white rounded-3xl p-6 lg:p-8 border border-stone-200 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Gestionnaire de Parcelles Virtuelles (1 000 m²)</span>
          </div>
          <h3 className="font-display text-xl font-bold text-stone-900 mt-1">
            Affectation &amp; Rotation des Cultures Maraîchères
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Fractionnez la zone de 1 000 m² selon les besoins du marché et observez la rentabilité au mètre carré.
          </p>
        </div>

        {/* Gauge */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-stone-500 block">Surface allouée :</span>
            <span className={`text-base font-extrabold ${remainingM2 < 0 ? 'text-red-600' : 'text-stone-900'}`}>
              {totalAllocatedM2} / 1 000 m²
            </span>
          </div>
        </div>
      </div>

      {/* Visual Allocation Bar */}
      <div className="space-y-1.5">
        <div className="h-4 w-full bg-stone-100 rounded-full overflow-hidden flex border border-stone-200">
          {cropParcels.map((p, idx) => {
            const colors = ['bg-emerald-600', 'bg-amber-500', 'bg-purple-600', 'bg-blue-600', 'bg-teal-500'];
            const widthPct = Math.min(100, (p.areaM2 / 1000) * 100);
            return (
              <div
                key={p.id}
                className={`${colors[idx % colors.length]} h-full transition-all`}
                style={{ width: `${widthPct}%` }}
                title={`${p.name}: ${p.areaM2} m² (${widthPct.toFixed(0)}%)`}
              />
            );
          })}
        </div>
        <div className="flex justify-between text-[11px] text-stone-500">
          <span>0 m²</span>
          <span>
            {remainingM2 >= 0
              ? `${remainingM2} m² encore libres`
              : `Dépassement de ${Math.abs(remainingM2)} m²`}
          </span>
          <span>1 000 m²</span>
        </div>
      </div>

      {/* Parcels Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cropParcels.map((p) => {
          const annualProdKg = p.areaM2 * p.yieldKgPerM2 * p.campaignsPerYear;
          const annualRev = annualProdKg * p.pricePerKgFcfa;
          const annualCosts =
            (p.seedCostFcfa +
              p.fertilizerCostFcfa +
              p.treatmentCostFcfa +
              p.laborCostFcfa +
              p.irrigationCostFcfa +
              p.transportCostFcfa) *
            p.campaignsPerYear;
          const netProfit = annualRev - annualCosts;

          return (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between hover:border-emerald-300 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-stone-900">{p.name}</h4>
                    <span className="text-xs text-emerald-700 font-semibold">
                      {p.areaM2} m² &bull; {p.campaignsPerYear} cycles/an
                    </span>
                  </div>
                  {cropParcels.length > 1 && (
                    <button
                      onClick={() => handleRemoveParcel(p.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors p-1"
                      title="Supprimer cette parcelle"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="mt-3 space-y-1 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Cycle de culture :</span>
                    <strong className="text-stone-900">{p.cycleDays} jours</strong>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Rendement estimé :</span>
                    <strong className="text-stone-900">{p.yieldKgPerM2} kg/m²</strong>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Production annuelle :</span>
                    <strong className="text-stone-900">{Math.round(annualProdKg).toLocaleString()} kg</strong>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Prix de vente moyen :</span>
                    <strong className="text-stone-900">{p.pricePerKgFcfa} FCFA/kg</strong>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/80 flex justify-between items-baseline">
                  <span className="text-xs text-stone-500 font-semibold">Bénéfice Net :</span>
                  <span className="text-base font-extrabold text-emerald-700">
                    +{formatCurrency(netProfit, currency)}
                  </span>
                </div>
              </div>

              <div className="mt-2 text-[10px] text-stone-400 text-right">
                Rentabilité : ~{Math.round(netProfit / (p.areaM2 || 1))} FCFA/m²
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Parcel Form */}
      <form onSubmit={handleAddParcel} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
        <span className="text-xs font-bold text-emerald-900 block">
          + Ajouter une nouvelle planche / variété maraîchère :
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs">
          <div className="col-span-2">
            <input
              type="text"
              required
              placeholder="Nom (ex: Melon, Tomate)"
              value={newCropName}
              onChange={(e) => setNewCropName(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Superficie m²"
              value={newAreaM2}
              onChange={(e) => setNewAreaM2(Number(e.target.value))}
              className="w-full px-2 py-2 border border-stone-300 rounded-xl bg-white"
            />
          </div>
          <div>
            <input
              type="number"
              step="0.5"
              placeholder="Rend. kg/m²"
              value={newYieldKgM2}
              onChange={(e) => setNewYieldKgM2(Number(e.target.value))}
              className="w-full px-2 py-2 border border-stone-300 rounded-xl bg-white"
            />
          </div>
          <div>
            <input
              type="number"
              step="50"
              placeholder="Prix FCFA/kg"
              value={newPriceKg}
              onChange={(e) => setNewPriceKg(Number(e.target.value))}
              className="w-full px-2 py-2 border border-stone-300 rounded-xl bg-white"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-sm text-xs transition-colors"
            >
              Ajouter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
