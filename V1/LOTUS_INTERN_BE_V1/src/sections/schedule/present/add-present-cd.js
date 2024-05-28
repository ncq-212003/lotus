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

export const AddPresentCalendar = ({ openPresent, closePresent, onAddPresentType }) => {
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
    const fileUrl = URL.createObjectURL(file);
    setSelectedFile(fileUrl);
  };

  const formik = useFormik({
    initialValues: {
      presentName: "",
      note: "",
      linkImage: "",
      submit: null,
    },
    validationSchema: Yup.object({
      presentName: Yup
        .string()
        .required('Vui lòng nhập thông tin vào trường này'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        values.linkImage = selectedFile;
        onAddPresentType(values.presentName)
        const data = JSON.stringify(values);
        console.log(values)
        alert("thanh cong")
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="b" component="b" sx={{ margin: "16px", fontSize: "14px" }}>
                  Ảnh quà tặng
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Avatar
                    sx={{
                      width: "115px",
                      height: "135px",
                    }}
                    variant="rounded"
                    src={selectedFile}
                  ></Avatar>
                </Stack>
                <Button size="small" component="label">
                  Tải ảnh lên
                  <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                </Button>
              </Box>
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
