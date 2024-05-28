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

export const AddCustomer = ({ openCustomer, closeCustomer, typeUnionNumber, onAddCustomerType }) => {
  const closeDialog = () => {
    closeCustomer();
  };

  const [unionOptions, setUnionOptions] = useState([
    { id: 1, label: "Nghiệp đoàn 1" },
    { id: 2, label: "Nghiệp đoàn 2" },
    { id: 3, label: "Nghiệp đoàn 3" },
    { id: 4, label: "Nghiệp đoàn 4" },
    { id: 5, label: "Nghiệp đoàn 4" }
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      chooseTradeUnion: unionOptions.find((option) => option.id === typeUnionNumber)?.label || "",
      addressName: "",
      submit: null,
    },
    validationSchema: Yup.object({
      chooseTradeUnion: Yup
        .string()
        .required('Vui lòng nhập thông tin vào trường này'),
      addressName: Yup
        .string()
        .required('Vui lòng nhập thông tin vào trường này'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const data = JSON.stringify(values);
        onAddCustomerType(values.addressName)
        console.log(values.addressName)
        formik.resetForm();
        closeDialog();
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
        open={openCustomer}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
          Thêm khách hàng
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
          <Autocomplete
            onChange={(event, newValue) => formik.setFieldValue("chooseTradeUnion", newValue || "")}
            value={formik.values.chooseTradeUnion}
            name="chooseTradeUnion"
            sx={{ marginTop: "12px" }}
            fullWidth
            size="small"
            options={unionOptions}
            renderInput={(params) => <TextField
              onBlur={formik.handleBlur}
              error={!!(formik.touched.chooseTradeUnion && formik.errors.chooseTradeUnion)}
              helperText={formik.touched.chooseTradeUnion && formik.errors.chooseTradeUnion}
              {...params} label="Chọn nghiệp đoàn" variant="outlined" />}
          />
          <TextField
            error={!!(formik.touched.addressName && formik.errors.addressName)}
            helperText={formik.touched.addressName && formik.errors.addressName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.addressName}
            name="addressName"
            sx={{ marginTop: "12px" }}
            size="small"
            label="Tên khách hàng mới"
            fullWidth
            variant="outlined"
          />
          <Box style={{ marginTop: "20px" }}>
            <Button
              onClick={formik.handleSubmit}
              variant="contained"
              sx={{
                width: "150px",
                display: "flex",
                justifyContent: "center",
                margin: "auto",
                backgroundColor: "#1C2536",
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
