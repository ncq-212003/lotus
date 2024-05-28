import {
    Box,
    Grid,
    Stack,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    TextField,
    IconButton,
    Tooltip,
    DialogActions,
    Dialog,
    DialogContent,
    DialogTitle,
    SvgIcon,
} from "@mui/material";
import {
    Add,
} from '@mui/icons-material';
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { XCircleIcon } from "@heroicons/react/24/solid";

const fieldDefinitions = {
    TuThangNam: "Từ tháng / năm",
    DenThangNam: "Đến tháng / năm",
    CongViec: 'Công việc',
    MucLuong: 'Mức lương',
    CongTy: 'Công ty',
    DiaChi: 'Địa chỉ',
    GhiChu: 'Ghi chú',
};

export default function TabWorkExperienceDomestically() {
    const [rows, setRows] = useState([]);
    const [newRow, setNewRow] = useState({
        Stt: '',
        TuThangNam: new Date(),
        DenThangNam: new Date(),
        CongViec: '',
        MucLuong: '',
        DiaChi: '',
        CongTy: '',
        GhiChu: '',
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [selectedField, setSelectedField] = useState('');
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);

    const openDetailDialog = (index) => {
        setEditingIndex(index);
        setDetailDialogOpen(true);
    };

    const openDialog = (fieldName, index) => {
        setSelectedField(fieldName);
        setEditingIndex(index);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setEditingIndex(null);
        setIsDialogOpen(false);
        setDetailDialogOpen(false);
    };


    const addRow = () => {
        setRows([...rows, newRow]);
        setNewRow({
            Stt: '',
            TuThangNam: new Date(),
            DenThangNam: new Date(),
            CongViec: '',
            MucLuong: '',
            DiaChi: '',
            CongTy: '',
            GhiChu: '',
        });
    };

    const deleteRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };

    const handleFieldChange = (e, fieldName, index) => {
        const updatedRows = [...rows];
        updatedRows[index][fieldName] = e.target.value;
        setRows(updatedRows);
    };

    return (
        <>
            <Stack spacing={3}>
                <Grid
                    container
                    spacing={2}

                >
                    <Grid
                        item
                        sm={12}
                        md={12}
                        xs={12}
                    >
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead
                                    sx={{
                                        cursor: 'pointer'
                                    }}
                                >
                                    <TableRow>
                                        <TableCell>Stt</TableCell>
                                        <TableCell align="center">Từ tháng / năm</TableCell>
                                        <TableCell align="center">Đến tháng / năm</TableCell>
                                        <TableCell align="center">Công việc</TableCell>
                                        <TableCell align="center">Mức lương</TableCell>
                                        <TableCell align="center">Công ty</TableCell>
                                        <TableCell align="center">Địa chỉ</TableCell>
                                        <TableCell align="center">Ghi chú</TableCell>
                                        <TableCell align="center">Thao tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            {Object.keys(fieldDefinitions).map((fieldName) => (
                                                <TableCell align="left" key={fieldName}
                                                    sx={{
                                                        padding: '0 4px'
                                                    }}
                                                >
                                                    {fieldName === "TuThangNam" || fieldName === "DenThangNam" ? (
                                                        <DatePicker
                                                            format="MM/yyyy"
                                                            value={row[fieldName]}
                                                            onChange={(date) => {
                                                                const updatedRows = [...rows];
                                                                updatedRows[index][fieldName] = date;
                                                                setRows(updatedRows);
                                                            }}
                                                            slotProps={{
                                                                textField: {
                                                                    size: 'small',
                                                                    variant: 'outlined'
                                                                }
                                                            }}
                                                        />
                                                    ) : (
                                                        <>
                                                            {fieldName === "MucLuong" ? (
                                                                <TextField
                                                                    variant="outlined"
                                                                    size="small"
                                                                    value={row[fieldName]}
                                                                    onChange={(e) => handleFieldChange(e, fieldName, index)}
                                                                />
                                                            ) : (
                                                                <TextField
                                                                    variant="outlined"
                                                                    size="small"
                                                                    value={row[fieldName]}
                                                                    onClick={() => openDialog(fieldName, index)}
                                                                />
                                                            )}
                                                        </>
                                                    )}
                                                </TableCell>
                                            ))}
                                            <TableCell
                                                align="right"
                                                sx={{
                                                    display: 'flex',
                                                }}
                                            >
                                                <Button variant="text" onClick={() => deleteRow(index)}>
                                                    Xóa
                                                </Button>
                                                <Button variant="text" onClick={() => openDetailDialog(index)}>
                                                    Nhập
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Tooltip title="Thêm">
                            <IconButton
                                onClick={addRow} >
                                <Add />
                            </IconButton>
                        </Tooltip>
                        {/* Nhập theo field */}
                        <Dialog open={isDialogOpen} onClose={closeDialog}>
                            <DialogContent
                                sx={{
                                    minWidth: '300px'
                                }}
                            >
                                {selectedField && editingIndex !== null && (
                                    <>
                                        {selectedField === "GhiChu" ? (
                                            <TextField
                                                multiline
                                                rows={2}
                                                label={fieldDefinitions[selectedField]}
                                                variant="outlined"
                                                value={rows[editingIndex][selectedField]}
                                                onChange={(e) => {
                                                    const updatedRows = [...rows];
                                                    updatedRows[editingIndex][selectedField] = e.target.value;
                                                    setRows(updatedRows);
                                                }}
                                                fullWidth
                                            />
                                        ) : (
                                            <TextField
                                                label={fieldDefinitions[selectedField]}
                                                variant="outlined"
                                                value={rows[editingIndex][selectedField]}
                                                onChange={(e) => {
                                                    const updatedRows = [...rows];
                                                    updatedRows[editingIndex][selectedField] = e.target.value;
                                                    setRows(updatedRows);
                                                }}
                                                fullWidth
                                            />
                                        )}
                                    </>
                                )}
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus
                                    onClick={closeDialog}
                                    variant="contained"
                                    sx={{ background: '#1C2536' }}
                                >
                                    Hủy bỏ
                                </Button>
                                <Button autoFocus
                                    onClick={closeDialog}
                                    variant="contained"
                                    sx={{ background: '#1C2536' }}
                                >
                                    Lưu
                                </Button>
                            </DialogActions>
                        </Dialog>
                        {/* Nhập full */}
                        <Dialog open={detailDialogOpen} onClose={closeDialog}>
                            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                                Nhập chi tiết
                            </DialogTitle>
                            <IconButton
                                aria-label="close"
                                onClick={closeDialog}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <SvgIcon fontSize="inherit">
                                    <XCircleIcon />
                                </SvgIcon>
                            </IconButton>
                            <DialogContent>
                                {editingIndex !== null && (
                                    <>
                                        {Object.keys(fieldDefinitions).map((fieldName) => (
                                            <>
                                                {fieldName === "GhiChu" ? (
                                                    <TextField
                                                        multiline
                                                        rows={2}
                                                        key={fieldName}
                                                        label={fieldDefinitions[fieldName]}
                                                        variant="outlined"
                                                        value={rows[editingIndex][fieldName]}
                                                        onChange={(e) => handleFieldChange(e, fieldName, editingIndex)}
                                                        fullWidth
                                                        margin="normal"
                                                        size="small"
                                                    />
                                                ) : (
                                                    <>
                                                        {fieldName === "TuThangNam" || fieldName === "DenThangNam" ? (
                                                            <DatePicker
                                                                format="MM/yyyy"
                                                                value={rows[editingIndex][fieldName]}
                                                                onChange={(date) => handleFieldChange({ target: { value: date } }, fieldName, editingIndex)}
                                                                slotProps={{
                                                                    textField: {
                                                                        size: 'small',
                                                                        variant: 'outlined'
                                                                    }
                                                                }}
                                                                label={fieldDefinitions[fieldName]}
                                                                sx={{
                                                                    width: '100%',
                                                                    margin: '16px 0 8px 0'
                                                                }}
                                                            />
                                                        ) : (
                                                            <TextField
                                                                key={fieldName}
                                                                label={fieldDefinitions[fieldName]}
                                                                variant="outlined"
                                                                value={rows[editingIndex][fieldName]}
                                                                onChange={(e) => handleFieldChange(e, fieldName, editingIndex)}
                                                                fullWidth
                                                                margin="normal"
                                                                size="small"
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        ))}
                                    </>
                                )}
                            </DialogContent>
                            <DialogActions
                                sx={{
                                    backgroundColor: '#e3e6e6'
                                }}
                            >
                                <Button autoFocus
                                    onClick={closeDialog}
                                    variant="contained"
                                    sx={{ background: '#1C2536' }}
                                >
                                    Lưu
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
};