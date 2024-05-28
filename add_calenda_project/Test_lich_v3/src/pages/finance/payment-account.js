import Head from 'next/head';
import {
    Box,
    Button,
    Container,
    Stack,
    SvgIcon,
    Typography,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import TableAccount from 'src/sections/finance/payment-account/table-payment-account';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/solid';

const Page = () => {

    return (
        <>
            <Head>
                <title>
                    Tài khoản| Lotus
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
                                    Tài khoản
                                </Typography>
                            </Stack>
                            <div>
                                <Link href='/finance/payment-account/add'>
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
                            </div>
                        </Stack>
                        <TableAccount />
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
