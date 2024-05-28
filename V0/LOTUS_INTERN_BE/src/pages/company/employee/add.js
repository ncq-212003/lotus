import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useState, useEffect, useMemo, useCallback } from "react";
import { applyPagination } from "src/utils/apply-pagination";
import { useSelection } from "src/hooks/use-selection";
import AddEmployee from "src/sections/company/employee/employee-add";
import axios from "axios";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { alpha } from "@mui/material/styles";
import { useStoreEmployee, addEmployees } from "src/contexts/employee-context";

const Page = () => {
  const [state, dispatch] = useStoreEmployee();
  const { employees, basicInfo, healthCondition } = state;
  const {
    avatar,
    employeeId,
    employeeCode,
    deparment,
    role,
    citizenIdentity,
    issuedBy,
    dateRange,
    lastName,
    middleName,
    firstName,
    city,
    district,
    ward,
    address,
    email,
    phone,
    deskPhone,
    contractSigningDate,
    dob,
    gender,
    educationalLevel,
    marriageStatus,
    description,
    loginName,
    password,
    confirmPassword,
    status,
  } = basicInfo;
  const {
    bloodGroup,
    weight,
    height,
    isAlcohol,
    isSmoke,
    eyesightLeft,
    eyesightRight,
    preferredHand,
  } = healthCondition;

  const handleAdd = () => {
    const basicInfoData = {
      avatar,
      employeeId,
      employeeCode,
      deparment,
      role,
      citizenIdentity,
      issuedBy,
      dateRange,
      lastName,
      middleName,
      firstName,
      city,
      district,
      ward,
      address,
      email,
      phone,
      deskPhone,
      contractSigningDate,
      dob,
      gender,
      educationalLevel,
      marriageStatus,
      description,
      loginName,
      password,
      confirmPassword,
      status,
    };

    const healthConditionData = {
      bloodGroup,
      weight,
      height,
      isAlcohol,
      isSmoke,
      eyesightLeft,
      eyesightRight,
      preferredHand,
    };

    dispatch(addEmployees("basicInfo", basicInfoData));
    dispatch(addEmployees("healthCondition", healthConditionData));
  };
  console.log(employees);

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
            <AddEmployee />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
