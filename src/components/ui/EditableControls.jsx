import { Editable, IconButton } from '@chakra-ui/react';
import { Check, PencilLine, X } from 'lucide-react';
import propTypes from 'prop-types';

export default function EditableControls({ value, onValueChange }) {
  return (
    <Editable.Root
      key={value}
      defaultValue={value}
      onSubmit={(nextValue) => onValueChange(nextValue)}
    >
      <Editable.Preview
        key={value}
        w="100%"
        _hover={{ bg: 'brand.600' }}
        fontSize="md"
      />
      <Editable.Input fontSize="md" />
      <Editable.Control>
        <Editable.EditTrigger asChild>
          <IconButton
            variant="ghost"
            size="xs"
            color="brand.50"
            _hover={{ bg: 'brand.600' }}
          >
            <PencilLine />
          </IconButton>
        </Editable.EditTrigger>
        <Editable.CancelTrigger asChild>
          <IconButton
            variant="outline"
            bg="transparent"
            size="xs"
            color="brand.50"
          >
            <X />
          </IconButton>
        </Editable.CancelTrigger>
        <Editable.SubmitTrigger asChild>
          <IconButton
            variant="outline"
            bg="transparent"
            size="xs"
            color="brand.50"
          >
            <Check />
          </IconButton>
        </Editable.SubmitTrigger>
      </Editable.Control>
    </Editable.Root>
  );
}

EditableControls.propTypes = {
  value: propTypes.string,
  onValueChange: propTypes.func,
};
