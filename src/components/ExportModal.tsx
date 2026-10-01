import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { formatCurrency } from '../services/financialEngine';
import {
  X,
  Printer,
  FileSpreadsheet,
  Copy,
  Check,
  Download,
  Share2
} from 'lucide-react';

export const ExportModal: React.FC = () => {
  const {
    exportModalOpen,
    setExportModalOpen,
    financials,
    currency,
    scenario,
    simulation
  } = useFarm();

  const [copied, setCopied] = useState<boolean>(false);

  if (!exportModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    // Generate CSV content
    const headers = ['Annee', 'Designation', 'Hectares', 'Chiffre_Affaires_FCFA', 'Charges_FCFA', 'Benefice_Net_FCFA', 'Investissements_FCFA'];
    const rows = financials.projections.map((p) => [
      p.year,
      `"${p.label.replace(/"/g, '""')}"`,
      p.hectares,
      p.revenueFcfa,
      p.operatingExpensesFcfa,
      p.netResultFcfa,
      p.investmentsFcfa
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `plan_affaires_agrimali_${scenario}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySummary = () => {
    const text = `🌱 PROJET AGRIMALI 360° — PLAN D'AFFAIRES INTÉGRÉ MALI
Superficie : 1 Hectare | Forage existant | 90 orangers & 20 manguiers
Projet avicole : ${simulation.hensCount.toLocaleString()} poules pondeuses
Scénario actif : ${scenario.toUpperCase()}

📊 RÉSULTATS ANNUELS :
- Chiffre d'Affaires : ${formatCurrency(financials.annualRevenueFcfa, 'FCFA')}
- Charges d'exploitation : ${formatCurrency(financials.annualExpensesFcfa, 'FCFA')}
- Bénéfice Net Projeté : ${formatCurrency(financials.netAnnualMarginFcfa, 'FCFA')} / an
- Marge Nette : ${financials.netMarginPercent}%
- Investissements initiaux : ${formatCurrency(financials.totalInitialInvestmentsFcfa, 'FCFA')}
- Temps de retour (ROI) : ~${financials.paybackPeriodYears} an(s)

Lien de consultation interactive disponible.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-emerald-600" />
            <h3 className="font-display font-bold text-base text-stone-900">
              Exporter &amp; Partager le Dossier
            </h3>
          </div>
          <button
            onClick={() => setExportModalOpen(false)}
            className="p-1 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Action 1: Print / Save PDF */}
          <button
            onClick={handlePrint}
            className="w-full p-4 rounded-2xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 flex items-center gap-4 transition-all text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Printer className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900">Imprimer / Enregistrer en PDF</h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Mise en page optimisée pour dossier de présentation bancaire ou familial.
              </p>
            </div>
          </button>

          {/* Action 2: CSV Export */}
          <button
            onClick={handleExportCSV}
            className="w-full p-4 rounded-2xl border border-stone-200 hover:border-blue-500 hover:bg-blue-50/50 flex items-center gap-4 transition-all text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900">Télécharger les Tableaux (CSV / Excel)</h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Export des projections 1 à 20 ans et des marges par activité.
              </p>
            </div>
          </button>

          {/* Action 3: Copy Text Summary */}
          <button
            onClick={handleCopySummary}
            className="w-full p-4 rounded-2xl border border-stone-200 hover:border-amber-500 hover:bg-amber-50/50 flex items-center gap-4 transition-all text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              {copied ? <Check className="w-6 h-6 text-emerald-600" /> : <Copy className="w-6 h-6" />}
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900">
                {copied ? 'Résumé Copié dans le Presse-Papier !' : 'Copier la Fiche Synthèse WhatsApp / Email'}
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Texte prêt à envoyer par message à mon frère ou à un associé.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
