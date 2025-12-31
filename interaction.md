# Interactions de la Boutique Mont Sion

## Navigation Principale

1. **Page d'accueil**
   - Deux boutons centraux : "Voir les Catégories" et "Administrateur"
   - Animation au clic avec barre de progression

2. **Bouton Voir les Catégories**
   - Affiche une barre de chargement animée (2-3 secondes)
   - Redirige vers la page des catégories
   - Barre de progression avec pourcentage et animation fluide

3. **Bouton Administrateur**
   - Ouvre un modal de connexion admin
   - Formulaire d'ajout d'articles avec upload photo
   - Champs : Photo, Nom, Catégorie (dropdown), Prix
   - Bouton de validation avec animation de succès

## Système de Gestion des Articles

1. **Ajout d'articles**
   - Upload de photo avec aperçu
   - Validation des champs en temps réel
   - Animation de confirmation après ajout
   - Stockage local des articles

2. **Affichage des catégories**
   - Page avec 3 sections : Homme, Femme, Enfants
   - Grid layout responsive pour les articles
   - Chaque article affiche : photo, nom, prix
   - Bouton "Commander" sur chaque article

3. **Commande via WhatsApp**
   - Au clic sur "Commander" : ouvre WhatsApp avec message pré-rempli
   - Message contient : nom de l'article, prix, catégorie
   - Numéro : +22967924076
   - Animation de transition

## Animations et Effets

1. **Barre de chargement**
   - Progress bar animée avec pourcentage
   - Couleurs dégradées dorées
   - Effet de shimmer pendant le chargement

2. **Hover effects**
   - Boutons : zoom léger et changement de couleur
   - Articles : lévation de la card et ombre
   - Images : zoom subtil au survol

3. **Transitions de pages**
   - Fade in/out entre les pages
   - Slide animations pour les modals
   - Reveal animations au scroll

## Structure des Données

- Articles stockés dans localStorage
- Structure : {id, nom, categorie, prix, image}
- Catégories : Homme, Femme, Enfants
- Validation des données avant l'affichage