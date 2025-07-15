import { Table } from '@chakra-ui/react';

export function Explanation() {
  const mailsClasses = [
    { name: '金融信封', value: '保險/銀行/股票/投資' },
    { name: '學校信封', value: 'XX大學、高中/成績單/學校通知' },
    { name: '費用信封', value: '電費/瓦斯費/水費/罰單/繳費單/繳稅' },
    { name: '私人信封', value: '朋友/私密訊息' },
    { name: '公文信封', value: '公家單位' },
    { name: '活動傳單', value: '社區活動/慈善宣傳' },
    { name: '廣告傳單', value: '補習班/店家/產品/優惠/折價券' },
    { name: '書刊', value: '周刊/月刊/雜誌' },
  ];

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>分類名稱</Table.ColumnHeader>
          <Table.ColumnHeader>種類</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {mailsClasses.map((item, index) => (
          <Table.Row key={index}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.value}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
