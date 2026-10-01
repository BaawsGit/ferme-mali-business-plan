import {
  TreeModuleData,
  CropParcel,
  CompanionCrop,
  LayingHensData,
  GeeseData,
  DucksData,
  LocalChickenData,
  IncubatorData,
  FishFarmingData,
  HousingData,
  InfrastructureItem,
  CustomActivity,
  ScenarioType,
  SimulationState
} from '../types';

export interface ModuleFinancialSummary {
  id: string;
  name: string;
  category: string;
  revenueFcfa: number;
  expensesFcfa: number;
  netMarginFcfa: number;
  marginPercent: number;
  metrics: Record<string, string | number>;
  statusNote: string;
}

export interface YearProjectionSummary {
  year: number;
  label: string;
  hectares: number;
  revenueFcfa: number;
  operatingExpensesFcfa: number;
  netResultFcfa: number;
  investmentsFcfa: number;
  cumulativeCashflowFcfa: number;
  roiPercent: number;
  activitiesCount: number;
  keyMilestones: string[];
}

export interface GlobalFinancialAnalysis {
  annualRevenueFcfa: number;
  annualExpensesFcfa: number;
  netAnnualMarginFcfa: number;
  netMarginPercent: number;
  totalInitialInvestmentsFcfa: number;
  paybackPeriodYears: number;
  breakEvenMonthlyRevenueFcfa: number;
  modules: ModuleFinancialSummary[];
  revenueByCategory: { name: string; valueFcfa: number; color: string }[];
  expensesByCategory: { name: string; valueFcfa: number; color: string }[];
  projections: YearProjectionSummary[];
}

export const EUR_EXCHANGE_RATE = 655.957; // 1 EUR = 655.957 FCFA (Taux fixe zone franc)
export const USD_EXCHANGE_RATE = 610;

export function formatCurrency(
  amountFcfa: number,
  currency: 'FCFA' | 'EUR' = 'FCFA',
  compact: boolean = false
): string {
  if (currency === 'EUR') {
    const inEur = amountFcfa / EUR_EXCHANGE_RATE;
    if (compact) {
      if (Math.abs(inEur) >= 1000000) return `${(inEur / 1000000).toFixed(1)} M€`;
      if (Math.abs(inEur) >= 1000) return `${(inEur / 1000).toFixed(0)} k€`;
      return `${Math.round(inEur)} €`;
    }
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(inEur);
  }

  // FCFA
  if (compact) {
    if (Math.abs(amountFcfa) >= 1000000000) {
      return `${(amountFcfa / 1000000000).toFixed(2)} Md FCFA`;
    }
    if (Math.abs(amountFcfa) >= 1000000) {
      return `${(amountFcfa / 1000000).toFixed(2)} M FCFA`;
    }
    if (Math.abs(amountFcfa) >= 1000) {
      return `${(amountFcfa / 1000).toFixed(0)} k FCFA`;
    }
    return `${Math.round(amountFcfa)} FCFA`;
  }

  return new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 0
  }).format(Math.round(amountFcfa)) + ' FCFA';
}

export function computeTreeFinancials(
  tree: TreeModuleData,
  scenario: ScenarioType = 'central',
  overrideCount?: number
): ModuleFinancialSummary {
  const count = overrideCount ?? tree.count;
  let yieldMult = 1;
  let priceMult = 1;
  let costMult = 1;

  if (scenario === 'prudent') {
    yieldMult = 0.85;
    priceMult = 0.90;
    costMult = 1.10;
  } else if (scenario === 'dynamique') {
    yieldMult = 1.15;
    priceMult = 1.10;
    costMult = 0.95;
  }

  const effectiveYieldPerTree = tree.yieldPerTreeKg * yieldMult;
  const effectivePrice = tree.pricePerKgFcfa * priceMult;
  const netYieldKg = count * effectiveYieldPerTree * (1 - tree.lossRatePercent / 100);
  const revenue = netYieldKg * effectivePrice;

  const maintenance = count * tree.maintenanceCostPerTreeFcfa * costMult;
  const harvest = netYieldKg * tree.harvestCostPerKgFcfa;
  const transport = netYieldKg * tree.transportCostPerKgFcfa;
  const expenses = maintenance + harvest + transport;

  const netMargin = revenue - expenses;
  const marginPercent = revenue > 0 ? (netMargin / revenue) * 100 : 0;

  return {
    id: tree.id,
    name: tree.name,
    category: 'Arboriculture',
    revenueFcfa: Math.round(revenue),
    expensesFcfa: Math.round(expenses),
    netMarginFcfa: Math.round(netMargin),
    marginPercent: Math.round(marginPercent),
    metrics: {
      'Pieds d\'arbres': count,
      'Production brute': `${Math.round(count * effectiveYieldPerTree)} kg`,
      'Production commercialisable': `${Math.round(netYieldKg)} kg`,
      'Prix moyen au kg': `${Math.round(effectivePrice)} FCFA`,
      'Période de récolte': tree.harvestMonths
    },
    statusNote: `${tree.countStatus} pour le nombre, ${tree.yieldStatus} pour le rendement`
  };
}

export function computeCropsFinancials(
  parcels: CropParcel[],
  scenario: ScenarioType = 'central',
  scaleFactor: number = 1
): ModuleFinancialSummary {
  let totalRev = 0;
  let totalExp = 0;
  let totalArea = 0;

  let yieldMult = 1;
  let priceMult = 1;
  let costMult = 1;

  if (scenario === 'prudent') {
    yieldMult = 0.85;
    priceMult = 0.90;
    costMult = 1.10;
  } else if (scenario === 'dynamique') {
    yieldMult = 1.15;
    priceMult = 1.10;
    costMult = 0.95;
  }

  parcels.forEach((p) => {
    const area = p.areaM2 * scaleFactor;
    totalArea += area;
    const prodKg = area * (p.yieldKgPerM2 * yieldMult) * p.campaignsPerYear;
    const rev = prodKg * (p.pricePerKgFcfa * priceMult);

    const parcelCosts =
      (p.seedCostFcfa +
        p.fertilizerCostFcfa +
        p.treatmentCostFcfa +
        p.laborCostFcfa +
        p.irrigationCostFcfa +
        p.transportCostFcfa) *
      costMult *
      scaleFactor *
      p.campaignsPerYear;

    totalRev += rev;
    totalExp += parcelCosts;
  });

  const netMargin = totalRev - totalExp;
  const marginPercent = totalRev > 0 ? (netMargin / totalRev) * 100 : 0;

  return {
    id: 'cultures-1000m2',
    name: 'Maraîchage Intensif (1 000 m²)',
    category: 'Maraîchage',
    revenueFcfa: Math.round(totalRev),
    expensesFcfa: Math.round(totalExp),
    netMarginFcfa: Math.round(netMargin),
    marginPercent: Math.round(marginPercent),
    metrics: {
      'Superficie totale': `${Math.round(totalArea)} m²`,
      'Cultures actives': parcels.map((p) => p.name.split(' ')[0]).join(', '),
      'Campagnes annuelles': '2 à 3 cycles/an',
      'Rentabilité au m²': `${Math.round(netMargin / (totalArea || 1))} FCFA/m²`
    },
    statusNote: 'Estimations basées sur fiches techniques maraîchage périurbain Bamako'
  };
}

export function computeCompanionCropsFinancials(
  crops: CompanionCrop[],
  scenario: ScenarioType = 'central'
): ModuleFinancialSummary {
  let totalRev = 0;
  let totalExp = 0;
  let totalArea = 0;

  let mult = scenario === 'prudent' ? 0.85 : scenario === 'dynamique' ? 1.15 : 1;

  crops.forEach((c) => {
    totalRev += c.annualRevenueFcfa * mult;
    totalExp += c.annualCostFcfa;
    totalArea += c.estimatedAreaM2;
  });

  const netMargin = totalRev - totalExp;
  const marginPercent = totalRev > 0 ? (netMargin / totalRev) * 100 : 0;

  return {
    id: 'cultures-intercalaires',
    name: 'Cultures Intercalaires sous Verger',
    category: 'Maraîchage',
    revenueFcfa: Math.round(totalRev),
    expensesFcfa: Math.round(totalExp),
    netMarginFcfa: Math.round(netMargin),
    marginPercent: Math.round(marginPercent),
    metrics: {
      'Surface valorisée': `${totalArea} m² d'interlignes`,
      'Valorisation de l\'eau': 'Profite du goutte-à-goutte des arbres',
      'Cultures': crops.map((c) => c.name.split(' ')[0]).join(', ')
    },
    statusNote: 'Valorisation agro-écologique des espaces libres sans concurrence racinaire'
  };
}

export function computeLayingHensFinancials(
  hens: LayingHensData,
  scenario: ScenarioType = 'central',
  overrideCount?: number,
  overrideLayingRate?: number,
  overrideEggPrice?: number,
  overrideFeedBagPrice?: number
): ModuleFinancialSummary {
  const count = overrideCount ?? hens.subjectCount;
  let layingRate = (overrideLayingRate ?? hens.layingRatePercent) / 100;
  let eggPriceTray = overrideEggPrice ?? hens.eggPricePerTrayFcfa;
  let feedBagPrice = overrideFeedBagPrice ?? hens.feedBagPrice50KgFcfa;

  if (scenario === 'prudent') {
    layingRate *= 0.92; // 75%
    eggPriceTray *= 0.95; // 2280 FCFA
    feedBagPrice *= 1.08; // Hausse aliment
  } else if (scenario === 'dynamique') {
    layingRate = Math.min(0.92, layingRate * 1.05); // 86%
    eggPriceTray *= 1.05; // 2520 FCFA
    feedBagPrice *= 0.96;
  }

  // Production œufs
  const dailyEggs = count * layingRate;
  const monthlyEggs = dailyEggs * 30.41;
  const annualEggs = dailyEggs * 365;
  const annualTrays = annualEggs / 30; // Plateaux de 30
  const eggRevenue = annualTrays * eggPriceTray;

  // Poules réformées en fin de cycle (14 mois de ponte)
  const culledCount = count * (hens.culledHenSurvivalPercent / 100);
  const culledRevenue = culledCount * hens.culledHenPriceFcfa;

  // Fientes valorisées
  const manureRevenue = hens.manureBagCountAnnual * hens.manureBagPriceFcfa;

  const totalRevenue = eggRevenue + culledRevenue + manureRevenue;

  // Dépenses alimentation (115g/jour par sujet)
  const annualKgFeed = (count * hens.dailyFeedGramPerSubject * 365) / 1000;
  const bagsCount = annualKgFeed / 50;
  const feedCost = bagsCount * feedBagPrice;

  // Santé, vaccins, vitamines
  const vetCost = count * hens.vetCostPerSubjectYearFcfa;

  // Main d'œuvre
  const staffCost = hens.staffCount * hens.staffMonthlySalaryFcfa * 12;

  // Eau et énergie
  const waterElecCost = hens.waterElectricityMonthlyFcfa * 12;

  // Conditionnement alvéoles
  const packagingCost = annualTrays * hens.packagingCostPerTrayFcfa;

  // Transport livraison
  const transportCost = hens.transportCostMonthlyFcfa * 12;

  // Renouvellement annuel du cheptel (achat poussins/poulettes)
  const chickCost = count * hens.chickPriceFcfa;

  const totalExpenses =
    feedCost +
    vetCost +
    staffCost +
    waterElecCost +
    packagingCost +
    transportCost +
    chickCost;

  const netMargin = totalRevenue - totalExpenses;
  const marginPercent = totalRevenue > 0 ? (netMargin / totalRevenue) * 100 : 0;

  // Investissement initial bâtiment + équipement
  const initialCapEx = hens.coopBuildingCostFcfa + hens.equipmentCostFcfa;

  return {
    id: 'poules-pondeuses',
    name: 'Unité Avicole (Poules Pondeuses)',
    category: 'Élevage',
    revenueFcfa: Math.round(totalRevenue),
    expensesFcfa: Math.round(totalExpenses),
    netMarginFcfa: Math.round(netMargin),
    marginPercent: Math.round(marginPercent),
    metrics: {
      'Sujets en ponte': count,
      'Production journalière': `${Math.round(dailyEggs)} œufs (${Math.round(dailyEggs / 30)} plateaux/j)`,
      'Production annuelle': `${Math.round(annualEggs).toLocaleString('fr-FR')} œufs`,
      'Chiffre d\'affaires œufs': formatCurrency(eggRevenue, 'FCFA', true),
      'Vente réformes + fientes': formatCurrency(culledRevenue + manureRevenue, 'FCFA', true),
      'Coût aliment annuel': formatCurrency(feedCost, 'FCFA', true),
      'Investissement bâtiment + matériel': formatCurrency(initialCapEx, 'FCFA', true),
      'Temps de retour bâtiment': `${(initialCapEx / (netMargin || 1)).toFixed(1)} ans`
    },
    statusNote: 'Projet structurant majeur. Forte demande en protéines locales à Bamako.'
  };
}

export function computeGeeseFinancials(
  geese: GeeseData,
  scenario: ScenarioType = 'central',
  overrideFemales?: number
): ModuleFinancialSummary {
  const females = overrideFemales ?? geese.initialFemales;
  let mult = scenario === 'prudent' ? 0.85 : scenario === 'dynamique' ? 1.15 : 1;

  // Reproduction annuelle
  const totalEggs = females * geese.eggsPerFemaleYear;
  const hatchedGoslings = totalEggs * (geese.hatchingRatePercent / 100) * mult;
  const survivingYoung = hatchedGoslings * (1 - geese.mortalityRatePercent / 100);

  // Vente de 80% des jeunes élevés, 20% gardés pour renouvellement / croissance
  const subjectsSold = survivingYoung * 0.8;
  const revenueSubjects = subjectsSold * geese.sellingPriceSubjectFcfa;

  // Vente surplus œufs de table
  const eggsSold = totalEggs * 0.2;
  const revenueEggs = eggsSold * geese.eggSellingPriceFcfa;

  const totalRevenue = revenueSubjects + revenueEggs;

  // Coûts (herbivore très économique dans le verger)
  const totalFlock = females + 1 + survivingYoung;
  const totalExpenses =
    totalFlock * (geese.feedCostAnnualPerSubjectFcfa + geese.careCostAnnualPerSubjectFcfa);

  const netMargin = totalRevenue - totalExpenses;
  const marginPercent = totalRevenue > 0 ? (netMargin / totalRevenue) * 100 : 0;

  return {
    id: 'oies',
    name: 'Élevage d\'Oies (Reproduction & Vente)',
    category: 'Élevage',
    revenueFcfa: Math.round(totalRevenue),
    expensesFcfa: Math.round(totalExpenses),
    netMarginFcfa: Math.round(netMargin),
    marginPercent: Math.round(marginPercent),
    metrics: {
      'Cheptel initial': `${females} femelles + 1 mâle`,
      'Oisons sevrés par an': Math.round(survivingYoung),
      'Prix par sujet': `${geese.sellingPriceSubjectFcfa.toLocaleString()} FCFA`,
      'Rôle écologique': 'Désherbage naturel du verger et garde sonore'
    },
    statusNote: 'DONNÉE RÉELLE (3 oies existantes). Fort potentiel de multiplication à faible coût.'
  };
}

export function computeFishFarmingFinancials(
  fish: FishFarmingData,
  scenario: ScenarioType = 'central',
  enabled: boolean = false
): ModuleFinancialSummary {
  if (!enabled && !fish.enabled) {
    return {
      id: 'pisciculture',
      name: 'Pisciculture Hors-Sol (Tilapia/Silure)',
      category: 'Aquaculture',
      revenueFcfa: 0,
      expensesFcfa: 0,
      netMarginFcfa: 0,
      marginPercent: 0,
      metrics: {
        Statut: 'Désactivé (Projet futur)',
        'Potentiel annuel': '2 tonnes de poisson frais',
        'Investissement requis': formatCurrency(fish.infrastructureCostFcfa, 'FCFA', true)
      },
      statusNote: 'Option activable pour diversification à haute rentabilité'
    };
  }

  let mult = scenario === 'prudent' ? 0.88 : scenario === 'dynamique' ? 1.12 : 1;

  const harvestedCount = fish.fingerlingsCount * (fish.survivalRatePercent / 100);
  const totalWeightKg = harvestedCount * fish.averageWeightKg * mult;
  const totalRevenue = totalWeightKg * fish.sellingPricePerKgFcfa;

  const fingerlingCosts = fish.fingerlingsCount * fish.fingerlingUnitCostFcfa;
  const feedCosts = totalWeightKg * fish.feedCostPerKgProducedFcfa;
  const miscCosts = 250000; // Énergie & maintenance aérateurs
  const totalExpenses = fingerlingCosts + feedCosts + miscCosts;

  const netMargin = totalRevenue - totalExpenses;
  const marginPercent = totalRevenue > 0 ? (netMargin / totalRevenue) * 100 : 0;

  return {
    id: 'pisciculture',
    name: 'Pisciculture Hors-Sol (Tilapia/Silure)',
    category: 'Aquaculture',
    revenueFcfa: Math.round(totalRevenue),
    expensesFcfa: Math.round(totalExpenses),
    netMarginFcfa: Math.round(netMargin),
    marginPercent: Math.round(marginPercent),
    metrics: {
      'Volume d\'élevage': `${fish.pondVolumeM3} m³ (2 bassins)`,
      'Production annuelle': `${Math.round(totalWeightKg)} kg de poisson frais`,
      'Cycles par an': '2 cycles de 6 mois',
      'Synergie': 'Eau fertilisante riche en nutriments recyclée dans le verger'
    },
    statusNote: 'HYPOTHÈSE : Système aquaponique intégré avec rejet vers l\'irrigation'
  };
}

export function computeIncubatorFinancials(
  incubator: IncubatorData,
  scenario: ScenarioType = 'central',
  enabled: boolean = false
): ModuleFinancialSummary {
  if (!enabled && !incubator.enabled) {
    return {
      id: 'couveuse',
      name: 'Couveuse Industrielle Automatique',
      category: 'Élevage',
      revenueFcfa: 0,
      expensesFcfa: 0,
      netMarginFcfa: 0,
      marginPercent: 0,
      metrics: {
        Statut: 'Désactivé (Projet futur)',
        'Capacité d\'œufs': `${incubator.capacityEggs} œufs/cycle`,
        'Investissement': formatCurrency(incubator.investmentCostFcfa, 'FCFA', true)
      },
      statusNote: 'Outil transversal d\'éclosion pour poules locales, pintades, dindons et oies'
    };
  }

  // Prestations de service + poussins propres
  const annualCycles = incubator.cyclesPerMonth * 12;
  const totalEggsIncubated = incubator.capacityEggs * annualCycles * 0.75; // 75% taux remplissage
  const revenueService = totalEggsIncubated * incubator.serviceIncubationFeePerEggFcfa;
  const youngProduced = totalEggsIncubated * (incubator.hatchingRatePercent / 100);
  const revenueChicksSale = youngProduced * 0.3 * 800; // 30% vente de poussins propres
  const totalRevenue = revenueService + revenueChicksSale;

  const totalExpenses =
    incubator.electricityMonthlyCostFcfa * 12 + incubator.maintenanceAnnualCostFcfa;

  const netMargin = totalRevenue - totalExpenses;
  const marginPercent = totalRevenue > 0 ? (netMargin / totalRevenue) * 100 : 0;

  return {
    id: 'couveuse',
    name: 'Couveuse Industrielle Automatique',
    category: 'Élevage',
    revenueFcfa: Math.round(totalRevenue),
    expensesFcfa: Math.round(totalExpenses),
    netMarginFcfa: Math.round(netMargin),
    marginPercent: Math.round(marginPercent),
    metrics: {
      'Capacité': `${incubator.capacityEggs} œufs`,
      'Taux d\'éclosion': `${incubator.hatchingRatePercent}%`,
      'Cycles annuels': `${Math.round(annualCycles)} cycles`,
      'Poussins produits': `${Math.round(youngProduced)} sujets/an`
    },
    statusNote: 'HYPOTHÈSE : Hub d\'incubation pour la ferme et les éleveurs de la zone'
  };
}

export function computeProjectionsTimeline(
  baseAnalysis: GlobalFinancialAnalysis,
  futureHectares: number = 10
): YearProjectionSummary[] {
  // Projections 0, 1, 3, 5, 10, 20 ans
  return [
    {
      year: 0,
      label: 'Année 0 — Situation Initiale',
      hectares: 1.0,
      revenueFcfa: 2800000, // Vente brute actuelle orangers et manguiers sans irrigation optimisée
      operatingExpensesFcfa: 1100000,
      netResultFcfa: 1700000,
      investmentsFcfa: 0,
      cumulativeCashflowFcfa: 1700000,
      roiPercent: 0,
      activitiesCount: 3,
      keyMilestones: [
        'Terrain de 1 hectare disponible et sécurisé',
        'Forage d\'eau existant fonctionnel',
        '90 orangers & 20 manguiers en place',
        'Petit noyau de 3 oies',
        '1 000 m² cultivables non aménagés'
      ]
    },
    {
      year: 1,
      label: 'Année 1 — Optimisation & Déploiement Avicole',
      hectares: 1.0,
      revenueFcfa: baseAnalysis.annualRevenueFcfa,
      operatingExpensesFcfa: baseAnalysis.annualExpensesFcfa,
      netResultFcfa: baseAnalysis.netAnnualMarginFcfa,
      investmentsFcfa: 14500000, // Forage rénové, goutte-à-goutte, poulailler 2000, clôture, logement
      cumulativeCashflowFcfa: baseAnalysis.netAnnualMarginFcfa - 14500000,
      roiPercent: Math.round((baseAnalysis.netAnnualMarginFcfa / 14500000) * 100),
      activitiesCount: 6,
      keyMilestones: [
        'Installation pompage solaire et château d\'eau 5 000L',
        'Réseau d\'irrigation goutte-à-goutte sur 1 hectare',
        'Construction bâtiment poulailler 2 000 poules',
        'Mise en culture des 1 000 m² (oignon, piment, gombo)',
        'Construction logement exploitant pour présence 24/7'
      ]
    },
    {
      year: 3,
      label: 'Année 3 — Stabilisation, Couveuse & Pisciculture',
      hectares: 1.0,
      revenueFcfa: Math.round(baseAnalysis.annualRevenueFcfa * 1.35),
      operatingExpensesFcfa: Math.round(baseAnalysis.annualExpensesFcfa * 1.25),
      netResultFcfa: Math.round(baseAnalysis.netAnnualMarginFcfa * 1.5),
      investmentsFcfa: 4000000, // Couveuse + 2 bassins piscicoles + extension solaire
      cumulativeCashflowFcfa: Math.round(baseAnalysis.netAnnualMarginFcfa * 2.2 - 14500000),
      roiPercent: 125,
      activitiesCount: 9,
      keyMilestones: [
        'Autonomie complète en poussins grâce à la couveuse (1 056 œufs)',
        'Installation de 2 bassins piscicoles circulaires (Tilapia/Silure)',
        'Eau fertilisante des poissons recyclée vers le verger',
        'Cheptel d\'oies et canards stabilisé (vente régulière de reproducteurs)',
        'Remboursement intégral de l\'investissement initial'
      ]
    },
    {
      year: 5,
      label: 'Année 5 — Acquisition Nouvelles Terres & Séchage Solaire',
      hectares: 3.5,
      revenueFcfa: Math.round(baseAnalysis.annualRevenueFcfa * 2.8),
      operatingExpensesFcfa: Math.round(baseAnalysis.annualExpensesFcfa * 2.3),
      netResultFcfa: Math.round(baseAnalysis.netAnnualMarginFcfa * 3.4),
      investmentsFcfa: 12000000, // Acquisition 2,5 ha supplémentaires + séchoir solaire + second poulailler
      cumulativeCashflowFcfa: Math.round(baseAnalysis.netAnnualMarginFcfa * 6.5),
      roiPercent: 190,
      activitiesCount: 11,
      keyMilestones: [
        'Acquisition de 2,5 hectares supplémentaires attenants',
        'Doublement de la capacité avicole à 4 000 poules',
        'Atelier de séchage solaire de mangues et d\'épices',
        'Création d\'un point de vente direct demi-gros',
        'Équipe de 6 employés permanents formés'
      ]
    },
    {
      year: 10,
      label: 'Année 10 — Exploitation Structurée & Transformation',
      hectares: Math.max(futureHectares, 8.0),
      revenueFcfa: Math.round(baseAnalysis.annualRevenueFcfa * 6.5),
      operatingExpensesFcfa: Math.round(baseAnalysis.annualExpensesFcfa * 5.2),
      netResultFcfa: Math.round(baseAnalysis.netAnnualMarginFcfa * 8.2),
      investmentsFcfa: 25000000, // Unité de jus de fruits, fabrique d'aliments fermière, véhicules
      cumulativeCashflowFcfa: Math.round(baseAnalysis.netAnnualMarginFcfa * 24),
      roiPercent: 320,
      activitiesCount: 14,
      keyMilestones: [
        'Exploitation étendue sur 8 à 10 hectares arborés et maraîchers',
        'Unité artisanale de pasteurisation et mise en bouteille de jus d\'oranges et mangues',
        'Mini-broyerie pour fabriquer son propre aliment volaille (forte baisse des charges)',
        'Flotte de transport et livraison directe aux supermarchés et hôtels de Bamako',
        'Marque agricole reconnue pour sa qualité sanitaire certifiée'
      ]
    },
    {
      year: 20,
      label: 'Année 20 — Vision Agro-Industrielle Intégrée',
      hectares: 25.0,
      revenueFcfa: Math.round(baseAnalysis.annualRevenueFcfa * 18.0),
      operatingExpensesFcfa: Math.round(baseAnalysis.annualExpensesFcfa * 13.5),
      netResultFcfa: Math.round(baseAnalysis.netAnnualMarginFcfa * 24.0),
      investmentsFcfa: 75000000,
      cumulativeCashflowFcfa: Math.round(baseAnalysis.netAnnualMarginFcfa * 95),
      roiPercent: 650,
      activitiesCount: 18,
      keyMilestones: [
        'Groupe agro-industriel de référence au Mali et dans la sous-région UEMOA',
        'Réseau de 50 producteurs villageois sous contrat approvisionnant l\'usine',
        'Exportation de mangues séchées certifiées bio vers l\'Europe et le Maghreb',
        'Centre de formation pratique pour les jeunes agriculteurs maliens',
        'Patrimoine foncier et productif pérenne transmis aux générations futures'
      ]
    }
  ];
}

export function calculateGlobalFinancials(
  orangers: TreeModuleData,
  manguiers: TreeModuleData,
  cropParcels: CropParcel[],
  companionCrops: CompanionCrop[],
  hens: LayingHensData,
  geese: GeeseData,
  fish: FishFarmingData,
  incubator: IncubatorData,
  infrastructures: InfrastructureItem[],
  customActivities: CustomActivity[],
  simulation: SimulationState
): GlobalFinancialAnalysis {
  const scenario = simulation.scenario;

  const mOrangers = computeTreeFinancials(orangers, scenario, simulation.orangeTreeCount);
  const mManguiers = computeTreeFinancials(manguiers, scenario, simulation.mangoTreeCount);
  const mCrops = computeCropsFinancials(
    cropParcels,
    scenario,
    simulation.marketGardenAreaM2 / 1000
  );
  const mCompanion = computeCompanionCropsFinancials(companionCrops, scenario);
  const mHens = computeLayingHensFinancials(
    hens,
    scenario,
    simulation.hensCount,
    simulation.layingRatePercent,
    simulation.eggTrayPriceFcfa,
    simulation.feedBagPriceFcfa
  );
  const mGeese = computeGeeseFinancials(geese, scenario, simulation.geeseFemaleCount);
  const mFish = computeFishFarmingFinancials(fish, scenario, simulation.fishFarmingEnabled);
  const mIncubator = computeIncubatorFinancials(
    incubator,
    scenario,
    simulation.incubatorEnabled
  );

  const customModules: ModuleFinancialSummary[] = customActivities.map((act) => {
    const rev = act.annualRevenueFcfa;
    const exp = act.annualCostsFcfa;
    const net = rev - exp;
    return {
      id: act.id,
      name: act.name,
      category: act.category.charAt(0).toUpperCase() + act.category.slice(1),
      revenueFcfa: rev,
      expensesFcfa: exp,
      netMarginFcfa: net,
      marginPercent: rev > 0 ? (net / rev) * 100 : 0,
      metrics: {
        Démarrage: `Année ${act.startYear}`,
        Investissement: formatCurrency(act.initialInvestmentFcfa, 'FCFA', true),
        Description: act.description
      },
      statusNote: act.status
    };
  });

  const allModules = [
    mOrangers,
    mManguiers,
    mCrops,
    mCompanion,
    mHens,
    mGeese,
    mFish,
    mIncubator,
    ...customModules
  ];

  const annualRevenueFcfa = allModules.reduce((acc, m) => acc + m.revenueFcfa, 0);
  const annualExpensesFcfa = allModules.reduce((acc, m) => acc + m.expensesFcfa, 0);
  const netAnnualMarginFcfa = annualRevenueFcfa - annualExpensesFcfa;
  const netMarginPercent =
    annualRevenueFcfa > 0 ? (netAnnualMarginFcfa / annualRevenueFcfa) * 100 : 0;

  // Calcul investissements initiaux (Année 1)
  const totalInitialInvestmentsFcfa = infrastructures
    .filter((inf) => inf.status !== 'EXISTANT' && inf.plannedYear <= 1)
    .reduce((acc, inf) => acc + inf.estimatedCostFcfa, 0);

  const paybackPeriodYears =
    netAnnualMarginFcfa > 0
      ? totalInitialInvestmentsFcfa / netAnnualMarginFcfa
      : 99;

  const breakEvenMonthlyRevenueFcfa = annualExpensesFcfa / 12;

  // Répartition par catégorie
  const revByCategoryMap: Record<string, number> = {};
  allModules.forEach((m) => {
    if (m.revenueFcfa > 0) {
      revByCategoryMap[m.category] = (revByCategoryMap[m.category] || 0) + m.revenueFcfa;
    }
  });

  const categoryColors: Record<string, string> = {
    Élevage: '#f59e0b',
    Maraîchage: '#10b981',
    Arboriculture: '#059669',
    Aquaculture: '#0284c7',
    Transformation: '#8b5cf6',
    Autre: '#64748b'
  };

  const revenueByCategory = Object.entries(revByCategoryMap).map(([name, valueFcfa]) => ({
    name,
    valueFcfa,
    color: categoryColors[name] || '#10b981'
  }));

  // Répartition des charges
  const expensesByCategory = [
    { name: 'Aliment volaille & intrants', valueFcfa: Math.round(annualExpensesFcfa * 0.62), color: '#ef4444' },
    { name: 'Main d\'œuvre & gardiennage', valueFcfa: Math.round(annualExpensesFcfa * 0.14), color: '#f97316' },
    { name: 'Santé animale & traitements', valueFcfa: Math.round(annualExpensesFcfa * 0.08), color: '#eab308' },
    { name: 'Énergie, eau & entretien', valueFcfa: Math.round(annualExpensesFcfa * 0.09), color: '#3b82f6' },
    { name: 'Emballages & transport', valueFcfa: Math.round(annualExpensesFcfa * 0.07), color: '#8b5cf6' }
  ];

  const analysisBase: GlobalFinancialAnalysis = {
    annualRevenueFcfa,
    annualExpensesFcfa,
    netAnnualMarginFcfa,
    netMarginPercent: Math.round(netMarginPercent),
    totalInitialInvestmentsFcfa,
    paybackPeriodYears: Number(paybackPeriodYears.toFixed(1)),
    breakEvenMonthlyRevenueFcfa: Math.round(breakEvenMonthlyRevenueFcfa),
    modules: allModules,
    revenueByCategory,
    expensesByCategory,
    projections: []
  };

  analysisBase.projections = computeProjectionsTimeline(analysisBase, simulation.futureHectaresTarget);

  return analysisBase;
}
