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
  Table,
  VStack,
  useFileUploadContext,
} from '@chakra-ui/react';
import {
  ArrowRight,
  Settings,
  Trash2,
  UploadCloud,
  UploadIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import EditableControls from '../../../components/ui/EditableControls';

const FileUploadList = ({ setFileUpload }) => {
  const fileUpload = useFileUploadContext();
  const file = fileUpload.acceptedFiles[0];

  useEffect(() => {
    if (file) {
      setFileUpload(true);
    }
  }, [file, setFileUpload]);

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
              >
                開始分析
                <ArrowRight size={24} />
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
};

FileUploadList.propTypes = {
  setFileUpload: PropTypes.func.isRequired,
};

export default function Analyze() {
  const [fileUpload, setFileUpload] = useState(Boolean);
  return (
    <>
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
                <FileUpload.Root w="100%" maxFiles="1">
                  <FileUpload.HiddenInput />
                  {!fileUpload && (
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
                  <FileUploadList setFileUpload={setFileUpload} />
                  <HStack>
                    <Settings size={24} />
                    <Heading size="xl">設定</Heading>
                  </HStack>
                </FileUpload.Root>
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
                <Table.Root size="lg">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader w="30%">項目</Table.ColumnHeader>
                      <Table.ColumnHeader>內容</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>送達日期</Table.Cell>
                      <Table.Cell>
                        <EditableControls />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>信件主題</Table.Cell>
                      <Table.Cell>
                        <EditableControls />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>類型</Table.Cell>
                      <Table.Cell>
                        <EditableControls />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>收信人</Table.Cell>
                      <Table.Cell>
                        <EditableControls />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>收信人地址</Table.Cell>
                      <Table.Cell>
                        <EditableControls />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>寄件人或單位</Table.Cell>
                      <Table.Cell>
                        <EditableControls />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>寄件地址</Table.Cell>
                      <Table.Cell>
                        <EditableControls />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>緊急性</Table.Cell>
                      <Table.Cell>
                        <EditableControls />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>關鍵內容</Table.Cell>
                      <Table.Cell>
                        <EditableControls />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root>
                <Flex mt="4" justifyContent="space-between">
                  <Button bg="green.500">
                    <UploadIcon />
                    上傳至資料庫
                  </Button>
                  <Button bg="red.500">
                    <Trash2 />
                    清除資料
                  </Button>
                </Flex>
              </Card.Body>
            </Card.Root>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
