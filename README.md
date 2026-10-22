# PASSAGE — The mixed reality short movie

Version statique du site WordPress https://www.passage-mixedreality.com/, hébergée sur GitHub Pages.

**Site : https://lyptik.github.io/passage-mixedreality-movie/**

## Présentation fidèle au site d'origine

L'accueil conserve les cinq compositions plein écran du site d'origine, leurs positions, dimensions, points de rupture responsive, polices Open Sans et Ubuntu Condensed et effets de survol. Il utilise désormais un défilement natif continu : la position dans la page pilote directement les fondus et les mouvements des calques. S'arrêter fige la transition ; remonter la joue en sens inverse. Aucun événement de molette ou de geste tactile ne déclenche un changement de diapositive. La page du film conserve son lecteur plein écran.

Une scène occupe l'écran dans une zone `position: sticky`, sur une page d'environ 10,85 hauteurs d'écran. Chaque composition bénéficie d’une pause de 0,85 hauteur d’écran de défilement, pendant laquelle elle reste entièrement en place. Les transitions gardent leur vitesse et restent réversibles. Les points de navigation et les flèches mènent aux positions correspondantes avec un défilement fluide. Les touches de défilement habituelles et la barre de défilement restent natives. Les liens directs `#about`, `#behind-the-scenes`, `#credits` et `#contact` fonctionnent également.

Les paramètres de placement et les directions d'animation d'origine sont conservés dans les attributs `data-*` des fichiers HTML. Le moteur d'origine calcule seulement les dimensions responsive de chaque composition ; ses animations temporelles et sa navigation automatique sont désactivées sur l'accueil. `assets/scroll-story.js` traduit les mouvements en progression de défilement et n'actualise l'affichage que lorsqu'il change. Les styles et images d'origine sont hébergés localement ; le site n'utilise aucun serveur WordPress, base de données, appel AJAX WordPress, WooCommerce ou Jetpack.

Les vidéos restent sur Vimeo : bande-annonce `266423627`, film complet `417619659`, making of `244240335`. Les lecteurs intégrés utilisent `dnt=1`.

## Fichiers

- `index.html` : cinq compositions originales dans la présentation à défilement continu.
- `assets/scroll-story.js` et `assets/scroll-story.css` : progression liée au défilement, scène fixe, navigation et gestion de la réduction des animations.
- `home/passage-the-movie/index.html` : présentation originale du film complet, à son ancien chemin.
- `assets/original/` : moteur du diaporama, styles, polices, images et adaptations statiques. Voir `assets/original/NOTICE.md` pour la provenance.
- `accessible/index.html` : version linéaire de tous les contenus, utilisable sans les animations et sans JavaScript ; accessible par un lien au clavier ou depuis le message de repli sans JavaScript.
- `assets/site.css`, `assets/site.js` et les images optimisées : ressources de cette version linéaire.
- `wp-content/uploads/2020/05/Kit_press.zip` : kit presse original, à son ancien chemin.
- `sitemap.xml`, `robots.txt`, `404.html` : indexation et page introuvable.

Les calques interactifs et les points de navigation disposent de commandes clavier. Les compositions hors de la scène active sont retirées de la navigation au clavier. Une vidéo Vimeo en lecture est mise en pause lorsqu'on quitte sa section. Avec la préférence système de réduction des animations, les cinq compositions s'affichent les unes sous les autres, sans scène épinglée ni effets de transition. La version linéaire conserve tous les crédits, y compris ceux masqués par la présentation mobile originale.

## Publication et modification

HTML, CSS et JavaScript statiques, sans compilation ni installation. GitHub Pages publie la branche `main`, dossier racine `/`. `.nojekyll` désactive le traitement Jekyll. Les modifications enregistrées sur `main` sont publiées automatiquement. Lors de modifications de `scroll-story.css` ou `scroll-story.js`, actualiser leur paramètre de version `?v=…` dans `index.html` pour éviter que les navigateurs réutilisent une ancienne copie en cache.

Pour modifier la présentation : éditer les textes, styles de calque et attributs `data-frames`, `data-x`, `data-y`, `data-hoffset`, `data-voffset`, etc. dans les fichiers HTML. Les tableaux à quatre valeurs correspondent aux quatre tailles de grille d'origine. `distanceInViewports` dans `assets/scroll-story.js` règle la distance de transition, et `pauseInViewports` la distance de lecture immobile de chaque composition ; les fenêtres d'entrée et de sortie règlent l'étagement des mouvements.

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
