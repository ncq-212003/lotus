import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, SvgIcon, TextField, Tooltip } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import ModalDetail from 'src/components/modal-detail';
import ActionColumn from 'src/components/action-column ';
import MenuEdit from './menu-edit';
import { useApp } from 'src/hooks/use-app';
import { HANDLERS_MENU } from 'src/contexts/reducer/setting/reducer-menu';
import { listMenuApi } from 'src/contexts/api/setting/api-menu';
import { useEffect } from 'react';

// Dữ liệu mẫu
const rows = [];

export default function MenuTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
    const [state, dispatch] = useApp();
    const { menu } = state;
    const { menus } = menu;

    useEffect(() => {
        const listData = async () => {
            const res = await listMenuApi();
            dispatch({
                type: HANDLERS_MENU.LIST_MENU,
                payload: res.data,
            });
        };
        listData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dataWithSTT = Array.isArray(menus) ? menus.map((menu, index) => ({
        ...menu,
        stt: index + 1,
        id: menu.id || index + 1,
    })) : [];

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
        { field: 'sMenuName', headerName: 'Tên', width: 150 },
        {
            field: 'sMenuIcon',
            headerName: 'Biểu tượng',
            width: 130,
            // renderCell: (params) => (
            //     <SvgIcon fontSize="medium" style={{ color: '#4caf50' }}>
            //         <Squares2X2Icon />
            //     </SvgIcon>
            // ),
        },
        { field: 'sMenuLink', headerName: 'Liên kết', width: 150 },
        { field: 'sParentId', headerName: 'Mục cha', width: 230 },
        { field: 'description', headerName: 'Ghi chú', width: 120 },
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
                rows={dataWithSTT}
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
            <MenuEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
            />
        </div>
    );
}