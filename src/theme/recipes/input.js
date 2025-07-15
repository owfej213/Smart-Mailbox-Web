import { defineRecipe } from '@chakra-ui/react';

export const inputRecipe = defineRecipe({
  variants: {
    variant: {
      dark: {
        bg: 'brand.800',
        color: 'text',
      },
    },
  },
  defaultVariants: {
    variant: 'dark',
    size: 'md',
  },
});
