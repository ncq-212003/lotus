import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import ModalDetail from 'src/components/modal-detail';
import ClassroomEdit from './classroom-edit';

const rows = [
    { id: 1, stt: 1, congTy: 'Công ty ABC', maLopHoc: 'LH001', giaoVienChuNhiem: 'Nguyễn Thị Minh', phongHoc: 'Phòng A1', lopTruong: 'Nguyễn Văn Nam', dienThoaiLopTruong: '0987654321', ngayKhaiGiang: '15/11/2023', ngayBeGiang: '30/04/2024', tienDo: '50%', gioHoc: 'Thứ 2 - Thứ 5 (18:00 - 20:00)', loaiPhongHoc: 'Offline', trangThai: 'Đang diễn ra' },
    { id: 2, stt: 2, congTy: 'Công ty XYZ', maLopHoc: 'LH002', giaoVienChuNhiem: 'Lê Văn Đức', phongHoc: 'Phòng B2', lopTruong: 'Trần Thị Hằng', dienThoaiLopTruong: '0123456789', ngayKhaiGiang: '01/12/2023', ngayBeGiang: '15/05/2024', tienDo: '60%', gioHoc: 'Thứ 3 - Thứ 6 (19:00 - 21:00)', loaiPhongHoc: 'Online', trangThai: 'Sắp khai giảng' },
    // Thêm các hàng dữ liệu lớp học khác ở đây
];

export default function ClassroomTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);

    const openDialogEdit = (params) => {
        setSelectedRow(params.row);
        setisDialogEditOpen(true);
    };

    const closeDialogEdit = () => {
        setisDialogEditOpen(false);
    };

    const handleViewDetail = (params) => {
        setSelectedRow(params.row);
        setIsModalDetailOpen(true);
    };

    const closeModalDetail = () => {
        setIsModalDetailOpen(false);
    };

    const columns = [
        { field: 'stt', headerName: 'STT', width: 70 },
        { field: 'congTy', headerName: 'Thuộc công ty', width: 150 },
        { field: 'maLopHoc', headerName: 'Mã lớp học', width: 130 },
        { field: 'giaoVienChuNhiem', headerName: 'Giáo viên chủ nhiệm', width: 150 },
        { field: 'phongHoc', headerName: 'Phòng học', width: 120 },
        { field: 'lopTruong', headerName: 'Lớp trưởng', width: 150 },
        { field: 'dienThoaiLopTruong', headerName: 'Điện thoại lớp trưởng', width: 150 },
        { field: 'ngayKhaiGiang', headerName: 'Ngày khai giảng', width: 130 },
        { field: 'ngayBeGiang', headerName: 'Ngày bế giảng', width: 130 },
        { field: 'tienDo', headerName: 'Tiến độ', width: 100 },
        { field: 'gioHoc', headerName: 'Giờ học', width: 200 },
        { field: 'loaiPhongHoc', headerName: 'Loại phòng học', width: 120 },
        { field: 'trangThai', headerName: 'Trạng thái', width: 120 },
        {
            field: 'action',
            headerName: 'Thao tác',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Tooltip title="Chi tiết">
                        <IconButton color="primary"
                            onClick={(event) => {
                                event.stopPropagation();
                                handleViewDetail(params);
                            }}>
                            <Visibility />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Sửa">
                        <IconButton
                            onClick={(event) => {
                                event.stopPropagation();
                                openDialogEdit(params);
                            }}>
                            <Edit />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <IconButton sx={{ color: "black" }}
                            onClick={(event) => {
                                event.stopPropagation();
                                handleDelete(params.id);
                            }}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        }
    ];

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        dienThoaiLopTruong: false,
        tienDo: false,
        gioHoc: false,
        loaiPhongHoc: false,
        phongHoc: false,
    });

    const handleDelete = (index) => {
        const updateUnions = [...rows];

        const deletedUnion = updateUnions.splice(index, 1);

        if (window.confirm(`Bạn có chắc chắn muốn xóa ${deletedUnion[0].name} không?`)) {
            console.log("Xóa thông tin của:", deletedUnion[0]);
        }
    };

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
                    sx={{ margin: "12px 0px", width: '50%' }}
                    size="small"
                    label="Nhập nội dung tìm kiếm"
                    variant="outlined"
                />
                <Button
                    sx={{
                        margin: '8px',
                        backgroundColor: '#1C2536',
                        color: 'white'
                    }}
                    size='small'
                    variant="contained"
                >Tìm kiếm</Button>
            </Box>
            <DataGrid
                rows={rows}
                columns={columns}
                sx={{
                    borderColor: 'rgb(224, 224, 224)',
                    '& .MuiDataGrid-row': {
                        border: '0.1px solid rgb(224, 224, 224) !important',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f0f0f0',
                        borderBottom: '1px solid #ccc '
                    },
                }}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) =>
                    setColumnVisibilityModel(newModel)
                }
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
            <ModalDetail
                open={isModalDetailOpen}
                onClose={closeModalDetail}
                rowData={selectedRow}
                columns={columns}
            />
            <ClassroomEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
            />
        </div>
    );
}
