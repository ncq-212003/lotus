import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import AddEmployee from "src/sections/company/employee/add/employee-add";
import axios from "axios";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { alpha } from "@mui/material/styles";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_EMPLOYEE } from "src/contexts/reducer/company/reducer-employee";
import { useState } from "react";
import SnackbarAlert from "src/components/action-notification";
import {
  actionSetTouched,
  validateFieldInfobasic,
} from "src/sections/company/employee/add/tab-infobasic";
import { validateFieldHealthCondition } from "src/sections/company/employee/add/tab-healthcondition";
import { addEmployeeApi } from "src/contexts/api/company/api-employee";
import { validateFieldAccessSystem } from "src/sections/company/employee/add/tab-systemAccess";

const Page = () => {
  const [state, dispatch] = useApp();
  const { employee } = state;
  const { basicInfo, healthCondition, accessSystem, generalNotes } = employee;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isSuccess, setIsSuccess] = useState(true);

  const handleAdd = async () => {
    Object.keys(basicInfo)
      .slice(0, -2)
      .forEach((fieldName) => {
        actionSetTouched(dispatch, "basicInfo", fieldName);
        validateFieldInfobasic(dispatch, "basicInfo", fieldName, basicInfo[fieldName]);
      });

    Object.keys(healthCondition)
      .slice(0, -2)
      .forEach((fieldName) => {
        actionSetTouched(dispatch, "healthCondition", fieldName);
        validateFieldHealthCondition(
          dispatch,
          "healthCondition",
          fieldName,
          healthCondition[fieldName]
        );
      });

    Object.keys(accessSystem)
      .slice(0, -2)
      .forEach((fieldName) => {
        actionSetTouched(dispatch, "accessSystem", fieldName);
        validateFieldAccessSystem(dispatch, "accessSystem", fieldName, accessSystem[fieldName]);
      });

    const noErrors =
      Object.values(basicInfo.errors).every((error) => error === null) &&
      Object.values(accessSystem.errors).every((error) => error === null) &&
      Object.values(healthCondition.errors).every((error) => error === null);

    console.log(noErrors);

    if (noErrors) {
      try {
        const response = await addEmployeeApi(employee);
        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Dữ liệu đã được gửi thành công.");
          setSnackbarOpen(true);
          dispatch({
            type: HANDLERS_EMPLOYEE.RESET_EMPLOYEE,
          });
          setIsSuccess(true);
        } else {
          console.log(response);
          setSnackbarSeverity("error");
          setSnackbarMessage("Đã xảy ra lỗi khi gửi dữ liệu!");
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.log(error);
        setSnackbarSeverity("error");
        setSnackbarMessage("Thêm thất bại!");
        setSnackbarOpen(true);
      }
    }
  };

  // console.log("ngoai", employees);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Head>
        <title>Nhân viên | Lotus</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
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
            <Typography variant="h4">Thêm nhân viên</Typography>
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
            <Link href="/company/employee">
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <ArrowLongLeftIcon />
                  </SvgIcon>
                }
                variant="contained"
                sx={{
                  backgroundColor: "#1C2536",
                  marginTop: { xs: "-40px", sm: "0px" },
                }}
              >
                Quay lại
              </Button>
            </Link>
          </div>
        </Stack>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <AddEmployee isSuccess={isSuccess} setSuccess={setIsSuccess}/>
          </Stack>
        </Container>
        <SnackbarAlert
          open={snackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={handleCloseSnackbar}
        />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
