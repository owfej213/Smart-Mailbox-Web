import { Table } from '@chakra-ui/react';
import EditableControls from '../../../../components/ui/EditableControls';
import propTypes from 'prop-types';

export function MailDataTable({ mailData, setMailData }) {
  const handleChange = (value, name) => {
    setMailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const data = {
    receiver: '收信人',
    receiverAddress: '收信人地址',
    sender: '寄件人或單位',
    senderAddress: '寄件地址',
    title: '信件主題',
    type: '類型',
    urgency: '緊急性',
    keyContent: '關鍵內容',
  };

  return (
    <Table.Root size="lg">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader w="30%">項目</Table.ColumnHeader>
          <Table.ColumnHeader>內容</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.keys(mailData).map((key, index) => (
          <Table.Row key={index} h="80px">
            <Table.Cell>{data[key]}</Table.Cell>
            <Table.Cell>
              <EditableControls
                value={mailData[key] || ''}
                onValueChange={(value) => handleChange(value, key)}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

MailDataTable.propTypes = {
  mailData: propTypes.object.isRequired,
  setMailData: propTypes.func.isRequired,
};
