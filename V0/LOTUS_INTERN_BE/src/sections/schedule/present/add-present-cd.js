import { DateTimePicker } from "@mui/x-date-pickers";
import React, { useState, useEffect } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Dialog, Typography, styled, IconButton, SvgIcon, DialogActions } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import Avatar from "@mui/material/Avatar";
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

export const AddPresentCalendar = ({ openPresent, closePresent }) => {
  const closeDialog = () => {
    closePresent();
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const formik = useFormik({
    initialValues: {
      presentName: "",
      note: "",
      avatar: "",
      submit: null,
    },
    // validationSchema: Yup.object({
    //   presentName: Yup
    //     .string()
    //     .required('Tên quà tặng không được để trống'),
    // }),
    onSubmit: async (values, helpers) => {
      // e.preventDefault();
      try {
        const data = JSON.stringify(values);
        console.log(values)
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
        open={openPresent}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
          Thêm quà tặng
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
          <Box sx={{ typography: "body1" }}>
            <Grid container>
              <TextField
                error={!!(formik.touched.presentName && formik.errors.presentName)}
                helperText={formik.touched.presentName && formik.errors.presentName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.presentName}
                name="presentName"
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Tên quà tặng"
                fullWidth
                variant="outlined"
              />

              <TextField
                error={!!(formik.touched.note && formik.errors.note)}
                helperText={formik.touched.note && formik.errors.note}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.note}
                name="note"
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Ghi chú"
                multiline
                rows={2}
                fullWidth
                variant="outlined"
              />

              <Stack direction="column" spacing={1} mt={3}>
                <Avatar
                  sx={{
                    width: "100px",
                    height: "120px",
                    marginLeft: "10px"
                  }}
                  variant="rounded"
                  src={selectedFile}
                ></Avatar>
                <Button size="small" component="label" sx={{ fontSize: "12px" }}>
                  Tải ảnh
                  <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                </Button>
              </Stack>
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
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};
