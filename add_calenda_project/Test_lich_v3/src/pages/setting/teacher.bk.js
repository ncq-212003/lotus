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
import { useState } from 'react';
import TeacherAdd from 'src/sections/train/teacher/teacher-add';
import TeacherTable from 'src/sections/train/teacher/teacher-table';

const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <Head>
                <title>
                    Giáo viên | Lotus
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
                                    Giáo viên
                                </Typography>
                            </Stack>
                            <div>
                                <Button
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                            <PlusIcon />
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                    onClick={openDialog}
                                    sx={{
                                        backgroundColor: '#1C2536'
                                    }}
                                >
                                    Thêm
                                </Button>
                            </div>
                        </Stack>
                        <TeacherTable />
                    </Stack>
                </Container>
            </Box>
            <TeacherAdd open={isDialogOpen}
                onClose={closeDialog} />
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
