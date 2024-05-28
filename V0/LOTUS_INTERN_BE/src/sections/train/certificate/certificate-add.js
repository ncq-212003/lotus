import React, { useState } from "react";
import Slide from "@mui/material/Slide";
import { LocalizationProvider,AdapterDateFns,DatePicker } from "@mui/x-date-pickers";
import {
    TextField,
    Stack,
    Box,
    Button,
    Paper,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CertificateAdd() {
    const [formData, setFormData] = useState({
        certificateCode: '',
        certificateName: '',
        studentName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <Paper elevation={3} 
            sx={{ 
                marginTop: '80px !important',
                padding: 2,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                width: '100%',
                margin: '50px auto !important',
             }}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        name="certificateCode"
                        label="Mã chứng chỉ"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={formData.certificateCode}
                        onChange={handleChange}
                    />
                    <TextField
                        name="certificateName"
                        label="Tên chứng chỉ"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={formData.certificateName}
                        onChange={handleChange}
                    />
                    <TextField
                        name="nameCompany"
                        label="Tên đơn vị cấp"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={formData.studentName}
                        onChange={handleChange}
                    />
                    <TextField
                        name="Logo"
                        label="Logo"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={formData.studentName}
                        onChange={handleChange}
                    />
                    <TextField
                        name="studentName"
                        label="Tên học viên"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={formData.studentName}
                        onChange={handleChange}
                    />
                    <TextField
                        name="nameSubject"
                        label="Tên chuyên ngành"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={formData.studentName}
                        onChange={handleChange}
                    />
                    <TextField
                        name="namePart"
                        label="Tên bộ phận"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={formData.studentName}
                        onChange={handleChange}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            name="dateRange"
                            label="Ngày cấp"
                            value={formData.dateRange}
                            onChange={(date) => {
                                setFormData({
                                    ...formData,
                                    dateRange: date,
                                });
                            }}
                            format="YYYY/MM/DD"
                            renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        name="description"
                        label="Mô tả"
                        fullWidth
                        value={formData.studentName}
                        onChange={handleChange}
                    />
                    <Box>
                        <Button 
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: '#1C2536',
                                width:'100%',
                            }}
                        >
                            Lưu
                        </Button>
                    </Box>
                </Stack>
            </form>
        </Paper>
    );
}
