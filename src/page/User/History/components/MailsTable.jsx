import { Card, Table, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formateDateYMD } from '../../../../utils/dateUtils';

export function MailsTable({ mails, ...props }) {
  return (
    <Card.Root mt="4" {...props}>
      <Card.Body>
        <Table.Root variant="dark.outline" size="lg">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>收件日期</Table.ColumnHeader>
              <Table.ColumnHeader>郵件標題</Table.ColumnHeader>
              <Table.ColumnHeader>收件人</Table.ColumnHeader>
              <Table.ColumnHeader>緊急度</Table.ColumnHeader>
              <Table.ColumnHeader>細節</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {mails &&
              mails.map((mail) => (
                <Table.Row
                  key={mail.createAt}
                  bg={mail.view.isNew ? 'danger.700' : 'brand.700'}
                  animation={mail.view.isNew ? 'fade-in 0.5s' : ''}
                >
                  <Table.Cell>{formateDateYMD(mail.createAt)}</Table.Cell>
                  <Table.Cell>{mail.title}</Table.Cell>
                  <Table.Cell>{mail.receiver}</Table.Cell>
                  <Table.Cell>{mail.urgency}</Table.Cell>
                  <Table.Cell>
                    <Text
                      as={Link}
                      to={`/detail/${mail.uid}`}
                      color="teal.600"
                      _hover={{ color: 'teal.400' }}
                    >
                      查看
                    </Text>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table.Root>
      </Card.Body>
    </Card.Root>
  );
}

MailsTable.propTypes = {
  mails: PropTypes.array,
};
