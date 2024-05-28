import { useEffect, useState } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const EveryoneCalendar = (props) => {
  return (
    <>
      <Stack spacing={3} sx={{ p: 2, marginTop: "20px" }}>
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
              <Autocomplete
                sx={{ margin: "12px 0px 0px 0px " }}
                fullWidth
                size="small"
                options={["Phạm Thái An", "Nguyễn Thi Dương", "Đào Văn Đỗ"]}
                renderInput={(params) => <TextField variant="outlined" {...params} label="Chọn nhân viên" />}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <DateTimePicker
                    sx={{ width: "100%", margin: "4px 0px 0px 0px ", marginTop: "12px" }}
                    slotProps={{
                      textField: {
                        size: 'small',
                        variant: 'outlined'
                      }
                    }}
                    label="Ngày bắt đầu"
                    ampm={false} // Đặt ampm thành false để hiển thị giờ 24h
                    format="dd/MM/yyyy HH:mm" // Định dạng để hiển thị ngày, tháng, năm, giờ và phút
                  />
                </Grid>
                <Grid item xs={6}>
                  <DateTimePicker
                    sx={{ width: "100%", margin: "4px 0px 0px 0px ", marginTop: "12px" }}
                    slotProps={{
                      textField: {
                        size: 'small',
                        variant: 'outlined'
                      }
                    }}
                    label="Ngày kết thúc"
                    ampm={false} // Đặt ampm thành false để hiển thị giờ 24h
                    format="dd/MM/yyyy HH:mm" // Định dạng để hiển thị ngày, tháng, năm, giờ và phút
                  />
                </Grid>
              </Grid>
              <Box style={{ marginTop: "20px" }}>
                <Button
                  variant="contained"
                  sx={{
                    width: "200px",
                    backgroundColor: "#1C2536 !important",
                    display: "flex",
                    justifyContent: "center",
                    margin: "auto",
                  }}
                >
                  Tìm kiếm
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};
