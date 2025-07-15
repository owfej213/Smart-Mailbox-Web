import { defineSlotRecipe } from '@chakra-ui/react';
import { cardAnatomy } from '@chakra-ui/react/anatomy';

export const cardSlotRecipe = defineSlotRecipe({
  slots: cardAnatomy.keys(),
  variants: {
    variant: {
      dark: {
        root: {
          bg: 'brand.700',
          color: 'text',
        },
      },
      'dark.outline': {
        root: {
          bg: 'brand.700',
          color: 'text',
          borderWidth: '1px',
          borderColor: 'border',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'dark',
    size: 'md',
  },
});
