## Learned User Preferences

- Prefer Park UI / Panda CSS primitives in `src/components/ui/` over bespoke `<div className={css(...)}>` when a primitive is a drop-in replacement; preserve the visible design exactly when swapping implementations
- Run the verification trio after non-trivial edits: `bunx tsc --noEmit` (zero errors), `bun test`, `bun run build`
- Keep changes minimal and scoped to the task; do not rewrite unrelated code even when adjacent cleanup is tempting
- Preserve brand-specific visuals (custom gradients, animations, micro-interactions); swap implementation, not visual language
- Do not regress recently-shipped features (e.g. the Optimize flow at `/app/resume`); verify the feature still renders before reporting done

## Learned Workspace Facts

- App is Fairshot — TanStack Start + React + Panda CSS + Park UI / Ark UI primitives; career and job-search gamification product
- Brand voice is "Soft Tooling" — warm, encouraging, non-shaming; Optimize output is deterministic and ATS-grade, never shaming or hype-y
- Path alias: only `~/*` is configured (resolves to the project root); `@/*` is NOT configured, so imports must use `~/components/ui/...`
- Recipes in `src/theme/recipes/index.ts` must be split between `recipes` (regular `defineRecipe`) and `slotRecipes` (`defineSlotRecipe`); slot recipes registered under `recipes` get overridden by the Park UI preset during codegen and produce wrong slot-union types
- Recipe sources are regenerated to `styled-system/recipes/*.d.ts` via `bunx panda codegen --clean`; the generated files are derived, not the source of truth
- Panda CSS token shape: durations live under `theme.extend.tokens.durations`, NOT as a sibling of `tokens`; `PartialTheme` does not accept top-level `durations`
