import * as React from "react";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { TextField, Grid, Stack, Box, Autocomplete, Button, Typography } from "@mui/material";
import SnackbarAlert from "src/components/action-notification";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_REGION } from "src/contexts/reducer/setting/reducer-region";
import { addRegionApi, listRegionApi } from "src/contexts/api/setting/api-region";

export default function RegionAdd({ open, onClose }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const [state, dispatch] = useApp();
    const { region } = state;
    const { regions } = region;

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const validationSchema = Yup.object({
        tenVung: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
    });

    const formik = useFormik({
        initialValues: {
            tenVung: '',
            tenRieng: '',
            submit: null
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    PositionId: 1,
                    MarketId: 1, // sau sẽ thay thành thị trường khác lấy theo thị trường
                    MarketIdHidden: "1",
                    CountryCode: 0, // để tạm thời là VN sau sẽ lấy từ trên Market
                    PositionName: values.tenVung,
                    PositionOtherName: values.tenRieng,
                    Description: "Địa điểm đã được chỉ định rõ ràng",
                    Field1: "1",
                    Field2: "1",
                    Field3: "1",
                    Field4: "1",
                    Field5: "1",
                    TimeStamp: Math.floor(new Date().getTime() / 1000),
                    CreatedAt: new Date().toISOString(),
                    CreatedBy: 1,
                    CreatedByHidden: "1",
                    LastModifiedAt: new Date().toISOString(),
                    LastModifiedBy: "1",
                    LastModifiedByHidden: "1",
                    Flag: "1"
                }
                const response = await addRegionApi(formData)
                if (response.status == 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Dữ liệu đã được thêm thành công.");
                    setSnackbarOpen(true);
                    formik.resetForm();

                    const res = await listRegionApi();
                    dispatch({
                        type: HANDLERS_REGION.LIST_REGION,
                        payload: res.data
                    })
                }
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    })

    return (
        <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
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
                            error={!!(formik.touched.tenThiTruong && formik.errors.tenThiTruong)}
                            helperText={formik.touched.tenThiTruong && formik.errors.tenThiTruong}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.tenThiTruong}
                            name="tenThiTruong"
                            variant="outlined"
                            size="small"
                            sx={{ marginTop: "12px" }}
                            label="Tên thị trường"
                            disabled
                            fullWidth
                        />

                        <TextField
                            error={!!(formik.touched.tenVung && formik.errors.tenVung)}
                            helperText={formik.touched.tenVung && formik.errors.tenVung}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.tenVung}
                            name="tenVung"
                            variant="outlined"
                            size="small"
                            sx={{ marginTop: "12px" }}
                            label="Tên vùng"
                            fullWidth
                        />

                        <TextField
                            error={!!(formik.touched.tenRieng && formik.errors.tenRieng)}
                            helperText={formik.touched.tenRieng && formik.errors.tenRieng}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.tenRieng}
                            name="tenRieng"
                            variant="outlined"
                            size="small"
                            sx={{ marginTop: "12px" }}
                            label="Tên riêng"
                            fullWidth
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
                                    width: "100px",
                                }}
                                onClick={formik.handleSubmit}
                            >
                                Lưu
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
        </Stack>
    );
}