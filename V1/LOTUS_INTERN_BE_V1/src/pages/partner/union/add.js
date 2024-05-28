import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ArrowLongLeftIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import UnionAdd from "src/sections/partner/union/union-add";
import Link from "next/link";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_EMPLOYEE, HANDLERS_UNION } from "src/contexts/reducer/partner/reducer-union";

const Page = () => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const [state, dispatch] = useApp();
  const { union } = state;
  const { unions, basicInfo, contact } = union;

  const handleAdd = () => {
    try {
      dispatch({
        type: HANDLERS_UNION.ADD_UNION,
        payload: { basicInfo, contact },
      });
      // setSnackbarSeverity("success");
      // setSnackbarMessage("Dữ liệu đã được gửi thành công.");
      // setSnackbarOpen(true);
      // const response = addEmployeApi('/Employees/Add', employees);
      console.log(unions);
    } catch (error) {
      console.error(error);
      return error;
    }
  };


  return (
    <>
      <Head>
        <title>Nghiệp đoàn | Lotus</title>
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
                <Typography variant="h4">Nghiệp đoàn</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  sx={{
                    backgroundColor: "#1C2536",
                    marginRight: "12px",
                    marginTop: { xs: "-40px", sm: "0px" },
                  }}
                  onClick={handleAdd}
                >
                  Lưu
                </Button>
                <Link href="/partner/union">
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowLongLeftIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    sx={{
                      backgroundColor: "#1C2536",
                    }}
                  >
                    Quay lại
                  </Button>
                </Link>
              </div>
            </Stack>
            <UnionAdd />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
