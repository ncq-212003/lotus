
import React, { useState, useEffect } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Dialog, Typography, styled, IconButton, SvgIcon, DialogActions } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const EditRevenExpen = ({ openEdit, closeEdit, openEditExpen, closeEditExpen }) => {
    const closeDialog = () => {
        openEdit ? closeEdit() : closeEditExpen();

    };

    return (
        <>
            <BootstrapDialog
                onClose={closeDialog}
                open={openEdit ? openEdit : openEditExpen}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                    {openEdit ? "Chỉnh sửa nhóm thu" : "Chỉnh sửa nhóm chi"}
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
                <DialogContent dividers>
                    <Grid container>
                        {openEdit ? (
                            <Autocomplete
                                sx={{ margin: "12px 4px 0px 4px " }}
                                fullWidth
                                size="small"
                                options={["Doanh Thu Bán Hàng", "Thu Nhập Bất Động Sản", "Thu Nhập Sáng Tạo Nội Dung", "Thu tiền ăn uống"]}
                                renderInput={(params) => <TextField variant="outlined" {...params} label="Chọn nhóm thu" />}
                            />
                        ) : (
                            <Autocomplete
                                sx={{ margin: "12px 4px 0px 4px " }}
                                fullWidth
                                size="small"
                                options={["Chi phí xác nhận và tuyển chọn", "Chi phí quảng cáo và tiếp cận nguồn nhân lực", "Chi phí tư vấn pháp lý và thủ tục hành chính", "Chi phí xuất khẩu và đi lại"]}
                                renderInput={(params) => <TextField variant="outlined" {...params} label="Chọn nhóm chi" />}
                            />
                        )}
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Tên mới"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Box style={{ marginTop: "20px" }}>
                        <Button
                            onClick={closeDialog}
                            variant="contained"
                            sx={{
                                width: "150px",
                                backgroundColor: "#1C2536",
                                display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                            }}
                        >
                            Lưu
                        </Button>
                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </>
    );
};
