import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Container, Stack, Typography, Button, SvgIcon, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { MarketContext } from "src/contexts/market-context";
import { Avatar } from "@mui/material";
import { ListMarket } from "src/contexts/api/setting/api-market";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Market() {
  const [market, setMarket] = useState([]);
  const router = useRouter();

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="http://localhost:3000/market">
          {window.sessionStorage.setItem("market", JSON.stringify(market[0]))}
          Lotus Ocean 2023 - version v3.9
        </Link>
      </Typography>
    );
  }
  const handleMarketSelection = (marketItem) => {
    router.push("/");
    window.sessionStorage.setItem("market", JSON.stringify(marketItem));
  };

  //listEducationLevel
  React.useEffect(() => {
    const listMarket = async () => {
      const res = await ListMarket();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const markets = res.data.map((market) => ({
          marketName: market.marketName,
          marketId: market.marketId,
          avatar: market.avatar,
        }));
        setMarket(markets);
      }
    };
    listMarket();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar
        position="relative"
        sx={{
          backgroundColor: "#1C2536",
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Chọn thị trường
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #ccc",
                  padding: "5px",
                }}
              >
                <Typography gutterBottom variant="h5" component="h2" sx={{ margin: "0 auto" }}>
                  NHẬT BẢN
                </Typography>
                <Button
                  component="div"
                  type="submit"
                  onClick={() => handleMarketSelection("Nhật Bản")}
                >
                  <Avatar
                    sx={{ width: "100%", height: "100%" }}
                    alt="Nhật bản"
                    src="assets/page/c531d304923a7c65c9b2eb1edc6d8aac.jpg"
                    variant="square"
                  />
                </Button>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #ccc",
                  padding: "5px",
                }}
              >
                <Typography gutterBottom variant="h5" component="h2" sx={{ margin: "0 auto" }}>
                  HÀN QUỐC
                </Typography>
                <Button
                  component="div"
                  type="submit"
                  onClick={() => handleMarketSelection("Hàn Quốc")}
                >
                  <Avatar
                    sx={{ width: "100%", height: "100%" }}
                    alt="Hàn quốc"
                    src="assets/page/52345-seoul-han-quoc-2-700x466.jpg"
                    variant="square"
                  />
                </Button>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #ccc",
                  padding: "5px",
                }}
              >
                <Typography gutterBottom variant="h5" component="h2" sx={{ margin: "0 auto" }}>
                  ÚC
                </Typography>
                <Button component="div" type="submit" onClick={() => handleMarketSelection("Úc ")}>
                  <Avatar
                    sx={{ width: "100%", height: "100%" }}
                    alt="Úc"
                    src="assets/page/van-hoa-uc.jpg"
                    variant="square"
                  />
                </Button>
              </Card>
            </Grid> */}
            {market.map((marketItem) => (
              <Grid item key={marketItem.marketId} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #ccc",
                    padding: "5px",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="h2" sx={{ margin: "0 auto" }}>
                    {marketItem.marketName}
                  </Typography>
                  <Button
                    component="div"
                    type="submit"
                    onClick={() => handleMarketSelection(marketItem)}
                  >
                    <Avatar
                      sx={{ width: "100%", height: "100%" }}
                      alt={marketItem.marketName}
                      src={"https://lotus.i.tisbase.online/" + marketItem.avatar}
                      variant="square"
                    />
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Lotus Ocean
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
