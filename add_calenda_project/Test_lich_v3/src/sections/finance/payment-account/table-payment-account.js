import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import ActionColumn from "src/components/action-column ";
import ModalDetail from "src/components/modal-detail";
import EditPaymentAccount from "./edit-payment-account";

const rows = [
    {
        id: 1,
        stt: 1,
        accountOwner: "Phạm Văn Minh",
        accountNumber: "2345678945743",
        accountCode: "758763485634",
        company: "Cty An Nghĩa",
        paymentOptions: "Vietcombank",
        moneyStarts: "230000",
        note: "Chuyên cung cấp dịch vụ ngân hàng thương mại và tài chính cho doanh nghiệp và cá nhân.",
        systemCode: "34567546567",
    },
    {
        id: 2,
        stt: 2,
        paymentOptions: "BIDV",
        accountOwner: "Phạm Văn Bảo",
        accountCode: "87534757344",
        company: "Cty Bình An",
        accountNumber: "456084445434",
        moneyStarts: "2300000",
        note: "Chuyên về dịch vụ ngân hàng đầu tư và hỗ trợ phát triển kinh tế",
        systemCode: "38573845357",
    },
    {
        id: 3,
        stt: 3,
        accountOwner: "Nguyễn Quốc An",
        accountNumber: "566749545450",
        accountCode: "874504754",
        company: "Cty An Trạch",
        paymentOptions: "VietinBank",
        moneyStarts: "5647454",
        note: "Cung cấp nhiều dịch vụ ngân hàng, từ tài chính doanh nghiệp đến ngân hàng cá nhân",
        systemCode: "847578653465",
    },
    {
        id: 4,
        stt: 4,
        accountOwner: "Nguyễn Quốc Tuyển",
        accountNumber: "84764555833",
        accountCode: "9753467534",
        company: "Cty Thành Công",
        paymentOptions: "Momo",
        moneyStarts: "937644",
        note: "Ứng dụng thanh toán điện tử số 1 Việt Nam",
        systemCode: "534785436",
    },
    {
        id: 5,
        stt: 5,
        accountOwner: "Trần Quốc Cường",
        accountNumber: "45678945487",
        accountCode: "454375437",
        company: "Cty Bình Dương",
        paymentOptions: "VNPay",
        moneyStarts: "45743",
        note: "Ví VNPAY là ví điện tử hàng đầu dành cho gia đình tại Việt Nam ứng dụng công nghệ hiện đại, đột phá trong lĩnh vực thanh toán điện tử",
        systemCode: "85347534",
    },
];

export default function TableAccount() {
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isOpenEditPaymentAccount, setIsOpenEditPaymentAccount] = useState(false);

    const handleViewDetail = (params) => {
        setSelectedRow(params.row); //lay gia tri cua dong do 
        setIsModalDetailOpen(true);
    }

    const handleCloseDetail = () => {
        setIsModalDetailOpen(false);
    }

    const handleOpenEditPaymentAccount = (params) => {
        setSelectedRow(params.row); //lay gia tri cua dong do 
        setIsOpenEditPaymentAccount(true);
    }

    const handleCloseEditPaymentAccount = () => {
        setIsOpenEditPaymentAccount(false);
    }

    const columns = [
        { field: "stt", headerName: "STT", width: 70 },
        { field: "accountOwner", headerName: "Chủ tài khoản", width: 200 },
        { field: "accountNumber", headerName: "Số tài khoản", width: 200 },
        { field: "accountCode", headerName: "Mã tài khoản", width: 200 },
        { field: "company", headerName: "Thuộc công ty", width: 200 },
        { field: "paymentOptions", headerName: "Hình thức thanh toán", width: 200 },
        { field: "moneyStarts", headerName: "Số dư bắt đầu", width: 200 },
        { field: "note", headerName: "Ghi chú", width: 300 },
        { field: "systemCode", headerName: "Mã hệ thống", width: 200 },
        {
            field: "action",
            headerName: "Thao tác",
            width: 150,
            renderCell: (params) => (
                <ActionColumn
                    handleViewDetail={handleViewDetail}
                    openDialogEdit={handleOpenEditPaymentAccount}
                    params={params}
                />
            ),
        },
    ]

    return (
        <Stack
            spacing={1}
            sx={{
                margin: "10px 0px",
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

            <EditPaymentAccount
                openEditPaymentAccount={isOpenEditPaymentAccount}
                closeEditPaymentAccount={handleCloseEditPaymentAccount}
                rowData={selectedRow}
            />
        </Stack>
    );
}
