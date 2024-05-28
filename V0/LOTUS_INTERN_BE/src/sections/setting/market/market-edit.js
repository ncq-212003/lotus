import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { SvgIcon, Stack, Box, Grid, AppBar, TextField } from "@mui/material";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MarketEdit({ open, onClose, selectedRow }) {
  const [valueManuoc, setvalueManuoc] = useState('');
  const [valueTennuoc, setvalueTennuoc] = useState('');
  const [valuePhimoigioi, setvaluePhimoigioi] = useState('');
  const [valueGioithieu, setvalueGioithieu] = useState('');
  useEffect(() => {
    if (selectedRow) {
      setvalueManuoc(selectedRow.manuoc || '');
      setvalueTennuoc(selectedRow.tennuoc || '');
      setvaluePhimoigioi(selectedRow.phimoigioi || '');
      setvalueGioithieu(selectedRow.gioithieu || '');
    }
  }, [selectedRow]);

  const handleSave = () => {
    const formData = {
        manuoc: valueManuoc,
        tennuoc: valueTennuoc,
        phimoigioi: valuePhimoigioi,
        gioithieu: valueGioithieu,
    }
    console.log("Data is row:", formData)
    onClose();
  }

  const handleClose = () => {
    onClose();
  };

  const handleAdd = () => {
    onClose();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "fixed", backgroundColor: "#1C2536" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <SvgIcon fontSize="small">
              <XCircleIcon />
            </SvgIcon>
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            SỬA THÔNG TIN
          </Typography>
          <Button autoFocus color="inherit" onClick={handleAdd}>
            Lưu
          </Button>
        </Toolbar>
      </AppBar>
      <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
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
                    <Box
                        sx={{
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{ marginBottom: "16px" }}
                        >
                            Thông tin cơ bản
                        </Typography>
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Mã Nước"
                            fullWidth
                            value={valueManuoc}
                            onChange={(e) => {setvalueManuoc(valueManuoc)}}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Tên Nước"
                            fullWidth
                            value={valueTennuoc}
                            onChange={(e) => {setvalueTennuoc(valueTennuoc)}}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Phí Môi Giới Trúng Tuyển"
                            fullWidth
                            value={valuePhimoigioi}
                            onChange={(e) => {setvaluePhimoigioi(valuePhimoigioi)}}
                        />
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Giới Thiệu Chi Tiết"
                            fullWidth
                            value={valueGioithieu}
                            onChange={(e) => {setvalueGioithieu(valueGioithieu)}}
                        />
                        <Box 
                            sx={{
                                display:'flex',
                                justifyContent:'end',
                                width: '100%',
                                marginTop: '20px'
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#1C2536',
                                }}
                                onClick={handleSave}
                            >
                                Thêm
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Stack>
    </Dialog>
  );
}
