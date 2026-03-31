---
description: 
alwaysApply: true
---

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Figma — design system (skills utilisateur)

Les skills Figma listés ici **ne sont pas dans le dépôt** : ils doivent être installés sous le **profil utilisateur** Cursor :

- **Windows** : `%USERPROFILE%\.cursor\skills\<nom>\SKILL.md`
- **macOS / Linux** : `~/.cursor/skills/<nom>/SKILL.md`

Tu peux les remplir en copiant les dossiers depuis **`%USERPROFILE%\.codex\skills\`** (ou une autre source d’équipe) vers **`%USERPROFILE%\.cursor\skills\`**. Sur cette machine, une copie type inclut notamment `ds-tokens-builder`, `ds-page-builder`, `figma-use`, etc.

Pour les variables Figma (**Primitive**, **Display mode**, **Platform**) et la cohérence tokens :

- **`ds-tokens-builder`** (`…\.cursor\skills\ds-tokens-builder\SKILL.md`) — trois collections ou **typographie uniquement** ; preset **`base_px` = 18** sur **`medium`** (rampe **1,5**, **`xx-small`** → **`display`**, **sans** `font-size-none`, plancher **8 px**) ; **line-height en px** par palier ; **Platform/Typography/**, modes **Desktop → Tablet → Mobile**.

Pour les **text styles** Figma (liaisons `Platform/Typography/Font scale/*`, **`Line height scale/*`**, option **`Font weight scale/*`**) :

- **`ds-typographie-builder`** — à utiliser **après** les tokens ; **9** paliers typo (**`xx-small`** → **`display`**, **pas** de `font-size-none`) ; `line-height-for-*` / `Line height scale` en **px**, alignés sur `ds-tokens-builder`.

Fondations et workflow Figma (même dossier utilisateur **`%USERPROFILE%\.cursor\skills\`**) :

- **`ds-elevation-builder`** — effets d’élévation et glow ; primitives + fichier **`[DS]`** (pages fondations).
- **`figma-use`** — **obligatoire** avant chaque appel `use_figma` (Plugin API, pièges connus).
- **`figma-generate-library`** — construire / mettre à jour une lib design dans Figma (phases, checkpoints, scripts).
- **`figma-generate-design`** — pages / écrans Figma depuis le code ou une spec, avec le design system.
- **`figma-create-design-system-rules`** — générer des règles design-system pour le codebase depuis Figma.
- **`figma-create-new-file`** — création de fichier Figma (si présent dans ton kit).
- **`ds-page-builder`** — **DS page builder** : arborescence canonique dans **un fichier `[DS]`** — d’abord fondations (**📁 FONDATION**, feuilles **○**), puis composants (**❖**), ordre dans le manifeste.
- **`figma-implement-design`** — implémenter l’UI en code depuis Figma (fidélité visuelle).
- **`figma-code-connect-components`** — Code Connect (mapping composants Figma ↔ code).

Skills **optionnels** (souvent hors package Codex standard ; à ajouter sous **`%USERPROFILE%\.cursor\skills\`** si tu les as) : **`edit-figma-design`**, **`cc-figma-component`**, **`rad-spacing`**.

**Obligatoire** avant tout `use_figma` : charger **`figma-use`**.
