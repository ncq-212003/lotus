import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogContent, DialogActions, Tab, Tabs, Typography, Box, Button, FormControlLabel, Checkbox, Grid } from '@mui/material';
import React, { useState } from 'react';
import AutoHeightOverlayNoSnap from './loading';
import RoleAdd from './role-add';
import RoleList from './role-list';

const RoleByDepartmentList = ({ selectedDepartment }) => {
    // Dialog Role List
    const [selectedRow, setSelectedRow] = React.useState({ id: '', roleName: '', status: '' });
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const openDialog = () => {
        setIsDialogOpen(true);
    };
    const closeDialog = () => {
        setIsDialogOpen(false);
    };
    // Dialog Role Add
    const [isDialogRoleOpen, setIsDialogRoleOpen] = useState(false);
    const openDialogRole = () => {
        setIsDialogRoleOpen(true);
    };
    const closeDialogRole = () => {
        setIsDialogRoleOpen(false);
    };

    const rolesByDepartments = {
        'Kế toán': [
            { id: 1, roleName: 'Kế toán viên', status: 'Hoạt động' },
            { id: 2, roleName: 'Kế toán trưởng', status: 'Hoạt động' },
            { id: 3, roleName: 'Kế toán tổng hợp', status: 'Hoạt động' },
            { id: 4, roleName: 'Kế toán thuế', status: 'Hoạt động' },
        ],
        'Nhân sự': [
            { id: 1, roleName: 'Nhân viên HR', status: 'Hoạt động' },
            { id: 2, roleName: 'Nhân viên Recruitment', status: 'Hoạt động' },
            { id: 3, roleName: 'Trưởng phòng Nhân sự', status: 'Hoạt động' },
        ],
        'Kỹ thuật': [
            { id: 1, roleName: 'Kỹ sư cơ khí', status: 'Hoạt động' },
            { id: 2, roleName: 'Kỹ sư phần mềm', status: 'Hoạt động' },
            { id: 3, roleName: 'Kỹ thuật viên IT', status: 'Hoạt động' },
            { id: 4, roleName: 'Kỹ thuật viên cơ điện', status: 'Hoạt động' },
            { id: 5, roleName: 'Kỹ thuật viên sản xuất', status: 'Hoạt động' },
        ],
        'Marketing': [
            { id: 1, roleName: 'Chuyên viên Marketing online', status: 'Hoạt động' },
            { id: 2, roleName: 'Trưởng phòng Marketing', status: 'Hoạt động' },
            { id: 3, roleName: 'Chuyên viên sáng tạo nội dung', status: 'Hoạt động' },
        ],
        'Quản lý sản xuất': [
            { id: 1, roleName: 'Quản đốc sản xuất', status: 'Hoạt động' },
            { id: 2, roleName: 'Kỹ thuật viên sản xuất', status: 'Hoạt động' },
        ],
        'Kinh doanh': [
            { id: 1, roleName: 'Chuyên viên kinh doanh', status: 'Hoạt động' },
            { id: 2, roleName: 'Trưởng phòng kinh doanh', status: 'Hoạt động' },
        ],
        'Tài chính': [
            { id: 1, roleName: 'Chuyên viên tài chính', status: 'Hoạt động' },
            { id: 2, roleName: 'Giám đốc tài chính', status: 'Hoạt động' },
        ],
        'Logistics': [
            { id: 1, roleName: 'Chuyên viên logistics', status: 'Hoạt động' },
            { id: 2, roleName: 'Trưởng phòng logistics', status: 'Hoạt động' },
        ],
        'Chăm sóc khách hàng': [
            { id: 1, roleName: 'Chuyên viên chăm sóc khách hàng', status: 'Hoạt động' },
            { id: 2, roleName: 'Trưởng phòng chăm sóc khách hàng', status: 'Hoạt động' },
        ],
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 60 },
        { field: 'roleName', headerName: 'Vai trò', width: 250 },
        { field: 'description', headerName: 'Mô tả', width: 200 },
        { field: 'status', headerName: 'Trạng thái', width: 100 },
    ];

    // const permissions = [
    //     { id: 1, name: 'Lịch công tác' },
    //     { id: 2, name: 'TTS/DHS' },
    //     { id: 3, name: 'Đơn hàng' },
    //     { id: 4, name: 'Hồ sơ' },
    //     { id: 5, name: 'Điểm danh   ' },
    //     { id: 6, name: 'Tài chính ' },
    //     { id: 7, name: 'Khách hàng' },
    //     { id: 8, name: 'Đào tạo' },
    //     { id: 9, name: 'Công ty' },
    //     { id: 10, name: 'Cài đặt' },
    // ]
    const handleRowClick = (params) => {
        setSelectedRow(params.row);
        setIsDialogOpen(true);
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const [valueTabOne, setValueTabOne] = useState("1");

    const handleChangeOne = (event, newValue) => {
        setValueTabOne(newValue);
    };


    const customFooter = () => {
        return (
            <Grid container
                justifyContent="end"
                alignItems="center"
                sx={{ padding: '8px 16px' }}>
                <Button
                    sx={{ backgroundColor: "#1C2536" }}
                    variant="contained"
                    onClick={openDialogRole}>
                    Thêm vai trò
                </Button>
            </Grid>
        );
    };

    return (
        <div>
            {rolesByDepartments[selectedDepartment] && rolesByDepartments[selectedDepartment].length > 0 ? (
                <div style={{ width: '100%' }}>
                    <DataGrid
                        rows={rolesByDepartments[selectedDepartment] || []}
                        columns={columns}
                        pageSize={5}
                        onRowClick={handleRowClick}
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
                        components={{
                            Footer: customFooter,
                        }}
                    />
                    {/* <Grid container justifyContent="flex-end" style={{ marginTop: '16px' }}>
                        <Button variant="contained" color="primary" onClick={handleAddRole}>
                            Thêm vai trò
                        </Button>
                    </Grid> */}
                </div>

            ) : (
                <AutoHeightOverlayNoSnap />
            )}

            <RoleList
                open={isDialogOpen}
                onClose={closeDialog}
                selectedRow={selectedRow}
                selectedTab={selectedTab}
                handleTabChange={handleTabChange}

            />
            <RoleAdd
                open={isDialogRoleOpen}
                onClose={closeDialogRole}
            />
        </div>
    );
};
export default RoleByDepartmentList;
