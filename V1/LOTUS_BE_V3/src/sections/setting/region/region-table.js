import * as React from 'react';
import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material';
import ModalDetail from 'src/components/modal-detail';
import ActionColumn from 'src/components/action-column ';
import RegionEdit from './region-edit';
import { useApp } from "src/hooks/use-app";
import { HANDLERS_REGION } from "src/contexts/reducer/setting/reducer-region";
import { listRegionApi } from "src/contexts/api/setting/api-region";

export default function RegionTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);

    const [state, dispatch] = useApp();
    const { region } = state;
    const { regions } = region;

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listRegionApi();
                if (response.status === 200) {
                    dispatch({
                        type: HANDLERS_REGION.LIST_REGION,
                        payload: response.data
                    })
                }
            } catch (error) {
                console.log("Đã xảy ra lỗi !!!", error)
            }
        };
        fetchData();
    }, [])

    const countries = [
        { code: 'KP', label: 'Korea' },
        { code: 'AI', label: 'Anguilla' },
        { code: 'JP', label: 'Japan' },
        { code: 'CN', label: 'China' },
        { code: 'FR', label: 'France' },
        { code: 'VN', label: 'VietNam' },
    ]

    const regionTable = Array.isArray(regions[0]) ? regions[0].map((reg, index) => ({
        ...reg,
        stt: index + 1,
        id: reg.positionId || index + 1,
        countryName: countries.find((coun) => coun.code === reg.countryCode)?.label

    })) : [];

    const columns = [
        { field: 'stt', headerName: 'STT', width: 70 },
        { field: 'countryName', headerName: 'Quốc gia', width: 150 },
        { field: 'positionName', headerName: 'Vùng', width: 130 },
        { field: 'positionOtherName', headerName: 'Tên riêng', width: 200 },
        { field: 'description', headerName: 'Ghi chú', width: 200 },
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
                rows={regionTable}
                columns={columns}
                autoHeight

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
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
            <ModalDetail
                open={isModalDetailOpen}
                onClose={closeModalDetail}
                rowData={selectedRow}
                columns={columns}
            />

            <RegionEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
            />
        </div>
    );
}