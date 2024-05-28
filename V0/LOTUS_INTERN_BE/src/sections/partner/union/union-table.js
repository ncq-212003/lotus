import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Menu, MenuItem, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import ContactAdd from './contact-add';
import { Box } from '@mui/system';
import { Delete, Edit, GroupAdd, MoreVert } from '@mui/icons-material';
import { styled, alpha } from "@mui/material/styles";
import ContactTable from './contact-table';

export default function UnionTable() {
    // Dialog Contact Add 
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    //Dialog Contact List
    const [isDialogContactOpen, setIsDialogContactOpen] = useState(false);

    const openDialogContact = () => {
        setIsDialogContactOpen(true);
    };

    const closeDialogContact = () => {
        setIsDialogContactOpen(false);
    };

    //Handles
    const handleEdit = (index) => {
        const updateUnions = [...rows];
        console.log("Chỉnh sửa thông tin của:", updateUnions[index]);
    };


    const handleDelete = (index) => {
        const updateUnions = [...rows];

        const deletedUnion = updateUnions.splice(index, 1);

        if (window.confirm(`Bạn có chắc chắn muốn xóa ${deletedUnion[0].name} không?`)) {
            console.log("Xóa thông tin của:", deletedUnion[0]);
        }
    };


    const columns = [
        { field: 'stt', headerName: 'STT', width: 70 },
        { field: 'masoNghiepDoan', headerName: 'Mã số nghiệp đoàn', width: 150 },
        { field: 'tenNghiepDoan', headerName: 'Tên nghiệp đoàn', width: 200 },
        { field: 'diaChiWebsite', headerName: 'Địa chỉ Website', width: 200 },
        { field: 'tinhTrangTrinhCuc', headerName: 'Tình trạng trình cục', width: 150 },
        { field: 'nhanVienChamSoc', headerName: 'Nhân viên chăm sóc', width: 150 },
        { field: 'ghiChu', headerName: 'Ghi chú', width: 120 },
        { field: 'diaChi', headerName: 'Địa chỉ', width: 150 },
        { field: 'soDienThoai', headerName: 'Số điện thoại', width: 150 },
        { field: 'soFax', headerName: 'Số fax', width: 120 },
        { field: 'hoTenNguoiDaiDien', headerName: 'Họ tên người đại diện', width: 200 },
        { field: 'chucVu', headerName: 'Chức vụ', width: 150 },
        { field: 'soHopDong', headerName: 'Số hợp đồng', width: 150 },
        { field: 'ngayDangKy', headerName: 'Ngày đăng ký', width: 150 },
        { field: 'phiTroCapThangDau', headerName: 'Phí trợ cấp tháng đầu', width: 180 },
        { field: 'phiCapDaoTao', headerName: 'Phí cấp đào tạo', width: 150 },
        { field: 'phiQuanLy', headerName: 'Phí quản lý', width: 150 },
        {
            field: 'action',
            headerName: 'Hành động',
            width: 100,
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton
                        id="demo-customized-button"
                        aria-controls={open ? "demo-customized-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        disableElevation
                        onClick={handleClick}
                    >
                        <MoreVert />
                    </IconButton>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            "aria-labelledby": "demo-customized-button"
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem
                            onClick={(event) => {
                                event.stopPropagation();
                                openDialog()
                                handleClose()
                            }}
                            disableRipple>
                            <GroupAdd />
                            Thêm người liên hệ
                        </MenuItem>
                        <MenuItem
                            onClick={(event) => {
                                event.stopPropagation();
                                handleEdit(params.id);
                                handleClose()
                            }}
                            disableRipple>
                            <Edit />
                            Sửa
                        </MenuItem>
                        <MenuItem
                            onClick={(event) => {
                                event.stopPropagation();
                                handleDelete(params.id)
                                handleClose()
                            }}
                            disableRipple>
                            <Delete />
                            Xóa
                        </MenuItem>
                    </StyledMenu>
                </div>
            ),
        }

    ];

    // Dữ liệu mẫu
    const rows = [
        {
            id: 1,
            stt: 1,
            masoNghiepDoan: 'MSND001',
            tenNghiepDoan: 'Nghiệp đoàn ABC',
            diaChiWebsite: 'https://example.com',
            tinhTrangTrinhCuc: 'Được cấp phép',
            nhanVienChamSoc: 'Người chăm sóc ABC',
            ghiChu: 'Ghi chú ABC',
            diaChi: 'Địa chỉ ABC',
            soDienThoai: '123456789',
            soFax: '1234',
            hoTenNguoiDaiDien: 'Người đại diện ABC',
            chucVu: 'Giám đốc',
            soHopDong: 'HD001',
            ngayDangKy: '01/01/2022',
            phiTroCapThangDau: '1000000 VND',
            phiCapDaoTao: '500000 VND',
            phiQuanLy: '200000 VND'
        },
        {
            id: 2,
            stt: 2,
            masoNghiepDoan: 'MSND002',
            tenNghiepDoan: 'Nghiệp đoàn XYZ',
            diaChiWebsite: 'https://xyzcorp.com',
            tinhTrangTrinhCuc: 'Chưa được cấp phép',
            nhanVienChamSoc: 'Người chăm sóc XYZ',
            ghiChu: 'Ghi chú XYZ',
            diaChi: 'Địa chỉ XYZ',
            soDienThoai: '987654321',
            soFax: '5678',
            hoTenNguoiDaiDien: 'Người đại diện XYZ',
            chucVu: 'Trưởng phòng',
            soHopDong: 'HD002',
            ngayDangKy: '02/02/2022',
            phiTroCapThangDau: '1200000 VND',
            phiCapDaoTao: '600000 VND',
            phiQuanLy: '300000 VND'
        },
        {
            id: 3,
            stt: 3,
            masoNghiepDoan: 'MSND011',
            tenNghiepDoan: 'Nghiệp đoàn LMN',
            diaChiWebsite: 'https://lmncompany.com',
            tinhTrangTrinhCuc: 'Được cấp phép',
            nhanVienChamSoc: 'Người chăm sóc LMN',
            ghiChu: 'Ghi chú LMN',
            diaChi: 'Địa chỉ LMN',
            soDienThoai: '5432154321',
            soFax: '5678',
            hoTenNguoiDaiDien: 'Người đại diện LMN',
            chucVu: 'Trưởng nhóm',
            soHopDong: 'HD011',
            ngayDangKy: '11/11/2022',
            phiTroCapThangDau: '1100000 VND',
            phiCapDaoTao: '550000 VND',
            phiQuanLy: '275000 VND'
        },
        {
            id: 4,
            stt: 4,
            masoNghiepDoan: 'MSND012',
            tenNghiepDoan: 'Nghiệp đoàn OPQ',
            diaChiWebsite: 'https://opqcorp.com',
            tinhTrangTrinhCuc: 'Chưa được cấp phép',
            nhanVienChamSoc: 'Người chăm sóc OPQ',
            ghiChu: 'Ghi chú OPQ',
            diaChi: 'Địa chỉ OPQ',
            soDienThoai: '9988776655',
            soFax: '1234',
            hoTenNguoiDaiDien: 'Người đại diện OPQ',
            chucVu: 'Giám đốc điều hành',
            soHopDong: 'HD012',
            ngayDangKy: '12/12/2022',
            phiTroCapThangDau: '900000 VND',
            phiCapDaoTao: '450000 VND',
            phiQuanLy: '225000 VND'
        },
        {
            id: 5,
            stt: 5,
            masoNghiepDoan: 'MSND013',
            tenNghiepDoan: 'Nghiệp đoàn RST',
            diaChiWebsite: 'https://rstco.com',
            tinhTrangTrinhCuc: 'Được cấp phép',
            nhanVienChamSoc: 'Người chăm sóc RST',
            ghiChu: 'Ghi chú RST',
            diaChi: 'Địa chỉ RST',
            soDienThoai: '1111222333',
            soFax: '8888',
            hoTenNguoiDaiDien: 'Người đại diện RST',
            chucVu: 'Quản lý',
            soHopDong: 'HD013',
            ngayDangKy: '13/01/2022',
            phiTroCapThangDau: '1500000 VND',
            phiCapDaoTao: '750000 VND',
            phiQuanLy: '375000 VND'
        },
        {
            id: 6,
            stt: 6,
            masoNghiepDoan: 'MSND014',
            tenNghiepDoan: 'Nghiệp đoàn UVW',
            diaChiWebsite: 'https://uvwcompany.com',
            tinhTrangTrinhCuc: 'Chưa được cấp phép',
            nhanVienChamSoc: 'Người chăm sóc UVW',
            ghiChu: 'Ghi chú UVW',
            diaChi: 'Địa chỉ UVW',
            soDienThoai: '4444333222',
            soFax: '4444',
            hoTenNguoiDaiDien: 'Người đại diện UVW',
            chucVu: 'Trưởng phòng',
            soHopDong: 'HD014',
            ngayDangKy: '14/02/2022',
            phiTroCapThangDau: '1300000 VND',
            phiCapDaoTao: '650000 VND',
            phiQuanLy: '325000 VND'
        },
        {
            id: 7,
            stt: 7,
            masoNghiepDoan: 'MSND015',
            tenNghiepDoan: 'Nghiệp đoàn IJK',
            diaChiWebsite: 'https://ijkcorp.com',
            tinhTrangTrinhCuc: 'Được cấp phép',
            nhanVienChamSoc: 'Người chăm sóc IJK',
            ghiChu: 'Ghi chú IJK',
            diaChi: 'Địa chỉ IJK',
            soDienThoai: '7777666555',
            soFax: '8765',
            hoTenNguoiDaiDien: 'Người đại diện IJK',
            chucVu: 'Giám đốc điều hành',
            soHopDong: 'HD015',
            ngayDangKy: '15/03/2022',
            phiTroCapThangDau: '1400000 VND',
            phiCapDaoTao: '700000 VND',
            phiQuanLy: '350000 VND'
        },
        {
            id: 8,
            stt: 8,
            masoNghiepDoan: 'MSND016',
            tenNghiepDoan: 'Nghiệp đoàn XYZ',
            diaChiWebsite: 'https://xyzcorp.com',
            tinhTrangTrinhCuc: 'Chưa được cấp phép',
            nhanVienChamSoc: 'Người chăm sóc XYZ',
            ghiChu: 'Ghi chú XYZ',
            diaChi: 'Địa chỉ XYZ',
            soDienThoai: '987654321',
            soFax: '5678',
            hoTenNguoiDaiDien: 'Người đại diện XYZ',
            chucVu: 'Trưởng phòng',
            soHopDong: 'HD016',
            ngayDangKy: '16/04/2022',
            phiTroCapThangDau: '1200000 VND',
            phiCapDaoTao: '600000 VND',
            phiQuanLy: '300000 VND'
        },
        {
            id: 9,
            stt: 9,
            masoNghiepDoan: 'MSND017',
            tenNghiepDoan: 'Nghiệp đoàn ABC',
            diaChiWebsite: 'https://abc-corp.com',
            tinhTrangTrinhCuc: 'Chưa được cấp phép',
            nhanVienChamSoc: 'Người chăm sóc ABC',
            ghiChu: 'Ghi chú ABC',
            diaChi: 'Địa chỉ ABC',
            soDienThoai: '123456789',
            soFax: '1234',
            hoTenNguoiDaiDien: 'Người đại diện ABC',
            chucVu: 'Giám đốc',
            soHopDong: 'HD017',
            ngayDangKy: '17/05/2022',
            phiTroCapThangDau: '1100000 VND',
            phiCapDaoTao: '550000 VND',
            phiQuanLy: '275000 VND'
        },
        {
            id: 10,
            stt: 10,
            masoNghiepDoan: 'MSND018',
            tenNghiepDoan: 'Nghiệp đoàn UVW',
            diaChiWebsite: 'https://uvwcompany.com',
            tinhTrangTrinhCuc: 'Được cấp phép',
            nhanVienChamSoc: 'Người chăm sóc UVW',
            ghiChu: 'Ghi chú UVW',
            diaChi: 'Địa chỉ UVW',
            soDienThoai: '4444333222',
            soFax: '4444',
            hoTenNguoiDaiDien: 'Người đại diện UVW',
            chucVu: 'Trưởng phòng',
            soHopDong: 'HD018',
            ngayDangKy: '18/06/2022',
            phiTroCapThangDau: '1300000 VND',
            phiCapDaoTao: '650000 VND',
            phiQuanLy: '325000 VND'
        }
    ];

    //Style Opiton
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const StyledMenu = styled((props) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            {...props}
        />
    ))(({ theme }) => ({
        "& .MuiPaper-root": {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
                theme.palette.mode === "light"
                    ? "rgb(55, 65, 81)"
                    : theme.palette.grey[300],
            boxShadow:
                "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            "& .MuiMenu-list": {
                padding: "4px 0"
            },
            "& .MuiMenuItem-root": {
                "& .MuiSvgIcon-root": {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5)
                },
                "&:active": {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity
                    )
                }
            }
        }
    }));


    return (
        <div style={{ height: 400, width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center'
                }}
            >
                <TextField
                    sx={{ margin: "8px 0px", width: '50%', padding: '4px ' }}
                    size="small"
                    label="Nhập nội dung tìm kiếm"
                />
                <Button
                    variant="contained"
                    sx={{
                        margin: '8px',
                        backgroundColor: "#1C2536",
                    }}
                >
                    Tìm kiếm
                </Button>
            </Box>
            <DataGrid
                rows={rows}
                columns={columns}
                onRowClick={openDialogContact}
                sx={{
                    borderColor: 'rgb(224, 224, 224)',
                    '& .MuiDataGrid-row': {
                        border: '0.1px solid rgb(224, 224, 224) !important',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                    '& .MuiDataGrid-columnHeader': {
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
                        outline: 'none !important',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: '#f0f0f0',
                        borderBottom: '1px solid #ccc '
                    },
                }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
                checkboxSelection
            />
            <ContactAdd
                open={isDialogOpen}
                onClose={closeDialog}
            />
            <ContactTable
                open={isDialogContactOpen}
                onClose={closeDialogContact}
            />

        </div>
    );
}
