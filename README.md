# AgriMali 360° — Plan d'Affaires & Simulateur d'Exploitation Agricole Intégrée

Application web interactive conçue pour présenter, modéliser et piloter le potentiel économique et le développement multi-décennal d'une exploitation agricole familiale intégrée de **1 hectare au Mali**.

---

## 🌟 Points Forts de l'Application

1. **Compréhension en moins de 30 secondes :**
   - Où en sommes-nous ? *1 hectare sécurisé au Mali*.
   - Ce qui existe déjà (Vérifié) : *Forage d'eau fonctionnel, ~90 orangers, ~20 manguiers, 3 oies reproductrices*.
   - Ce qui est disponible : *1 000 m² cultivables + interlignes arborés*.
   - Objectif central : *Transformer progressivement 1 ha en exploitation agro-écologique rentable, autonome et extensible*.

2. **Carte 2D Pédagogique Interactive :**
   - Plan spatial orienté avec les différentes parcelles : verger d'orangers, manguiers + oies, maraîchage 1 000 m², complexe avicole de 2 000 pondeuses, station solaire de pompage, magasin, bassins de pisciculture et logement exploitant.
   - Clic sur chaque zone pour afficher sa fiche technique, sa production annuelle et sa rentabilité.

3. **Mode Présentation Interactif (10 Étapes) :**
   - Conçu spécifiquement pour être partagé avec votre frère à distance via un simple lien.
   - Parcours guidé pas à pas : situation initiale, actifs existants, maraîchage, moteur avicole, investissements nécessaires, compte de résultat, vision 5, 10 et 20 ans, et étape de simulation personnalisée directe.

4. **Simulateur Financier Non Destructif :**
   - Sliders en direct pour moduler le nombre de poules pondeuses, le taux de ponte, le prix des plateaux d'œufs, le coût des sacs d'aliment, les rendements des arbres, et les extensions futures.
   - Recalcul immédiat du Chiffre d'Affaires, des Charges, de la Marge Nette, du Seuil de Rentabilité et du Retour sur Investissement (ROI).
   - Possibilité d'enregistrer des scénarios personnalisés en mémoire locale et de réinitialiser en un clic.

5. **Gestionnaire de Parcelles Virtuelles (1 000 m²) :**
   - Jauge d'allocation de la superficie maraîchère (oignons de Galmi, piments habanero, gombo/légumes).
   - Calcul automatique de la rentabilité au mètre carré et rotation des cycles de culture.

6. **Trajectoire Stratégique 1 / 3 / 5 / 10 / 20 Ans :**
   - Timeline multi-décennale avec graphiques interactifs (Recharts) comparant CA, charges et bénéfice net, ainsi que l'évolution du patrimoine foncier de 1 ha à 25+ hectares.

7. **Extensibilité & Ajout Dynamique d'Activités :**
   - Bouton `+ Activité` pour ajouter n'importe quelle nouvelle production (apiculture, séchage solaire, transformation de jus, etc.) automatiquement intégrée dans le tableau de bord et les projections.

8. **Rigueur & Gestion des Incertitudes :**
   - Badges clairs `DONNÉE RÉELLE`, `ESTIMATION`, `HYPOTHÈSE`, `À CONFIRMER`.
   - Matrice de surveillance des risques (santé animale, alimentation, eau, climat, trésorerie) avec mesures préventives et Plans B.

---

## 🚀 Installation & Lancement Local

### Prérequis
- [Node.js](https://nodejs.org/) (version 18+ ou 20+)
- npm ou yarn

### Lancement en mode développement

```bash
# 1. Cloner ou ouvrir le répertoire du projet
cd d:/PROJETS/@@@

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur local de développement
npm run dev
```

L'application est immédiatement accessible dans votre navigateur à l'adresse :
👉 **`http://localhost:5173/`**

### Compilation pour la production

```bash
npm run build
```
Les fichiers statiques optimisés sont générés dans le dossier `dist/`.

---

## 🌐 Déploiement en Ligne (Accès à Distance pour votre Frère)

L'application est une Single Page Application (SPA) ultra-rapide et légère, prête à être déployée gratuitement en quelques clics :

### Option 1 : Déploiement sur Vercel (Recommandé)
1. Créez un compte gratuit sur [Vercel](https://vercel.com).
2. Liez votre dépôt GitHub ou installez le CLI Vercel (`npm i -g vercel`).
3. Exécutez `vercel` dans le dossier du projet : vous obtenez instantanément un lien HTTPS sécurisé partageable (ex: `https://agrimali-360.vercel.app`).

### Option 2 : Déploiement sur Netlify
1. Glissez-déposez simplement le dossier `dist/` sur [Netlify Drop](https://app.netlify.com/drop).
2. L'application est en ligne en 10 secondes avec certificat SSL gratuit.

### Option 3 : GitHub Pages
1. Ajoutez `"base": "./"` dans `vite.config.ts`.
2. Lancez `npm run build` et poussez le dossier `dist` sur la branche `gh-pages`.

---

## ⚙️ Structure du Projet

```
├── public/
│   └── images/                # Photographies haute définition générées de l'exploitation
│       ├── hero_mali_farm.jpg
│       ├── poultry_farming.jpg
│       ├── orchard_citrus_mango.jpg
│       └── fish_geese_farm.jpg
├── src/
│   ├── types/                 # Interfaces TypeScript pour l'ensemble du domaine agricole
│   │   └── index.ts
│   ├── data/                  # Données initiales vérifiées & paramètres maliens
│   │   └── initialData.ts
│   ├── services/              # Moteur de calcul financier, simulations et scénarios
│   │   └── financialEngine.ts
│   ├── context/               # Contexte React global, état de simulation & persistance
│   │   └── FarmContext.tsx
│   ├── components/            # Composants modulaires de l'interface
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── FarmMap2D.tsx
│   │   ├── ModulesOverview.tsx
│   │   ├── ParcelManager.tsx
│   │   ├── SimulatorView.tsx
│   │   ├── ProjectionsTimeline.tsx
│   │   ├── FinancialsView.tsx
│   │   ├── InfrastructuresView.tsx
│   │   ├── VisionView.tsx
│   │   ├── PresentationMode.tsx
│   │   ├── AddActivityModal.tsx
│   │   ├── AuthModal.tsx
│   │   └── ExportModal.tsx
│   ├── App.tsx                # Structure principale de navigation et pied de page
│   ├── index.css              # Feuilles de styles Tailwind et glassmorphism
│   └── main.tsx               # Point d'entrée React 18
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 🔒 Sécurité & Profils d'Accès

- **Mode Consultation (Par défaut) :**
  Idéal pour votre frère, partenaires et visiteurs. Permet d'explorer toutes les données, de manipuler les curseurs du simulateur et de tester tous les scénarios sans risque de modifier la base officielle du projet.
- **Mode Administrateur :**
  Accessible en cliquant sur le badge en haut à droite (Code PIN par défaut : `1234`). Permet d'enregistrer de nouvelles hypothèses, d'ajouter des activités personnalisées et de mettre à jour le statut des investissements.
