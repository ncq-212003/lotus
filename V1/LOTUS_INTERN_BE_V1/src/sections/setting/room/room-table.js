import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import ModalDetail from 'src/components/modal-detail';
import RoomEdit from './room-edit';
import ActionColumn from 'src/components/action-column ';

// Dữ liệu mẫu
const rows = [
    { id: 1, stt: 1, tenKTX: 'KTX A', maPhong: 'P001', tenPhong: 'Phòng 101', trangThai: 'Trống' },
    { id: 2, stt: 2, tenKTX: 'KTX A', maPhong: 'P002', tenPhong: 'Phòng 102', trangThai: 'Đã thuê' },
    { id: 3, stt: 3, tenKTX: 'KTX B', maPhong: 'P101', tenPhong: 'Phòng 201', trangThai: 'Trống' },
    { id: 4, stt: 4, tenKTX: 'KTX B', maPhong: 'P102', tenPhong: 'Phòng 202', trangThai: 'Trống' },
    // Thêm các hàng dữ liệu phòng khác ở đây
];

export default function RoomTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);

    //Detail
    const handleViewDetail = (params) => {
        setSelectedRow(params.row);
        setIsModalDetailOpen(true);
    };

    const closeModalDetail = () => {
        setIsModalDetailOpen(false);
    };

    //Edit
    const openDialogEdit = (params) => {
        setSelectedRow(params.row);
        setisDialogEditOpen(true);
    };

    const closeDialogEdit = () => {
        setisDialogEditOpen(false);
    };


    const columns = [
        { field: 'stt', headerName: 'STT', width: 70 },
        { field: 'tenKTX', headerName: 'Tên ký túc xá', width: 200 },
        { field: 'maPhong', headerName: 'Mã phòng', width: 130 },
        { field: 'tenPhong', headerName: 'Tên phòng', width: 200 },
        { field: 'trangThai', headerName: 'Trạng thái', width: 120 },
        {
            field: 'action',
            headerName: 'Thao tác',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <>
                    <ActionColumn
                        handleViewDetail={handleViewDetail}
                        openDialogEdit={openDialogEdit}
                        params={params}
                    />
                </>
            ),
        }
    ];

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({

    });

    const handleDelete = (index) => {
        const updateUnions = [...rows];

        const deletedUnion = updateUnions.splice(index, 1);

        if (window.confirm(`Bạn có chắc chắn muốn xóa ${deletedUnion[0].name} không?`)) {
            console.log("Xóa thông tin của:", deletedUnion[0]);
        }
    };

    const handleEdit = (index) => {
        const updateUnions = [...rows];
        console.log("Chỉnh sửa thông tin của:", updateUnions[index]);
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
            <RoomEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
            />
        </div>
    );
}
