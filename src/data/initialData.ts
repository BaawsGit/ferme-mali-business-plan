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
  CustomActivity
} from '../types';

export const INITIAL_ORANGERS: TreeModuleData = {
  id: 'orangers',
  name: 'Verger d\'Orangers',
  count: 90,
  countStatus: 'REEL',
  yieldPerTreeKg: 45, // 45 kg par arbre mature (environ 250 à 300 fruits)
  yieldStatus: 'ESTIMATION',
  pricePerKgFcfa: 400, // 400 FCFA/kg prix moyen grossiste/détaillant Mali
  priceStatus: 'HYPOTHESE',
  lossRatePercent: 8,
  maintenanceCostPerTreeFcfa: 3500, // Taille, amendement fientes, traitement bio
  harvestCostPerKgFcfa: 25,
  transportCostPerKgFcfa: 30,
  harvestMonths: 'Novembre - Février',
  notes: '80 à 100 pieds existants sur le terrain. Nécessite l\'optimisation de l\'arrosage goutte-à-goutte.'
};

export const INITIAL_MANGUIERS: TreeModuleData = {
  id: 'manguiers',
  name: 'Verger de Manguiers',
  count: 20,
  countStatus: 'REEL',
  yieldPerTreeKg: 120, // 120 kg/arbre pour manguiers adultes greffés (Amélie, Kent, Keitt)
  yieldStatus: 'ESTIMATION',
  pricePerKgFcfa: 350, // Période de récolte locale
  priceStatus: 'HYPOTHESE',
  lossRatePercent: 12, // Pertes mouche des fruits à réduire par piégeage
  maintenanceCostPerTreeFcfa: 6000,
  harvestCostPerKgFcfa: 20,
  transportCostPerKgFcfa: 30,
  harvestMonths: 'Avril - Juillet',
  notes: '20 pieds adultes existants. Production de mangues valorisable en frais ou séchée.'
};

export const INITIAL_CROP_PARCELS: CropParcel[] = [
  {
    id: 'oignon-galmi',
    name: 'Oignon Violet de Galmi',
    areaM2: 500,
    cycleDays: 110,
    yieldKgPerM2: 3.2,
    pricePerKgFcfa: 450,
    seedCostFcfa: 25000,
    fertilizerCostFcfa: 35000,
    treatmentCostFcfa: 15000,
    laborCostFcfa: 40000,
    irrigationCostFcfa: 18000,
    transportCostFcfa: 20000,
    campaignsPerYear: 2,
    status: 'ESTIMATION',
    notes: 'Très forte demande sur le marché de Bamako et marchés régionaux, excellente conservation.'
  },
  {
    id: 'piment-habanero',
    name: 'Piment Habanero / Antillais',
    areaM2: 300,
    cycleDays: 90,
    yieldKgPerM2: 1.8,
    pricePerKgFcfa: 1200,
    seedCostFcfa: 15000,
    fertilizerCostFcfa: 22000,
    treatmentCostFcfa: 12000,
    laborCostFcfa: 30000,
    irrigationCostFcfa: 12000,
    transportCostFcfa: 15000,
    campaignsPerYear: 2,
    status: 'ESTIMATION',
    notes: 'Forte valeur ajoutée au kg. Culture continue avec récoltes échelonnées.'
  },
  {
    id: 'gombo-vert',
    name: 'Gombo & Légumes Maraîchers',
    areaM2: 200,
    cycleDays: 60,
    yieldKgPerM2: 2.0,
    pricePerKgFcfa: 600,
    seedCostFcfa: 10000,
    fertilizerCostFcfa: 15000,
    treatmentCostFcfa: 8000,
    laborCostFcfa: 20000,
    irrigationCostFcfa: 10000,
    transportCostFcfa: 10000,
    campaignsPerYear: 3,
    status: 'ESTIMATION',
    notes: 'Rotation rapide, rentrées d\'argent hebdomadaires régulières.'
  }
];

export const INITIAL_COMPANION_CROPS: CompanionCrop[] = [
  {
    id: 'comp-piment',
    name: 'Piment entre les rangs d\'arbres',
    estimatedAreaM2: 250,
    annualRevenueFcfa: 480000,
    annualCostFcfa: 140000,
    status: 'ESTIMATION',
    seasonality: 'Toute l\'année sous goutte-à-goutte'
  },
  {
    id: 'comp-gombo',
    name: 'Gombo en bandes intercalaires',
    estimatedAreaM2: 200,
    annualRevenueFcfa: 360000,
    annualCostFcfa: 110000,
    status: 'ESTIMATION',
    seasonality: 'Hivernage et contre-saison'
  },
  {
    id: 'comp-aromates',
    name: 'Herbes aromatiques (Menthe, Basilic, Persil)',
    estimatedAreaM2: 150,
    annualRevenueFcfa: 290000,
    annualCostFcfa: 75000,
    status: 'ESTIMATION',
    seasonality: 'Production continue fraîche pour marchés urbains'
  }
];

export const INITIAL_LAYING_HENS: LayingHensData = {
  subjectCount: 2000,
  chickPriceFcfa: 650, // Poussin ponte d'un jour vacciné
  coopBuildingCostFcfa: 6500000, // Bâtiment moderne semi-ouvert 200m² grillagé et aéré
  equipmentCostFcfa: 1800000, // Mangeoires, abreuvoirs automatiques linéaires, pondoirs
  layingRatePercent: 82, // Taux moyen annuel de ponte
  eggPricePerTrayFcfa: 2400, // Plateau de 30 œufs (80 FCFA l'œuf en gros)
  dailyFeedGramPerSubject: 115, // 115g/jour par poule
  feedBagPrice50KgFcfa: 17500, // Sac aliment ponte 50kg Mali (350 FCFA/kg)
  mortalityRatePercent: 6, // Mortalité annuelle avec bon suivi véto
  vetCostPerSubjectYearFcfa: 400, // Vaccins gumboro, newcastle, vermifuges, vitamines
  staffMonthlySalaryFcfa: 60000, // 2 ouvriers avicoles formés (120 000 FCFA/mois total)
  staffCount: 2,
  waterElectricityMonthlyFcfa: 30000,
  packagingCostPerTrayFcfa: 120, // Plateau alvéole carton
  transportCostMonthlyFcfa: 40000, // Livraison marchés Bamako/villes proches
  culledHenPriceFcfa: 2500, // Prix vente poule de réforme après 14 mois de ponte
  culledHenSurvivalPercent: 94,
  manureBagCountAnnual: 350, // 350 sacs de fientes valorisés
  manureBagPriceFcfa: 1500, // Réutilisé pour le verger et vendu aux maraîchers
  status: 'ESTIMATION'
};

export const INITIAL_GEESE: GeeseData = {
  initialFemales: 2,
  initialMales: 1,
  eggsPerFemaleYear: 35,
  hatchingRatePercent: 65,
  mortalityRatePercent: 12,
  sellingPriceSubjectFcfa: 18000, // Prix d'une belle oie adulte au Mali
  eggSellingPriceFcfa: 1000,
  feedCostAnnualPerSubjectFcfa: 6000, // Herbivore, valorise l'herbe du verger + complément
  careCostAnnualPerSubjectFcfa: 1500,
  status: 'REEL'
};

export const INITIAL_DUCKS: DucksData = {
  enabled: false,
  startYear: 2,
  initialCount: 20, // 15 canes + 5 canards reproducteurs
  annualProductionSubjects: 180,
  sellingPriceSubjectFcfa: 5000,
  feedAndCareCostPerSubjectFcfa: 2200,
  status: 'HYPOTHESE'
};

export const INITIAL_LOCAL_CHICKENS: LocalChickenData = {
  enabled: false,
  startYear: 2,
  breederCount: 50,
  chicksProducedPerYear: 800,
  chickSellingPriceFcfa: 1200,
  adultSellingPriceFcfa: 3500,
  feedAndCareCostAnnualFcfa: 650000,
  status: 'HYPOTHESE'
};

export const INITIAL_INCUBATOR: IncubatorData = {
  enabled: false,
  capacityEggs: 1056,
  cyclesPerMonth: 1.4,
  hatchingRatePercent: 78,
  serviceIncubationFeePerEggFcfa: 100,
  electricityMonthlyCostFcfa: 20000,
  maintenanceAnnualCostFcfa: 50000,
  investmentCostFcfa: 1200000, // Couveuse automatique solaire/secteur
  status: 'HYPOTHESE'
};

export const INITIAL_FISH_FARMING: FishFarmingData = {
  enabled: false,
  pondVolumeM3: 60, // 2 bassins hors-sol circulaires en bâche armée de 30m³
  fingerlingsCount: 4000, // 2 cycles de 2000 alevins Tilapia / Silure Clarias
  survivalRatePercent: 85,
  growthDurationMonths: 6,
  averageWeightKg: 0.5, // 500g par poisson
  sellingPricePerKgFcfa: 2200, // Prix du poisson frais au Mali
  fingerlingUnitCostFcfa: 125,
  feedCostPerKgProducedFcfa: 900,
  infrastructureCostFcfa: 2800000, // Bassins, tuyauterie, aérateurs solaires
  status: 'HYPOTHESE'
};

export const INITIAL_HOUSING: HousingData = {
  planned: true,
  targetYear: 1,
  estimatedCostFcfa: 3500000,
  description: 'Logement exploitant sur site : chambre, salon, salle d\'eau moderne, véranda, alimentation solaire. Sécurise la surveillance H24.',
  status: 'A_CONSTRUIRE'
};

export const INITIAL_INFRASTRUCTURES: InfrastructureItem[] = [
  {
    id: 'infra-forage',
    name: 'Forage d\'eau existant',
    category: 'Hydraulique',
    estimatedCostFcfa: 0,
    priority: 'HAUTE',
    plannedYear: 0,
    status: 'EXISTANT',
    description: 'Point d\'eau déjà fonctionnel sur le site. Atout maître de l\'exploitation.',
    sourceHypothesis: 'Donnée réelle existante sur la parcelle.'
  },
  {
    id: 'infra-pompe-solaire',
    name: 'Pompage solaire & Château d\'eau (5 000L)',
    category: 'Hydraulique',
    estimatedCostFcfa: 2200000,
    priority: 'HAUTE',
    plannedYear: 1,
    status: 'A_REAMENAGER',
    description: 'Remplacement de la pompe thermique/usée par pompe solaire submersible + cuve 5m³ surélevée pour pression gravitaire.',
    sourceHypothesis: 'Devis standard équipementier solaire Bamako 2025.'
  },
  {
    id: 'infra-goutte-a-goutte',
    name: 'Réseau d\'irrigation goutte-à-goutte (1 ha)',
    category: 'Irrigation',
    estimatedCostFcfa: 1400000,
    priority: 'HAUTE',
    plannedYear: 1,
    status: 'A_ACHETER',
    description: 'Lignes de tuyaux PE, goutteurs autorégulants pour vergers (orangers, manguiers) et rampes pour les 1 000 m² maraîchers.',
    sourceHypothesis: 'Estimation kits d\'irrigation localisé importés.'
  },
  {
    id: 'infra-cloture',
    name: 'Clôture grillagée & haie vive épineuse (périmètre 400m)',
    category: 'Sécurité',
    estimatedCostFcfa: 1800000,
    priority: 'HAUTE',
    plannedYear: 1,
    status: 'A_CONSTRUIRE',
    description: 'Protection contre la divagation des animaux du voisinage et sécurité des récoltes/matériel.',
    sourceHypothesis: 'Grillage galvanisé + piquets béton + main-d\'œuvre.'
  },
  {
    id: 'infra-poulailler',
    name: 'Bâtiment avicole bio-sécurisé (2 000 poules)',
    category: 'Élevage',
    estimatedCostFcfa: 6500000,
    priority: 'HAUTE',
    plannedYear: 1,
    status: 'A_CONSTRUIRE',
    description: 'Bâtiment semi-ouvert 200m², toiture isolée bac acier, grillage anti-moineaux, pédiluve, éclairage régulé.',
    sourceHypothesis: 'Standard vétérinaire avicole tropical Ouest-Africain.'
  },
  {
    id: 'infra-equip-avicole',
    name: 'Équipements avicoles & batteries/pondoirs',
    category: 'Élevage',
    estimatedCostFcfa: 1800000,
    priority: 'HAUTE',
    plannedYear: 1,
    status: 'A_ACHETER',
    description: 'Mangeoires trémies, pipettes abreuvoirs, pondoirs collectifs avec tapis de ponte hygiénique.',
    sourceHypothesis: 'Matériel importé chez distributeur Bamako.'
  },
  {
    id: 'infra-logement',
    name: 'Logement de fonction pour l\'exploitant',
    category: 'Habitation',
    estimatedCostFcfa: 3500000,
    priority: 'MOYENNE',
    plannedYear: 1,
    status: 'A_CONSTRUIRE',
    description: 'Chambre confortable, salle de bain, bureau de gestion, cuisine, électricité solaire.',
    sourceHypothesis: 'Construction en briques de terre stabilisée / béton.'
  },
  {
    id: 'infra-magasin',
    name: 'Magasin de stockage & local phytosanitaire / œufs',
    category: 'Bâtiment',
    estimatedCostFcfa: 1500000,
    priority: 'MOYENNE',
    plannedYear: 2,
    status: 'A_CONSTRUIRE',
    description: 'Local frais et ventilé pour stockage des plateaux d\'œufs, aliments, semences et outils.',
    sourceHypothesis: 'Estimation maçonnerie 30m² sécurisée.'
  },
  {
    id: 'infra-couveuse',
    name: 'Couveuse industrielle automatique (1 056 œufs)',
    category: 'Élevage',
    estimatedCostFcfa: 1200000,
    priority: 'MOYENNE',
    plannedYear: 2,
    status: 'PROJET_FUTUR',
    description: 'Incubateur électrique à retournement automatique avec régulation d\'hygrométrie et onduleur secours.',
    sourceHypothesis: 'Modèle homologué aviculture.'
  },
  {
    id: 'infra-pisciculture',
    name: 'Bassins piscicoles hors-sol (2 x 30m³)',
    category: 'Aquaculture',
    estimatedCostFcfa: 2800000,
    priority: 'FAIBLE',
    plannedYear: 3,
    status: 'PROJET_FUTUR',
    description: 'Bassins bâchés circulaires, pompe de recirculation, tuyauterie de vidange vers le verger (eau fertilisante).',
    sourceHypothesis: 'Kits piscicoles éprouvés au Sahel.'
  },
  {
    id: 'infra-solaire-extension',
    name: 'Centrale solaire hybride 5 kWc + batteries lithium',
    category: 'Énergie',
    estimatedCostFcfa: 3200000,
    priority: 'MOYENNE',
    plannedYear: 2,
    status: 'PROJET_FUTUR',
    description: 'Autonomie énergétique totale pour couveuse, éclairage poulailler, aérateurs poissons et logement.',
    sourceHypothesis: 'Tarif solaire photovoltaïque 2025.'
  }
];

export const INITIAL_RISKS: RiskItem[] = [
  {
    id: 'risk-1',
    title: 'Panne de forage ou baisse de la nappe phréatique',
    category: 'Climat & Eau',
    impact: 'Critique',
    probability: 'Faible',
    preventiveMeasure: 'Diagnostic de débit du forage, entretien préventif de la pompe, capteur de niveau d\'eau.',
    planB: 'Château d\'eau tampon de 5 000L offrant 48h d\'autonomie d\'urgence + raccordement camion-citerne secours.'
  },
  {
    id: 'risk-2',
    title: 'Épidémie aviaire (Newcastle, Gumboro, Coccidiose)',
    category: 'Santé Animale & Végétale',
    impact: 'Critique',
    probability: 'Moyenne',
    preventiveMeasure: 'Protocole strict de biosécurité (sas, pédiluve, tenue dédiée), calendrier vaccinal rigoureux suivi par un docteur vétérinaire.',
    planB: 'Assurance avicole ou fonds de prévoyance dédié (équivalent 2 mois d\'exploitation), isolement immédiat en case infirmerie.'
  },
  {
    id: 'risk-3',
    title: 'Hausse brutale du prix de l\'aliment volaille',
    category: 'Marché & Prix',
    impact: 'Élevé',
    probability: 'Élevée',
    preventiveMeasure: 'Contrats d\'approvisionnement à terme en maïs/soja lors des récoltes, stockage stratégique de 2 mois.',
    planB: 'Formulation locale d\'aliments à la ferme (broyage maïs + son de blé + tourteau d\'arachide/coton + drêches locales).'
  },
  {
    id: 'risk-4',
    title: 'Chute du prix de vente des œufs ou mévente saisonnière',
    category: 'Marché & Prix',
    impact: 'Élevé',
    probability: 'Moyenne',
    preventiveMeasure: 'Contrats directs avec grossistes d\'alvéoles à Bamako, hôtels, pâtisseries et demi-grossistes fiables.',
    planB: 'Transformation ou vente directe au détail sur marchés de proximité et points de vente familiaux.'
  },
  {
    id: 'risk-5',
    title: 'Pertes post-récolte sur mangues (mouches des fruits)',
    category: 'Santé Animale & Végétale',
    impact: 'Modéré',
    probability: 'Moyenne',
    preventiveMeasure: 'Pose de pièges à phéromones (méthyl-eugénol), ramassage systématique et enfouissement des fruits tombés.',
    planB: 'Séchage solaire artisanal des mangues pour vente hors-saison à haute valeur ajoutée.'
  },
  {
    id: 'risk-6',
    title: 'Divagation d\'animaux ou vols nocturnes',
    category: 'Opérationnel & Sécurité',
    impact: 'Élevé',
    probability: 'Moyenne',
    preventiveMeasure: 'Clôture périmétrique solide + présence permanente d\'un exploitant logé sur place + chiens de garde + projecteurs solaires.',
    planB: 'Rondes de nuit et relations de bon voisinage avec le village local.'
  },
  {
    id: 'risk-7',
    title: 'Tension de trésorerie au démarrage des poules (mois 1 à 5)',
    category: 'Finances',
    impact: 'Élevé',
    probability: 'Moyenne',
    preventiveMeasure: 'Budgéter l\'alimentation des poulettes jusqu\'à l\'entrée en ponte (semaine 20) dans l\'investissement initial.',
    planB: 'Utilisation des flux de trésorerie rapides du maraîchage (gombo, piment récolté tous les 60 jours) pour financer le fonds de roulement.'
  }
];

export const INITIAL_CHECKLIST: InvestmentChecklistItem[] = [
  { id: 'chk-1', title: 'Diagnostic technique & test de débit du forage existant', category: 'Eau', costEstimateFcfa: 150000, done: true, priority: 'Obligatoire', notes: 'Forage fonctionnel, eau abondante confirmée.' },
  { id: 'chk-2', title: 'Achat et installation pompe solaire submersible + coffret', category: 'Eau', costEstimateFcfa: 1600000, done: false, priority: 'Obligatoire', notes: 'Devis à finaliser pour panneaux + pompe 3m³/h.' },
  { id: 'chk-3', title: 'Construction support métallique et cuve château d\'eau 5 000 L', category: 'Eau', costEstimateFcfa: 600000, done: false, priority: 'Obligatoire', notes: 'Hauteur 4m pour pression gravitaire.' },
  { id: 'chk-4', title: 'Pose du réseau goutte-à-goutte orangers et manguiers', category: 'Irrigation', costEstimateFcfa: 800000, done: false, priority: 'Obligatoire', notes: 'Tuyaux PE 16mm + goutteurs 4L/h.' },
  { id: 'chk-5', title: 'Installation rampe d\'irrigation 1 000 m² cultures maraîchères', category: 'Irrigation', costEstimateFcfa: 600000, done: false, priority: 'Obligatoire', notes: 'Vannes de sectorisation pour chaque planche.' },
  { id: 'chk-6', title: 'Clôture périmétrique grillagée (400 mètres linéaires)', category: 'Sécurité', costEstimateFcfa: 1800000, done: false, priority: 'Obligatoire', notes: 'Indispensable avant le lâcher d\'animaux.' },
  { id: 'chk-7', title: 'Construction du bâtiment poulailler 2 000 poules', category: 'Élevage', costEstimateFcfa: 6500000, done: false, priority: 'Obligatoire', notes: '200 m² couvert semi-grillagé.' },
  { id: 'chk-8', title: 'Achat mangeoires, abreuvoirs automatiques & pondoirs', category: 'Élevage', costEstimateFcfa: 1800000, done: false, priority: 'Obligatoire', notes: 'Matériel durable anticorrosion.' },
  { id: 'chk-9', title: 'Construction logement exploitant (chambre, SDB, cuisine)', category: 'Habitation', costEstimateFcfa: 3500000, done: false, priority: 'Recommandé', notes: 'Permet une présence permanente sur site.' },
  { id: 'chk-10', title: 'Commande lot 2 000 poussins pondeuses + vaccins départ', category: 'Élevage', costEstimateFcfa: 1300000, done: false, priority: 'Obligatoire', notes: 'Fournisseur réputé à réserver 4 semaines à l\'avance.' },
  { id: 'chk-11', title: 'Aménagement enclos abrité pour les oies et canards', category: 'Élevage', costEstimateFcfa: 400000, done: false, priority: 'Recommandé', notes: 'Point d\'eau et abri herbeux sous les arbres.' },
  { id: 'chk-12', title: 'Acquisition couveuse automatique solaire 1 000 œufs', category: 'Élevage', costEstimateFcfa: 1200000, done: false, priority: 'Extension future', notes: 'Programmé en Année 2.' },
  { id: 'chk-13', title: 'Installation 2 bassins piscicoles hors-sol 30m³', category: 'Aquaculture', costEstimateFcfa: 2800000, done: false, priority: 'Extension future', notes: 'Programmé en Année 3.' }
];

export const INITIAL_CUSTOM_ACTIVITIES: CustomActivity[] = [
  {
    id: 'act-compostage',
    name: 'Production & Valorisation de Compost Bio',
    category: 'transformation',
    description: 'Recyclage des fientes de poules + feuilles d\'orangers et manguiers + paillage pour régénérer les sols sans engrais chimiques coûteux.',
    startYear: 1,
    initialInvestmentFcfa: 250000,
    annualRevenueFcfa: 525000, // Économie d\'engrais achetés + surplus vendu aux maraîchers
    annualCostsFcfa: 80000,
    status: 'ESTIMATION'
  },
  {
    id: 'act-sechage-mangues',
    name: 'Atelier de Séchage Solaire de Mangues',
    category: 'transformation',
    description: 'Deux séchoirs solaires artisanaux pour transformer les mangues invendues en tranches séchées conditionnées en sachets hermétiques.',
    startYear: 2,
    initialInvestmentFcfa: 650000,
    annualRevenueFcfa: 1400000,
    annualCostsFcfa: 350000,
    status: 'HYPOTHESE'
  }
];
