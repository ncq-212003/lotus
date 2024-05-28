import React, { useState, useEffect } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Dialog, Typography, styled, IconButton, SvgIcon, DialogActions } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { useFormik } from "formik";
import * as Yup from "yup";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const TypeAddress = ({ openType, closeType }) => {
  const closeDialog = () => {
    closeType();
  };

  const validationSchema = Yup.object({
    tendiadiem: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
  });

  const initialValues = {
    tendiadiem: "",
    ghichu: "",
    submit: null
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      // e.preventDefault();
      try {
        const data = JSON.stringify(values);
        console.log(values)
        formik.resetForm();
        // return data;
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  })

  return (
    <>
      <BootstrapDialog
        onClose={closeDialog}
        open={openType}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
          Loại địa điểm
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <SvgIcon fontSize="inherit">
            <XCircleIcon />
          </SvgIcon>
        </IconButton>
        <DialogContent dividers>
          <Grid container>
            <TextField
              error={!!(formik.touched.tendiadiem && formik.errors.tendiadiem)}
              helperText={formik.touched.tendiadiem && formik.errors.tendiadiem}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.tendiadiem}
              name="tendiadiem"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Tên địa điểm"
              fullWidth
              variant="outlined"
            />

            <TextField
              error={!!(formik.touched.ghichu && formik.errors.ghichu)}
              helperText={formik.touched.ghichu && formik.errors.ghichu}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.ghichu}
              name="ghichu"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Ghi chú"
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Box style={{ marginTop: "20px" }}>
            <Button
              onClick={formik.handleSubmit}
              variant="contained"
              sx={{
                width: "150px",
                backgroundColor: "#1C2536",
                display: "flex",
                justifyContent: "center",
                margin: "auto",
              }}
            >
              Lưu
            </Button>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};
