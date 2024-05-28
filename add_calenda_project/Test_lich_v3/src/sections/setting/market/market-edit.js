import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SvgIcon, Stack, Box, Grid, AppBar, TextField } from "@mui/material";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MarketEdit({ open, onClose, selectedRow }) {
  const validationSchema = Yup.object({
    manuoc: Yup.string().max(6).required('Vui lòng nhập thông tin vào trường này'),
    tennuoc: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
  })

  const formik = useFormik({
    initialValues: {
      manuoc: '',
      tennuoc: '',
      gioithieu: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      onClose();
    }
  })
  useEffect(() => {
    if (selectedRow) {
      formik.setValues({
        manuoc: selectedRow.manuoc || "",
        tennuoc: selectedRow.tennuoc || "",
        gioithieu: selectedRow.gioithieu || "",
      })
    }
  }, [selectedRow]);

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Stack sx={{ p: 2, marginTop: "20px" }}>
        <Typography sx={{ marginBottom: '20px' }} variant="h6" component="div">
          SỬA THÔNG TIN
        </Typography>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            sm={12}
            md={12}
            xs={12}
          >
            <Box
              sx={{
                padding: "16px",
                margin: '5px',
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ marginBottom: "16px" }}
              >
                Thông tin cơ bản
              </Typography>
              <TextField
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                variant="outlined"
                label="Mã Nước"
                fullWidth
                name="manuoc"
                value={formik.values.manuoc}
                onChange={formik.handleChange}
                error={formik.touched.manuoc && Boolean(formik.errors.manuoc)}
                helperText={formik.touched.manuoc && formik.errors.manuoc}
              />
              <TextField
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                variant="outlined"
                label="Tên Nước"
                name="tennuoc"
                value={formik.values.tennuoc}
                onChange={formik.handleChange}
                error={formik.touched.tennuoc && Boolean(formik.errors.tennuoc)}
                helperText={formik.touched.tennuoc && formik.errors.tennuoc}
                fullWidth
              />
              <TextField
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                variant="outlined"
                label="Giới Thiệu Chi Tiết"
                name="gioithieu"
                value={formik.values.gioithieu}
                onChange={formik.handleChange}
                fullWidth
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  width: '100%',
                  marginTop: '20px'
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#1C2536',
                    '&:hover': {
                      backgroundColor: '#0c4da2',
                    },
                  }}
                  onClick={formik.handleSubmit}
                >
                  Lưu
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Dialog>
  );
}
