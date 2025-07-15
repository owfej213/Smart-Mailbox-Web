import { defineSlotRecipe } from '@chakra-ui/react';
import { tableAnatomy } from '@chakra-ui/react/anatomy';

export const tableSlotRecipe = defineSlotRecipe({
  slots: tableAnatomy.keys(),
  variants: {
    variant: {
      dark: {
        root: {
          bg: 'brand.700',
          color: 'text',
        },
        cell: {
          borderBottomWidth: '1px',
        },
        columnHeader: {
          color: 'text',
          borderBottomWidth: '1px',
        },
      },
      'dark.outline': {
        root: {
          bg: 'brand.700',
          color: 'text',
        },
        header: {
          bg: 'brand.500',
        },
        cell: {
          borderBottomWidth: '1px',
        },
        columnHeader: {
          color: 'text',
          borderBottomWidth: '1px',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'dark',
    size: 'md',
  },
});
