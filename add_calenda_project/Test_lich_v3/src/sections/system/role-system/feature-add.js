import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FeatureAdd({ open, onClose }) {

    const handleClose = () => {
        onClose();
    };

    const handleAdd = () => {
        onClose();
    };

    const modules = ["Lịch công tác", "TTS/DHS", "Đơn hàng", "Hồ sơ", "Điểm danh", "Khách hàng", "Tài chính", "Đào tạo"]

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative', backgroundColor: '#1C2536' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Thêm chức năng
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
            <Stack spacing={3}
                sx={{ p: 2 }}>
                <Grid container
                    spacing={2}
                    margin="none"
                    justifyContent="center">
                    <Grid item
                        xs={12}
                        md={12}>

                        <TextField
                            sx={{ margin: "4px" }}
                            label="Tên chức năng"
                            fullWidth
                            required
                            name="accountCode"
                        />
                        <Autocomplete
                            fullWidth
                            options={modules}
                            sx={{ margin: "4px" }}
                            renderInput={(params) => <TextField {...params} label="Module" />}
                        />
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Mô tả"
                            fullWidth
                            required
                            multiline
                            rows={3}
                        />
                    </Grid>
                </Grid>
            </Stack>
            <DialogActions>
                <Button autoFocus
                    onClick={handleAdd}
                    variant="contained"
                    sx={{ background: '#1C2536' }}
                >
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
}
