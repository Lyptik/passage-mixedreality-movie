# PASSAGE — The mixed reality short movie

Version statique du site WordPress https://www.passage-mixedreality.com/, hébergée sur GitHub Pages.

**Site : https://lyptik.github.io/passage-mixedreality-movie/**

## Présentation fidèle au site d'origine

L'accueil et la page du film conservent la présentation Slider Revolution 5.4.8.3 du site d'origine : cinq diapositives plein écran, positions et dimensions des calques, points de rupture responsive, polices Open Sans et Ubuntu Condensed, transitions, animations d'entrée et de sortie, effets de survol et navigation par points, flèches du clavier, molette et gestes tactiles.

Les paramètres d'origine sont conservés dans les attributs `data-*` des fichiers HTML. Les fichiers nécessaires au navigateur sont dans `assets/original/`. Les styles et images d'origine sont hébergés localement ; le site n'utilise aucun serveur WordPress, base de données, appel AJAX WordPress, WooCommerce ou Jetpack. Les références aux médias et aux liens de téléchargement ont été adaptées pour fonctionner dans le sous-dossier GitHub Pages et à la racine d'un futur domaine personnalisé.

Les vidéos restent sur Vimeo : bande-annonce `266423627`, film complet `417619659`, making of `244240335`. Les lecteurs intégrés utilisent `dnt=1`.

## Fichiers

- `index.html` : diaporama original de l'accueil.
- `home/passage-the-movie/index.html` : présentation originale du film complet, à son ancien chemin.
- `assets/original/` : moteur du diaporama, styles, polices, images et adaptations statiques. Voir `assets/original/NOTICE.md` pour la provenance.
- `accessible/index.html` : version linéaire de tous les contenus, utilisable sans les animations et sans JavaScript ; accessible par un lien au clavier ou depuis le message de repli sans JavaScript.
- `assets/site.css`, `assets/site.js` et les images optimisées : ressources de cette version linéaire.
- `wp-content/uploads/2020/05/Kit_press.zip` : kit presse original, à son ancien chemin.
- `sitemap.xml`, `robots.txt`, `404.html` : indexation et page introuvable.

Les calques interactifs et les points de navigation disposent de commandes clavier. Les préférences système de réduction des animations sont prises en compte avant l'initialisation du diaporama. La version linéaire conserve tous les crédits, y compris ceux masqués par la présentation mobile originale.

## Publication et modification

HTML, CSS et JavaScript statiques, sans compilation ni installation. GitHub Pages publie la branche `main`, dossier racine `/`. `.nojekyll` désactive le traitement Jekyll. Les modifications enregistrées sur `main` sont publiées automatiquement.

Pour modifier la présentation fidèle : éditer les textes, styles de calque et attributs `data-frames`, `data-x`, `data-y`, `data-hoffset`, `data-voffset`, etc. dans les fichiers HTML. Les tableaux à quatre valeurs correspondent aux quatre tailles de grille d'origine. `assets/original/css/static.css` fournit uniquement l'enveloppe statique ; les définitions du moteur d'origine restent dans les fichiers fournis avec le site.

Vérifier les modifications avec un serveur HTTP statique, sur ordinateur et mobile. Ne pas ouvrir le HTML directement avec `file://`, car le moteur charge certains modules JavaScript locaux par HTTP.

## Domaine personnalisé : après validation

Le domaine `passage-mixedreality.com` reste chez Bluehost pendant la validation. Aucun fichier `CNAME` n'est présent pour l'instant.

Après validation :

1. Vérifier la propriété du domaine dans les paramètres GitHub Pages du compte et préparer les DNS selon la documentation GitHub à jour.
2. Configurer le domaine personnalisé dans les paramètres Pages du dépôt, puis les enregistrements DNS du domaine. Conserver les enregistrements de messagerie (MX, SPF, DKIM, DMARC).
3. Remplacer `https://lyptik.github.io/passage-mixedreality-movie/` par l'adresse canonique retenue dans les métadonnées HTML, `sitemap.xml`, `robots.txt` et `404.html`.
4. Activer HTTPS une fois le certificat disponible et vérifier les deux variantes du domaine et la page du film.
5. Vérifier `press@passage-mixedreality.com` avant toute résiliation Bluehost : GitHub Pages ne fournit pas de messagerie. Sauvegarder séparément les fichiers et la base WordPress avant une éventuelle suppression de l'hébergement.

Documentation : https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

Cette migration porte sur les pages publiques du film ; elle ne constitue pas une sauvegarde de la base WordPress ni des éléments privés d'administration.

## Droits

Les contenus, médias et ressources commerciales d'origine conservent leurs droits et licences existants. Ce dépôt ne leur attribue pas de licence libre. Les mentions des bibliothèques tierces sont conservées dans leurs fichiers. Open Sans possède sa licence OFL dans `assets/Open-Sans-OFL.txt`, et Ubuntu Condensed sa licence Ubuntu dans `assets/original/fonts/Ubuntu-OFL.txt`.
