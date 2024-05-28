import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import { Stack, Box, Grid, TextField, Autocomplete } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NotificationEdit({ open, onClose, selectedRow }) {
    const validationSchema = Yup.object({
        tieude: Yup.string().max(6).required('Vui lòng nhập thông tin vào trường này'),
        noidung: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        nguoitao: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        ngaythongbao: Yup.date()
            .required('Vui lòng nhập ngày thông báo')
            .min(new Date(), 'Ngày thông báo phải từ ngày hôm nay trở đi')
            .typeError("Vui lòng nhập đúng định dạng"),
        mucdo: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    });

    const formik = useFormik({
        initialValues: {
            tieude: '',
            noidung: '',
            nguoitao: '',
            ngaythongbao: null, // Set giá trị ban đầu là null
            mucdo: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            onClose();
        }
    });

    useEffect(() => {
        if (selectedRow) {
            console.log(selectedRow);
            formik.setValues({
                tieude: selectedRow.tieude || "",
                noidung: selectedRow.noidung || "",
                nguoitao: selectedRow.nguoitao || "",
                ngaythongbao: selectedRow.ngaythongbao || null, // Đặt giá trị ban đầu là null
                mucdo: selectedRow.mucdo || "",
            });
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
                                label="Tiêu đề"
                                fullWidth
                                name="tieude"
                                value={formik.values.tieude}
                                onChange={formik.handleChange}
                                error={formik.touched.tieude && Boolean(formik.errors.tieude)}
                                helperText={formik.touched.tieude && formik.errors.tieude}
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                variant="outlined"
                                size="small"
                                label="Nội dung"
                                fullWidth
                                name="noidung"
                                value={formik.values.noidung}
                                onChange={formik.handleChange}
                                error={formik.touched.noidung && Boolean(formik.errors.noidung)}
                                helperText={formik.touched.noidung && formik.errors.noidung}
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Người tạo thông báo"
                                fullWidth
                                name="nguoitao"
                                value={formik.values.nguoitao}
                                onChange={formik.handleChange}
                                error={formik.touched.nguoitao && Boolean(formik.errors.nguoitao)}
                                helperText={formik.touched.nguoitao && formik.errors.nguoitao}
                            />
                            {/* <DatePicker
                                sx={{ margin: "4px", marginTop: "12px", width: "100%" }}
                                size="small"
                                variant="outlined"
                                label="Ngày thông báo"
                                format="yyyy/MM/dd"
                                name="ngaythongbao"
                                error={!!(formik.touched.ngaythongbao && formik.errors.ngaythongbao)}
                                helperText={formik.touched.ngaythongbao && formik.errors.ngaythongbao}
                                onBlur={formik.handleBlur}
                                onChange={(date) => formik.setFieldValue('ngaythongbao', date)}
                                value={formik.values.ngaythongbao || null}
                            /> */}
                            <Autocomplete
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Ưu tiên cao', 'Bình thường', 'Ưu tiên thấp']}
                                renderInput={(params) => <TextField {...params} label="Mức độ" />}
                                name="mucdo"
                                value={formik.values.mucdo}
                                onChange={(_, newValue) => formik.setFieldValue('mucdo', newValue)}
                                error={formik.touched.mucdo && Boolean(formik.errors.mucdo)}
                                helperText={formik.touched.mucdo && formik.errors.mucdo}
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
