import { Editable, IconButton } from '@chakra-ui/react';
import { Check, PencilLine, X } from 'lucide-react';

export default function EditableControls() {
  return (
    <Editable.Root defaultValue="">
      <Editable.Preview w="100%" _hover={{ bg: 'brand.600' }} />
      <Editable.Input />
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
