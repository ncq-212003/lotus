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
import { DateTimePicker } from "@mui/x-date-pickers";
import Link from "next/link";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CompanyEdit({ open, onClose, id }) {
    const validationSchema = Yup.object({

    });

    const initialValues = {
        tenCTy: '',
        maCty: '',
        diaChi: '',
        email: '',
        sdt: '',
        website: '',
        masothue: '',
        loaiCty: 1,
        giayPhepKinhDoanh: '',
        logo: '',
        nguoiDaiDien: '',
        chucVu: '',
        chiNhanh: '',
        ngayThanhLap: Date.now(),
        pageCty: '',
        ghiChu: '',
        trangThai: 1,
        submit: null
    };

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

    const handleClose = () => {
        onClose();
    };

    const handleAdd = () => {
        onClose();
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            PaperProps={{ sx: { backgroundColor: "#eae7e7" } }}
        >
            <AppBar sx={{ position: "fixed", backgroundColor: '#1C2536' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <SvgIcon fontSize="small">
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        SỬA THÔNG TIN
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleAdd}>
                        Lưu
                    </Button>
                </Toolbar>
            </AppBar>
            <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
                <form
                    onSubmit={formik.handleSubmit}
                >
                    <Box
                        sx={{
                            bgcolor: "#f5f5f5",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                sm={12}
                                xs={12}
                                md={6}
                            >

                                <TextField
                                    error={!!(formik.touched.tenCTy && formik.errors.tenCTy)}
                                    helperText={formik.touched.tenCTy && formik.errors.tenCTy}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.tenCTy}
                                    name="tenCTy"
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Tên công ty"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.maCty && formik.errors.maCty)}
                                    helperText={formik.touched.maCty && formik.errors.maCty}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.maCty}
                                    name="maCty"
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Mã công ty"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.diaChi && formik.errors.diaChi)}
                                    helperText={formik.touched.diaChi && formik.errors.diaChi}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.diaChi}
                                    name="diaChi"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Địa chỉ"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.email && formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    name="email"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Email"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.sdt && formik.errors.sdt)}
                                    helperText={formik.touched.sdt && formik.errors.sdt}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.sdt}
                                    name="sdt"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Số điện thoại"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.website && formik.errors.website)}
                                    helperText={formik.touched.website && formik.errors.website}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.website}
                                    name="website"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Website"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.masothue && formik.errors.masothue)}
                                    helperText={formik.touched.masothue && formik.errors.masothue}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.masothue}
                                    name="masothue"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Mã số thuế"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.loaiCty && formik.errors.loaiCty)}
                                    helperText={formik.touched.loaiCty && formik.errors.loaiCty}
                                    onBlur={formik.handleBlur}
                                    onChange={(event) => {
                                        formik.handleChange(event);
                                    }}
                                    value={formik.values.loaiCty}
                                    name="loaiCty"
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    label="Loại công ty"
                                    select
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                >
                                    <option value={1}>Tổng công ty</option>
                                    <option value={2}>Công ty</option>
                                </TextField>
                            </Grid>
                            <Grid
                                item
                                sm={12}
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    error={!!(formik.touched.giayPhepKinhDoanh && formik.errors.giayPhepKinhDoanh)}
                                    helperText={formik.touched.giayPhepKinhDoanh && formik.errors.giayPhepKinhDoanh}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.giayPhepKinhDoanh}
                                    name="giayPhepKinhDoanh"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Giấy phép kinh doanh"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.logo && formik.errors.logo)}
                                    helperText={formik.touched.logo && formik.errors.logo}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.logo}
                                    name="logo"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Logo"
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box
                                    sx={{
                                        display: 'flex'
                                    }}
                                >
                                    <TextField
                                        error={!!(formik.touched.nguoiDaiDien && formik.errors.nguoiDaiDien)}
                                        helperText={formik.touched.nguoiDaiDien && formik.errors.nguoiDaiDien}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.nguoiDaiDien}
                                        name="nguoiDaiDien"
                                        required
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        size="small"
                                        label="Người đại diện"
                                        fullWidth
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={!!(formik.touched.chucVu && formik.errors.chucVu)}
                                        helperText={formik.touched.chucVu && formik.errors.chucVu}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.chucVu}
                                        name="chucVu"
                                        required
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        size="small"
                                        label="Chức vụ người đại diện"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Autocomplete
                                        error={!!(formik.touched.chiNhanh && formik.errors.chiNhanh)}
                                        helperText={formik.touched.chiNhanh && formik.errors.chiNhanh}
                                        onBlur={formik.handleBlur}
                                        onChange={(event, newValue) => formik.setFieldValue("chiNhanh", newValue)}
                                        value={formik.values.chiNhanh}
                                        name="chiNhanh"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        fullWidth
                                        size="small"
                                        options={['A', 'B']}
                                        renderInput={(params) => <TextField {...params} label="Chi nhánh" variant="outlined" />}
                                    />
                                    <Link
                                        href='/company/branch/add'
                                    >
                                        <Button>
                                            Thêm
                                        </Button>
                                    </Link>
                                </Box>
                                <DateTimePicker
                                    error={!!(formik.touched.ngayThanhLap && formik.errors.ngayThanhLap)}
                                    helperText={formik.touched.ngayThanhLap && formik.errors.ngayThanhLap}
                                    onBlur={formik.handleBlur}
                                    onChange={(value) => {
                                        formik.setFieldValue('ngayThanhLap', Date.parse(value));
                                    }}
                                    value={formik.values.ngayThanhLap}
                                    name="ngayThanhLap"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày thành lập"
                                />
                                <TextField
                                    error={!!(formik.touched.pageCty && formik.errors.pageCty)}
                                    helperText={formik.touched.pageCty && formik.errors.pageCty}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.pageCty}
                                    name="pageCty"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Fanpage công ty"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.ghiChu && formik.errors.ghiChu)}
                                    helperText={formik.touched.ghiChu && formik.errors.ghiChu}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.ghiChu}
                                    name="ghiChu"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Ghi chú"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.trangThai && formik.errors.trangThai)}
                                    helperText={formik.touched.trangThai && formik.errors.trangThai}
                                    onBlur={formik.handleBlur}
                                    onChange={(event) => {
                                        formik.handleChange(event);
                                    }}
                                    value={formik.values.trangThai}
                                    name="trangThai"
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    label="Trạng thái"
                                    select
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                >
                                    <option value={1}>Hoạt động</option>
                                    <option value={2}>Chưa hoạt động</option>
                                </TextField>
                            </Grid>
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
                        </Grid>
                    </Box>
                </form>
            </Stack>
        </Dialog>
    );
}
