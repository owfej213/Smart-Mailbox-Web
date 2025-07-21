import {
  Box,
  Card,
  Center,
  Grid,
  GridItem,
  Heading,
  Stack,
  Stat,
} from '@chakra-ui/react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Chart, registerables } from 'chart.js';
import { useEffect, useState } from 'react';
import {
  monthsMailFilter,
  todaysMailFilter,
  yearsMailFilter,
} from '../../../utils/mailsFilters';
import { LineChart } from './components/LineChart';
import { PieChart } from './components/PieChart';
import { Explanation } from './components/Explanation';
import { ReceiveMailsDateRangePicker } from './components/ReceiveMailsDateRangePicker';
import { useMailsDataContext } from '../../../hooks/context/useMailsDataContext';
import { useGetMailsData } from './hooks/useGetMailsData';

Chart.register(...registerables);

export default function Statistics() {
  const { classes, timeClasses, dateArray, setDateRange } = useGetMailsData();
  const { mailsDataCount, mailsData } = useMailsDataContext();

  const [todaysMailCounts, setTodaysMailCounts] = useState(Number);
  const [monthsMailCounts, setMonthsMailCounts] = useState(Number);
  const [yearsMailCounts, setYearsMailCounts] = useState(Number);

  useEffect(() => {
    const { todaysMailsCount } = todaysMailFilter(mailsData);
    setTodaysMailCounts(todaysMailsCount);

    const { thisMonthsMailsCount } = monthsMailFilter(mailsData);
    setMonthsMailCounts(thisMonthsMailsCount);

    const { thisYearsMailsCount } = yearsMailFilter(mailsData);
    setYearsMailCounts(thisYearsMailsCount);
  }, [mailsData]);

  return (
    <Box animation="fade-in 0.5s">
      <Grid templateColumns="repeat(8, 1fr)" gap="4">
        <GridItem colSpan={[8, 8, 4]}>
          <Card.Root h="100%">
            <Card.Header>
              <Heading size="2xl" textAlign="center">
                總覽
              </Heading>
            </Card.Header>

            <Card.Body>
              <Stack spacing="8" direction="column">
                <Stat.Root size="lg" borderWidth="1px" p="4" rounded="md">
                  <Stat.Label color="text">郵件總數</Stat.Label>
                  <Stat.ValueText>{mailsDataCount}</Stat.ValueText>
                </Stat.Root>
                <Stat.Root size="lg" borderWidth="1px" p="4" rounded="md">
                  <Stat.Label color="text">今日郵件數</Stat.Label>
                  <Stat.ValueText>{todaysMailCounts}</Stat.ValueText>
                </Stat.Root>
                <Stat.Root size="lg" borderWidth="1px" p="4" rounded="md">
                  <Stat.Label color="text">本月郵件數</Stat.Label>
                  <Stat.ValueText>{monthsMailCounts}</Stat.ValueText>
                </Stat.Root>{' '}
                <Stat.Root size="lg" borderWidth="1px" p="4" rounded="md">
                  <Stat.Label color="text">今年郵件數</Stat.Label>
                  <Stat.ValueText>{yearsMailCounts}</Stat.ValueText>
                </Stat.Root>
              </Stack>
            </Card.Body>
          </Card.Root>
        </GridItem>
        <GridItem colSpan={[8, 8, 4]}>
          <Card.Root h="100%">
            <Card.Header>
              <Heading size="2xl" textAlign="center">
                分類說明
              </Heading>
            </Card.Header>
            <Card.Body>
              <Explanation />
            </Card.Body>
          </Card.Root>
        </GridItem>
        <GridItem colSpan={[8, 8, 4]}>
          <Card.Root h="100%">
            <Card.Header>
              <Heading size="2xl" textAlign="center">
                郵件總類
              </Heading>
            </Card.Header>
            <Card.Body>
              <Center w="100%" h="400px">
                <PieChart classes={classes} />
              </Center>
            </Card.Body>
          </Card.Root>
        </GridItem>
        <GridItem colSpan={[8, 8, 4]}>
          <Card.Root h="100%">
            <Card.Header>
              <Heading size="2xl" textAlign="center">
                收件日期範圍選擇
              </Heading>
            </Card.Header>
            <Card.Body justifyContent="center">
              <ReceiveMailsDateRangePicker setDateRange={setDateRange} />
            </Card.Body>
          </Card.Root>
        </GridItem>
        <GridItem colSpan={[8, 8, 8]}>
          <Card.Root h="100%">
            <Card.Header>
              <Heading size="2xl" textAlign="center">
                收件日期
              </Heading>
            </Card.Header>
            <Card.Body>
              <LineChart timeClasses={timeClasses} dateArray={dateArray} />
            </Card.Body>
          </Card.Root>
        </GridItem>
      </Grid>
    </Box>
  );
}
