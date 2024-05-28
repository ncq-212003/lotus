import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import EditAirport from "./airport-edit";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import { HANDLERS_AIRPORT } from "src/contexts/reducer/setting/reducer-airport";
import { listAirPortApi } from "src/contexts/api/setting/api-airport";
import { useApp } from "src/hooks/use-app";

export default function TableAirport() {
    const [openEditAirport, setOpenEditAirport] = useState(false);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [state, dispatch] = useApp();
    const { airport } = state;
    const { airports } = airport;

    const handleOpenEditAirport = (params) => {
        setSelectedRow(params.row); //lay gia tri cua dong do 
        setOpenEditAirport(true);
    };

    const handleCloseEditAirport = () => {
        setOpenEditAirport(false);
    }

    const handleViewDetail = (params) => {
        setSelectedRow(params.row); //lay gia tri cua dong do 
        setIsModalDetailOpen(true);
    }

    const handleCloseDetail = () => {
        setIsModalDetailOpen(false);
    }
    const countries = [
        { code: 'VN', label: 'Việt Nam' },
        { code: 'KP', label: 'Hàn Quốc' },
        { code: 'JP', label: 'Nhật Bản' },
        { code: 'CN', label: 'China' },
        { code: 'TH', label: 'Thái Lan' },
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listAirPortApi();
                if (response.status === 200) {
                    dispatch({
                        type: HANDLERS_AIRPORT.LIST_AIRPORT,
                        payload: response.data
                    })
                }
            } catch (error) {
                console.error("Đã xảy ra lỗi!!!. Vui lòng kiểm tra lại", error)
            }
        }
        fetchData();
    }, [])

    const listTableAirport = Array.isArray(airports[0]) ? airports[0].map((air, index) => ({
        ...air,
        stt: index + 1,
        id: air.id || index + 1,
        nameCountry: countries.find((coun) => coun.code === air.countryCode)?.label
    })) : []

    const columns = [
        { field: "stt", headerName: "STT", width: 70 },
        { field: "airportName", headerName: "Tên sân bay", width: 300 },
        { field: "nameCountry", headerName: "Tên quốc gia", width: 150 },
        {
            field: "action",
            headerName: "Thao tác",
            width: 150,
            renderCell: (params) => (
                <ActionColumn
                    handleViewDetail={handleViewDetail}
                    openDialogEdit={handleOpenEditAirport}
                    params={params}
                />
            ),
        },
    ];

    return (
        <Stack
            spacing={1}
            sx={{
                margin: "30px 0px",
            }}
        >
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
            <Box style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={listTableAirport}
                    columns={columns}
                    onRowClick={handleViewDetail}
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
            </Box>

            <ModalDetail
                open={isModalDetailOpen}
                onClose={handleCloseDetail}
                rowData={selectedRow}
                columns={columns}
            />

            <EditAirport
                openEditAirport={openEditAirport}
                closeEditFormAirport={handleCloseEditAirport}
                id={selectedRow ? selectedRow.id : ""}
            />
        </Stack>
    );
}
