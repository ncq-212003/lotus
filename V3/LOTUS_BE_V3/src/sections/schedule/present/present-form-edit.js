import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
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
    Typography,
    Grid,
    FormHelperText
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_PRESENT } from "src/contexts/reducer/schedule/reducer-present";
import { listPresentApi, updatePresentApi } from "src/contexts/api/schedule/api-present";
import SnackbarAlert from "src/components/action-notification";
import { uploadSingleFile } from "src/contexts/api/upload-api";
import { getPathFromUrl } from "src/components/functions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

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

export default function EditFormPresent({ openEditFormPresent, closeEditFormPresent, id }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [selectedFileLogo, setSelectedFileLogo] = useState(null);

    const [state, dispatch] = useApp();
    const { present } = state;
    const { presents } = present;

    const selectRowsEdit = Array.isArray(presents[0]) ? presents[0].find(pre => pre.presentId == id) : [];

    const handleClose = () => {
        closeEditFormPresent();
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                try {
                    const response = await uploadSingleFile("Process", file);
                    if (response.status === 200) {
                        const image = getPathFromUrl(response.data);
                        setSelectedFileLogo(URL.createObjectURL(file));
                        formik.setFieldValue('hinhAnh', image);
                        formik.setFieldError('hinhAnh', ''); // Xóa lỗi file
                    }
                } catch (error) {
                    console.error("Error uploading file:", error);
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Thêm ảnh thất bại.");
                    setSnackbarOpen(true);
                }
            } else {
                formik.setFieldError('hinhAnh', 'File đã chọn không phải là hình ảnh.');
                setSnackbarSeverity("warning");
                setSnackbarMessage("File không hợp lệ. Vui lòng chọn hình ảnh.");
                setSnackbarOpen(true);
            }
        }
    };
    const validationSchema = Yup.object({
        tenQuaTang: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        hinhAnh: Yup
            .mixed()
            .test('required', 'Vui lòng chọn một ảnh.', function (value) {
                return !!value;
            }),
    });

    const formik = useFormik({
        initialValues: {
            tenQuaTang: "",
            ghiChu: "",
            hinhAnh: "",
            submit: null
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    PresentId: id,
                    PresentName: values.tenQuaTang,
                    PresentGroup: "Nhóm quà tặng",
                    Price: 0,
                    Description: values.ghiChu,
                    Field1: values.hinhAnh,
                    Field2: "1",
                    Field3: "1",
                    Field4: "1",
                    Field5: "1",
                    CreatedAt: new Date().toISOString(),
                    CreatedBy: 1,
                    CreatedByHidden: "1",
                    LastModifedAt: new Date().toISOString(),
                    LastModifedBy: 1,
                    LastModifedByHidden: "1",
                    Flag: "1"
                }
                const response = await updatePresentApi(formData);
                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Dữ liệu đã được cập nhật thành công.");
                    setSnackbarOpen(true);
                    formik.resetForm();
                    setSelectedFileLogo(null);
                    const listData = await listPresentApi();
                    dispatch({
                        type: HANDLERS_PRESENT.LIST_PRESENT,
                        payload: listData.data
                    })
                }
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    });

    // Lấy dữ liệu từ bảng 
    useEffect(() => {
        const fetchPresentData = async () => {
            try {
                formik.setValues({
                    tenQuaTang: selectRowsEdit.presentName || "",
                    ghiChu: selectRowsEdit.description || "",
                    hinhAnh: selectRowsEdit.field1 || "",
                })
            } catch (error) {
                console.error("Đã có lỗi xảy ra. Vui lòng kiểm tra lại !!!!");
            }
        }
        if (openEditFormPresent && id) {
            fetchPresentData();
        }
    }, [openEditFormPresent, id])

    return (
        <BootstrapDialog
            onClose={handleClose}
            open={openEditFormPresent}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa quà tặng
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
                            error={!!(formik.touched.tenQuaTang && formik.errors.tenQuaTang)}
                            helperText={formik.touched.tenQuaTang && formik.errors.tenQuaTang}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.tenQuaTang}
                            name="tenQuaTang"
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Tên quà tặng"
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
                            multiline
                            rows={2}
                            fullWidth
                            variant="outlined"
                        />

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                            }}
                        >
                            <Typography variant="b" component="b" sx={{ margin: "12px", fontSize: "14px" }}>
                                Ảnh quà tặng
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Avatar
                                    sx={{
                                        width: "110px",
                                        height: "135px",
                                    }}
                                    variant="rounded"
                                    src={selectedFileLogo || 'https://lotus.i.tisbase.online' + formik.values.hinhAnh}
                                ></Avatar>
                            </Stack>
                            <Button size="small" component="label" sx={{ marginLeft: "10px" }}>
                                Tải ảnh lên
                                <VisuallyHiddenInput
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Button>
                            <FormHelperText sx={{ color: 'red' }}>
                                {formik.touched.hinhAnh && formik.errors.hinhAnh}
                            </FormHelperText>
                        </Box>
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
};