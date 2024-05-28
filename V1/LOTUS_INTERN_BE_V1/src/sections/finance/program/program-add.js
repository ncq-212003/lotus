import {
    Button,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Box, display } from "@mui/system";
import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import ProgramRevenue from "./program-revenue";
import ProgramExpenditure from "./program-expenditure";
import { Save } from "@mui/icons-material";

export const ProgramAdd = () => {
    const handleSave = () => {
        console.log("Đã nhấn nút Lưu");
    };
    return (
        <Stack spacing={2} sx={{ p: 2, marginTop: "64px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Box
                        sx={{
                            marginBottom: "16px",
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Thông tin chương trình
                        </Typography>

                        <TextField
                            required
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Tên chương trình"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            required
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Mã chương trình"
                            fullWidth
                            variant="outlined"
                        />
                        <DateTimePicker
                            sx={{ width: "100%", margin: "4px 0px 0px 0px ", marginTop: "12px" }}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    variant: 'outlined'
                                }
                            }}
                            label="Ngày áp dụng"
                            ampm={false} // Đặt ampm thành false để hiển thị giờ 24h
                            format="dd/MM/yyyy HH:mm" // Định dạng để hiển thị ngày, tháng, năm, giờ và phút
                        />

                        <TextField
                            fullWidth
                            label="Ghi chú"
                            size="small"
                            multiline
                            rows={2}
                            sx={{ marginTop: "12px" }}
                            variant="outlined"
                        />
                    </Box>
                    {/* Mục thu */}
                    <ProgramRevenue />

                    {/* Mục chi */}
                    <ProgramExpenditure />
                    <Grid sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={handleSave}
                            sx={{ marginTop: '16px', backgroundColor: "#1C2536" }}
                        >
                            Lưu
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Stack>
    );
};
