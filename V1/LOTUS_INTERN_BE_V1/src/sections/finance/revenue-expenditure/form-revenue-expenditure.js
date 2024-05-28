import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Autocomplete, Button, Grid, IconButton, TextField, Tooltip, Typography, styled, Dialog, SvgIcon } from '@mui/material';
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import RevenueExpenditureEdit from './revenue-expenditure-edit';
import { Save } from '@mui/icons-material';



export const FormRevenueExpenditure = (props) => {
    const { options, titleEdit } = props;
    const [isOpenEditDiaolog, setIsOpenEditDiaolog] = useState(false);
    const handleOpenEditDiaolog = () => {
        setIsOpenEditDiaolog(true)
    }
    const handleCloseEditDiaolog = () => {
        setIsOpenEditDiaolog(false)
    }
    const handleSave = () => {
        console.log('Đã lưu dữ liệu');
    }
    return (
        <>
            <Grid container
                spacing={0.4}>
                <Grid item
                    xs={10}
                    md={11}
                    lg={11}
                    xl={11}
                >
                    <Autocomplete
                        sx={{ margin: "4px" }}
                        fullWidth
                        size="small"
                        options={options}
                        renderInput={(params) => <TextField variant="outlined"
                            {...params}
                            label="Hạng mục gốc" />}
                    />
                </Grid>
                <Grid item xs={2} md={1} lg={1} xl={1} >
                    <Box style={{ display: "flex", justifyContent: "center" }}>
                        <Tooltip title="Sửa nhóm hạng mục">
                            <IconButton aria-label="edit" style={{ color: "#000000" }}
                                onClick={handleOpenEditDiaolog}
                            >
                                <BorderColorOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                    <TextField
                        required
                        sx={{ margin: "4px", marginTop: "12px" }}
                        size="small"
                        label="Tên hạng mục"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                    <TextField
                        required
                        sx={{ margin: "4px", marginTop: "12px" }}
                        size="small"
                        label="Thứ tự hạng mục"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                    <TextField
                        sx={{ margin: "4px", marginTop: "12px" }}
                        size="small"
                        label="Ghi chú"
                        fullWidth
                        multiline
                        rows={2}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12} sx={{ display: 'flex', justifyContent: 'end' }}>
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
            <RevenueExpenditureEdit
                open={isOpenEditDiaolog}
                onClose={handleCloseEditDiaolog}
                titleEdit={titleEdit}
                options={options}
            />
        </>
    )
}