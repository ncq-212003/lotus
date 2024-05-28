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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import Link from 'next/link';
import CertificateTable from 'src/sections/train/certificate/certificate-table';
import CertificateAdd from 'src/sections/train/certificate/certificate-add';

const Page = () => {
    const [isTableVisible, setIsTableVisible] = useState(true);
    const [isAddMode, setIsAddMode] = useState(false);

    const toggleContent = () => {
        if (isAddMode) {
            setIsTableVisible(true);
            setIsAddMode(false);
        } else {
            setIsTableVisible(false);
            setIsAddMode(true);
        }
    };

    return (
        <>
            <Head>
                <title>
                    Chứng chỉ | Lotus
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
                                    Chứng chỉ
                                </Typography>
                            </Stack>
                            <div>
                                <Button
                                    onClick={toggleContent}
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                            {isAddMode ? <ArrowBackIcon /> : <PlusIcon />}
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#1C2536'
                                    }}
                                >
                                    {isAddMode ? "Quay lại" : "Thêm"}
                                </Button>
                            </div>
                        </Stack>
                        {isTableVisible ? <CertificateTable /> : <CertificateAdd />}
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
