import {
    Autocomplete,
    Button,
    FormControl,
    Grid,
    InputLabel,
    Stack,
    TextField,
    Tooltip,
    Typography,
    IconButton
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const Programs = () => {
    const [rowsRevenue, setRowsRevenue] = useState([]);
    const [rowsSpend, setRowsSpend] = useState([]);
    const [newRowRevenu, setNewRowRevenu] = useState({
        Stt: '',
        revenueItem: '',
        money: '',
        note: '',
        relationship: '',
        deadline: '',
    });

    const [newRowSpend, setNewRowSpend] = useState({
        Stt: '',
        spendItem: '',
        money: '',
        note: '',
        relationship: '',
        deadline: '',
    });

    const addSpend = () => {
        setRowsSpend([...rowsSpend, newRowSpend]);
        setNewRowSpend({
            Stt: '',
            spendItem: '',
            money: '',
            note: '',
            relationship: '',
            deadline: '',
        });
    };

    const addRevenue = () => {
        setRowsRevenue([...rowsRevenue, newRowRevenu]);
        setNewRowRevenu({
            Stt: '',
            revenueItem: '',
            money: '',
            note: '',
            relationship: '',
            deadline: '',
        });
    };

    const deleteRowRevenue = (index) => {
        const updatedRows = [...rowsRevenue];
        updatedRows.splice(index, 1);
        setRowsRevenue(updatedRows);
    };

    const deleteRowSpend = (index) => {
        const updatedRows = [...rowsSpend];
        updatedRows.splice(index, 1);
        setRowsSpend(updatedRows);
    };

    const handleFieldChange = (e, fieldName) => {
        const updatedNewRow = { ...newRowSpend };
        updatedNewRow[fieldName] = e.target.value;
        setNewRowRevenu(updatedNewRow);
    };

    const handleFieldChangeSpend = (e, fieldName) => {
        const updatedNewRow = { ...newRowSpend };
        updatedNewRow[fieldName] = e.target.value;
        setNewRowSpend(updatedNewRow);
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

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <DateTimePicker
                                    sx={{ width: "100%", margin: "4px 0px 0px 0px ", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày bắt đầu"
                                    ampm={false} // Đặt ampm thành false để hiển thị giờ 24h
                                    format="dd/MM/yyyy HH:mm" // Định dạng để hiển thị ngày, tháng, năm, giờ và phút
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DateTimePicker
                                    sx={{ width: "100%", margin: "4px 0px 0px 0px ", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày kết thúc"
                                    ampm={false} // Đặt ampm thành false để hiển thị giờ 24h
                                    format="dd/MM/yyyy HH:mm" // Định dạng để hiển thị ngày, tháng, năm, giờ và phút
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            fullWidth
                            label="Ghi chú"
                            size="small"
                            multiline
                            rows={2}
                            sx={{ marginTop: "12px" }}
                            variant="outlined"
                        />
                        <Typography variant="h6" component="h2" sx={{ margin: "20px 16px 10px 16px" }}>
                            Mục thu
                        </Typography>
                        <TableContainer
                            sx={{
                                border: "1px solid rgb(224, 224, 224) !important",
                                marginTop: "12px"
                            }}
                            fullWidth
                        >
                            <Table>
                                <TableHead sx={{ backgroundColor: "#A52A2A" }}>
                                    <TableRow sx={{ border: "1px solid rgb(224, 224, 224) !important" }}>
                                        <TableCell width={50}>Stt</TableCell>
                                        <TableCell align="center" width={250}>Mục thu</TableCell>
                                        <TableCell align="center" width={95}>Số tiền</TableCell>
                                        <TableCell align="center" width={150}>Số ngày đến hạn</TableCell>
                                        <TableCell align="center" width={150}>Ghi chú</TableCell>
                                        <TableCell align="center" width={150}>Loại</TableCell>
                                        <TableCell align="center" width={120}>Thao tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowsRevenue && rowsRevenue.length > 0 && rowsRevenue.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    size="small"
                                                    value={row.revenueItem}
                                                    onChange={(e) => handleFieldChange(e, "revenueItem")}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    size="small"
                                                    value={row.money}
                                                    onChange={(e) => handleFieldChange(e, "money")}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    size="small"
                                                    value={row.deadline}
                                                    onChange={(e) => handleFieldChange(e, "deadline")}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    size="small"
                                                    value={row.note}
                                                    onChange={(e) => handleFieldChange(e, "note")}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <FormControl
                                                    size="small"
                                                    onChange={(e) => handleFieldChange(e, "relationship")}
                                                    fullWidth
                                                >
                                                    <Select
                                                    >
                                                        <MenuItem value={1}>Tiền ăn</MenuItem>
                                                        <MenuItem value={2}>Tiền học tập</MenuItem>
                                                        <MenuItem value={3}>Tiền hợp đồng</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="text" onClick={() => deleteRowRevenue(index)}>
                                                    Xóa
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <Tooltip title="Thêm">
                                        <IconButton aria-label="add" style={{ color: "#000000", fontSize: "27px" }}
                                            onClick={addRevenue}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableBody>
                            </Table>
                        </TableContainer >

                        {/* Mục chi */}

                        <Typography variant="h6" component="h2" sx={{ margin: "20px 16px 10px 16px" }}>
                            Mục chi
                        </Typography>
                        <TableContainer
                            sx={{
                                border: "1px solid rgb(224, 224, 224) !important",
                                marginTop: "12px"
                            }}
                            fullWidth
                        >
                            <Table>
                                <TableHead sx={{ backgroundColor: "#A52A2A" }}>
                                    <TableRow sx={{ border: "1px solid rgb(224, 224, 224) !important" }}>
                                        <TableCell width={50}>Stt</TableCell>
                                        <TableCell align="center" width={250}>Mục chi</TableCell>
                                        <TableCell align="center" width={95}>Số tiền</TableCell>
                                        <TableCell align="center" width={150}>Số ngày đến hạn</TableCell>
                                        <TableCell align="center" width={150}>Ghi chú</TableCell>
                                        <TableCell align="center" width={150}>Loại</TableCell>
                                        <TableCell align="center" width={120}>Thao tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowsSpend && rowsSpend.length > 0 && rowsSpend.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    size="small"
                                                    value={row.revenueItem}
                                                    onChange={(e) => handleFieldChangeSpend(e, "spendItem")}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    size="small"
                                                    value={row.money}
                                                    onChange={(e) => handleFieldChangeSpend(e, "money")}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    size="small"
                                                    value={row.deadline}
                                                    onChange={(e) => handleFieldChangeSpend(e, "deadline")}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    size="small"
                                                    value={row.note}
                                                    onChange={(e) => handleFieldChange(e, "note")}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <FormControl
                                                    size="small"
                                                    onChange={(e) => handleFieldChange(e, "relationship")}
                                                    fullWidth
                                                >
                                                    <Select
                                                    >
                                                        <MenuItem value={1}>Tiền mua hàng</MenuItem>
                                                        <MenuItem value={2}>Tiền quảng cáo</MenuItem>
                                                        <MenuItem value={3}>Tiền vận chuyển</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="text" onClick={() => deleteRowSpend(index)}>
                                                    Xóa
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <Tooltip title="Thêm">
                                        <IconButton aria-label="add" style={{ color: "#000000", fontSize: "27px" }}
                                            onClick={addSpend}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableBody>
                            </Table>
                        </TableContainer >
                        <Box marginLeft="auto" align="right">
                            <Button
                                variant="contained"
                                sx={{
                                    marginTop: "30px",
                                    backgroundColor: "#1C2536",
                                    width: "150px",
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
};
