import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
    Typography,
    Button,
    SvgIcon,
    alpha
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ArrowLongLeftIcon, ListBulletIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import OverseasStudentAdd from 'src/sections/overseas-student/add/overseas-student-add';
import Link from 'next/link';
import { useApp } from 'src/hooks/use-app';
import { HANDLERS_OVERSEAS_STUDENT } from 'src/contexts/reducer/overseas-student/reducer-overseas-student';
import { actionSetTouched, validateField } from 'src/sections/overseas-student/add/tab-infobasic';

const Page = () => {
    const [state, dispatch] = useApp();
    const { overseasStudent } = state;
    const {
        duHocSinh,
        thongTinCoBan,
        tinhTrangSucKhoe,
        nguyenVongTrungTuyen,
        daoTao,
        quanHeGiaDinh,
        quaTrinhHocTap,
        kinhNghiemTrongNuoc,
        kinhNghiemNgoaiNuoc,
        ghiChuChung,
    } = overseasStudent;

    const handleAdd = () => {
        Object.keys(thongTinCoBan)
            .slice(0, -2)
            .forEach((fieldName) => {
                actionSetTouched(dispatch, "thongTinCoBan", fieldName);
                validateField(dispatch, "thongTinCoBan", fieldName, thongTinCoBan[fieldName]);
            });

        if (Object.values(thongTinCoBan.errors).every((error) => !error)) {
            try {
                dispatch({
                    type: HANDLERS_OVERSEAS_STUDENT.ADD_OVERSEAS_STUDENT,
                    payload: {
                        duHocSinh,
                        thongTinCoBan,
                        tinhTrangSucKhoe,
                        nguyenVongTrungTuyen,
                        daoTao,
                        quanHeGiaDinh,
                        quaTrinhHocTap,
                        kinhNghiemTrongNuoc,
                        kinhNghiemNgoaiNuoc,
                        ghiChuChung,
                    },
                });

                // call api
                // const response = addEmployeApi(overseasStudent);
                console.log(overseasStudent);
            } catch (error) {
                console.error(error);
                return error;
            }
        }

    };

    return (
        <>
            <Head>
                <title>
                    Thêm du học sinh | Lotus
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    spacing={4}
                    sx={{
                        backdropFilter: "blur(6px)",
                        backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
                        position: "-webkit-sticky",
                        position: "sticky",
                        top: 0,
                        padding: { xs: "10px 15px", sm: "15px 30px 8px" },
                        height: { xs: "120px", sm: "64px" },
                        zIndex: 1100,
                    }}
                >
                    <Stack spacing={1}>
                        <Typography variant="h4">
                            Thêm du học sinh
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
                            sx={{
                                backgroundColor: '#1C2536',
                                marginRight: "12px",
                                marginTop: { xs: "-40px", sm: "0px" },
                            }}
                            onClick={handleAdd}
                        >
                            Lưu
                        </Button>
                        <Link href='/overseas-student-before'>
                            <Button
                                startIcon={(
                                    <SvgIcon fontSize="small">
                                        <ArrowLongLeftIcon />
                                    </SvgIcon>
                                )}
                                variant="contained"
                                sx={{
                                    backgroundColor: '#1C2536',
                                    marginTop: { xs: "-40px", sm: "0px" },
                                }}
                            >
                                Quay lại
                            </Button>
                        </Link>
                    </div>
                </Stack>
                <Container maxWidth="xl">
                    <OverseasStudentAdd />
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
