@AGENTS.md
# Activiz Links

Mini site Next.js pour gérer les deep links de l'app mobile Activiz (Expo/React Native).

## Stack
- Next.js 16 + TypeScript + Tailwind 4
- Déployé en Docker sur VPS (comme le backoffice)
- Domaine : link.activiz.app

## Architecture
- `app/join/[groupId]/page.tsx` — page serveur SSR (meta tags OG pour aperçus WhatsApp)
- `app/join/[groupId]/JoinDeepLink.tsx` — composant client (deep link + fallback stores)
- Les fichiers `.well-known/` dans `public/` servent les Universal Links iOS et App Links Android

## Backend
- API AdonisJS sur api.activiz.app
- Route publique nécessaire : GET /public/groups/:id (renvoie name, description, memberCount, image)

## Deep link flow
1. User clique sur link.activiz.app/join/GROUP_ID
2. La page SSR charge les infos du groupe (meta tags pour aperçu)
3. Le client tente d'ouvrir activiz://join/GROUP_ID (custom scheme)
4. Si l'app ne s'ouvre pas → redirection vers App Store / Play Store
5. Dans l'app Expo : useDeepLink() intercepte le lien → écran JoinGroup
6. Si pas connecté → login/inscription → AsyncStorage garde le groupId → rejoint après

## Config Expo requise
- scheme: "activiz" dans app.json
- associatedDomains: ["applinks:link.activiz.app"]
- intentFilters pour https://link.activiz.app

## TODO
- [ ] Ajouter la route publique côté AdonisJS
- [ ] Config Expo (scheme + associated domains)
- [ ] Handler deep link dans l'app (useDeepLink hook)
- [ ] Déploiement Docker + NPM proxy
- [ ] Remplacer les URLs stores (placeholder actuellement)
- [ ] Remplacer TEAM_ID dans apple-app-site-association
- [ ] Remplacer sha256 fingerprint dans assetlinks.json