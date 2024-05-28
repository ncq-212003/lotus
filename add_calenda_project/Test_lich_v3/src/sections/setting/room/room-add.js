import React from "react";
import { TextField, Grid, Stack, Box, Autocomplete, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    ktx: Yup.string().required("Vui lòng chọn ký túc xá."),
    maPhong: Yup.string().required("Mã phòng không được để trống."),
    tenPhong: Yup.string().required("Tên phòng không được để trống."),
    status: Yup.number().required("Vui lòng chọn trạng thái."),
});

const initialValues = {
    ktx: null,
    maPhong: "",
    tenPhong: "",
    status: 1,
};

export default function RoomAdd() {
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

    const handleChange = (event, newValue) => {
        if (newValue !== null && typeof newValue === 'object' && 'ktx' in newValue) {
            formik.setFieldValue('ktx', newValue);
        } else {
            formik.handleChange(event);
        }
    };

    return (
        <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item sm={12} md={12} xs={12}>
                        <Box sx={{ padding: "16px", border: "1px solid #ccc", borderRadius: "6px" }}>
                            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                                Thông tin cơ bản
                            </Typography>
                            <Autocomplete
                                fullWidth
                                size="small"
                                sx={{ margin: '4px', marginTop: '12px' }}
                                options={["KTX 1", "KTX 2"]}
                                // getOptionLabel={(option) => option.dormitoryName}
                                onChange={handleChange}
                                onBlur={() => formik.setFieldTouched('ktx', true)}
                                value={formik.values.ktx}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        label="Tên ký túc xá"
                                        variant="outlined"
                                        error={formik.touched.ktx && Boolean(formik.errors.ktx)}
                                        helperText={formik.touched.ktx && formik.errors.ktx}
                                    />
                                }
                            />

                            <TextField
                                error={!!(formik.touched.maPhong && formik.errors.maPhong)}
                                helperText={formik.touched.maPhong && formik.errors.maPhong}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.maPhong}
                                name="maPhong"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Mã phòng"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                error={!!(formik.touched.tenPhong && formik.errors.tenPhong)}
                                helperText={formik.touched.tenPhong && formik.errors.tenPhong}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.tenPhong}
                                name="tenPhong"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Tên phòng"
                                fullWidth
                                variant="outlined"
                            />
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
                                <option value={2}>Đã đóng</option>
                                <option value={3}>Chưa mở</option>
                            </TextField>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "end",
                                    width: "100%",
                                    marginTop: "20px",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#1C2536",
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
