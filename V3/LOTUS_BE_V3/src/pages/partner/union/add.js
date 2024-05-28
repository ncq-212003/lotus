import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ArrowLongLeftIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import UnionAdd from "src/sections/partner/union/union-add";
import Link from "next/link";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_UNION } from "src/contexts/reducer/partner/reducer-union";
import { actionSetTouchedRow, validateFieldRowContact } from "src/sections/partner/union/tab-contact";
import { actionSetTouched, validateFieldInfobasic } from "src/sections/partner/union/tab-infobasic";

const Page = () => {
  const [state, dispatch] = useApp();
  const { union } = state;
  const { unions, basicInfo, contact } = union;

  const handleAdd = () => {
    Object.keys(basicInfo)
      .slice(0, -2)
      .forEach((fieldName) => {
        actionSetTouched(dispatch, "basicInfo", fieldName);
        validateFieldInfobasic(dispatch, "basicInfo", fieldName, basicInfo[fieldName]);
      });

    contact.map((fieldName, index) => {
      Object.keys(fieldName)
        .slice(0, -2)
        .forEach((fieldNameRow) => {
          actionSetTouchedRow(dispatch, "contact", index, fieldNameRow);
          validateFieldRowContact(
            dispatch,
            "contact",
            index,
            fieldNameRow,
            fieldName[fieldNameRow]
          );
        });
    });



    if (
      Object.values(basicInfo.errors).every((error) => error === null) &&
      contact.every((fieldName) =>
        Object.values(fieldName.errors).every((error) => error === null)
      )
    ) {
      try {
        dispatch({
          type: HANDLERS_UNION.ADD_UNION,
          payload: {
            basicInfo,
            contact,
          },
        });

        console.log(unions);
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
