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
import ClassroomAdd from 'src/sections/setting/classroom/classroom-add';
import ClassroomTable from 'src/sections/setting/classroom/classroom-table';

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
                    Lớp học | Lotus
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
                                    Lớp học
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
                        <ClassroomTable />
                    </Stack>
                </Container>
            </Box>
            <ClassroomAdd open={isDialogOpen}
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
