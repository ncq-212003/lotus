import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import ModalDetail from 'src/components/modal-detail';
import DormitoryEdit from './dormitory-edit';

// Dữ liệu mẫu
const rows = [
    { id: 1, stt: 1, thuocCongTy: 'Công ty A', maKhuKTX: 'KTX001', tenKhiKTX: 'KTX A', diaChi: '123 Đường ABC, Thành phố X', trangThai: 'Hoạt động' },
    { id: 2, stt: 2, thuocCongTy: 'Công ty B', maKhuKTX: 'KTX002', tenKhiKTX: 'KTX B', diaChi: '456 Đường XYZ, Thành phố Y', trangThai: 'Tạm dừng' },
    { id: 3, stt: 3, thuocCongTy: 'Công ty C', maKhuKTX: 'KTX003', tenKhiKTX: 'KTX C', diaChi: '789 Đường LMN, Thành phố Z', trangThai: 'Hoạt động' },
    // Thêm các hàng dữ liệu KTX khác ở đây
];

export default function DormitoryTable() {
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
        { field: 'thuocCongTy', headerName: 'Thuộc công ty', width: 150 },
        { field: 'maKhuKTX', headerName: 'Mã khu KTX', width: 130 },
        { field: 'tenKhiKTX', headerName: 'Tên ký túc xá', width: 150 },
        { field: 'diaChi', headerName: 'Địa chỉ', width: 230 },
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
            <DormitoryEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
            />
        </div>
    );
}
