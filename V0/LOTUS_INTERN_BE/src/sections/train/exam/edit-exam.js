import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Button,
    Dialog,
    IconButton,
    styled,
    DialogTitle,
    DialogContent,
    Box,
    Autocomplete,
    Tooltip
} from "@mui/material";
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

export default function EditExam({ openEditExam, closeEditExam }) {
    const handleClose = () => {
        closeEditExam();
    };

    const validationSchema = Yup.object({
        sotailieu: Yup
            .string()
            .required('Số tài liệu không được để trống'),
        nghiepdoan: Yup
            .string()
            .required('Nghiệp đoàn không được để trống'),
        tenbaithi: Yup
            .string()
            .required('Tên bài thi không được để trống'),
        nganhnghe: Yup
            .string()
            .required('Ngành nghề không được để trống'),
        thoigianthi: Yup
            .number()
            .typeError('Thời gian thi phải là một số')
            .integer('Thời gian thi phải là số nguyên')
            .positive('Thời gian thi phải là số nguyên dương')
            .required('Thời gian thi không được để trống'),
        loaibaithi: Yup
            .string()
            .required('Loại bài thi không được để trống'),
        trangthaibaithi: Yup
            .string()
            .required('Trạng thái bài thi không được để trống'),
    });

    const initialValues = {
        sotailieu: "",
        nghiepdoan: "",
        tenbaithi: "",
        nganhnghe: "",
        ghichu: "",
        thoigianthi: "",
        loaibaithi: "",
        trangthaibaithi: "",
        submit: null
    };

    const syndication = [
        { title: "Công ty Hải Bé" },
        { title: "Công ty Nam Dương" },
        { title: "Công ty Trần Long" },
        { title: "Công ty Phạm Bảo" },
        { title: "Tất cả" },
    ];

    const career = [
        { title: "Y Tế" },
        { title: "Xây dựng và công trình" },
        { title: "Công nghiệp chế biến" },
        { title: "Dịch vụ khách sạn và nhà hàng" },
        { title: "Nông nghiệp" },
        { title: "Tất cả" },
    ];

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const data = JSON.stringify(values);
                console.Console.log(data)
                return data;
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    })

    return (
        <BootstrapDialog
            onClose={handleClose}
            open={openEditExam}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa bài kiểm tra
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
                <form
                    noValidate
                    onSubmit={formik.handleSubmit}
                >
                    <Stack
                        spacing={3}
                        sx={{
                            margin: "15px 0px",
                        }}
                    >
                        <Box
                            sx={{
                                border: "2px solid rgb(224, 224, 224) !important",
                                padding: "10px 10px 15px 10px",
                            }}
                        >
                            <Autocomplete
                                onChange={(event, newValue) => formik.setFieldValue("sotailieu", newValue)}
                                value={formik.values.sotailieu}
                                name="sotailieu"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={["LotusBT01", "LotusBT02", "LotusBT03", "LotusBT04", "LotusBT05"]}
                                renderInput={(params) => <TextField
                                    error={!!(formik.touched.sotailieu && formik.errors.sotailieu)}
                                    helperText={formik.touched.sotailieu && formik.errors.sotailieu}
                                    onBlur={formik.handleBlur}
                                    {...params}
                                    label="Số tài liệu"
                                    variant="outlined" />}
                            />

                            <Autocomplete
                                // onChange={(event, newValue) => formik.setFieldValue("nghiepdoan", newValue)}
                                // value={formik.values.nghiepdoan}
                                name="nghiepdoan"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                multiple
                                id="checkboxes-tags-demo"
                                fullWidth
                                size="small"
                                options={Array.isArray(syndication) ? syndication : []}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.title}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox style={{ marginRight: 8 }} checked={selected} />
                                        {option.title}
                                    </li>
                                )}

                                renderInput={(params) => (
                                    <TextField
                                        // error={!!(formik.touched.nghiepdoan && formik.errors.nghiepdoan)}
                                        // helperText={formik.touched.nghiepdoan && formik.errors.nghiepdoan}
                                        // onBlur={formik.handleBlur}
                                        {...params}
                                        label="Nghiệp đoàn"
                                        variant="outlined"
                                    />
                                )}
                            />

                            <TextField
                                error={!!(formik.touched.tenbaithi && formik.errors.tenbaithi)}
                                helperText={formik.touched.tenbaithi && formik.errors.tenbaithi}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.tenbaithi}
                                name="tenbaithi"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Tên bài thi"
                                fullWidth
                                variant="outlined"
                            />

                            <Autocomplete
                                name="nganhnghe"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                multiple
                                id="checkboxes-tags-demo"
                                fullWidth
                                size="small"
                                options={career}
                                disableCloseOnSelect // du nguyen menu tranh phai an nhieu lan
                                getOptionLabel={(option) => option.title}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox style={{ marginRight: 8 }} checked={selected} />
                                        {option.title}
                                    </li>
                                )}
                                // onChange={(event, newValue) => formik.setFieldValue("nganhnghe", newValue)}
                                // value={formik.values.nganhnghe}
                                renderInput={(params) => <TextField
                                    // error={!!(formik.touched.nganhnghe && formik.errors.nganhnghe)}
                                    // helperText={formik.touched.nganhnghe && formik.errors.nganhnghe}
                                    // onBlur={formik.handleBlur}
                                    {...params}
                                    label="Ngành nghề"
                                    variant="outlined" />}
                            />

                            <TextField
                                error={!!(formik.touched.ghichu && formik.errors.ghichu)}
                                helperText={formik.touched.ghichu && formik.errors.ghichu}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.ghichu}
                                name="ghichu"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Ghi chú"
                                multiline
                                rows={2}
                                fullWidth
                                variant="outlined"
                            />

                            <TextField
                                error={!!(formik.touched.thoigianthi && formik.errors.thoigianthi)}
                                helperText={formik.touched.thoigianthi && formik.errors.thoigianthi}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.thoigianthi}
                                name="thoigianthi"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Thời gian thi"
                                fullWidth
                                variant="outlined"
                            />

                            <Autocomplete
                                onChange={(event, newValue) => formik.setFieldValue("loaibaithi", newValue)}
                                value={formik.values.loaibaithi}
                                name="loaibaithi"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={["Trắc nghiệm", "Tự luận"]}
                                renderInput={(params) => <TextField
                                    error={!!(formik.touched.loaibaithi && formik.errors.loaibaithi)}
                                    helperText={formik.touched.loaibaithi && formik.errors.loaibaithi}
                                    onBlur={formik.handleBlur}
                                    {...params}
                                    label="Loại bài thi"
                                    variant="outlined" />}
                            />

                            <Autocomplete
                                onChange={(event, newValue) => formik.setFieldValue("trangthaibaithi", newValue)}
                                value={formik.values.trangthaibaithi}
                                name="trangthaibaithi"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={["Hoạt động", "Dừng"]}
                                renderInput={(params) => <TextField
                                    error={!!(formik.touched.trangthaibaithi && formik.errors.trangthaibaithi)}
                                    helperText={formik.touched.trangthaibaithi && formik.errors.trangthaibaithi}
                                    onBlur={formik.handleBlur}
                                    {...params}
                                    label="Trạng thái bài thi"
                                    variant="outlined" />}
                            />

                            <Stack display="flex">
                                <Box marginLeft="auto">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            marginTop: "30px",
                                            backgroundColor: "#1C2536",
                                            width: "150px",
                                        }}
                                    >
                                        Lưu
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Stack>
                </form>
            </DialogContent>
        </BootstrapDialog>
    );
}
