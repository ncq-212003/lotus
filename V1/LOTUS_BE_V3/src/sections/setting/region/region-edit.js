import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    SvgIcon,
    TextField,
    Stack,
    Button,
    Dialog,
    IconButton,
    styled,
    DialogTitle,
    DialogContent,
    Box,
    Grid,
} from "@mui/material";
import { XCircleIcon } from '@heroicons/react/24/solid';
import SnackbarAlert from "src/components/action-notification";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_REGION } from "src/contexts/reducer/setting/reducer-region";
import { updateRegionApi, listRegionApi } from "src/contexts/api/setting/api-region";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function RegionEdit({ open, onClose, id }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const [state, dispatch] = useApp();
    const { region } = state;
    const { regions } = region;

    const regionEdit = Array.isArray(regions[0]) ? regions[0].find(reg => reg.positionId == id) : []

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
            tenThiTruong: '',
            tenQuocGia: '',
            tenVung: '',
            tenRieng: '',
            ghiChu: '',
            submit: null
        },
        validationSchema: validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    PositionId: id,
                    MarketId: 1, // sau sẽ thay thành thị trường khác lấy theo thị trường
                    MarketIdHidden: "1",
                    CountryCode: values.tenQuocGia,
                    PositionName: values.tenVung,
                    PositionOtherName: values.tenRieng,
                    Description: "Không vấn đề",
                    Field1: "1",
                    Field2: "2",
                    Field3: "3",
                    Field4: "4",
                    Field5: "5",
                    TimeStamp: Math.floor(new Date().getTime() / 1000),
                    CreatedAt: new Date().toISOString(),
                    CreatedBy: 1,
                    CreatedByHidden: "1",
                    LastModifiedAt: new Date().toISOString(),
                    LastModifiedBy: "1",
                    LastModifiedByHidden: "1",
                    Flag: "1"
                }

                console.log("chèdshkhfgds", formData)
                const response = await updateRegionApi(formData)
                if (response.status == 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Dữ liệu đã được chỉnh sửa thành công.");
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
    });

    useEffect(() => {
        const fetchRegionData = () => {
            try {
                formik.setValues({
                    tenNuoc: regionEdit.countryCode || "",
                    tenVung: regionEdit.positionName || "",
                    tenRieng: regionEdit.positionOtherName || "",
                })
            } catch (error) {
                console.error("Đã xảy ra lỗi . Vui lòng kiểm tra lại !!!", error);
            }
        }
        if (open && id) {
            fetchRegionData();
        }
    }, [open, id])

    const handleClose = () => {
        onClose();
    };

    //Country
    const countries = [
        { code: 'KP', label: 'Korea' },
        { code: 'AI', label: 'Anguilla' },
        { code: 'JP', label: 'Japan' },
        { code: 'CN', label: 'China' },
        { code: 'FR', label: 'France' },
        { code: 'VN', label: 'VietNam' },
    ]

    return (
        <BootstrapDialog
            onClose={handleClose}
            open={open}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa thông tin
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
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
                            error={!!(formik.touched.tenQuocGia && formik.errors.tenQuocGia)}
                            helperText={formik.touched.tenQuocGia && formik.errors.tenQuocGia}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.tenQuocGia}
                            name="tenQuocGia"
                            variant="outlined"
                            size="small"
                            sx={{ marginTop: "12px" }}
                            label="Tên quốc gia"
                            disabled
                            fullWidth
                        />

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

                        <TextField
                            error={!!(formik.touched.ghiChu && formik.errors.ghiChu)}
                            helperText={formik.touched.ghiChu && formik.errors.ghiChu}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.ghiChu}
                            name="ghiChu"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Ghi chú"
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={2}
                        />
                    </Grid>
                    <Box style={{ marginTop: "20px" }}>
                        <Button
                            onClick={formik.handleSubmit}
                            variant="contained"
                            sx={{
                                width: "130px",
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
            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
        </BootstrapDialog>
    );
}