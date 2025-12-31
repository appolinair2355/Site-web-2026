# Mont Sion - Boutique de Luxe

Une boutique en ligne élégante et moderne développée avec passion par **sossou Kouamé appolinaire développeur web**.

## 🌟 Fonctionnalités

- **Design élégant** : Interface moderne avec dégradés dorés et animations fluides
- **Gestion d'articles** : Ajout, modification et suppression d'articles avec upload de photos
- **Catégories** : Homme, Femme, Enfants avec filtrage dynamique
- **Commande WhatsApp** : Redirection automatique vers WhatsApp pour les commandes
- **Administration sécurisée** : Accès protégé par mot de passe
- **Animations** : Barres de chargement, transitions fluides et effets visuels

## 🚀 Déploiement sur Render.com

### 1. Préparation du projet

Assurez-vous que tous les fichiers sont dans votre dépôt Git :

```bash
# Structure du projet
mont-sion-boutique/
├── index.html
├── categories.html
├── admin.html
├── main.js
├── server.py
├── package.json
├── requirements.txt (optionnel pour Python)
└── resources/
    ├── logo.png
    ├── hero-bg.jpg
    └── (autres images)
```

### 2. Configuration sur Render.com

1. **Créer un nouveau Web Service** sur [Render.com](https://render.com)

2. **Configuration du dépôt** :
   - Connectez votre dépôt GitHub/GitLab
   - Sélectionnez la branche principale

3. **Paramètres du service** :
   - **Name**: `mont-sion-boutique`
   - **Environment**: `Python 3`
   - **Build Command**: Laissez vide
   - **Start Command**: `python3 server.py`

4. **Variables d'environnement** :
   - `PORT`: `10000` (Render assignera automatiquement le port)

5. **Advanced Settings** :
   - Health Check Path: `/`
   - Timeout: `10` secondes

### 3. Configuration Python (Alternative)

Si vous préférez utiliser Python au lieu de Node.js, créez un fichier `requirements.txt` :

```txt
# requirements.txt (vide, juste pour Render)
```

Et utilisez `server.py` comme point d'entrée.

### 4. Déploiement

1. Cliquez sur **Create Web Service**
2. Attendez que le déploiement se termine
3. Votre site sera accessible à l'URL fournie par Render

## 🔐 Sécurité Administrateur

Le bouton **Espace Administrateur** est protégé par un mot de passe :

- **Mot de passe**: `kouame`
- Le mot de passe est demandé à chaque accès
- Protection contre les accès non autorisés

## 📱 Commandes WhatsApp

Les boutons "Commander" redirigent automatiquement vers WhatsApp avec le message pré-rempli :

```
Bonjour, je suis intéressé(e) par l'article suivant:

*[Nom de l'article]*
Catégorie: [Catégorie]
Prix: [Prix] FCFA

Merci de me contacter pour plus d'informations.
```

**Numéro WhatsApp**: `+22967924076`

## 🎨 Design et Animations

- **Palette de couleurs**: Doré (#FFD700, #FFA500) et Bleu marine (#1a237e)
- **Typographie**: Playfair Display (titres), Inter (corps), Montserrat (boutons)
- **Animations**: 
  - Typing effect pour le nom de la boutique
  - Barres de chargement animées
  - Transitions fluides entre les pages
  - Hover effects sur les boutons et articles

## 📁 Structure du projet

```
mont-sion-boutique/
├── index.html          # Page d'accueil
├── categories.html     # Page des catégories
├── admin.html          # Espace administrateur
├── main.js             # JavaScript principal
├── server.py           # Serveur Python (port 10000)
├── package.json        # Configuration Node.js
├── design.md           # Documentation du design
├── interaction.md      # Documentation des interactions
├── outline.md          # Plan du projet
└── resources/          # Images et assets
    ├── logo.png
    ├── hero-bg.jpg
    └── product-*.jpg
```

## 🛠️ Technologies utilisées

- **Frontend**: HTML5, CSS3 (Tailwind CSS), JavaScript (ES6+)
- **Backend**: Python 3 (SimpleHTTPServer)
- **Polices**: Google Fonts (Playfair Display, Inter, Montserrat)
- **Icons**: Font Awesome 6
- **Stockage**: localStorage pour les données des produits

## 📝 Gestion des produits

Les produits sont stockés localement dans le navigateur (localStorage) avec la structure suivante :

```javascript
{
    id: 123456789,
    name: "Nom du produit",
    category: "homme|femme|enfant",
    price: 25000,
    image: "./resources/product-image.jpg"
}
```

## 🚀 Démarrage local

Pour tester localement :

```bash
# Avec Python
python3 server.py

# Avec Node.js (si Express est installé)
npm start

# Avec Python simple
python3 -m http.server 10000
```

Le site sera accessible sur `http://localhost:10000`

## 📞 Support

Développé par **sossou Kouamé appolinaire développeur web**

Pour toute question ou support technique, contactez le développeur.

---

© 2024 Mont Sion Boutique. Tous droits réservés.