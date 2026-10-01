export type DataStatus = 'REEL' | 'ESTIMATION' | 'HYPOTHESE' | 'A_CONFIRMER';

export type ScenarioType = 'prudent' | 'central' | 'dynamique';

export type ActivityCategory = 
  | 'arboriculture'
  | 'maraichage'
  | 'elevage'
  | 'aquaculture'
  | 'transformation'
  | 'infrastructure'
  | 'autre';

export type InfraStatus = 'EXISTANT' | 'A_REAMENAGER' | 'A_ACHETER' | 'A_CONSTRUIRE' | 'PROJET_FUTUR';

export interface TreeModuleData {
  id: string;
  name: string;
  count: number;
  countStatus: DataStatus;
  yieldPerTreeKg: number;
  yieldStatus: DataStatus;
  pricePerKgFcfa: number;
  priceStatus: DataStatus;
  lossRatePercent: number;
  maintenanceCostPerTreeFcfa: number;
  harvestCostPerKgFcfa: number;
  transportCostPerKgFcfa: number;
  harvestMonths: string;
  notes: string;
}

export interface CropParcel {
  id: string;
  name: string;
  areaM2: number;
  cycleDays: number;
  yieldKgPerM2: number;
  pricePerKgFcfa: number;
  seedCostFcfa: number;
  fertilizerCostFcfa: number;
  treatmentCostFcfa: number;
  laborCostFcfa: number;
  irrigationCostFcfa: number;
  transportCostFcfa: number;
  campaignsPerYear: number;
  status: DataStatus;
  notes: string;
}

export interface CompanionCrop {
  id: string;
  name: string;
  estimatedAreaM2: number;
  annualRevenueFcfa: number;
  annualCostFcfa: number;
  status: DataStatus;
  seasonality: string;
}

export interface LayingHensData {
  subjectCount: number;
  chickPriceFcfa: number;
  coopBuildingCostFcfa: number;
  equipmentCostFcfa: number;
  layingRatePercent: number;
  eggPricePerTrayFcfa: number; // Plateau de 30 œufs
  dailyFeedGramPerSubject: number;
  feedBagPrice50KgFcfa: number;
  mortalityRatePercent: number;
  vetCostPerSubjectYearFcfa: number;
  staffMonthlySalaryFcfa: number;
  staffCount: number;
  waterElectricityMonthlyFcfa: number;
  packagingCostPerTrayFcfa: number;
  transportCostMonthlyFcfa: number;
  culledHenPriceFcfa: number;
  culledHenSurvivalPercent: number;
  manureBagCountAnnual: number;
  manureBagPriceFcfa: number;
  status: DataStatus;
}

export interface GeeseData {
  initialFemales: number;
  initialMales: number;
  eggsPerFemaleYear: number;
  hatchingRatePercent: number;
  mortalityRatePercent: number;
  sellingPriceSubjectFcfa: number;
  eggSellingPriceFcfa: number;
  feedCostAnnualPerSubjectFcfa: number;
  careCostAnnualPerSubjectFcfa: number;
  status: DataStatus;
}

export interface DucksData {
  enabled: boolean;
  startYear: number;
  initialCount: number;
  annualProductionSubjects: number;
  sellingPriceSubjectFcfa: number;
  feedAndCareCostPerSubjectFcfa: number;
  status: DataStatus;
}

export interface LocalChickenData {
  enabled: boolean;
  startYear: number;
  breederCount: number;
  chicksProducedPerYear: number;
  chickSellingPriceFcfa: number;
  adultSellingPriceFcfa: number;
  feedAndCareCostAnnualFcfa: number;
  status: DataStatus;
}

export interface IncubatorData {
  enabled: boolean;
  capacityEggs: number;
  cyclesPerMonth: number;
  hatchingRatePercent: number;
  serviceIncubationFeePerEggFcfa: number;
  electricityMonthlyCostFcfa: number;
  maintenanceAnnualCostFcfa: number;
  investmentCostFcfa: number;
  status: DataStatus;
}

export interface FishFarmingData {
  enabled: boolean;
  pondVolumeM3: number;
  fingerlingsCount: number;
  survivalRatePercent: number;
  growthDurationMonths: number;
  averageWeightKg: number;
  sellingPricePerKgFcfa: number;
  fingerlingUnitCostFcfa: number;
  feedCostPerKgProducedFcfa: number;
  infrastructureCostFcfa: number;
  status: DataStatus;
}

export interface HousingData {
  planned: boolean;
  targetYear: number;
  estimatedCostFcfa: number;
  description: string;
  status: InfraStatus;
}

export interface InfrastructureItem {
  id: string;
  name: string;
  category: string;
  estimatedCostFcfa: number;
  priority: 'HAUTE' | 'MOYENNE' | 'FAIBLE';
  plannedYear: number;
  status: InfraStatus;
  description: string;
  sourceHypothesis: string;
}

export interface CustomActivity {
  id: string;
  name: string;
  category: ActivityCategory;
  description: string;
  startYear: number;
  initialInvestmentFcfa: number;
  annualRevenueFcfa: number;
  annualCostsFcfa: number;
  imageUrl?: string;
  status: DataStatus;
}

export interface RiskItem {
  id: string;
  title: string;
  category: 'Climat & Eau' | 'Santé Animale & Végétale' | 'Marché & Prix' | 'Opérationnel & Sécurité' | 'Finances';
  impact: 'Critique' | 'Élevé' | 'Modéré';
  probability: 'Élevée' | 'Moyenne' | 'Faible';
  preventiveMeasure: string;
  planB: string;
}

export interface InvestmentChecklistItem {
  id: string;
  title: string;
  category: string;
  costEstimateFcfa: number;
  done: boolean;
  priority: 'Obligatoire' | 'Recommandé' | 'Extension future';
  notes: string;
}

export interface SimulationState {
  scenario: ScenarioType;
  orangeTreeCount: number;
  mangoTreeCount: number;
  marketGardenAreaM2: number;
  hensCount: number;
  layingRatePercent: number;
  eggTrayPriceFcfa: number;
  feedBagPriceFcfa: number;
  geeseFemaleCount: number;
  fishFarmingEnabled: boolean;
  incubatorEnabled: boolean;
  ducksEnabled: boolean;
  localChickensEnabled: boolean;
  futureHectaresTarget: number;
}
