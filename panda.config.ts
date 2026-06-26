import { animationStyles } from "./src/theme/animation-styles";
import { zIndex } from "./src/theme/tokens\\z-index";
import { shadows } from "./src/theme/tokens\\shadows";
import { durations } from "./src/theme/tokens\\durations";
import { colors } from "./src/theme/tokens\\colors";
import { textStyles } from "./src/theme/text-styles";
import { layerStyles } from "./src/theme/layer-styles";
import { keyframes } from "./src/theme/keyframes";
import { globalCss } from "./src/theme/global-css";
import { conditions } from "./src/theme/conditions";
import { slotRecipes, recipes } from "./src/theme/recipes";
import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
import teal from "@park-ui/panda-preset/colors/teal";
import sand from "@park-ui/panda-preset/colors/sand";

/**
 * Park UI preset is a factory — it builds a full design-system token set
 * (colors, gray scale, semantic tokens, recipes) from three knobs:
 *   - accentColor  → brand color (teal matches the legacy #0f8a7d teal)
 *   - grayColor    → neutral scale (sand matches the warm bone-white aesthetic)
 *   - radius       → corner scale (xl ≈ 14px, close to existing 10–16px corners)
 *
 * After this runs, tokens like `accent.teal.500`, `bg.canvas`, `fg.default`,
 * and `border.default` are available via `css({ ... })` or `styled-system/tokens`.
 */
export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],

  presets: [
    "@pandacss/preset-base",
    createPreset({
      accentColor: teal,
      grayColor: sand,
      radius: "xl",
    }),
  ],

  theme: {
    extend: {
      tokens: {
        fonts: {
          display: { value: '"Newsreader", "Iowan Old Style", Georgia, serif' },
          body: { value: '"Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif' },
          mono: { value: '"SF Mono", ui-monospace, Menlo, monospace' },
        },

        // A whisper of warm tint on the app background — keeps the sand base
        // from feeling chalky without committing to a different hue.
        colors: {
          "bg.glow": {
            value: "radial-gradient(ellipse 1200px 600px at 50% 0%, token(colors.teal.50) 0%, transparent 60%)",
          },
        },

        // Named durations so components can `animation: "fadeIn 250ms ease"` etc.
        durations: {
          snappy: { value: "150ms" },
          smooth: { value: "240ms" },
          deliberate: { value: "450ms" },
        },

        zIndex: zIndex
      },

      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },

      animationStyles: animationStyles,
      recipes: recipes,
      slotRecipes: slotRecipes,
      layerStyles: layerStyles,
      textStyles: textStyles,

      semanticTokens: {
        colors: {
          fg: {
            default: {
              value: {
                _light: "{colors.gray.12}",
                _dark: "{colors.gray.12}"
              }
            },

            muted: {
              value: {
                _light: "{colors.gray.11}",
                _dark: "{colors.gray.11}"
              }
            },

            subtle: {
              value: {
                _light: "{colors.gray.10}",
                _dark: "{colors.gray.10}"
              }
            }
          },

          border: {
            value: {
              _light: "{colors.gray.4}",
              _dark: "{colors.gray.4}"
            }
          },

          error: {
            value: {
              _light: "{colors.red.9}",
              _dark: "{colors.red.9}"
            }
          }
        },

        shadows: shadows
      }
    },
  },

  outdir: "styled-system",
  globalCss: globalCss,
  conditions: conditions,
  plugins: [
    {
      name: 'Remove Panda Preset Colors',
      hooks: {
        'preset:resolved': ({ utils, preset, name }) =>
          name === '@pandacss/preset-panda'
            ? utils.omit(preset, ['theme.tokens.colors', 'theme.semanticTokens.colors'])
            : preset,
      },
    },
  ]
});