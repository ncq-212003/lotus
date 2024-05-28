import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Stack,
  Box,
  Autocomplete,
  Button,
  Typography,
  Slide,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SchoolAdd() {
  const optionSchool = [
    { value: 1, label: "Việt nam" },
    { value: 2, label: "Nhật bản" },
  ];

  return (
    <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={12} xs={12}>
          <Box
            sx={{
              bgcolor: "#fff",
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Thông tin cơ bản
            </Typography>
            <TextField
              required
              sx={{
                marginBottom: "12px",
              }}
              size="small"
              label="Tên trường học"
              fullWidth
            />
            <Autocomplete
              required
              fullWidth
              size="small"
              options={optionSchool}
              sx={{ margin: "0px auto 13px" }}
              renderInput={(params) => <TextField {...params} label="Quốc gia" />}
            />
            <TextField
              sx={{
                marginBottom: "12px",
              }}
              size="small"
              label="Địa chỉ trường học"
              fullWidth
            />
            <TextField
              sx={{
                marginBottom: "12px",
              }}
              size="small"
              label="Địa chỉ email"
              fullWidth
            />
            <TextField
              sx={{
                marginBottom: "12px",
              }}
              size="small"
              label="Website"
              fullWidth
            />
            <TextField
              sx={{
                marginBottom: "12px",
              }}
              size="small"
              label="Điện thoại"
              fullWidth
            />
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
        </Grid>
      </Grid>
    </Stack>
  );
}
