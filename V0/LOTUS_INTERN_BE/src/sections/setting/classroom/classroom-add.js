import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    TextField,
    Grid,
    Stack,
    Box,
    Autocomplete,
    Button,
    Typography,
    Slide,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    
});

const initialValues = {
    congTy: "",
    maLopHoc: "",
    giaoVien: "",
    tenPhongHoc: "",
    lopTruong: "",
    phoneLopTruong: "",
    ngayKhaiGiang: Date.now(),
    ngayBeGiang: Date.now(),
    tienDo: "",
    gioHoc: "",
    loaiPhongHoc: 1,
    status: 1,
};

export default function ClassroomAdd() {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const data = JSON.stringify(values);

                console.log(values);
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

    return (
        <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
            <form
                onSubmit={formik.handleSubmit}
            >
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
                            <Autocomplete
                                error={!!(formik.touched.congTy && formik.errors.congTy)}
                                helperText={formik.touched.congTy && formik.errors.congTy}
                                onBlur={formik.handleBlur}
                                onChange={(event, newValue) => formik.setFieldValue("congTy", newValue)}
                                value={formik.values.congTy}
                                name="congTy"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Công ty TNHH Tú', 'Công ty TNHH Nghĩa']}
                                renderInput={(params) => <TextField {...params} label="Thuộc công ty" variant="outlined" />}
                            />
                            <TextField
                                error={!!(formik.touched.maLopHoc && formik.errors.maLopHoc)}
                                helperText={formik.touched.maLopHoc && formik.errors.maLopHoc}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.maLopHoc}
                                name="maLopHoc"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Mã lớp học"
                                fullWidth
                                variant="outlined"
                            />
                            <Autocomplete
                                error={!!(formik.touched.giaoVien && formik.errors.giaoVien)}
                                helperText={formik.touched.giaoVien && formik.errors.giaoVien}
                                onBlur={formik.handleBlur}
                                onChange={(event, newValue) => formik.setFieldValue("giaoVien", newValue)}
                                value={formik.values.giaoVien}
                                name="giaoVien"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Cô Tú', 'Cô Nghĩa']}
                                renderInput={(params) => <TextField {...params} label="Giáo viên chủ nhiệm" variant="outlined" />}
                            />
                            <TextField
                                error={!!(formik.touched.tenPhongHoc && formik.errors.tenPhongHoc)}
                                helperText={formik.touched.tenPhongHoc && formik.errors.tenPhongHoc}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.tenPhongHoc}
                                name="tenPhongHoc"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Tên phòng học"
                                fullWidth
                                variant="outlined"
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <TextField
                                    error={!!(formik.touched.lopTruong && formik.errors.lopTruong)}
                                    helperText={formik.touched.lopTruong && formik.errors.lopTruong}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.lopTruong}
                                    name="lopTruong"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Lớp trưởng"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.phoneLopTruong && formik.errors.phoneLopTruong)}
                                    helperText={formik.touched.phoneLopTruong && formik.errors.phoneLopTruong}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.phoneLopTruong}
                                    name="phoneLopTruong"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Điện thoại lớp trưởng"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <DateTimePicker
                                    error={!!(formik.touched.ngayKhaiGiang && formik.errors.ngayKhaiGiang)}
                                    helperText={formik.touched.ngayKhaiGiang && formik.errors.ngayKhaiGiang}
                                    onBlur={formik.handleBlur}
                                    onChange={(value) => {
                                        formik.setFieldValue('ngayKhaiGiang', Date.parse(value));
                                    }}
                                    value={formik.values.ngayKhaiGiang}
                                    name="ngayKhaiGiang"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày khai giảng"
                                />
                                <DateTimePicker
                                    error={!!(formik.touched.ngayBeGiang && formik.errors.ngayBeGiang)}
                                    helperText={formik.touched.ngayBeGiang && formik.errors.ngayBeGiang}
                                    onBlur={formik.handleBlur}
                                    onChange={(value) => {
                                        formik.setFieldValue('ngayBeGiang', Date.parse(value));
                                    }}
                                    value={formik.values.ngayBeGiang}
                                    name="ngayBeGiang"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày bế giảng"
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <TextField
                                    error={!!(formik.touched.tienDo && formik.errors.tienDo)}
                                    helperText={formik.touched.tienDo && formik.errors.tienDo}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.tienDo}
                                    name="tienDo"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Tiến độ"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.gioHoc && formik.errors.gioHoc)}
                                    helperText={formik.touched.gioHoc && formik.errors.gioHoc}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.gioHoc}
                                    name="gioHoc"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Giờ học"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Box>
                            <TextField
                                error={!!(formik.touched.loaiPhongHoc && formik.errors.loaiPhongHoc)}
                                helperText={formik.touched.loaiPhongHoc && formik.errors.loaiPhongHoc}
                                onBlur={formik.handleBlur}
                                onChange={(event) => {
                                    formik.handleChange(event);
                                }}
                                value={formik.values.loaiPhongHoc}
                                name="loaiPhongHoc"
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Loại phòng học"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            >
                                <option value={1}>Online</option>
                                <option value={2}>Offline</option>
                            </TextField>
                            <TextField
                                error={!!(formik.touched.status && formik.errors.status)}
                                helperText={formik.touched.status && formik.errors.status}
                                onBlur={formik.handleBlur}
                                onChange={(event) => {
                                    formik.handleChange(event);
                                }}
                                value={formik.values.status}
                                name="status"
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Trạng thái"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            >
                                <option value={1}>Đang mở</option>
                                <option value={2}>Đang học</option>
                                <option value={3}>Đã học xong</option>
                            </TextField>
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
                                    type="submit"
                                >
                                    Thêm
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Stack>
    );
}