import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useState } from "react";
import { TableEveryoneCalendar } from "src/sections/schedule/calendar/everyone-table-calendar";
import { EveryoneCalendar } from "src/sections/schedule/calendar/everyone-calendar";

const Page = () => {
  const [IsCalendar, setIscalendar] = useState(false);

  const openHandleCalendar = () => {
    setIscalendar(true);
  };

  const closeHandleCalendar = () => {
    setIscalendar(false);
  };
  return (
    <>
      <Head>
        <title>Danh sách lịch| Lotus</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Danh sách lịch</Typography>
              </Stack>
            </Stack>
          </Stack>
          <EveryoneCalendar />
          {/* <TableEveryoneCalendar /> */}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
