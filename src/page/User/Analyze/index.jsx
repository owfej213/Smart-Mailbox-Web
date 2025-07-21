import {
  Box,
  Button,
  Card,
  FileUpload,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  SkeletonText,
  Table,
} from '@chakra-ui/react';
import {
  FileText,
  Settings,
  Shapes,
  UploadCloud,
  UploadIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAnalyzeImage } from './hooks/useAnalyzeImage';
import { MailDataTable } from './components/MailDataTable';
import { useUploadMailData } from '../../../hooks/useUploadMailData';
import { useUploadMailImage } from '../../../hooks/useUploadMailImage';
import { toaster } from '../../../components/ui/toaster';
import { FileUploadField } from './components/FileUploadField';

const mail = {
  receiver: '',
  receiverAddress: '',
  sender: '',
  senderAddress: '',
  title: '',
  type: '',
  urgency: '',
  keyContent: '',
};

export default function Analyze() {
  const [fileUploadWeb, setFileUploadWeb] = useState(false);
  const [fileUploadCloud, setFileUploadCloud] = useState(false);
  const [file, setFile] = useState(null);
  const [mailData, setMailData] = useState(mail);
  const [imagePrediction, setImagePrediction] = useState({});
  const {
    uploadMailData,
    loading: mailUploading,
    error: uploadMailError,
  } = useUploadMailData();
  const {
    uploadImage,
    result,
    loading: analyzing,
    error: analyzeError,
  } = useAnalyzeImage();
  const {
    uploadMailImage,
    loading: imageUploading,
    error: uploadImageError,
  } = useUploadMailImage();

  useEffect(() => {
    if (!result) return;
    setMailData((prev) => ({
      ...prev,
      ...result.analyzeResult,
    }));
    setImagePrediction(result.imagePrediction);
  }, [result]);

  const handleMailUpload = async () => {
    if (!mailData || mailData === mail) return;
    const url = await uploadMailImage(file);
    await uploadMailData(mailData, url);
    if (uploadMailError) {
      toaster.create({
        description: uploadMailError,
        type: 'error',
        closable: true,
      });
      return;
    }
    if (uploadImageError) {
      toaster.create({
        description: uploadImageError,
        type: 'error',
        closable: true,
      });
      return;
    }
    if (!uploadMailError && !uploadImageError) {
      toaster.create({
        description: '郵件上傳成功',
        type: 'success',
        closable: true,
      });
      setFileUploadCloud(true);
    }
    setMailData(mail);
  };

  return (
    <Box animation="fade-in 0.5s">
      <Grid templateColumns="repeat(2, 1fr)" gap="4">
        <GridItem colSpan="1">
          <Card.Root h="100%">
            <Card.Header>
              <Heading size="2xl" textAlign="center">
                郵件上傳
              </Heading>
            </Card.Header>
            <Card.Body>
              <FileUpload.Root w="100%" mb="4" maxFiles="1">
                <FileUpload.HiddenInput />
                {!fileUploadWeb && (
                  <FileUpload.Dropzone
                    w="100%"
                    bg="brand.700"
                    cursor="pointer"
                    _hover={{
                      bg: 'brand.600',
                    }}
                    _dragging={{
                      bg: 'brand.600',
                      borderStyle: 'solid',
                      borderColor: 'brand.50',
                    }}
                  >
                    <UploadCloud size={60} />
                    <FileUpload.DropzoneContent>
                      <Box color="brand.50">Drop file or click here</Box>
                    </FileUpload.DropzoneContent>
                  </FileUpload.Dropzone>
                )}
                <FileUploadField
                  loading={analyzing}
                  analyzeError={analyzeError}
                  setFile={setFile}
                  setFileUpload={setFileUploadWeb}
                  uploadImage={uploadImage}
                  deleteImage={() => {
                    setMailData(mail);
                    setFileUploadCloud(false);
                  }}
                />
              </FileUpload.Root>
              <HStack>
                <Settings size={24} />
                <Heading size="xl">設定</Heading>
              </HStack>
            </Card.Body>
          </Card.Root>
        </GridItem>
        <GridItem colSpan="1">
          <Card.Root>
            <Card.Header>
              <Heading size="2xl" textAlign="center">
                分析結果
              </Heading>
            </Card.Header>
            <Card.Body>
              {analyzing ? (
                <SkeletonText noOfLines={3} gap="4" />
              ) : (
                <>
                  {mailData !== mail && (
                    <>
                      <Box mb="4">
                        <HStack justifyContent="space-between">
                          <HStack>
                            <Shapes size={24} />
                            <Heading size="xl">圖片分類</Heading>
                          </HStack>
                          {/* <Text fontSize="sm">若分類有誤，歡迎提供資料</Text> */}
                        </HStack>
                        <Table.Root size="lg">
                          <Table.Header>
                            <Table.Row>
                              <Table.ColumnHeader w="30%">
                                類別
                              </Table.ColumnHeader>
                              <Table.ColumnHeader>信心度</Table.ColumnHeader>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            {imagePrediction &&
                              Object.keys(imagePrediction).map(
                                (item, index) => (
                                  <Table.Row key={index}>
                                    <Table.Cell>{item}</Table.Cell>
                                    <Table.Cell>
                                      {Math.round(
                                        imagePrediction[item] * 10000
                                      ) / 100}
                                      %
                                    </Table.Cell>
                                  </Table.Row>
                                )
                              )}
                          </Table.Body>
                        </Table.Root>
                      </Box>
                      <Box mb="4">
                        <HStack>
                          <FileText size={24} />
                          <Heading size="xl">郵件資訊</Heading>
                        </HStack>
                        <MailDataTable
                          mailData={mailData}
                          setMailData={setMailData}
                        />
                        <Flex mt="4" justifyContent="space-between">
                          <Button
                            bg="blue.500"
                            onClick={handleMailUpload}
                            loading={mailUploading || imageUploading}
                            loadingText="上傳中..."
                            spinnerPlacement="start"
                            disabled={fileUploadCloud}
                          >
                            <UploadIcon />
                            上傳至資料庫
                          </Button>
                        </Flex>
                      </Box>
                    </>
                  )}
                </>
              )}
            </Card.Body>
          </Card.Root>
        </GridItem>
      </Grid>
    </Box>
  );
}
