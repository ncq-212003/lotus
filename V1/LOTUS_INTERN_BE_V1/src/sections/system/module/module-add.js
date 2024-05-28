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
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// Define validation schema using yup
const validationSchema = Yup.object({
    moduleName: Yup.string().required('Tên module là bắt buộc'),
    description: Yup.string()
});

export default function ModuleAdd({ open, onClose }) {
    // Use useFormik hook to manage form state and validation
    const formik = useFormik({
        initialValues: {
            moduleName: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
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
                        <Typography variant="h6" component="h2" sx={{ marginBottom: '16px' }}>
                            Thêm module
                        </Typography>

                        <TextField
                            required
                            sx={{ margin: '4px', marginTop: '12px' }}
                            size="small"
                            label="Tên module"
                            name="moduleName"
                            value={formik.values.moduleName}
                            onChange={formik.handleChange}
                            error={formik.touched.moduleName && Boolean(formik.errors.moduleName)}
                            helperText={formik.touched.moduleName && formik.errors.moduleName}
                            variant='outlined'
                            fullWidth
                        />
                        <TextField
                            required
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
