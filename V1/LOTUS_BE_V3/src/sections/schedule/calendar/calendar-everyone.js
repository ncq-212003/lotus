import { useEffect, useState } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DateTimePicker } from "@mui/x-date-pickers";
import { TableEveryoneCalendar } from "./calendar-everyone-table";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const EveryoneCalendar = () => {
  // const [selectedValue, setSelectedValue] = useState("");
  // const [selectedDate, setSelectedDate] = useState();
  const [selectedFormik, setSelectedFormik] = useState();
  const person = [
    "Trần Thị Hương",
    "Lê Văn Đức",
    "Phạm Thị Lan",
    "Nguyễn Văn An",
    "Vũ Thị Hằng",
    "Hoàng Minh Thiện"
  ];

  const validationSchema = Yup.object({
    nhanVien: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    ngayBatDau: Yup
      .date()
      .required('Ngày bắt đầu không được để trống'),
    ngayKetThuc: Yup
      .date()
      .required('Ngày kết thúc không được để trống')
      .nullable()
      .test("is-greater", "Ngày kết thúc phải lớn hơn ngày bắt đầu", function (value) {
        const ngayBatDau = this.resolve(Yup.ref("ngayBatDau"));
        return dayjs(value).isAfter(ngayBatDau);

      }),
  });

  const initialValues = {
    nhanVien: "",
    ngayBatDau: '',
    ngayKetThuc: '',
    submit: null
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const data = JSON.stringify(values);
        console.log(values)
        setSelectedFormik(values)
        alert("Thanh cong")
        formik.resetForm();
        // return data;
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  })
  console.log(selectedFormik);
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
                onChange={(event, newValue) => formik.setFieldValue("nhanVien", newValue || "")}
                value={formik.values.nhanVien}
                name="nhanVien"
                sx={{ marginTop: "12px" }}
                fullWidth
                size="small"
                options={person}
                renderInput={(params) => <TextField
                  onBlur={formik.handleBlur}
                  error={!!(formik.touched.nhanVien && formik.errors.nhanVien)}
                  helperText={formik.touched.nhanVien && formik.errors.nhanVien}
                  {...params} label="Tên nhân viên" variant="outlined" />}
              />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      // disableFuture
                      label="Ngày bắt đầu"
                      ampm={false} // 
                      format="DD-MM-YYYY HH:mm"
                      onBlur={formik.handleBlur}
                      value={formik.values.ngayBatDau}
                      sx={{ width: "100%", margin: "4px 0px 0px 0px ", marginTop: "12px" }}
                      onChange={(value) => {
                        // const formattedDate = dayjs(value).format("YYYY-MM-DD HH:mm");
                        formik.setFieldValue("ngayBatDau", value);
                      }}
                      slotProps={{
                        textField: {
                          variant: 'outlined',
                          onBlur: formik.handleBlur,
                          error: !!(formik.touched.ngayBatDau && formik.errors.ngayBatDau),
                          helperText: formik.touched.ngayBatDau && formik.errors.ngayBatDau,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      // disableFuture
                      label="Ngày kết thúc"
                      ampm={false} // 
                      format="DD-MM-YYYY HH:mm"
                      onBlur={formik.handleBlur}
                      value={formik.values.ngayKetThuc}
                      sx={{ width: "100%", margin: "4px 0px 0px 0px ", marginTop: "12px" }}
                      onChange={(value) => {
                        // const formattedDate = dayjs(value).format("YYYY-MM-DD HH:mm");
                        formik.setFieldValue("ngayKetThuc", value);
                      }}
                      slotProps={{
                        textField: {
                          variant: 'outlined',
                          onBlur: formik.handleBlur,
                          error: !!(formik.touched.ngayKetThuc && formik.errors.ngayKetThuc),
                          helperText: formik.touched.ngayKetThuc && formik.errors.ngayKetThuc,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Box style={{ marginTop: "20px" }}>
                <Button
                  variant="contained"
                  onClick={formik.handleSubmit}
                  sx={{
                    width: "160px",
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
        <TableEveryoneCalendar
          // valueEmployee={selectedValue}
          // valueDate={selectDate}
          findInformation={selectedFormik}
        />
      </Stack>

    </>
  );
};
