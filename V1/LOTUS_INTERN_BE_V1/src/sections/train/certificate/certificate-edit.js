import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Box,
    Button,
    Typography,
    Slide,
    Dialog
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CertificateEdit({ open, onClose,selectedRow }) {
    const validationSchema = Yup.object({
        machungchi: Yup.string().max(6).required('Vui lòng nhập thông tin vào trường này'),
        tenchungchi: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        tendvcap: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        ngaycap: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        fullname: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        logo: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        chuyennganh: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    });

    const initialValues = {
        machungchi: '',
        tenchungchi: '',
        tendvcap: '',
        ngaycap:'',
        fullname:'',
        logo:'',
        chuyennganh:'',
        mota:'',
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          console.log(values);
          onClose();
        }
      })
      useEffect(() => {
        if (selectedRow) {
          formik.setValues({
            machungchi: selectedRow.machungchi || "",
            tenchungchi: selectedRow.tenchungchi || "",
            tendvcap: selectedRow.tendvcap || "",
            ngaycap: selectedRow.ngaycap || "",
            fullname: selectedRow.fullname || "",
            logo: selectedRow.logo || "",
            chuyennganh: selectedRow.chuyennganh || "",
            mota: selectedRow.mota || "",
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
                            label="Mã chứng chỉ"
                            fullWidth
                            name="machungchi"
                            error={!!(formik.touched.machungchi && formik.errors.machungchi)}
                            helperText={formik.touched.machungchi && formik.errors.machungchi}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('machungchi', e.target.value)}
                            value={formik.values.machungchi}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Tên chứng chỉ"
                            fullWidth
                            name="tenchungchi"
                            error={!!(formik.touched.tenchungchi && formik.errors.tenchungchi)}
                            helperText={formik.touched.tenchungchi && formik.errors.tenchungchi}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('tenchungchi', e.target.value)}
                            value={formik.values.tenchungchi}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Tên đơn vị cấp"
                            fullWidth
                            name="tendvcap"
                            error={!!(formik.touched.tendvcap && formik.errors.tendvcap)}
                            helperText={formik.touched.tendvcap && formik.errors.tendvcap}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('tendvcap', e.target.value)}
                            value={formik.values.tendvcap}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Tên học viên"
                            fullWidth
                            name="fullname"
                            error={!!(formik.touched.fullname && formik.errors.fullname)}
                            helperText={formik.touched.fullname && formik.errors.fullname}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('fullname', e.target.value)}
                            value={formik.values.fullname}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Chuyên ngành"
                            fullWidth
                            name="chuyennganh"
                            error={!!(formik.touched.chuyennganh && formik.errors.chuyennganh)}
                            helperText={formik.touched.chuyennganh && formik.errors.chuyennganh}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('chuyennganh', e.target.value)}
                            value={formik.values.chuyennganh}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Logo"
                            fullWidth
                            name="logo"
                            error={!!(formik.touched.logo && formik.errors.logo)}
                            helperText={formik.touched.logo && formik.errors.logo}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('logo', e.target.value)}
                            value={formik.values.logo}
                        />
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Giới Thiệu Chi Tiết"
                            fullWidth
                            value={formik.values.gioithieu}
                            onChange={(e) => { formik.setFieldValue('gioithieu',e.target.value)}}
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
