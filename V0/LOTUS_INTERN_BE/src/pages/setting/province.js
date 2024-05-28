import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Province from "src/sections/province/province-add.js";



const Page = () => {
  return (
    <>
      <Head>
        <title>Tỉnh thành | Lotus</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl" >
          <Stack spacing={5} >
            <Stack direction="row"  spacing={4} justifyContent={'center'}>
              <Stack spacing={1} >
                <Typography variant="h4">Tỉnh thành</Typography>
              </Stack>
            </Stack>
            <Stack>
                 <Province/>
            </Stack>
            
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
