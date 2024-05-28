import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { useFormik } from "formik";
import * as Yup from "yup";
import Typography from "@mui/material/Typography";
import styles from "../../../style/index.module.scss"
import { SvgIcon, Stack, Box, Grid, AppBar, TextField } from "@mui/material";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ItemEdit({ open, onClose, selectedRow }) {

  const validateItemForm = Yup.object({
    maphong: Yup
      .string()
      .max(6)
      .required('Vui lòng nhập thông tin vào trường này'),
    mataisan: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    tentaisan: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
  })

  const formik = useFormik({
    initialValues :{
      maphong: '',
      mataisan:'',
      tentaisan:'',
    },
    validationSchema: validateItemForm,
    onSubmit: async (values) => {
        console.log(values);
        onClose();
    }
  })
  useEffect(() => {
    if (selectedRow) {
      formik.setValues({
          maphong: selectedRow.maphong || "",
          mataisan: selectedRow.mataisan || "",
          tentaisan: selectedRow.tentaisan || "",
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
                margin: '5px',
                padding: "16px",
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
                sx={{ margin: '4px', marginTop: '12px' }}
                size="small"
                label="Mã phòng"
                name="maphong" 
                value={formik.values.maphong}
                onChange={formik.handleChange}
                error={formik.touched.maphong && Boolean(formik.errors.maphong)}
                helperText={formik.touched.maphong && formik.errors.maphong}
                variant='outlined'
                fullWidth
              />
              <TextField
                sx={{ margin: "4px", marginTop: "12px" }}
                variant="outlined"
                size="small"
                name="mataisan"
                label="Mã tài sản vật dụng"
                fullWidth
                value={formik.values.mataisan}
                onChange={formik.handleChange}
                error={formik.touched.mataisan && Boolean(formik.errors.mataisan)}
                helperText={formik.touched.mataisan && formik.errors.mataisan}
              />
              <TextField
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                variant="outlined"
                name="tentaisan"
                label="Tên tài sản vật dụng"
                fullWidth
                value={formik.values.tentaisan}
                onChange={formik.handleChange}
                error={formik.touched.tentaisan && Boolean(formik.errors.tentaisan)}
                helperText={formik.touched.tentaisan && formik.errors.tentaisan}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  width: '100%',
                }}
              >
                <Button
                  className={styles.btn}
                  variant="contained"
                  sx={{
                    backgroundColor: '#1C2536',
                  }}
                  onClick={formik.handleSubmit}
                >
                  Thêm
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Dialog>
  );
}
