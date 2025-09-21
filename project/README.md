# Ice_shop - Site E-commerce

## Description
Site e-commerce moderne pour Ice_shop, boutique de vêtements et accessoires avec le slogan "Pour vous pour tous".

## Fonctionnalités
- ✅ Navigation fluide entre les pages (SPA)
- ✅ Catalogue de produits avec filtres par catégorie
- ✅ Système de panier avec localStorage
- ✅ Intégration WhatsApp pour commandes et contact
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Formulaire de contact fonctionnel
- ✅ Interface moderne avec animations

## Structure du projet
```
├── index.html          # Page principale avec toutes les sections
├── style.css           # Styles CSS complets
├── script.js           # Logique principale et navigation
├── products.js         # Base de données des produits
├── cart.js            # Gestion du panier et WhatsApp
└── README.md          # Documentation
```

## Configuration requise

### 1. Numéro WhatsApp
Dans le fichier `cart.js`, ligne 4, remplacer :
```javascript
this.whatsappNumber = "33123456789"; // À remplacer par le vrai numéro
```

### 2. Images des produits
Les images utilisent actuellement des URLs Pexels. Pour la production :
- Remplacer par vos propres images dans le fichier `products.js`
- Optimiser les images (format WebP recommandé)
- Utiliser un CDN pour de meilleures performances

## Déploiement
1. Télécharger tous les fichiers
2. Configurer le numéro WhatsApp
3. Remplacer les images si nécessaire
4. Héberger sur n'importe quel serveur web (pas de backend requis)

## Personnalisation
- **Couleurs** : Modifier les variables CSS dans `:root`
- **Produits** : Éditer le tableau dans `products.js`
- **Contenu** : Modifier directement dans `index.html`
- **Styles** : Ajuster dans `style.css`

## Support navigateurs
- Chrome, Firefox, Safari, Edge (versions récentes)
- Compatible mobile et tablette
- Utilise localStorage (supporté par tous les navigateurs modernes)

## Contact
Pour toute question technique, contacter le développeur.