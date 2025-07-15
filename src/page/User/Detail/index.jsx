import { formateDateYMD } from '../../../utils/dateUtils';
import { Box, Card, Heading, Table } from '@chakra-ui/react';
import { useGetMailData } from './hooks/useGetMailData';

function Detail() {
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

export default Detail;
