import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ArrowLongLeftIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import InternAdd from "src/sections/intern/add/intern-add";
import Link from "next/link";
import { alpha } from "@mui/material/styles";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_INTERN } from "src/contexts/reducer/intern/reducer-intern";
import {
  actionSetTouched,
  validateField,
  validateFieldInfobasic,
} from "src/sections/intern/add/tab-infobasic";
import {
  actionSetTouchedRow,
  validateFieldRowFamilyRelationShip,
} from "src/sections/intern/add/tab-familyrelationship";
import { validateFieldHealthCondition } from "src/sections/intern/add/tab-healthcondition";
import { validateFieldTrainIQ } from "src/sections/intern/add/tab-trainIQ";
import { validateFieldRowStudyProcess } from "src/sections/intern/add/tab-studyprocess";
import { validateFieldRowWorkexperienceDomestical } from "src/sections/intern/add/tab-workexperience-domestically";
import { validateFieldRowWorkexperienceInternational } from "src/sections/intern/add/tab-workexperience-internationally";

const Page = () => {
  const [state, dispatch] = useApp();
  const { intern } = state;
  const {
    thucTapSinh,
    thongTinCoBan,
    tinhTrangSucKhoe,
    daoTao,
    quanHeGiaDinh,
    quaTrinhHocTap,
    kinhNghiemTrongNuoc,
    kinhNghiemNgoaiNuoc,
  } = intern;

  const handleAdd = () => {
    Object.keys(thongTinCoBan)
      .slice(0, -2)
      .forEach((fieldName) => {
        actionSetTouched(dispatch, "thongTinCoBan", fieldName);
        validateFieldInfobasic(dispatch, "thongTinCoBan", fieldName, thongTinCoBan[fieldName]);
      });

    Object.keys(tinhTrangSucKhoe)
      .slice(0, -2)
      .forEach((fieldName) => {
        actionSetTouched(dispatch, "tinhTrangSucKhoe", fieldName);
        validateFieldHealthCondition(
          dispatch,
          "tinhTrangSucKhoe",
          fieldName,
          tinhTrangSucKhoe[fieldName]
        );
      });

    Object.keys(daoTao)
      .slice(0, -2)
      .forEach((fieldName) => {
        actionSetTouched(dispatch, "daoTao", fieldName);
        validateFieldTrainIQ(dispatch, "daoTao", fieldName, daoTao[fieldName]);
      });

    quanHeGiaDinh.map((fieldName, index) => {
      Object.keys(fieldName)
        .slice(0, -2)
        .forEach((fieldNameRow) => {
          actionSetTouchedRow(dispatch, "quanHeGiaDinh", index, fieldNameRow);
          validateFieldRowFamilyRelationShip(
            dispatch,
            "quanHeGiaDinh",
            index,
            fieldNameRow,
            fieldName[fieldNameRow]
          );
        });
    });

    quaTrinhHocTap.map((fieldName, index) => {
      Object.keys(fieldName)
        .slice(0, -2)
        .forEach((fieldNameRow) => {
          actionSetTouchedRow(dispatch, "quaTrinhHocTap", index, fieldNameRow);
          validateFieldRowStudyProcess(
            dispatch,
            "quaTrinhHocTap",
            index,
            fieldNameRow,
            fieldName[fieldNameRow]
          );
        });
    });

    kinhNghiemTrongNuoc.map((fieldName, index) => {
      Object.keys(fieldName)
        .slice(0, -2)
        .forEach((fieldNameRow) => {
          actionSetTouchedRow(dispatch, "kinhNghiemTrongNuoc", index, fieldNameRow);
          validateFieldRowWorkexperienceDomestical(
            dispatch,
            "kinhNghiemTrongNuoc",
            index,
            fieldNameRow,
            fieldName[fieldNameRow]
          );
        });
    });

    kinhNghiemNgoaiNuoc.map((fieldName, index) => {
      Object.keys(fieldName)
        .slice(0, -2)
        .forEach((fieldNameRow) => {
          actionSetTouchedRow(dispatch, "kinhNghiemNgoaiNuoc", index, fieldNameRow);
          validateFieldRowWorkexperienceInternational(
            dispatch,
            "kinhNghiemNgoaiNuoc",
            index,
            fieldNameRow,
            fieldName[fieldNameRow]
          );
        });
    });

    if (
      Object.values(thongTinCoBan.errors).every((error) => error === null) &&
      Object.values(tinhTrangSucKhoe.errors).every((error) => error === null) &&
      Object.values(daoTao.errors).every((error) => error === null) &&
      quanHeGiaDinh.every((fieldName) =>
        Object.values(fieldName.errors).every((error) => error === null)
      ) &&
      quaTrinhHocTap.every((fieldName) =>
        Object.values(fieldName.errors).every((error) => error === null)
      ) &&
      kinhNghiemTrongNuoc.every((fieldName) =>
        Object.values(fieldName.errors).every((error) => error === null)
      ) &&
      kinhNghiemNgoaiNuoc.every((fieldName) =>
        Object.values(fieldName.errors).every((error) => error === null)
      )
    ) {
      try {
        dispatch({
          type: HANDLERS_INTERN.ADD_INTERN,
          payload: {
            thongTinCoBan,
            tinhTrangSucKhoe,
            daoTao,
            quanHeGiaDinh,
            quaTrinhHocTap,
            kinhNghiemTrongNuoc,
            kinhNghiemNgoaiNuoc,
          },
        });

        console.log(thucTapSinh);
        // const response = addEmployeApi('/Employees/Add', employees);
      } catch (error) {
        console.error(error);
        return error;
      }
    }
  };

  return (
    <>
      <Head>
        <title>Thực tập sinh | Lotus</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
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
            <Typography variant="h4">Thực tập sinh</Typography>
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
            <Link href="/intern-before">
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
          <InternAdd />
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
