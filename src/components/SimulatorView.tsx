import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { formatCurrency } from '../services/financialEngine';
import {
  Sliders,
  RotateCcw,
  Save,
  TrendingUp,
  Landmark,
  Coins,
  CheckCircle,
  HelpCircle,
  Scale,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Droplets,
  Egg,
  Sprout
} from 'lucide-react';
import { ScenarioType } from '../types';

export const SimulatorView: React.FC = () => {
  const {
    simulation,
    updateSimulation,
    resetSimulation,
    saveSimulationAsScenario,
    scenario,
    setScenario,
    financials,
    currency,
    isSimulatedModified
  } = useFarm();

  const [savedName, setSavedName] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleSaveScenario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!savedName.trim()) return;
    saveSimulationAsScenario(savedName.trim());
    setSavedName('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Simulator Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-emerald-600" />
            <span>Simulateur Financier Non Destructif</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-stone-900 mt-1">
            Simulez vos Scénarios Économiques en Temps Réel
          </h2>
          <p className="text-stone-500 text-sm mt-0.5">
            Testez librement l'impact d'une variation de prix, de production ou d'extension. Vos modifications sont temporaires et ne détruisent pas les données de référence.
          </p>
        </div>

        {/* Scenario Buttons & Reset */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
            {(['prudent', 'central', 'dynamique'] as ScenarioType[]).map((sc) => (
              <button
                key={sc}
                onClick={() => setScenario(sc)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  scenario === sc
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                }`}
              >
                {sc}
              </button>
            ))}
          </div>

          <button
            onClick={resetSimulation}
            disabled={!isSimulatedModified}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              isSimulatedModified
                ? 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                : 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Controls on Left, Live Financial Dashboard on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders & Parameters Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card: Aviculture (Poules Pondeuses) */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold">
                  🐔
                </div>
                <div>
                  <h3 className="font-display font-bold text-stone-900 text-base">
                    Unité Avicole (Poules Pondeuses)
                  </h3>
                  <span className="text-xs text-stone-500">Moteur principal de trésorerie</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Projet Initial 2 000
              </span>
            </div>

            {/* Slider 1: Nombre de poules */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  Nombre de sujets en ponte :
                </label>
                <span className="text-sm font-extrabold text-stone-900">
                  {simulation.hensCount.toLocaleString()} poules
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={simulation.hensCount}
                onChange={(e) => updateSimulation({ hensCount: Number(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
                <span>0</span>
                <span>1 000</span>
                <span className="font-bold text-emerald-700">2 000 (Base)</span>
                <span>3 500</span>
                <span>5 000</span>
              </div>
            </div>

            {/* Slider 2: Taux de ponte */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  Taux moyen de ponte annuel :
                </label>
                <span className="text-sm font-extrabold text-stone-900">
                  {simulation.layingRatePercent}%
                </span>
              </div>
              <input
                type="range"
                min="60"
                max="95"
                step="1"
                value={simulation.layingRatePercent}
                onChange={(e) => updateSimulation({ layingRatePercent: Number(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
                <span>60% (Mauvais)</span>
                <span className="font-bold text-emerald-700">82% (Standard Mali)</span>
                <span>95% (Record)</span>
              </div>
            </div>

            {/* Slider 3: Prix plateau 30 œufs */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  Prix de vente du plateau (30 œufs) :
                </label>
                <span className="text-sm font-extrabold text-emerald-700">
                  {simulation.eggTrayPriceFcfa.toLocaleString()} FCFA
                  <span className="text-xs font-normal text-stone-500 ml-1">
                    (~{(simulation.eggTrayPriceFcfa / 30).toFixed(0)} F/œuf)
                  </span>
                </span>
              </div>
              <input
                type="range"
                min="1800"
                max="3200"
                step="50"
                value={simulation.eggTrayPriceFcfa}
                onChange={(e) => updateSimulation({ eggTrayPriceFcfa: Number(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
                <span>1 800 FCFA</span>
                <span className="font-bold text-emerald-700">2 400 FCFA (Moyen)</span>
                <span>3 200 FCFA</span>
              </div>
            </div>

            {/* Slider 4: Coût sac aliment 50kg */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  Prix d'achat sac aliment ponte 50kg :
                </label>
                <span className="text-sm font-extrabold text-red-700">
                  {simulation.feedBagPriceFcfa.toLocaleString()} FCFA
                </span>
              </div>
              <input
                type="range"
                min="14000"
                max="25000"
                step="500"
                value={simulation.feedBagPriceFcfa}
                onChange={(e) => updateSimulation({ feedBagPriceFcfa: Number(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
                <span>14 000 FCFA (Promo)</span>
                <span className="font-bold text-stone-700">17 500 FCFA (Actuel)</span>
                <span>25 000 FCFA (Crise)</span>
              </div>
            </div>
          </div>

          {/* Card: Arboriculture & Maraîchage */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  🌳
                </div>
                <div>
                  <h3 className="font-display font-bold text-stone-900 text-base">
                    Vergers &amp; Maraîchage
                  </h3>
                  <span className="text-xs text-stone-500">Valorisation du terrain d'1 hectare</span>
                </div>
              </div>
            </div>

            {/* Slider: Orangers */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  Nombre de pieds d'orangers :
                </label>
                <span className="text-sm font-extrabold text-stone-900">
                  {simulation.orangeTreeCount} pieds
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                step="5"
                value={simulation.orangeTreeCount}
                onChange={(e) => updateSimulation({ orangeTreeCount: Number(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
                <span>50</span>
                <span className="font-bold text-emerald-700">90 (Existant vérifié)</span>
                <span>150</span>
              </div>
            </div>

            {/* Slider: Manguiers */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  Nombre de pieds de manguiers :
                </label>
                <span className="text-sm font-extrabold text-stone-900">
                  {simulation.mangoTreeCount} pieds
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="2"
                value={simulation.mangoTreeCount}
                onChange={(e) => updateSimulation({ mangoTreeCount: Number(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
                <span>10</span>
                <span className="font-bold text-emerald-700">20 (Existant)</span>
                <span>50</span>
              </div>
            </div>

            {/* Slider: Superficie maraîchère */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  Superficie maraîchère cultivée :
                </label>
                <span className="text-sm font-extrabold text-stone-900">
                  {simulation.marketGardenAreaM2.toLocaleString()} m²
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="3000"
                step="100"
                value={simulation.marketGardenAreaM2}
                onChange={(e) => updateSimulation({ marketGardenAreaM2: Number(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
                <span>500 m²</span>
                <span className="font-bold text-emerald-700">1 000 m² (Disponible initial)</span>
                <span>3 000 m²</span>
              </div>
            </div>
          </div>

          {/* Card: Options d'extension & Toggles */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-stone-900 text-base pb-2 border-b border-stone-100">
              Diversification &amp; Activités Optionnelles
            </h3>

            <div className="space-y-3">
              {/* Toggle Pisciculture */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-sky-50/60 border border-stone-200 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🐟</span>
                  <div>
                    <span className="font-bold text-xs text-stone-900 block">
                      Pisciculture Hors-Sol (2 Bassins 30m³)
                    </span>
                    <span className="text-[11px] text-stone-500">
                      +1 700 kg de poisson frais/an &bull; Recyclage de l'eau fertilisante
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={simulation.fishFarmingEnabled}
                  onChange={(e) => updateSimulation({ fishFarmingEnabled: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                />
              </label>

              {/* Toggle Couveuse */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-indigo-50/60 border border-stone-200 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🥚</span>
                  <div>
                    <span className="font-bold text-xs text-stone-900 block">
                      Couveuse Industrielle (1 056 œufs)
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Incubation propre + vente de prestations d'éclosion
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={simulation.incubatorEnabled}
                  onChange={(e) => updateSimulation({ incubatorEnabled: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Live Simulation Output Dashboard Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Results Card */}
          <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-emerald-950 text-white p-6 rounded-3xl shadow-xl border border-stone-800 space-y-5 sticky top-24">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Résultats Simulés en Direct
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-stone-300">
                Mode Dynamique
              </span>
            </div>

            {/* Big Revenue & Profit */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs text-stone-400 font-medium">Chiffre d'Affaires Annuel Projeté :</div>
                <div className="text-3xl font-extrabold text-white mt-1">
                  {formatCurrency(financials.annualRevenueFcfa, currency)}
                </div>
                <div className="text-xs text-stone-400 mt-1">
                  Soit ~{formatCurrency(financials.annualRevenueFcfa / 12, currency)} / mois
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40">
                <div className="text-xs text-emerald-300 font-semibold">Bénéfice Net d'Exploitation :</div>
                <div className="text-3xl font-extrabold text-emerald-400 mt-1">
                  +{formatCurrency(financials.netAnnualMarginFcfa, currency)}
                </div>
                <div className="text-xs text-emerald-200 mt-1 flex justify-between">
                  <span>Marge nette : <strong>{financials.netMarginPercent}%</strong></span>
                  <span>Charges : {formatCurrency(financials.annualExpensesFcfa, currency, true)}</span>
                </div>
              </div>
            </div>

            {/* Key Indicators Table */}
            <div className="space-y-2 text-xs border-t border-white/10 pt-4">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-stone-400">Production d'œufs / an :</span>
                <strong className="text-white">
                  {(simulation.hensCount * (simulation.layingRatePercent / 100) * 365).toLocaleString('fr-FR')} œufs
                </strong>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-stone-400">Plateaux / mois :</span>
                <strong className="text-white">
                  {Math.round((simulation.hensCount * (simulation.layingRatePercent / 100) * 30.4) / 30)} plateaux
                </strong>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-stone-400">Investissement initial :</span>
                <strong className="text-white">
                  {formatCurrency(financials.totalInitialInvestmentsFcfa, currency)}
                </strong>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-stone-400">Temps de retour sur investissement :</span>
                <strong className="text-amber-300">
                  ~{financials.paybackPeriodYears} an{financials.paybackPeriodYears > 1 ? 's' : ''}
                </strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-400">Seuil de rentabilité mensuel :</span>
                <strong className="text-white">
                  {formatCurrency(financials.breakEvenMonthlyRevenueFcfa, currency)} / mois
                </strong>
              </div>
            </div>

            {/* Save Custom Scenario Form */}
            <form onSubmit={handleSaveScenario} className="pt-3 border-t border-white/10">
              <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                Enregistrer cette simulation comme scénario :
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ex: Scénario 3 000 poules Bamako"
                  value={savedName}
                  onChange={(e) => setSavedName(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-emerald-400"
                />
                <button
                  type="submit"
                  disabled={!savedName.trim()}
                  className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-stone-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Sauver</span>
                </button>
              </div>
              {saveSuccess && (
                <div className="mt-2 text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Scénario enregistré dans votre session locale !</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
