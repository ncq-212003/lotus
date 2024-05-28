import { Stack, TextField, Button, Autocomplete, Grid, FormGroup, Tooltip, Typography, SvgIcon } from "@mui/material";
import { useState } from "react";
import * as React from "react";
import Switch from "@mui/material/Switch";
import { Checkbox, FormControlLabel } from "@mui/material";
import { EditAddress } from "../address/editAddress/edit-address";
import { AddPresentCalendar } from "../present/add-present-cd";
import Box from "@mui/material/Box";
import { AddCustomer } from "./add-customer";
import AddIcon from "@mui/icons-material/Add";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { EditCalander } from "./edit-calendar";
import { TypeCalendarNew } from "./type-calendar";
import { EditCustomer } from "./edit-customer";
import { AddAdressCalendar } from "../address/add-address-cd";
import { EditPresent } from "../present/editpresent/edit-present";
import { DateTimePicker } from "@mui/x-date-pickers";
import IconButton from '@mui/material/IconButton';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const AddCalendar = (props) => {
  const [isCalendar, setisCalendar] = useState(false);
  const [isTypeCalendarNew, setIsTypeCalendarNew] = useState(false);
  const [editorValue, setEditorValue] = useState("");
  const [deparmentM, setDepartmentM] = useState([]);
  const [IsPresent, setIsPresent] = useState(false);
  const [IsEditPresent, setIsEditPresent] = useState(false);
  const [IsCustomer, setIsCustomer] = useState(false);
  const [IsEditCustomer, setIsEditCustomer] = useState(false);
  const [IsEditAddress, setEditIsAddress] = useState(false);
  const [IsAddressPb, setIsAddressPb] = useState(false);

  //open edit calendar
  const openEditCalendar = () => {
    setisCalendar(true);
  };

  const closeEditCalendar = () => {
    setisCalendar(false);
  };

  const openTypeCalendarNew = () => {
    setIsTypeCalendarNew(true);
  };

  const closeTypeCalendarNew = () => {
    setIsTypeCalendarNew(false);
  };
  //end open edit calendar

  //open edit present
  const openPresent = () => {
    setIsPresent(true);
  };

  const closePresent = () => {
    setIsPresent(false);
  };

  const openEditPresent = () => {
    setIsEditPresent(true);
  };

  const closeEditPresent = () => {
    setIsEditPresent(false);
  };
  //end open edit present

  //open edit customers
  const openCustomer = () => {
    setIsCustomer(true);
  };

  const closeCustomer = () => {
    setIsCustomer(false);
  };

  const openEditCustomer = () => {
    setIsEditCustomer(true);
  };

  const closeEditCustomer = () => {
    setIsEditCustomer(false);
  };
  //end open edit customers

  //open edit address
  const openEditAddress = () => {
    setEditIsAddress(true);
  };

  const closeEditAddress = () => {
    setEditIsAddress(false);
  };

  const openAddressPb = () => {
    setIsAddressPb(true);
  };

  const closeAddressPb = () => {
    setIsAddressPb(false);
  };
  //end open edit address

  const person = [
    { title: "Nguyễn Công Quyết" },
    { title: "Nguyễn Chính Nghĩa" },
    { title: "Đinh Văn Thắng" },
    { title: "Phạm Văn Thái" },
    { title: "Nguyễn Duy Dự" },
  ];

  const gift = [
    { title: "Hoa" },
    { title: "Đồ lưu niệm" },
    { title: "Quần áo" },
    { title: "Giày dép" },
  ];

  const customer = [
    { title: "Phạm Thị Tâm" },
    { title: "Nguyễn Thị Mai" },
    { title: "Phan Văn Bảo" },
    { title: "Nguyễn Văn Quyến" },
  ];

  const car = [
    { title: "Xe 1" },
    { title: "Xe 2" },
    { title: "Xe 3" },
    { title: "Xe 4" },
    { title: "Xe 5" },
  ]

  const switchStyle = {
    color: '#1C2536', // Màu khi chưa được chọn (xám)
  };
  //Thêm phòng ban cho công ty
  const optionCompanyDepartment = [
    { value: 1, company: "Công ty Apple", label: "Phòng nhân sự" },
    { value: 2, company: "Công ty Apple", label: "Phòng kế toán" },
    { value: 3, company: "Công ty Apple", label: "Phòng công nghệ & truyền thông" },
    { value: 4, company: "Công ty Samsung", label: "Phòng tài chính" },
    { value: 5, company: "Công ty Samsung", label: "Phòng chăm sóc khách hàng" },
    { value: 6, company: "Công ty Samsung", label: "Phòng hành chính" },
    { value: 7, company: "Công ty Hải Dương", label: "Phòng tiếp thị/marketing" },
    { value: 8, company: "Công ty Hải Dương", label: "Phòng nghiên cứu và phát triển" },
    { value: 9, company: "Công ty Hải Dương", label: "Phòng hỗ trợ khách hàng" },
  ];

  return (
    <>
      <Stack
        spacing={3}
        sx={{
          margin: "30px 0px 0px 0px",
        }}
      >
        <Box
          sx={{
            border: "3px solid rgb(224, 224, 224) !important",
            padding: "10px 10px 15px 10px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <FormGroup>
              <FormControlLabel
                control={<Switch style={switchStyle} color="primary" />}
                label="Thiết lập chế độ riêng tư"
              />
            </FormGroup>
          </Box>
          <Grid container>
            <Grid container spacing={0.4}>
              <Grid item xs={10} md={11} lg={11} xl={11}>
                <Autocomplete
                  sx={{ margin: "4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={[
                    "Lịch đón khách sân bay",
                    "Lịch nhà hàng",
                    "Lịch đón khách",
                    "Lịch họp",
                    "Lịch khác",
                  ]}
                  renderInput={(params) => <TextField variant="outlined" {...params} label="Loại lịch" />}
                />
              </Grid>
              <Grid item xs={2} md={1} lg={1} xl={1}>
                <Box style={{ marginTop: '10px', display: "flex" }}>
                  <Tooltip title="Thêm">
                    <IconButton aria-label="add" style={{ color: "#000000" }} onClick={openTypeCalendarNew}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Sửa">
                    <IconButton aria-label="edit" style={{ color: "#000000" }} onClick={openEditCalendar}>
                      <BorderColorOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>

            <Autocomplete
              sx={{ margin: "12px 4px 0px 4px " }}
              fullWidth
              size="small"
              options={["Công ty A", "Công ty B", "Công ty C", "Công ty D"]}
              renderInput={(params) => <TextField variant="outlined" {...params} label="Nghiệp đoàn" />}
            />

            <Autocomplete
              sx={{ margin: "12px 4px 0px 4px " }}
              fullWidth
              size="small"
              options={["Công ty Mitsubishi Group", "Công ty Sumitomo Group", "Công ty Sharp Corporation", "Công ty Panasonic Corporation"]}
              renderInput={(params) => <TextField variant="outlined" {...params} label="Công ty tiếp nhận" />}
            />

            <Autocomplete
              onChange={(event, newValue) => {
                setDepartmentM(newValue.map((option) => option.value));
              }}
              name="deparment"
              multiple
              limitTags={4}
              id="checkboxes-department"
              disableCloseOnSelect
              size="small"
              sx={{ margin: "12px 4px 0px 4px " }}
              fullWidth
              options={optionCompanyDepartment}
              groupBy={(option) => option.company}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.label}
                </li>
              )}
              renderInput={(params) => (
                <TextField variant="outlined" {...params} label="Công ty - Phòng ban" />
              )}
            />

            <Grid container spacing={0.4}>
              <Grid item xs={10} md={11} lg={11} xl={11}>
                <Autocomplete
                  multiple
                  fullWidth
                  size="small"
                  id="checkboxes-tags-demo"
                  sx={{ margin: "4px 0px 0px 4px", marginTop: "12px" }}
                  options={customer}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.title}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox style={{ marginRight: 8 }} checked={selected} />
                      {option.title}
                    </li>
                  )}
                  renderInput={(params) => <TextField variant="outlined" {...params} label="Tên khách hàng" />}
                />
              </Grid>
              <Grid item xs={2} md={1} lg={1} xl={1} >
                <Box style={{ marginTop: '10px', display: "flex" }}>
                  <Tooltip title="Thêm">
                    <IconButton aria-label="add" style={{ color: "#000000" }} onClick={openCustomer}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Sửa">
                    <IconButton aria-label="edit" style={{ color: "#000000" }} onClick={openEditCustomer}>
                      <BorderColorOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={0.4} >
              <Grid item xs={10} md={11} lg={11} xl={11}>
                <Autocomplete
                  sx={{ margin: "4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={[
                    "ngõ 75 Nguyễn Xiển Thanh Xuân Hà Nội",
                    "36 Láng Hạ Đống Đa Hà nội",
                    "73 Vĩnh Bảo Thành phố Vĩnh Yên",
                    "112 Nguyễn Văn Chinh Hà Nam",
                  ]}
                  renderInput={(params) => <TextField variant="outlined" {...params} label="Tên địa điểm" />}
                />
              </Grid>
              <Grid item xs={2} md={1} lg={1} xl={1} >
                <Box style={{ marginTop: '10px', display: "flex" }}>
                  <Tooltip title="Thêm">
                    <IconButton aria-label="add" style={{ color: "#000000" }} onClick={openAddressPb}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Sửa">
                    <IconButton aria-label="edit" style={{ color: "#000000" }} onClick={openEditAddress}>
                      <BorderColorOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>

            <Box style={{ width: "100%", margin: "0px 4px" }}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={12} md={6} >
                  <DateTimePicker
                    sx={{ width: "100%", marginTop: "12px" }}
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
                </Grid>

                <Grid item xs={6}>
                  <DateTimePicker
                    sx={{ width: "100%", marginTop: "12px" }}
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
                </Grid>
              </Grid>
            </Box>
            
            <TextField
              fullWidth
              label="Tên công việc"
              size="small"
              // multiline
              variant="outlined"
              // rows={4}
              sx={{ margin: "4px", marginTop: "12px" }}
            />

            <Box style={{ width: "100%" }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: "12.5px", color: "#6C737F", margin: "16px" }}>
                Nội dung công việc
              </Typography>
              <ReactQuill
                style={{
                  height: "100px ",
                  margin: "12px 4px 50px 4px",
                  borderRadius: "8px",
                }}
                value={editorValue}
                onChange={(value) => setEditorValue(value)}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline"],
                    ["image", "code-block"],
                  ],
                }}
                theme="snow"
              />
            </Box>

            <Autocomplete
              multiple
              fullWidth
              size="small"
              id="checkboxes-tags-demo"
              sx={{ margin: "4px", marginTop: "12px" }}
              options={person}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.title}
                </li>
              )}
              renderInput={(params) => <TextField variant="outlined" {...params} label="Người tham gia" />}
            />

            <Autocomplete
              sx={{ margin: "12px 4px 0px 4px " }}
              fullWidth
              size="small"
              options={[
                "Nguyễn chính nghĩa",
                "Nguyễn công quyết",
                "Phạm gia hưng",
                "Nguyễn thái bảo",
                "Nguyễn văn duy",
              ]}
              renderInput={(params) => <TextField variant="outlined" {...params} label="Người phụ trách" />}
            />

            <Grid container spacing={0.4}>
              <Grid item xs={10} md={11} lg={11} xl={11}>
                <Autocomplete
                  multiple
                  fullWidth
                  size="small"
                  id="checkboxes-tags-demo"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  options={gift}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.title}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox style={{ marginRight: 8 }} checked={selected} />
                      {option.title}
                    </li>
                  )}
                  renderInput={(params) => <TextField variant="outlined" {...params} label="Quà tặng" />}
                />
              </Grid>
              <Grid item xs={2} md={1} lg={1} xl={1} >
                <Box style={{ marginTop: '10px', display: "flex" }}>
                  <Tooltip title="Thêm">
                    <IconButton aria-label="add" style={{ color: "#000000" }} onClick={openPresent}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Sửa">
                    <IconButton aria-label="edit" style={{ color: "#000000" }} onClick={openEditPresent}>
                      <BorderColorOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>

            <Autocomplete
              multiple
              fullWidth
              size="small"
              id="checkboxes-tags-demo"
              sx={{ margin: "4px 0px 0px 4px", marginTop: "12px" }}
              options={car}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.title}
                </li>
              )}
              renderInput={(params) => <TextField variant="outlined" {...params} label="Xe" />}
            />

            <Autocomplete
              sx={{ margin: "12px 4px 0px 4px " }}
              fullWidth
              size="small"
              options={["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"]}
              renderInput={(params) => <TextField variant="outlined" {...params} label="Tiến độ" />}
            />

            <Grid container spacing={3} style={{ margin: "20px 30px" }}>
              <Grid item xs={6}>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch style={switchStyle} defaultChecked />}
                    label="Gmail"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch style={switchStyle} />}
                    label="SMS"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
          <Stack display="flex">
            <Box marginLeft="auto">
              <Button
                variant="contained"
                sx={{
                  marginTop: "10px",
                  backgroundColor: "#1C2536",
                  width: "150px",
                }}
              >
                Lưu
              </Button>
            </Box>
          </Stack>
        </Box>
      </Stack>
      {/* Open popups in the calendar */}
      <EditCalander openEditCalendar={isCalendar} closeEditCalendar={closeEditCalendar} />
      <TypeCalendarNew openTypeCalendar={isTypeCalendarNew} closeTypeCalendar={closeTypeCalendarNew} />
      <AddPresentCalendar openPresent={IsPresent} closePresent={closePresent} />
      <EditPresent openEditPresent={IsEditPresent} closeEditPresent={closeEditPresent} />
      <AddCustomer openCustomer={IsCustomer} closeCustomer={closeCustomer} />
      <EditCustomer openEditCustomer={IsEditCustomer} closeEditCustomer={closeEditCustomer} />
      <EditAddress openEditAdress={IsEditAddress} closeEditAdress={closeEditAddress} />
      <AddAdressCalendar openAddCalendar={IsAddressPb} closeAddCalendar={closeAddressPb} />
      {/* Close popups in the calendar */}
    </>
  );
};
