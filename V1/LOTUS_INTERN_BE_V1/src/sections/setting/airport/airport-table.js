import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import EditAirport from "./airport-edit";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";

const rows = [
    { id: 1, stt: 1, tenNuoc: "Việt Nam", tenSanBay: "Tân Sơn Nhất International Airport (SGN)", diaChi: "Đường Trường Sa", thanhPho: "TP. Hồ Chí Minh", quanHuyen: "Quận Tân Bình", xaPhuong: "Phường 2" },
    { id: 2, stt: 2, tenNuoc: "Nhật Bản", tenSanBay: "Tokyo Haneda Airport (HND)", diaChi: "12", thanhPho: "Tôkyô 144-0041", quanHuyen: "Ōta", xaPhuong: "Hanedakuko" },
    { id: 3, stt: 3, tenNuoc: "Hàn Quốc", tenSanBay: "Sân bay quốc tế Gimhae", diaChi: "108", thanhPho: "Busan", quanHuyen: "Gangseo-gu", xaPhuong: "Gonghangjinip-ro" },
    { id: 4, stt: 4, tenNuoc: "Thái Lan", tenSanBay: "Suvarnabhumi", diaChi: "999 Soi Mu Ban Nakhon Thong 1", thanhPho: "Samut Prakan", quanHuyen: "Bang Phli", xaPhuong: "Nongprue" },
    { id: 5, stt: 5, tenNuoc: "Việt Nam", tenSanBay: "Sân bay quốc tế Nội Bài", diaChi: "Số 8, Đường Điền Xá 1", thanhPho: "Hà Nội", quanHuyen: "Sóc Sơn", xaPhuong: "Quang Tiến" },
];

export default function TableAirport() {
    const [openEditAirport, setOpenEditAirport] = useState(false);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

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

    const columns = [
        { field: "stt", headerName: "STT", width: 70 },
        { field: "tenSanBay", headerName: "Tên sân bay", width: 300 },
        { field: "tenNuoc", headerName: "Tên quốc gia", width: 150 },
        { field: "diaChi", headerName: "Địa chỉ chi tiết", width: 250 },
        { field: "thanhPho", headerName: "Tỉnh/ Thành phố", width: 200 },
        { field: "quanHuyen", headerName: "Quận/ Huyện", width: 200 },
        { field: "xaPhuong", headerName: "Xã/ Phường", width: 200 },
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
                    rows={rows}
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
                rowData={selectedRow}
            />
        </Stack>
    );
}
