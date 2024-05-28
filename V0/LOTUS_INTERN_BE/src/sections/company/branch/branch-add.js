// import {
//     Grid,
//     Stack,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     Autocomplete,
//     TextField,
//     Button
//   } from "@mui/material";

//   const companies = [
//     { value: 1, label: "Công ty Apple" },
//     { value: 2, label: "Công ty Apple" },
//     { value: 3, label: "Công ty Apple " },
//     { value: 4, label: "Công ty Samsung" },
//     { value: 5, label: "Công ty Samsung " },
//     { value: 6, label: "Công ty Game" },
//   ];
//   const location = [
//       { value: 1, label: "Trong nước" },
//       { value: 2, label: "Nhật Bản" },
//       { value: 3, label: "Hàn Quốc" }
//     ];
//   export default function BranchAdd() {
//     return (
//       <>
//         <Stack spacing={3} >
//           <Grid container justifyContent={'center'}>
//             <Grid item xs={8}>
//               <Autocomplete
//                 options={companies}
//                 renderInput={(params) => <TextField {...params} label="Tên công ty" />}
//               />
//                <TextField
//                 fullWidth
//                 label="Tên phòng ban "
//                 variant="filled"
//                 sx={{ margin: "4px", marginTop: "12px" }}
//               />
//                <TextField
//                 fullWidth
//                 label="Địa chỉ"
//                 variant="filled"
//                 sx={{ margin: "4px", marginTop: "12px" }}
//               />
//                <TextField
//                 fullWidth
//                 label="Số điện thoại "
//                 variant="filled"
//                 sx={{ margin: "4px", marginTop: "12px" }}
//               />
//                <TextField
//                 fullWidth
//                 label="Người phụ trách chính "
//                 variant="filled"
//                 sx={{ margin: "4px", marginTop: "12px" }}
//               />
//                <Autocomplete
//                 sx={{ margin: "4px", marginTop: "12px" }}
//                 options={location}
//                 renderInput={(params) => <TextField {...params} label="Chọn quốc gia" />}
//               />
//             <Button variant="contained" fullWidth  sx={{ margin: "4px", marginTop: "64px" }}>Tạo chi nhánh</Button>
//             </Grid>
//           </Grid>
//         </Stack>
//       </>
//     );
//   }


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

export default function BranchAdd() {
  const companies = [
    { value: 1, label: "Công ty Apple" },
    { value: 2, label: "Công ty Apple" },
    { value: 3, label: "Công ty Apple " },
    { value: 4, label: "Công ty Samsung" },
    { value: 5, label: "Công ty Samsung " },
    { value: 6, label: "Công ty Game" },
  ];
  const location = [
    { value: 1, label: "Trong nước" },
    { value: 2, label: "Nhật Bản" },
    { value: 3, label: "Hàn Quốc" }
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
          <Grid container justifyContent={'center'}>
            <Grid item xs={8}>
              <Autocomplete
                options={companies}
                renderInput={(params) => <TextField {...params} label="Tên công ty" />}
              />
              <TextField
                fullWidth
                label="Tên phòng ban "
                variant="filled"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
              <TextField
                fullWidth
                label="Địa chỉ"
                variant="filled"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
              <TextField
                fullWidth
                label="Số điện thoại "
                variant="filled"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
              <TextField
                fullWidth
                label="Người phụ trách chính "
                variant="filled"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
              <Autocomplete
                sx={{ margin: "4px", marginTop: "12px" }}
                options={location}
                renderInput={(params) => <TextField {...params} label="Chọn quốc gia" />}
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
