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
    Autocomplete,
} from '@mui/material';
import { XCircleIcon } from '@heroicons/react/24/solid';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export default function OrganEdit({ open, onClose, rowData }) {
    console.log(rowData);
    const validationSchema = Yup.object({
        country: Yup.string(),
        region: Yup.string(),
        name: Yup.string(),
        nickName: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            country: '',
            region: '',
            name: '',
            nickName: '',
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
                country: rowData.country || "",
                region: rowData.region || "",
                name: rowData.name || "",
                nickName: rowData.nickName || "",
            })
        }
    }, [rowData]);

    const handleClose = () => {
        onClose();
    };

    //Country
    const countries = [
        { code: 'JP', label: 'Japan' },
        { code: 'KR', label: 'Korea, Republic of' },
        { code: 'FR', label: 'France' },
    ]
    const AutocompleteCountry = (fieldName) => (event, value) => {
        formik.handleChange(fieldName)(value ? value.label : "");
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
                        <Autocomplete
                            id="country-select-demo"
                            sx={{ margin: "4px", marginTop: "12px" }}
                            options={countries}
                            autoHighlight
                            fullWidth
                            size="small"
                            getOptionLabel={(option) => option.label}
                            renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                    <img
                                        loading="lazy"
                                        width="20"
                                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                        alt=""
                                    />
                                    {option.label}
                                </Box>
                            )}
                            onChange={AutocompleteCountry("country")}
                            value={countries.find((option) => option.label === formik.values.country) || null}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Quốc gia"
                                    variant='outlined'
                                    fullWidth
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />
                        <TextField
                            required
                            sx={{ margin: '4px', marginTop: '12px' }}
                            size="small"
                            label="Tên tỉnh"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            variant='outlined'
                            fullWidth
                        />
                        <TextField
                            sx={{ margin: '4px', marginTop: '12px' }}
                            size="small"
                            label="Vùng"
                            name="name"
                            value={formik.values.region}
                            onChange={formik.handleChange}
                            error={formik.touched.region && Boolean(formik.errors.region)}
                            helperText={formik.touched.region && formik.errors.region}
                            variant='outlined'
                            fullWidth
                        />
                        <TextField
                            sx={{ margin: '4px', marginTop: '12px' }}
                            size="small"
                            label="Tên riêng"
                            name="nickName"
                            value={formik.values.nickName}
                            onChange={formik.handleChange}
                            error={formik.touched.nickName && Boolean(formik.errors.nickName)}
                            helperText={formik.touched.nickName && formik.errors.nickName}
                            variant='outlined'
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