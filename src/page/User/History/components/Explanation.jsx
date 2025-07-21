import { Table } from '@chakra-ui/react';

export function Explanation() {
  return (
    <Table.Root size="sm">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>緊急度</Table.ColumnHeader>
          <Table.ColumnHeader>解釋</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>高</Table.Cell>
          <Table.Cell>具時效性與繳費、公家機關相關之郵件</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>中</Table.Cell>
          <Table.Cell>建議使用者查看之郵件</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>無</Table.Cell>
          <Table.Cell>無限期，可不需查看之郵件</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
}
