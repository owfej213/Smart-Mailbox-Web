import { formateDateYMD } from '../../../utils/dateUtils';
import {
  Box,
  Button,
  Card,
  CloseButton,
  Dialog,
  Heading,
  Table,
  Text,
} from '@chakra-ui/react';
import { useGetMailData } from './hooks/useGetMailData';
import Icon from '../../../components/ui/Icon';
import { useDeleteMail } from '../../../hooks/useDeleteMail';
import { useNavigate } from 'react-router-dom';

export default function Detail() {
  const navigate = useNavigate();
  const { deleteMail } = useDeleteMail();
  const { maildata } = useGetMailData();
  const {
    createAt,
    title,
    type,
    receiver,
    receiverAddress,
    sender,
    senderAddress,
    urgency,
    keyContent,
    uid,
  } = maildata || {};

  return (
    <>
      <Box animation="fade-in 0.5s">
        <Card.Root>
          <Card.Header>
            <Heading size="2xl" textAlign="center">
              郵件細節
            </Heading>
          </Card.Header>
          <Card.Body>
            <Table.Root size="lg">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader w="20%">項目</Table.ColumnHeader>
                  <Table.ColumnHeader>內容</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>送達日期</Table.Cell>
                  <Table.Cell>{formateDateYMD(createAt)}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>信件主題</Table.Cell>
                  <Table.Cell>{title}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>類型</Table.Cell>
                  <Table.Cell>{type}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>收信人</Table.Cell>
                  <Table.Cell>{receiver}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>收信人地址</Table.Cell>
                  <Table.Cell>{receiverAddress}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>寄件人或單位</Table.Cell>
                  <Table.Cell>{sender}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>寄件地址</Table.Cell>
                  <Table.Cell>{senderAddress}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>緊急性</Table.Cell>
                  <Table.Cell>{urgency}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>關鍵內容</Table.Cell>
                  <Table.Cell>{keyContent}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button bg="red.500">
                  <Icon name="Trash2" color="white" size={32} />
                  刪除郵件
                </Button>
              </Dialog.Trigger>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content bg="brand.700">
                  <Dialog.CloseTrigger />
                  <Dialog.Header>
                    <Dialog.Title>刪除確認</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Text>確定要刪除此郵件嗎？此操作無法撤銷。</Text>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button
                        variant="outline"
                        color="brand.50"
                        _hover={{
                          bg: 'brand.600',
                        }}
                      >
                        取消
                      </Button>
                    </Dialog.ActionTrigger>
                    <Button
                      bg="red.500"
                      onClick={() => {
                        deleteMail(uid);
                        navigate('/history');
                      }}
                    >
                      確認
                    </Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton
                      size="sm"
                      fill="brand.50"
                      _hover={{
                        bg: 'brand.600',
                      }}
                    />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Dialog.Root>
          </Card.Footer>
        </Card.Root>
        <Card.Root mt="4">
          <Card.Header>
            <Heading size="2xl" textAlign="center">
              圖片
            </Heading>
          </Card.Header>
          <Card.Body></Card.Body>
        </Card.Root>
      </Box>
    </>
  );
}
