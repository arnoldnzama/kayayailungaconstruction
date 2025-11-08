# Tâches d'implémentation - Phase 2-3

## Vue d'ensemble
Ce document liste toutes les tâches concrètes pour adapter les 6 pages prioritaires au design sombre.

---

## 🎯 ÉTAPE 1: contact.html

### Tâche 1.1: Préparation CSS
- [x] Créer `css/pages/contact-dark.css`





- [x] Importer les variables depuis `css/variables.css`





- [x] Définir les styles spécifiques à la page






### Tâche 1.2: Adaptation du HTML
- [x] Ajouter le loader (copier depuis index.html)




- [x] Ajouter le lien vers `contact-dark.css` dans le `<head>`




- [x] Remplacer `bg-gray-50` par `bg-[#0a0a0a]` sur le body




- [x] Remplacer `bg-white` par `bg-[#1e1e1e]` sur les cartes




- [x] Remplacer `bg-gray-100` par `bg-[#1a1a1a]` sur les sections





### Tâche 1.3: Hero Section
- [x] Modifier le gradient de fond (sombre)





- [x] Adapter les couleurs de texte (blanc/gris)






- [x] Moderniser les boutons avec effets hover




-

- [x] Ajouter des animations d'apparition





###-Tâche 1.4: Formulaire de contact

- [x] Adapter le fond de la carte formulaire




-

- [x] Moderniser les inputs (fond sombre, bordures subtiles)

-

- [x] Adapter les labels (couleur grise)


-

- [x] Moderniser le bouton submit (gradient gold)




-

- [x] Ajouter des effets focus sur les inputs


-

- [x] Améliorer la validation visuelle



### Tâche 1.5: Section informations
- [x] Adapter le fond de la carte

-

- [x] Changer la couleur des icônes (gold)



-

- [x] Adapter les couleurs de texte

- [x] Ajouter des bordures subtiles

### Tâche 1.6: Section "Pourquoi nous choisir"
- [x] Adapter le fond des cartes


- [x] Moderniser les cercles d'icônes (gold avec glow)


- [x] Ajouter des effets hover (translateY + shadow)
- [x] Adapter les couleurs de texte

### Tâche 1.7: JavaScript et animations
- [x] Ajouter le script du loader




- [x] Implémenter les animations d'apparition (fade-in)

- [x] Ajouter des animations au scroll

- [x] Tester la validation du formulaire


### Tâche 1.8: Tests et validation
- [x] Tester sur desktop

- [x] Tester sur tablet

- [x] Tester sur mobile

- [x] Vérifier le formulaire

- [x] Vérifier les animations

- [x] Vérifier la console (pas d'erreurs)


---

## 🎯 ÉTAPE 2: realisations.html

### Tâche 2.1: Préparation CSS
- [x] Créer `css/pages/realisations-dark.css`

- [x] Importer les variables


- [x] Définir les styles de base


### Tâche 2.2: Adaptation du HTML
- [x] Ajouter le loader


- [ ] Ajouter le lien vers `realisations-dark.css`
- [x] Adapter les classes de background


### Tâche 2.3: Hero Section
- [x] Modifier le gradient de fond
- [x] Adapter les couleurs de texte
- [x] Moderniser les boutons si présents
- [x] Ajouter des animations d'apparition
- [x] Ajouter des éléments visuels (badge, stats)
- [x] Ajouter des effets hover sur les boutons

### Tâche 2.4: Galerie de projets
- [x] Adapter le fond des cartes projets

- [x] Ajouter des effets hover (élévation + glow)
- [x] Moderniser les overlays sur images


- [x] Adapter les badges de catégories (gold)
- [x] Améliorer les transitions
- [x] Ajouter des animations stagger pour l'apparition
- [x] Améliorer les effets sur les images (brightness, scale)

### Tâche 2.5: Modal projet
- [x] Adapter le fond du modal
- [x] Moderniser le header
- [x] Adapter la galerie interne
- [x] Améliorer les boutons de fermeture
- [x] Ajouter des transitions fluides
- [x] Ajouter backdrop-blur pour effet moderne
- [x] Améliorer les effets hover sur les images

### Tâche 2.6: Lightbox images

- [x] Adapter le fond (noir 95%)
- [x] Moderniser les contrôles (boutons circulaires)

- [x] Améliorer le compteur d'images
- [x] Ajouter des transitions
- [x] Ajouter backdrop-blur pour effet moderne
- [x] Améliorer les effets hover sur les boutons
- [x] Tester la navigation clavier






### Tâche 2.7: JavaScript et animations
- [ ] Ajouter le script du loader
- [x] Implémenter les animations d'apparition (stagger)


- [x] Améliorer les transitions modal/lightbox



- [x] Tester toutes les interactions





### Tâche 2.8: Tests et validation
- [x] Tester l'affichage des projets






- [ ] Tester l'ouverture des modals
- [ ] Tester le lightbox
- [ ] Tester la navigation images
- [ ] Tester sur tous les devices
- [x] Vérifier la console


---

## 🎯 ÉTAPE 3: articles/*.html (Template commun)

### Tâche 3.1: Préparation CSS
- [x] Créer `css/pages/article-dark.css`



- [ ] Importer les variables
- [x] Définir les styles communs aux 3 articles


### Tâche 3.2: Template de base
- [x] Créer un template HTML de référence








- [ ] Ajouter le loader
- [x] Ajouter le lien vers `article-dark.css`

- [ ] Adapter les classes de background

### Tâche 3.3: Hero Section
- [x] Adapter l'overlay sur l'image (80% opacité)

- [x] Moderniser le badge catégorie (gold)

- [ ] Adapter les couleurs de texte
- [x] Ajouter des ombres subtiles


### Tâche 3.4: Contenu article
- [x] Adapter le fond de la section






- [ ] Moderniser la carte de contenu
- [ ] Adapter les couleurs des titres (gold)
- [ ] Adapter les couleurs des paragraphes (gris clair)
- [ ] Moderniser les listes (puces gold)
- [ ] Améliorer la typographie

### Tâche 3.5: Galerie d'images
- [x] Adapter le fond des cartes

- [ ] Ajouter des effets hover (élévation + glow)
- [ ] Moderniser les overlays
- [ ] Améliorer les transitions

### Tâche 3.6: Articles connexes
- [ ] Adapter le fond des cartes
- [x] Ajouter des effets hover

- [ ] Moderniser les overlays sur images
- [ ] Améliorer les transitions



### Tâche 3.7: Modal images
- [ ] Adapter le fond (noir 95%)
- [ ] Moderniser les contrôles
- [ ] Améliorer la navigation
- [ ] Ajouter des transitions

### Tâche 3.8: JavaScript et animations
- [x] Ajouter le script du loader


- [ ] Implémenter les animations de lecture
- [ ] Améliorer le smooth scroll
- [ ] Tester toutes les interactions

---

## 🎯 ÉTAPE 3A: articles/decorex.html

### Tâche 3A.1: Application du template
- [x] Copier le template de base





- [ ] Adapter le contenu spécifique
- [ ] Vérifier les images (5 images)
- [ ] Adapter les liens de navigation

### Tâche 3A.2: Tests
- [ ] Tester l'affichage
- [ ] Tester la galerie
- [ ] Tester le modal
- [ ] Tester la navigation
- [ ] Tester sur tous les devices

---

## 🎯 ÉTAPE 3B: articles/philharmonie.html

### Tâche 3B.1: Application du template
- [x] Copier le template de base
- [x] Adapter le contenu spécifique
- [x] Vérifier les images (8 images)
- [x] Adapter les liens de navigation

### Tâche 3B.2: Tests
- [ ] Tester l'affichage
- [ ] Tester la galerie
- [ ] Tester le modal
- [ ] Tester la navigation
- [ ] Tester sur tous les devices

---

## 🎯 ÉTAPE 3C: articles/arabie-saoudite.html

### Tâche 3C.1: Application du template
- [x] Copier le template de base
- [x] Adapter le contenu spécifique
- [x] Vérifier les images (10 images)
- [x] Adapter les liens de navigation

### Tâche 3C.2: Tests
- [ ] Tester l'affichage
- [ ] Tester la galerie
- [ ] Tester le modal
- [ ] Tester la navigation
- [ ] Tester sur tous les devices

---

## 🎯 ÉTAPE 4: Tests finaux et validation

### Tâche 4.1: Tests de cohérence
- [ ] Vérifier la cohérence visuelle entre toutes les pages
- [ ] Vérifier les transitions entre pages
- [ ] Vérifier les couleurs (palette respectée)
- [ ] Vérifier les animations (fluides et cohérentes)

### Tâche 4.2: Tests de performance
- [ ] Mesurer le temps de chargement de chaque page
- [ ] Vérifier les scores Lighthouse
- [ ] Optimiser si nécessaire

### Tâche 4.3: Tests de fonctionnalité
- [ ] Tester tous les formulaires
- [ ] Tester toutes les modals
- [ ] Tester tous les lightbox
- [ ] Tester la navigation
- [ ] Tester le language switcher
- [ ] Tester le back-to-top

### Tâche 4.4: Tests responsive
- [ ] Tester sur mobile (320px, 375px, 414px)
- [ ] Tester sur tablet (768px, 1024px)
- [ ] Tester sur desktop (1280px, 1440px, 1920px)

### Tâche 4.5: Tests de compatibilité
- [ ] Tester sur Chrome
- [ ] Tester sur Firefox
- [ ] Tester sur Safari
- [ ] Tester sur Edge

### Tâche 4.6: Tests d'accessibilité
- [ ] Vérifier les contrastes (WCAG AA)
- [ ] Tester la navigation au clavier
- [ ] Vérifier les attributs ARIA
- [ ] Tester avec un lecteur d'écran

### Tâche 4.7: Documentation
- [ ] Documenter les changements majeurs
- [ ] Créer un guide de style si nécessaire
- [ ] Mettre à jour le README si nécessaire

---

## 📊 Suivi de progression

### contact.html
- Statut: ✅ Terminé
- Progression: 100%
- Temps estimé: 2-3h
- Temps réel: ~2.5h

### realisations.html
- Statut: 🚧 En cours
- Progression: 70%
- Temps estimé: 3-4h
- Temps réel: ~2h

### articles/decorex.html
- Statut: ⏳ En attente
- Progression: 0%
- Temps estimé: 1-2h
- Temps réel: -

### articles/philharmonie.html
- Statut: ✅ Terminé
- Progression: 100%
- Temps estimé: 1-2h
- Temps réel: ~1h

### articles/arabie-saoudite.html
- Statut: ✅ Terminé
- Progression: 100%
- Temps estimé: 1-2h
- Temps réel: ~1h

### Tests finaux
- Statut: ⏳ En attente
- Progression: 0%
- Temps estimé: 2-3h
- Temps réel: -

---

## 🎨 Ressources de référence

### Fichiers de référence
- `index.html` - Pour le loader et les animations
- `blog-new.html` - Pour les cartes et effets
- `css/variables.css` - Pour les couleurs
- `css/animations.css` - Pour les animations

### Palette de couleurs
```css
--bg-primary: #0a0a0a;
--bg-secondary: #1a1a1a;
--bg-card: #1e1e1e;
--bg-card-hover: #252525;
--text-primary: #ffffff;
--text-secondary: #b0b0b0;
--text-muted: #808080;
--accent-gold: #c69b49;
--accent-gold-hover: #d4a855;
--border-color: rgba(255, 255, 255, 0.1);
```

### Effets communs
- **Hover cartes**: `translateY(-8px)` + `box-shadow: 0 20px 40px rgba(198, 155, 73, 0.3)`
- **Glow effect**: `box-shadow: 0 0 30px rgba(198, 155, 73, 0.5)`
- **Transitions**: `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

---

## 📝 Notes importantes

### À faire avant de commencer
1. Sauvegarder les fichiers originaux
2. Créer une branche Git si possible
3. Tester dans un environnement de développement

### Pendant l'implémentation
1. Commiter régulièrement
2. Tester après chaque modification majeure
3. Documenter les problèmes rencontrés

### Après l'implémentation
1. Faire une revue de code
2. Tester en conditions réelles
3. Recueillir les feedbacks

---

**Date de création**: 06 Novembre 2025
**Dernière mise à jour**: 06 Novembre 2025
**Statut**: Prêt pour implémentation
