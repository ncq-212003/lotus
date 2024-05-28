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
    Autocomplete,
} from '@mui/material';

const validationSchema = Yup.object({
    country: Yup.string(),
    region: Yup.string(),
    name: Yup.string(),
    nickName: Yup.string(),
});

export default function ProvinceAdd({ open, onClose }) {
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