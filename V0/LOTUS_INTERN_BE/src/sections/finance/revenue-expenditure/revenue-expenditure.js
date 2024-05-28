import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddIcon from "@mui/icons-material/Add";
import { Autocomplete, Button, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { TypeRevenExpen } from './type-revenue-expenditure';
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { EditRevenExpen } from './edit-revenue-expenditure';

export default function RevenueExpenditure() {
    const [value, setValue] = React.useState('1');
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenExpen, setIsOpenExpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenEditExpen, setIsOpenEditExpen] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleOpen = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false)
    }

    const handleOpenEdit = () => {
        setIsOpenEdit(true)
    }
    const handleCloseEdit = () => {
        setIsOpenEdit(false)
    }

    const handleOpenExpen = () => {
        setIsOpenExpen(true)
    }
    const handleCloseExpen = () => {
        setIsOpenExpen(false)
    }

    const handleOpenEditExpen = () => {
        setIsOpenEditExpen(true)
    }
    const handleCloseEditExpen = () => {
        setIsOpenEditExpen(false)
    }

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Hạng mục thu" value="1" />
                        <Tab label="Hạng mục chi" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center'
                        }}
                    >
                        <TextField
                            sx={{ margin: "12px 0px", width: '100%' }}
                            size="small"
                            label="Tên hạng mục"
                            variant="outlined"
                        />
                    </Box>
                    <Grid container spacing={0.4}>
                        <Grid item xs={10} md={11} lg={11} xl={11}>
                            <Autocomplete
                                sx={{ margin: "12px 4px 0px 0px " }}
                                fullWidth
                                size="small"
                                options={["Doanh Thu Bán Hàng", "Thu Nhập Bất Động Sản", "Thu Nhập Sáng Tạo Nội Dung", "Thu tiền ăn uống"]}
                                renderInput={(params) => <TextField variant="outlined" {...params} label="Nhóm thu" />}
                            />
                        </Grid>
                        <Grid item xs={2} md={1} lg={1} xl={1} >
                            <Box style={{ marginTop: '10px', display: "flex" }}>
                                <Tooltip title="Thêm">
                                    <IconButton aria-label="add" style={{ color: "#000000" }}
                                        onClick={handleOpen}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Sửa">
                                    <IconButton aria-label="edit" style={{ color: "#000000" }}
                                        onClick={handleOpenEdit}
                                    >
                                        <BorderColorOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Grid>
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Ghi chú"
                            fullWidth
                            multiline
                            rows={2}
                            variant="outlined"
                        />
                    </Grid>
                    <Typography variant="h6" gutterBottom sx={{ marginTop: "30px" }}>
                        Danh sách mục thu
                    </Typography>
                    <Box sx={{ minHeight: 220, flexGrow: 1, maxWidth: 300 }}>
                        <TreeView
                            aria-label="multi-select"
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            defaultExpanded={['1', '2', '3', '5', '6', '7']}
                            multiSelect
                        >
                            <TreeItem nodeId="1" label="Danh sách mục thu" defaultExpanded>
                                <TreeItem nodeId="2" label="Hạng mục 1" defaultExpanded>
                                    <TreeItem nodeId="3" label="Aptech" />
                                    <TreeItem nodeId="4" label="Thu tiền chi đoàn a" />
                                </TreeItem>
                                <TreeItem nodeId="5" label="Hạng mục 2" defaultExpanded>
                                    <TreeItem nodeId="6" label="Thu tiền sáng tạo nội dung" />
                                    <TreeItem nodeId="7" label="Thu tiền ăn uống" />
                                </TreeItem>
                            </TreeItem>
                        </TreeView>
                    </Box>
                </TabPanel>
                <TabPanel value="2">
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center'
                        }}
                    >
                        <TextField
                            sx={{ margin: "12px 0px", width: '100%' }}
                            size="small"
                            label="Tên hạng mục"
                            variant="outlined"
                        />
                    </Box>
                    <Grid container spacing={0.4}>
                        <Grid item xs={10} md={11} lg={11} xl={11}>
                            <Autocomplete
                                sx={{ margin: "12px 4px 0px 0px " }}
                                fullWidth
                                size="small"
                                options={["Chi phí vận chuyển", "Tiền thuê/Nợ nhà", "Trả tiền bảo hiểm", "Chi tiêu giáo dục", "Quyên góp từ thiện"]}
                                renderInput={(params) => <TextField variant="outlined" {...params} label="Nhóm chi" />}
                            />
                        </Grid>
                        <Grid item xs={2} md={1} lg={1} xl={1} >
                            <Box style={{ marginTop: '10px', display: "flex" }}>
                                <Tooltip title="Thêm">
                                    <IconButton aria-label="add" style={{ color: "#000000" }}
                                        onClick={handleOpenExpen}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Sửa">
                                    <IconButton aria-label="edit" style={{ color: "#000000" }}
                                        onClick={handleOpenEditExpen}
                                    >
                                        <BorderColorOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Grid>
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Ghi chú"
                            fullWidth
                            multiline
                            rows={2}
                            variant="outlined"
                        />
                    </Grid>
                    <Typography variant="h6" gutterBottom sx={{ marginTop: "30px" }}>
                        Danh sách mục chi
                    </Typography>
                    <Box sx={{ minHeight: 220, flexGrow: 1, maxWidth: 300 }}>
                        <TreeView
                            aria-label="multi-select"
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            defaultExpanded={['1', '2', '3', '5', '6', '7', '8']}
                            multiSelect
                        >
                            <TreeItem nodeId="1" label="Danh sách mục chi" defaultExpanded>
                                <TreeItem nodeId="2" label="Hạng mục 1" defaultExpanded>
                                    <TreeItem nodeId="3" label="Chi phí vận chuyển" />
                                    <TreeItem nodeId="4" label="Tiền thuê/Nợ nhà" />
                                </TreeItem>
                                <TreeItem nodeId="5" label="Hạng mục 2" defaultExpanded>
                                    <TreeItem nodeId="6" label="Trả tiền bảo hiểm" />
                                    <TreeItem nodeId="7" label="Thu tiền ăn uống" />
                                    <TreeItem nodeId="8" label="Quyên góp từ thiện" />
                                </TreeItem>
                            </TreeItem>
                        </TreeView>
                    </Box>
                </TabPanel>
            </TabContext>
            <TypeRevenExpen openType={isOpen} closeType={handleClose} openExpend={isOpenExpen} closeExpend={handleCloseExpen} />
            <EditRevenExpen openEdit={isOpenEdit} closeEdit={handleCloseEdit} openEditExpen={isOpenEditExpen} closeEditExpen={handleCloseEditExpen} />
        </Box>
    );
}