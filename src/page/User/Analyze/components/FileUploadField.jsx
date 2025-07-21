import {
  Button,
  Flex,
  HStack,
  VStack,
  useFileUploadContext,
} from '@chakra-ui/react';
import { useUserDataContext } from '../../../../hooks/context/useUserDataContext';
import { useEffect } from 'react';
import { toaster } from '../../../../components/ui/toaster';
import { FileUpload } from '@ark-ui/react';
import { ArrowRight, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';

export function FileUploadField({
  loading,
  setFile,
  setFileUpload,
  uploadImage,
  deleteImage,
}) {
  const { userData } = useUserDataContext();
  const fileUpload = useFileUploadContext();
  const file = fileUpload.acceptedFiles[0];

  useEffect(() => {
    if (file) {
      setFileUpload(true);
      setFile(file);
    }
  }, [file, setFile, setFileUpload]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const result = await uploadImage(file, userData?.mailBoxID);
      if (result.success) {
        toaster.create({
          description: '郵件圖片分析成功',
          type: 'success',
          closable: true,
        });
      } else {
        toaster.create({
          description: result.error,
          type: 'error',
          closable: true,
        });
      }
    }
  };

  if (!file) {
    return null;
  }
  return (
    <>
      <FileUpload.ItemGroup>
        <FileUpload.Item
          as={VStack}
          w="auto"
          p="2"
          bg="transparent"
          border="transparent"
          file={file}
          key={file.name}
        >
          <FileUpload.ItemPreviewImage w="100%" h="100%" />
          <HStack w="100%" justifyContent="space-between" mt="2">
            <Flex>
              <Button
                color="text"
                bg="blue.500"
                boxSize="inherit"
                px="4"
                h="10"
                alignItems="center"
                onClick={handleSubmit}
                loading={loading}
                loadingText="分析中..."
                spinnerPlacement="start"
              >
                <ArrowRight size={24} />
                開始分析
              </Button>
            </Flex>
            <Flex>
              <FileUpload.ItemDeleteTrigger
                onClick={() => setFileUpload(false)}
                asChild
              >
                <Button
                  color="text"
                  bg="red.500"
                  boxSize="inherit"
                  px="4"
                  h="10"
                  alignItems="center"
                  onClick={deleteImage}
                >
                  <Trash2 size={24} />
                  刪除
                </Button>
              </FileUpload.ItemDeleteTrigger>
            </Flex>
          </HStack>
        </FileUpload.Item>
      </FileUpload.ItemGroup>
    </>
  );
}

FileUploadField.propTypes = {
  loading: PropTypes.bool.isRequired,
  analyzeError: PropTypes.string,
  setFile: PropTypes.func.isRequired,
  setFileUpload: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func,
};
