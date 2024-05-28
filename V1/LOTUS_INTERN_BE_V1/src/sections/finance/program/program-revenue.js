import { Add, FilterList } from "@mui/icons-material";
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export default function ProgramRevenue() {
    const [revenues, setRevenues] = useState([]);

    const categories = [
        { id: "1", name: "Tiền ăn" },
        { id: "2", name: "Tiền học tập" },
        { id: "3", name: "Tiền hợp đồng" },
    ];

    const applicationTimes = [
        { id: "1", name: "Ngày nhập học" },
        { id: "2", name: "Ngày trúng tuyển" },
    ];

    const [newRevenue, setNewRevenue] = useState({
        category: "",
        amount: "",
        applicationTime: "",
        numberToDeadline: "",
        note: ""
    });

    const handleInputChange = (e, field) => {
        setNewRevenue((prevRevenue) =>
        ({
            ...prevRevenue,
            [field]: e.target.value
        }));
    };

    const handleAddButtonClick = () => {
        setRevenues((prevRevenues) => [...prevRevenues, newRevenue]);
        setNewRevenue({
            category: "",
            amount: "",
            applicationTime: "",
            numberToDeadline: "",
            note: ""
        });
    };


    const getCategoryName = (categoryId) => {
        const selectedCategory = categories.find((cat) => cat.id === categoryId);
        return selectedCategory ? selectedCategory.name : "";
    };

    const getApplicationTimeName = (id) => {
        const selectedApplicationTime = applicationTimes.find((at) => at.id === id);
        return selectedApplicationTime ? selectedApplicationTime.name : "";
    };


    return (
        <Box
            sx={{
                marginBottom: "16px",
                bgcolor: "#fff",
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
            }}
        >
            <Typography variant="h6" component="h2" sx={{ margin: "20px 16px 10px 16px" }}>
                Mục thu
            </Typography>
            <FormControl
                size="small"
                sx={{ marginTop: "12px" }}
                fullWidth
            >
                <InputLabel id="demo-simple-select-label">Hạng mục thu</InputLabel>
                <Select
                    label="Hạng mục thu"
                    value={newRevenue.category}
                    onChange={(e) => handleInputChange(e, "category")}
                >
                    {categories.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                required
                sx={{ marginTop: "12px" }}
                size="small"
                label="Số tiền  "
                fullWidth
                value={newRevenue.amount}
                variant="outlined"
                onChange={(e) => handleInputChange(e, "amount")}
            />
            <FormControl
                sx={{ marginTop: "12px" }}
                size="small"
                fullWidth
            >
                <InputLabel id="condition-select-label">Thời điểm áp dụng từ ngày</InputLabel>
                <Select
                    label="Thời điểm áp dụng từ ngày"
                    value={newRevenue.applicationTime}
                    onChange={(e) => handleInputChange(e, "applicationTime")}
                >
                    {applicationTimes.map((at) => (
                        <MenuItem key={at.id} value={at.id}>
                            {at.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                required
                sx={{ marginTop: "12px" }}
                size="small"
                label="Số ngày đến hạn"
                fullWidth
                value={newRevenue.numberToDeadline}
                variant="outlined"
                onChange={(e) => handleInputChange(e, "numberToDeadline")}
            />
            <TextField
                fullWidth
                label="Ghi chú"
                size="small"
                multiline
                rows={2}
                sx={{ marginTop: "12px" }}
                variant="outlined"
                value={newRevenue.note}
                onChange={(e) => handleInputChange(e, "note")}
            />
            <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddButtonClick}
                sx={{ marginTop: "12px", alignSelf: "flex-end", backgroundColor: "#1C2536" }}
            >
                Thêm
            </Button>

            {revenues.length > 0 && (
                <TableContainer sx={{ marginTop: "16px" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Hạng mục thu</TableCell>
                                <TableCell>Số tiền</TableCell>
                                <TableCell>Thời điểm áp dụng từ ngày</TableCell>
                                <TableCell>Số ngày đến hạn</TableCell>
                                <TableCell>Ghi chú</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {revenues.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{getCategoryName(item.category)}</TableCell>
                                    <TableCell>{item.amount}</TableCell>
                                    <TableCell>{getApplicationTimeName(item.applicationTime)}</TableCell>
                                    <TableCell>{item.numberToDeadline}</TableCell>
                                    <TableCell>{item.note}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}