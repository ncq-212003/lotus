import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Box,
    Autocomplete,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EducationLevelAdd({ open, onClose }) {
    const validationSchema = Yup.object({
      maTrinhdo: Yup.string().max(6).required('Vui lòng nhập thông tin vào trường này'),
      tenTrinhdo: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    });
  
    const initialValues = {
      maTrinhdo: '',
      tenTrinhdo: '',
      moTa: '',
    };
  
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values, helpers) => {
        try {
          const data = JSON.stringify(values);
          alert('Thêm thành công!');
          console.log(data);
          return data;
        } catch (err) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      },
    });
  
    return (
      <Stack spacing={3} sx={{ p: 2, marginTop: '64px' }}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12}>
            <Box
              sx={{
                padding: '16px',
                border: '1px solid #ccc',
                borderRadius: '6px',
              }}
            >
              <Typography variant="h6" component="h2" sx={{ marginBottom: '16px' }}>
                Thông tin cơ bản
              </Typography>
              <TextField
                required
                sx={{ margin: '4px', marginTop: '12px' }}
                size="small"
                variant="outlined"
                label="Mã Trình Độ Văn Hóa"
                fullWidth
                error={!!(formik.touched.maTrinhdo && formik.errors.maTrinhdo)}
                helperText={formik.touched.maTrinhdo && formik.errors.maTrinhdo}
                onBlur={formik.handleBlur}
                onChange={(e) => formik.setFieldValue('maTrinhdo', e.target.value)}
                value={formik.values.maTrinhdo}
              />
              <TextField
                required
                sx={{ margin: '4px', marginTop: '12px' }}
                size="small"
                variant="outlined"
                label="Tên Trình Độ Văn Hóa"
                fullWidth
                error={!!(formik.touched.tenTrinhdo && formik.errors.tenTrinhdo)}
                helperText={formik.touched.tenTrinhdo && formik.errors.tenTrinhdo}
                onBlur={formik.handleBlur}
                onChange={(e) => formik.setFieldValue('tenTrinhdo', e.target.value)}
                value={formik.values.tenTrinhdo}
              />
              <TextField
                sx={{ margin: '4px', marginTop: '12px' }}
                size="small"
                variant="outlined"
                label="Mô Tả Chi Tiết"
                fullWidth
                value={formik.values.moTa}
                onChange={(e) => formik.setFieldValue('moTa', e.target.value)}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                <Button
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
    );
  }
