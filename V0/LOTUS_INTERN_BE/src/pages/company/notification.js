import React, { useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  SvgIcon
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import NotificationTable from 'src/sections/company/notification/notification-table';
import AddIcon from '@mui/icons-material/Add';
import ArrowBack from '@mui/icons-material/ArrowBack';
import styles from '../../../src/style/index.module.scss'
import Link from '@mui/material/Link';

const Page = () => {

  return (
    <div>
      <Head>
        <title>Thông Báo | Lotus</title>
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
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Thông báo
                </Typography>
              </Stack>
              <div>
                <Link href='/company/notification/add'>
                  <Button
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <AddIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                    sx={{
                      backgroundColor: '#1C2536',
                      margin: '0px 6px'
                    }}
                  >
                    Tạo Thông Báo
                  </Button>
                </Link>
              </div>
            </Stack>
            <NotificationTable />
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
