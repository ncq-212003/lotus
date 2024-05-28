import React, { useRef } from 'react';
import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
    Typography,
    Button,
    SvgIcon
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import ItemTable from 'src/sections/setting/item/item-table';
import Link from 'next/link';

const Page = () => {
    const itemTableRef = useRef();

  const handleExportToExcel = () => {
    if (itemTableRef.current) {
      itemTableRef.current.exportToExcel();
    }
  };
    return (
        <>
            <Head>
                <title>
                    Tài Sản - Vật Dụng | Lotus
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
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
                                    Tài Sản - Vật Dụng
                                </Typography>
                            </Stack>
                            <div>
                                <Link href='/setting/item/add'>
                                    <Button
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <PlusIcon />
                                            </SvgIcon>
                                        )}
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#1C2536'
                                        }}
                                    >
                                        Thêm
                                    </Button>

                                </Link>
                                    <Button
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <PlusIcon />
                                            </SvgIcon>
                                        )}
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#1C2536'
                                        }}
                                        onClick={handleExportToExcel}
                                    >
                                        Báo cáo & In
                                    </Button>
                            </div>
                        </Stack>
                        <ItemTable ref={itemTableRef}/>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
