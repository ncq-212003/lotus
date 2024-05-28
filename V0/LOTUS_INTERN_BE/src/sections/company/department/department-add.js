import {
  Card,
  Stack,
  Typography,
  TextField,
  Button,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  SvgIcon,
  Link,
} from "@mui/material";

export default function DepartmentAdd() {
  const companies = [
    { value: 1, label: "Công ty Apple" },
    { value: 2, label: "Công ty Apple" },
    { value: 3, label: "Công ty Apple " },
    { value: 4, label: "Công ty Samsung" },
    { value: 5, label: "Công ty Samsung " },
    { value: 6, label: "Công ty Game" },
  ];
  const branchs = [
    { value: 1, label: "Trong nước" },
    { value: 2, label: "Nhật Bản" },
    { value: 3, label: "Hàn Quốc" },
  ];
  const aspect = [
    { value: 1, label: "Hoạt động" },
    { value: 2, label: "Dừng hoạt động" },
  ];
  return (
    <>
      <Stack
        spacing={3}
        sx={{
          margin: '38px 0'
        }}
      >
        <Box
          sx={{
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        >
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
            <Grid item sm={12} xs={12} md={6}>
              <Autocomplete
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                fullWidth
                disablePortal
                options={companies}
                renderInput={(params) => <TextField {...params} label="Công ty" />}
              />

              <Stack direction={"row"} spacing={0} alignItems={"center"}>
                <Autocomplete
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  fullWidth
                  disablePortal
                  options={branchs}
                  renderInput={(params) => <TextField {...params} label="Chi nhánh" />}
                />
                <div>
                  <Link href="/company/branch">
                    <Button sx={{ minWidth: 150 }} size="medium">
                      Thêm chi nhánh
                    </Button>
                  </Link>
                </div>
              </Stack>

              <TextField
                fullWidth
                label="Tên phòng ban "
                variant="filled"
                size="small"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
              <TextField
                fullWidth
                label="Mã phòng ban "
                variant="filled"
                size="small"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
            </Grid>

            <Grid item sm={12} xs={12} md={6}>
              <TextField
                fullWidth
                label="Số điện thoại bàn "
                variant="filled"
                size="small"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
              <TextField
                fullWidth
                label="Người phụ trách chính "
                variant="filled"
                size="small"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
              <Autocomplete
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                fullWidth
                disablePortal
                options={aspect}
                renderInput={(params) => <TextField {...params} label="Tình trạng" />}
              />
              <TextField
                fullWidth
                label="Mô tả "
                variant="filled"
                size="small"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1C2536",
              }}
            >
              Thêm
            </Button>
          </Box>
        </Box>
      </Stack>
    </>
  )
}
