import * as React from 'react';
import { AppBar, Button, Dialog, IconButton, SvgIcon, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { Box, Stack } from '@mui/system';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import ModalDetail from 'src/components/modal-detail';
import ModuleEdit from './module-edit';
import { XCircleIcon } from '@heroicons/react/24/solid';

export default function ModuleTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);

    const openDialogEdit = (params) => {
        setSelectedRow(params.row);
        console.log(params.row);
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

    const handleDelete = (index) => {
        const updateUnions = [...rows];

        const deletedUnion = updateUnions.splice(index, 1);

        if (window.confirm(`Bạn có chắc chắn muốn xóa ${deletedUnion[0].name} không?`)) {
            console.log("Xóa thông tin của:", deletedUnion[0]);
        }
    };

    const columns = [
        { field: 'id', headerName: 'STT', width: 70 },
        { field: 'moduleName', headerName: 'Tên module', width: 150 },
        { field: 'description', headerName: 'Mô tả', flex: 1 },
        {
            field: 'action',
            headerName: 'Hành động',
            width: 150,
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

    const rows = [
        {
            id: 1,
            moduleName: 'Lịch công tác',
            description: 'Lịch, Địa điểm, Xe, Quà tặng, Tiến trình',
        },
        {
            id: 2,
            moduleName: 'TTS/DHS',
            description: 'Thực tập sinh, Du học sinh, Lịch bay',
        },
        {
            id: 3,
            moduleName: 'Đơn hàng',
            description: 'Đang tiến cử, Đã tuyển xong, Hoàn thành hồ sơ, Hủy',
        },
        {
            id: 4,
            moduleName: 'Hồ sơ',
            description: 'Cá nhân, Dịch thuật, Bằng cấp chứng chỉ, Báo cáo',
        },
        {
            id: 5,
            moduleName: 'Điểm danh',
            description: '',
        },
        {
            id: 6,
            moduleName: 'Tài chính',
            description: 'Báo cáo thu, Báo cáo chi, Chương trình',
        },
        {
            id: 7,
            moduleName: 'Khách hàng',
            description: 'Nghiệp đoàn, Công ty tiếp nhận, Khiếu nại',
        },
        {
            id: 8,
            moduleName: 'Đào tạo',
            description: 'Bài thi, Câu hỏi, Danh sách học viên, Danh sách lớp, Danh sách giáo viên, Học viên đang thi tuyển, Học viên chưa trúng tuyển, Báo cáo bảng điểm, Báo cáo học tập, Báo cáo điểm danh, Chứng chỉ',
        },
        {
            id: 9,
            moduleName: 'Công ty',
            description: 'Công ty, Nhân viên, Phòng ban, Chi nhánh, Nguồn cung ứng',
        },
        {
            id: 10,
            moduleName: 'Cài đặt',
            description: '',
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <TextField sx={{ margin: "8px 0px", width: '50%', padding: '4px ' }} size="small" label="Nhập nội dung tìm kiếm" />
                <Button variant="contained" sx={{ margin: '8px', backgroundColor: "#1C2536" }}>Tìm kiếm</Button>
            </Box>
            <DataGrid
                rows={rows}
                columns={columns}
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
                }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
                checkboxSelection
            />
            <ModalDetail
                open={isModalDetailOpen}
                onClose={closeModalDetail}
                rowData={selectedRow}
                columns={columns}
            />
            <ModuleEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
                rowData={selectedRow}
            />
        </div>
    );
}
