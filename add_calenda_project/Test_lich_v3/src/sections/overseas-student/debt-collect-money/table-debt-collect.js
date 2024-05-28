import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import EditDebtCollect from "./edit-debt-collect-money";
import ModalDetail from "src/components/modal-detail";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ActionColumn from "src/components/action-column ";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Visibility, Edit, Delete } from "@mui/icons-material";

const rows = [
    {
        id: 1,
        stt: 1,
        tendoitac: "Nguyễn Thảo Vân",
        nokidau: "23456789",
        sotientang: "230000",
        sotiengiam: "100000",
        nocuoiki: "3450000",
        ghichu: "Thanh toán vào ngày 13/11/2023 và liên hệ nếu cần. Đối tác có xu hướng tăng nợ, cần theo dõi và quản lý cẩn thận."
        // Theo dõi thanh toán vào ngày 16/11/2023 và liên hệ nếu cần
    },
    {
        id: 2,
        stt: 2,
        tendoitac: "Nguyễn Thái Bảo",
        nokidau: "4560844",
        sotientang: "2300000",
        sotiengiam: "0",
        nocuoiki: "560787500",
        ghichu: "Thanh toán vào ngày 15/11/2023 và liên hệ nếu cần. Đối tác có nhu cầu tăng tín dụng, cần xem xét đề xuất mới từ họ."
        // Theo dõi thanh toán vào ngày 16/11/2023 và liên hệ nếu cần
    },
    {
        id: 3,
        stt: 3,
        tendoitac: "Trần Thảo Dương",
        nokidau: "56674950",
        sotientang: "5647454",
        sotiengiam: "2000000",
        nocuoiki: "8759564844",
        ghichu: "Thanh toán vào ngày 10/11/2023 và liên hệ nếu cần. Số tiền giảm là do chương trình khuyến mãi, cần xác nhận và cập nhật hợp đồng."
        // Theo dõi thanh toán vào ngày 16/11/2023 và liên hệ nếu cần
    },
    {
        id: 4,
        stt: 4,
        tendoitac: "Nguyễn Kim Chi",
        nokidau: "84764833",
        sotientang: "937644",
        sotiengiam: "230874",
        nocuoiki: "873647384",
        ghichu: "Thanh toán vào ngày 08/11/2023 và liên hệ nếu cần. Đối tác có xu hướng tăng nợ, cần xác định nguyên nhân và thảo luận về kế hoạch thanh toán."
        // Theo dõi thanh toán vào ngày 16/11/2023 và liên hệ nếu cần
    },
    {
        id: 5,
        stt: 5,
        tendoitac: "Nguyễn Thảo Lan",
        nokidau: "45678987",
        sotientang: "45743",
        sotiengiam: "34565",
        nocuoiki: "87000000",
        ghichu: "Thanh toán vào ngày 09/11/2023 và liên hệ nếu cần. Có sự thay đổi về số tiền, cần kiểm tra và cập nhật thông tin khách hàng."
        // Theo dõi thanh toán vào ngày 16/11/2023 và liên hệ nếu cần
    },
];

export default function TableDebtCollect() {
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isOpenEditDebtCollect, setIsOpenEditDebtCollect] = useState(false);

    const handleViewDetail = (params) => {
        setSelectedRow(params.row); //lay gia tri cua dong do 
        setIsModalDetailOpen(true);
    }

    const handleCloseDetail = () => {
        setIsModalDetailOpen(false);
    }

    const handleOpenEditDebtCollect = (params) => {
        setSelectedRow(params.row); //lay gia tri cua dong do 
        setIsOpenEditDebtCollect(true);
    }

    const handleCloseEditDebtCollect = () => {
        setIsOpenEditDebtCollect(false);
    }

    const columns = [
        { field: "stt", headerName: "STT", width: 70 },
        { field: "tendoitac", headerName: "Tên đối tác", width: 160 },
        { field: "nokidau", headerName: "Nợ đầu kỳ", width: 140 },
        { field: "sotientang", headerName: "Nợ tăng", width: 150 },
        { field: "sotiengiam", headerName: "Nợ giảm", width: 150 },
        { field: "nocuoiki", headerName: "Nợ cuối kỳ", width: 150 },
        { field: "ghichu", headerName: "Ghi chú", width: 300 },
        {
            field: "action",
            headerName: "Thao tác",
            width: 100,
            renderCell: (params) => (
                <Tooltip title="Chi tiết">
                    <IconButton
                        sx={{ color: "black" }}
                        onClick={(event) => {
                            event.stopPropagation();
                            handleViewDetail(params);
                        }}
                    >
                        <Visibility />
                    </IconButton>
                </Tooltip>
            ),
        },
    ]
    const handleFilterClick = () => {
        // Xử lý logic lọc dữ liệu tại đây
        console.log('Đã nhấn nút Lọc');
    };

    return (
        <Stack
            spacing={1}
            sx={{
                margin: "10px 0px",
            }}
        >
            <Grid container spacing={2}>
                <Typography variant="h6" gutterBottom style={{ fontSize: "15px", margin: "12px 0px 0px 20px" }}>
                    Lọc theo khoảng thời gian
                </Typography>
                <Grid item xs={11} style={{ marginTop: '5px', paddingTop: "5px" }}>
                    <Box display="flex" alignItems="center">
                        <DateTimePicker
                            sx={{ width: "50%", marginTop: "12px" }}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    variant: 'outlined'
                                }
                            }}
                            label="Ngày bắt đầu"
                            ampm={false} // Đặt ampm thành false để hiển thị giờ 24h
                            format="dd/MM/yyyy HH:mm" // Định dạng để hiển thị ngày, tháng, năm, giờ và phút
                        />

                        <Typography variant="body1" style={{ margin: '12px 8px 0px 8px' }}>
                            đến
                        </Typography>

                        <DateTimePicker
                            sx={{ width: "50%", marginTop: "12px" }}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    variant: 'outlined'
                                }
                            }}
                            label="Ngày kết thúc"
                            ampm={false} // Đặt ampm thành false để hiển thị giờ 24h
                            format="dd/MM/yyyy HH:mm" // Định dạng để hiển thị ngày, tháng, năm, giờ và phút
                        />

                    </Box>
                </Grid>
                <Grid item xs={1}>
                    <Box display="flex" alignItems="center" justifyContent="flex-end" margin="8px 12px 0px 0px" sx={{ paddingLeft: "5px" }}>
                        <Button
                            variant="contained"
                            onClick={handleFilterClick}
                            sx={{
                                backgroundColor: "#1C2536",
                                padding: "6px 2px",
                            }}
                        >
                            Lọc
                        </Button>
                    </Box>
                </Grid>
            </Grid>
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
            <Box style={{ width: "100%" }}>
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

            <EditDebtCollect
                openEditDebtCollect={isOpenEditDebtCollect}
                closeEditDebtCollect={handleCloseEditDebtCollect}
            />
        </Stack>
    );
}
