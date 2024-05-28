import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AppBar, Autocomplete, Box, Button, Dialog, DialogActions, Grid, IconButton, Slide, SvgIcon, TextField, Toolbar, Typography } from '@mui/material';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { Stack } from '@mui/system';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FeatureEdit({ open, onClose, rowData }) {
    const validationSchema = Yup.object({
        module: Yup.object().required('Module là bắt buộc'),
        featureName: Yup.string().required('Tên chức năng là bắt buộc'),
        description: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            module: null,
            featureName: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            onClose();
        },
    });

    useEffect(() => {
        if (rowData) {
            const selectedModule = modules.find((module) => module.moduleName === rowData.module);
            formik.setValues({
                module: selectedModule || null,
                featureName: rowData.featureName || '',
                description: rowData.description || '',
            });
        }
    }, [rowData]);

    const handleChange = (event, newValue) => {
        if (newValue !== null && typeof newValue === 'object' && 'moduleName' in newValue) {
            formik.setFieldValue('module', newValue);
        } else {
            formik.handleChange(event);
        }
    };

    const handleClose = () => {
        onClose();
    };

    const modules = [
        {
            id: 1,
            moduleName: 'Lịch công tác',
            description: 'Lịch, Địa điểm, Xe, Quà tặng, Tiến trình',
        },
        {
            id: 2,
            moduleName: 'TTS/DHS',
            description: 'Thực tập sinh, Du học sinh, Lịch bay',
        },
        {
            id: 3,
            moduleName: 'Đơn hàng',
            description: 'Đang tiến cử, Đã tuyển xong, Hoàn thành hồ sơ, Hủy',
        },
        {
            id: 4,
            moduleName: 'Hồ sơ',
            description: 'Cá nhân, Dịch thuật, Bằng cấp chứng chỉ, Báo cáo',
        },
        {
            id: 5,
            moduleName: 'Điểm danh',
            description: '',
        },
        {
            id: 6,
            moduleName: 'Tài chính',
            description: 'Báo cáo thu, Báo cáo chi, Chương trình',
        },
        {
            id: 7,
            moduleName: 'Khách hàng',
            description: 'Nghiệp đoàn, Công ty tiếp nhận, Khiếu nại',
        },
        {
            id: 8,
            moduleName: 'Đào tạo',
            description: 'Bài thi, Câu hỏi, Danh sách học viên, Danh sách lớp, Danh sách giáo viên, Học viên đang thi tuyển, Học viên chưa trúng tuyển, Báo cáo bảng điểm, Báo cáo học tập, Báo cáo điểm danh, Chứng chỉ',
        },
        {
            id: 9,
            moduleName: 'Công ty',
            description: 'Công ty, Nhân viên, Phòng ban, Chi nhánh, Nguồn cung ứng',
        },
        {
            id: 10,
            moduleName: 'Cài đặt',
            description: '',
        },
    ];
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative', backgroundColor: '#1C2536' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Sửa thông tin
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <SvgIcon fontSize="small">
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Stack spacing={3} sx={{ p: 2 }}>
                <Grid container spacing={2} margin="none" justifyContent="center">
                    <Grid item sm={12} md={12} xs={12}>
                        <Autocomplete
                            fullWidth
                            size="small"
                            sx={{ margin: '4px', marginTop: '12px' }}
                            options={modules}
                            getOptionLabel={(option) => option.moduleName}
                            onChange={handleChange}
                            onBlur={() => formik.setFieldTouched('module', true)}
                            value={formik.values.module}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Module"
                                    variant="outlined"
                                    error={formik.touched.module && Boolean(formik.errors.module)}
                                    helperText={formik.touched.module && formik.errors.module}
                                />
                            )}
                        />
                        <TextField
                            required
                            sx={{ margin: '4px', marginTop: '12px' }}
                            size="small"
                            label="Tên chức năng"
                            name="featureName"
                            value={formik.values.featureName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.featureName && Boolean(formik.errors.featureName)}
                            helperText={formik.touched.featureName && formik.errors.featureName}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            required
                            sx={{ margin: '4px', marginTop: '12px' }}
                            size="small"
                            label="Mô tả"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            multiline
                            rows={3}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </Stack>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={formik.handleSubmit}
                    variant="contained"
                    sx={{ background: '#1C2536' }}
                >
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
}
