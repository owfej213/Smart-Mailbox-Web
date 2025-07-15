import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import { colors } from './tokens/colors';
import { cardSlotRecipe } from './recipes/card';
import { headingRecipe } from './recipes/heading';
import { tableSlotRecipe } from './recipes/table';
import { inputRecipe } from './recipes/input';

const customConfig = defineConfig({
  globalCss: {
    'html, body': {
      margin: 0,
      backgroundColor: 'var(--chakra-colors-background)',
      color: 'var(--chakra-colors-text)',
    },
    '*': {
      fontFamily:
        '"Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif',
    },
  },
  theme: {
    tokens: {
      colors: colors,
      sizes: {
        container: '1200px',
      },
    },
    semanticTokens: {
      colors: {
        background: {
          value: '{colors.background.dark}',
        },
        text: {
          value: '{colors.text.dark}',
        },
      },
    },
    keyframes: {
      slide: {
        from: {
          transform: 'scaleX(0)',
        },
        to: {
          transform: 'scaleX(1)',
        },
      },
    },
    recipes: {
      heading: headingRecipe,
      input: inputRecipe,
    },
    slotRecipes: {
      card: cardSlotRecipe,
      table: tableSlotRecipe,
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
