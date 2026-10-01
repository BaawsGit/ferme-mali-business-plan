import React, { createContext, useContext, useState, useEffect } from 'react';
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
  RiskItem,
  InvestmentChecklistItem,
  CustomActivity,
  ScenarioType,
  SimulationState
} from '../types';
import {
  INITIAL_ORANGERS,
  INITIAL_MANGUIERS,
  INITIAL_CROP_PARCELS,
  INITIAL_COMPANION_CROPS,
  INITIAL_LAYING_HENS,
  INITIAL_GEESE,
  INITIAL_DUCKS,
  INITIAL_LOCAL_CHICKENS,
  INITIAL_INCUBATOR,
  INITIAL_FISH_FARMING,
  INITIAL_HOUSING,
  INITIAL_INFRASTRUCTURES,
  INITIAL_RISKS,
  INITIAL_CHECKLIST,
  INITIAL_CUSTOM_ACTIVITIES
} from '../data/initialData';
import {
  calculateGlobalFinancials,
  GlobalFinancialAnalysis
} from '../services/financialEngine';

export type UserRole = 'ADMIN' | 'CONSULTATION';

interface FarmContextType {
  // Navigation & UI state
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currency: 'FCFA' | 'EUR';
  toggleCurrency: () => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  presentationOpen: boolean;
  setPresentationOpen: (open: boolean) => void;
  addActivityModalOpen: boolean;
  setAddActivityModalOpen: (open: boolean) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  exportModalOpen: boolean;
  setExportModalOpen: (open: boolean) => void;

  // Data state
  orangers: TreeModuleData;
  setOrangers: React.Dispatch<React.SetStateAction<TreeModuleData>>;
  manguiers: TreeModuleData;
  setManguiers: React.Dispatch<React.SetStateAction<TreeModuleData>>;
  cropParcels: CropParcel[];
  setCropParcels: React.Dispatch<React.SetStateAction<CropParcel[]>>;
  companionCrops: CompanionCrop[];
  setCompanionCrops: React.Dispatch<React.SetStateAction<CompanionCrop[]>>;
  hens: LayingHensData;
  setHens: React.Dispatch<React.SetStateAction<LayingHensData>>;
  geese: GeeseData;
  setGeese: React.Dispatch<React.SetStateAction<GeeseData>>;
  ducks: DucksData;
  setDucks: React.Dispatch<React.SetStateAction<DucksData>>;
  localChickens: LocalChickenData;
  setLocalChickens: React.Dispatch<React.SetStateAction<LocalChickenData>>;
  incubator: IncubatorData;
  setIncubator: React.Dispatch<React.SetStateAction<IncubatorData>>;
  fishFarming: FishFarmingData;
  setFishFarming: React.Dispatch<React.SetStateAction<FishFarmingData>>;
  housing: HousingData;
  setHousing: React.Dispatch<React.SetStateAction<HousingData>>;
  infrastructures: InfrastructureItem[];
  setInfrastructures: React.Dispatch<React.SetStateAction<InfrastructureItem[]>>;
  risks: RiskItem[];
  setRisks: React.Dispatch<React.SetStateAction<RiskItem[]>>;
  checklist: InvestmentChecklistItem[];
  setChecklist: React.Dispatch<React.SetStateAction<InvestmentChecklistItem[]>>;
  customActivities: CustomActivity[];
  addCustomActivity: (act: CustomActivity) => void;
  removeCustomActivity: (id: string) => void;
  toggleChecklistItem: (id: string) => void;

  // Simulation state
  simulation: SimulationState;
  updateSimulation: (partial: Partial<SimulationState>) => void;
  resetSimulation: () => void;
  saveSimulationAsScenario: (name: string) => void;
  scenario: ScenarioType;
  setScenario: (sc: ScenarioType) => void;
  isSimulatedModified: boolean;

  // Computed Financials
  financials: GlobalFinancialAnalysis;
}

const DEFAULT_SIMULATION: SimulationState = {
  scenario: 'central',
  orangeTreeCount: 90,
  mangoTreeCount: 20,
  marketGardenAreaM2: 1000,
  hensCount: 2000,
  layingRatePercent: 82,
  eggTrayPriceFcfa: 2400,
  feedBagPriceFcfa: 17500,
  geeseFemaleCount: 2,
  fishFarmingEnabled: false,
  incubatorEnabled: false,
  ducksEnabled: false,
  localChickensEnabled: false,
  futureHectaresTarget: 10
};

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & UI
  const [activeTab, setActiveTab] = useState<string>('accueil');
  const [currency, setCurrency] = useState<'FCFA' | 'EUR'>('FCFA');
  const [role, setRole] = useState<UserRole>('CONSULTATION');
  const [presentationOpen, setPresentationOpen] = useState<boolean>(false);
  const [addActivityModalOpen, setAddActivityModalOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);

  // Entities state
  const [orangers, setOrangers] = useState<TreeModuleData>(INITIAL_ORANGERS);
  const [manguiers, setManguiers] = useState<TreeModuleData>(INITIAL_MANGUIERS);
  const [cropParcels, setCropParcels] = useState<CropParcel[]>(INITIAL_CROP_PARCELS);
  const [companionCrops, setCompanionCrops] = useState<CompanionCrop[]>(INITIAL_COMPANION_CROPS);
  const [hens, setHens] = useState<LayingHensData>(INITIAL_LAYING_HENS);
  const [geese, setGeese] = useState<GeeseData>(INITIAL_GEESE);
  const [ducks, setDucks] = useState<DucksData>(INITIAL_DUCKS);
  const [localChickens, setLocalChickens] = useState<LocalChickenData>(INITIAL_LOCAL_CHICKENS);
  const [incubator, setIncubator] = useState<IncubatorData>(INITIAL_INCUBATOR);
  const [fishFarming, setFishFarming] = useState<FishFarmingData>(INITIAL_FISH_FARMING);
  const [housing, setHousing] = useState<HousingData>(INITIAL_HOUSING);
  const [infrastructures, setInfrastructures] = useState<InfrastructureItem[]>(INITIAL_INFRASTRUCTURES);
  const [risks, setRisks] = useState<RiskItem[]>(INITIAL_RISKS);
  const [checklist, setChecklist] = useState<InvestmentChecklistItem[]>(INITIAL_CHECKLIST);
  const [customActivities, setCustomActivities] = useState<CustomActivity[]>(INITIAL_CUSTOM_ACTIVITIES);

  // Simulation state
  const [simulation, setSimulation] = useState<SimulationState>(DEFAULT_SIMULATION);

  // Load saved state from localStorage if available
  useEffect(() => {
    try {
      const savedCustom = localStorage.getItem('agri_custom_activities');
      if (savedCustom) setCustomActivities(JSON.parse(savedCustom));

      const savedChecklist = localStorage.getItem('agri_checklist');
      if (savedChecklist) setChecklist(JSON.parse(savedChecklist));

      const savedRole = localStorage.getItem('agri_role') as UserRole;
      if (savedRole) setRole(savedRole);
    } catch {
      // LocalStorage access failure fallback
    }
  }, []);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'FCFA' ? 'EUR' : 'FCFA'));
  };

  const updateSimulation = (partial: Partial<SimulationState>) => {
    setSimulation((prev) => ({ ...prev, ...partial }));
  };

  const resetSimulation = () => {
    setSimulation(DEFAULT_SIMULATION);
  };

  const setScenario = (sc: ScenarioType) => {
    updateSimulation({ scenario: sc });
  };

  const saveSimulationAsScenario = (name: string) => {
    try {
      const stored = localStorage.getItem('agri_saved_scenarios') || '{}';
      const parsed = JSON.parse(stored);
      parsed[name] = simulation;
      localStorage.setItem('agri_saved_scenarios', JSON.stringify(parsed));
    } catch {
      // ignore
    }
  };

  const addCustomActivity = (act: CustomActivity) => {
    setCustomActivities((prev) => {
      const updated = [act, ...prev];
      try {
        localStorage.setItem('agri_custom_activities', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const removeCustomActivity = (id: string) => {
    setCustomActivities((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      try {
        localStorage.setItem('agri_custom_activities', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      );
      try {
        localStorage.setItem('agri_checklist', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const isSimulatedModified =
    simulation.hensCount !== DEFAULT_SIMULATION.hensCount ||
    simulation.layingRatePercent !== DEFAULT_SIMULATION.layingRatePercent ||
    simulation.eggTrayPriceFcfa !== DEFAULT_SIMULATION.eggTrayPriceFcfa ||
    simulation.feedBagPriceFcfa !== DEFAULT_SIMULATION.feedBagPriceFcfa ||
    simulation.orangeTreeCount !== DEFAULT_SIMULATION.orangeTreeCount ||
    simulation.mangoTreeCount !== DEFAULT_SIMULATION.mangoTreeCount ||
    simulation.marketGardenAreaM2 !== DEFAULT_SIMULATION.marketGardenAreaM2 ||
    simulation.fishFarmingEnabled !== DEFAULT_SIMULATION.fishFarmingEnabled ||
    simulation.incubatorEnabled !== DEFAULT_SIMULATION.incubatorEnabled;

  // Real-time calculation
  const financials = calculateGlobalFinancials(
    orangers,
    manguiers,
    cropParcels,
    companionCrops,
    hens,
    geese,
    fishFarming,
    incubator,
    infrastructures,
    customActivities,
    simulation
  );

  return (
    <FarmContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currency,
        toggleCurrency,
        role,
        setRole,
        presentationOpen,
        setPresentationOpen,
        addActivityModalOpen,
        setAddActivityModalOpen,
        authModalOpen,
        setAuthModalOpen,
        exportModalOpen,
        setExportModalOpen,
        orangers,
        setOrangers,
        manguiers,
        setManguiers,
        cropParcels,
        setCropParcels,
        companionCrops,
        setCompanionCrops,
        hens,
        setHens,
        geese,
        setGeese,
        ducks,
        setDucks,
        localChickens,
        setLocalChickens,
        incubator,
        setIncubator,
        fishFarming,
        setFishFarming,
        housing,
        setHousing,
        infrastructures,
        setInfrastructures,
        risks,
        setRisks,
        checklist,
        setChecklist,
        customActivities,
        addCustomActivity,
        removeCustomActivity,
        toggleChecklistItem,
        simulation,
        updateSimulation,
        resetSimulation,
        saveSimulationAsScenario,
        scenario: simulation.scenario,
        setScenario,
        isSimulatedModified,
        financials
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
