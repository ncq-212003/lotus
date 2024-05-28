import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    TextField,
    Grid,
    Stack,
    Box,
    Button,
    Typography,
    Slide,
    MenuItem,
} from '@mui/material';

const validationSchema = Yup.object({
    organName: Yup.string().required('Tên cơ quan là bắt buộc'),
    documentType: Yup.string().required('Loại giấy tờ là bắt buộc '),
    address: Yup.string(),
    description: Yup.string(),
});

export default function OrganAdd({ open, onClose }) {
    const formik = useFormik({
        initialValues: {
            organName: '',
            documentType: '',
            address: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            onClose();
        },
    });

    return (
        <Stack spacing={3} sx={{ p: 2, marginTop: '64px' }}>
            <Grid container spacing={2}>
                <Grid item sm={12} md={12} xs={12}>
                    <Box
                        sx={{
                            padding: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                        }}
                    >
                        <TextField
                            required
                            sx={{ margin: '4px', marginTop: '12px' }}
                            size="small"
                            label="Tên cơ quan"
                            name="organName"
                            value={formik.values.organName}
                            onChange={formik.handleChange}
                            error={formik.touched.organName && Boolean(formik.errors.organName)}
                            helperText={formik.touched.organName && formik.errors.organName}
                            variant='outlined'
                            fullWidth
                        />
                        <TextField
                            required
                            sx={{ margin: '4px', marginTop: '12px' }}
                            size="small"
                            label="Loại giấy tờ"
                            name="documentType"
                            value={formik.values.documentType}
                            onChange={formik.handleChange}
                            error={formik.touched.documentType && Boolean(formik.errors.documentType)}
                            helperText={formik.touched.documentType && formik.errors.documentType}
                            select
                            variant="outlined"
                            fullWidth
                        >
                            <MenuItem value="Hộ chiếu">Hộ chiếu</MenuItem>
                            <MenuItem value="CCCD">CCCD</MenuItem>
                        </TextField>

                        <TextField
                            sx={{ margin: '4px', marginTop: '12px' }}
                            size="small"
                            label="Địa chỉ"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                            variant='outlined'
                            fullWidth
                        />
                        <TextField
                            sx={{ margin: '4px', marginTop: '12px' }}
                            size="small"
                            label="Mô tả"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            variant='outlined'
                            multiline
                            rows={3}
                            fullWidth
                        />

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                width: '100%',
                                marginTop: '20px',
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={formik.handleSubmit}
                                sx={{
                                    backgroundColor: '#1C2536',
                                }}
                            >
                                Lưu
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Stack>
    );
}
