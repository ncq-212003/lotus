import React, { useEffect } from 'react';
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
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    SvgIcon,
    DialogActions,
} from '@mui/material';
import { XCircleIcon } from '@heroicons/react/24/solid';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export default function ModuleEdit({ open, onClose, rowData }) {
    const validationSchema = Yup.object({
        moduleName: Yup.string().required('Tên module là bắt buộc'),
        description: Yup.string()
    });

    const formik = useFormik({
        initialValues: {
            moduleName: '',
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
            formik.setValues({
                moduleName: rowData.moduleName || "",
                description: rowData.description || "",
            })
        }
    }, [rowData]);

    const handleClose = () => {
        onClose();
    };

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
                        <TextField
                            required
                            sx={{ margin: '4px', marginTop: '12px' }}
                            size="small"
                            label="Tên module"
                            name="moduleName"
                            value={formik.values.moduleName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
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
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            variant='outlined'
                            multiline
                            rows={3}
                            fullWidth
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
