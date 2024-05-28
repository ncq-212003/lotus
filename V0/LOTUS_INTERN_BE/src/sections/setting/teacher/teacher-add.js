import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
    TextField,
    Grid,
    Stack,
    Box,
    Autocomplete,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    
});

const initialValues = {
    additionalFields: [
        {
            major: "",
            school: "",
            address: "",
        },
    ],
};

export default function TeacherAdd() {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const data = JSON.stringify(values);

                console.log(values);
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

    const addTextField = () => {
        const newField = {
            major: "",
            school: "",
            address: "",
        };

        formik.setFieldValue(
            "additionalFields",
            [...formik.values.additionalFields, newField],
            true
        );
    };

    const removeTextField = (index) => {
        const updatedFields = [...formik.values.additionalFields];
        updatedFields.splice(index, 1);
        formik.setFieldValue("additionalFields", updatedFields);
    };

    return (
        <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item sm={12} md={12} xs={12}>
                        <Box
                            sx={{
                                padding: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                                    Chuyên môn
                                </Typography>
                                <Button variant="outlined" onClick={addTextField}>
                                    Thêm
                                </Button>
                            </Box>
                            {/* Thêm TextField ở đây */}
                            {formik.values.additionalFields.map((field, index) => (
                                <Box key={index} sx={{ marginBottom: "16px" }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography variant="b" component="b">
                                            Trường {index + 1}
                                        </Typography>
                                        <Button sx={{ color: "red" }} onClick={() => removeTextField(index)}>
                                            Xóa
                                        </Button>
                                    </Box>
                                    <TextField
                                        label="Chuyên ngành"
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        name={`additionalFields[${index}].major`}
                                        value={field.major}
                                        onChange={formik.handleChange}
                                    />
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <TextField
                                            label="Trường tốt nghiệp / năm"
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            sx={{ margin: "4px", marginTop: "12px" }}
                                            name={`additionalFields[${index}].school`}
                                            value={field.school}
                                            onChange={formik.handleChange}
                                        />
                                        <TextField
                                            label="Địa chỉ trường"
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            sx={{ margin: "4px", marginTop: "12px" }}
                                            name={`additionalFields[${index}].address`}
                                            value={field.address}
                                            onChange={formik.handleChange}
                                        />
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            width: '100%',
                            marginTop: '20px'
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#1C2536',
                            }}
                            type="submit"
                        >
                            Thêm
                        </Button>
                    </Box>
                </Grid>
            </form>
        </Stack>
    );
}