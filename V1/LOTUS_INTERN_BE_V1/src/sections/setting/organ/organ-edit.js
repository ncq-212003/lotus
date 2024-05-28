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
    MenuItem,
} from '@mui/material';
import { XCircleIcon } from '@heroicons/react/24/solid';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export default function OrganEdit({ open, onClose, rowData }) {
    console.log(rowData);
    const validationSchema = Yup.object({
        organName: Yup.string().required('Tên cơ quan là bắt buộc'),
        address: Yup.string(),
        description: Yup.string()
    });

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

    useEffect(() => {
        if (rowData) {
            formik.setValues({
                organName: rowData.organName || "",
                documentType: rowData.documentType || "",
                address: rowData.address || "",
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
                            required
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
