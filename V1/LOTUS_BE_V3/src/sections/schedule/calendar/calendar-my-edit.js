import { Stack, TextField, Button, Autocomplete, Grid, FormGroup, Tooltip, Typography, SvgIcon, Dialog, AppBar, Toolbar, Slide } from "@mui/material";
import { useState, useEffect } from "react";
import * as React from "react";
import Switch from "@mui/material/Switch";
import { Checkbox, FormControlLabel } from "@mui/material";
import { EditAddress } from "../address/address-edit-cd";
import { AddPresentCalendar } from "../present/present-add-cd";
import Box from "@mui/material/Box";
import { AddCustomer } from "./customer-add";
import AddIcon from "@mui/icons-material/Add";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { EditCalander } from "./calendar-type-edit-cd";
import { TypeCalendarNew } from "./calendar-type";
import { EditCustomer } from "./customer-edit";
import { AddAdressCalendar } from "../address/address-add-cd";
import { EditPresent } from "../present/present-edit-cd";
import { DateTimePicker } from "@mui/x-date-pickers";
import IconButton from '@mui/material/IconButton';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { XCircleIcon } from "@heroicons/react/24/solid";
import FormatListNumberedRtlRoundedIcon from '@mui/icons-material/FormatListNumberedRtlRounded';

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditMyCalendar({ openEdit, closeEdit, rowData }) {
  const [isCalendar, setisCalendar] = useState(false);
  const [isTypeCalendarNew, setIsTypeCalendarNew] = useState(false);
  const [IsPresent, setIsPresent] = useState(false);
  const [IsEditPresent, setIsEditPresent] = useState(false);
  const [IsCustomer, setIsCustomer] = useState(false);
  const [IsEditCustomer, setIsEditCustomer] = useState(false);
  const [IsEditAddress, setEditIsAddress] = useState(false);
  const [IsAddressPb, setIsAddressPb] = useState(false);
  // khai báo xử lý code
  const [typeNumber, setTypeNumber] = useState(0);
  const [typeAddress, setTypeAddress] = useState(null);
  const [valueNoidung, setValueNoidung] = useState('');
  const [typeUnionNumber, setTypeUnionNumber] = useState(null);
  //end

  const handleClose = () => {
    closeEdit();
  }

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

  const addCalendarType = (newLabel) => {
    const newOption = {
      id: typeCalendarOptions.length + 1,
      label: newLabel,
    };
    setTypeCalendarOptions((prevOptions) => [...prevOptions, newOption]);
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

  const addPresentType = (newLabel) => {
    const newOption = {
      id: gifts.length + 1,
      name: newLabel,
    };
    setGifts((prevOptions) => [...prevOptions, newOption]);
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

  const addCusTomerType = (newLabel) => {
    const newOption = {
      id: typeUnionNumber,
      name: newLabel,
    };
    setCustomers((prevOptions) => [...prevOptions, newOption]);
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
  const switchStyle = {
    color: '#1C2536', // Màu khi chưa được chọn (xám)
  };

  // Open 
  const [customers, setCustomers] = useState([
    { id: 1, name: "Nguyễn Công Quyết" },
    { id: 2, name: "Nguyễn Chính Nghĩa" },
    { id: 3, name: "Đinh Văn Thắng" },
    { id: 4, name: "Phạm Văn Thái" },
    { id: 5, name: "Nguyễn Duy Dự" },
    { id: 6, name: "Nguyễn Anh Tú" }
  ]);

  const [gifts, setGifts] = useState([
    { id: 1, name: "Hoa" },
    { id: 2, name: "Quần áo" },
    { id: 3, name: "Giày dép" },
    { id: 4, name: "1 Cây vàng" },
    { id: 5, name: "1 con vật nhỏ" }
  ]);

  const [persons, setPersons] = useState([
    { id: 1, name: "Trần Thị Hương" },
    { id: 2, name: "Lê Văn Đức" },
    { id: 3, name: "Phạm Thị Lan" },
    { id: 4, name: "Nguyễn Văn An" },
    { id: 5, name: "Vũ Thị Hằng" },
    { id: 6, name: "Hoàng Minh Thiện" }

  ])

  const listCalendarAddress = [
    { id: 1, label: "Sân bay Tân Sơn Nhất", typeAddressId: 1 },
    { id: 2, label: "Sân Bay Nội Bài", typeAddressId: 1 },
    { id: 3, label: "Sân bay phú quốc", typeAddressId: 1 },
    { id: 4, label: "Nhà hàng 5* phố Hàng Mã", typeAddressId: 2 },
    { id: 5, label: "23 Hoàng cầu hà Nội", typeAddressId: 2 },
    { id: 6, label: "87 Phạm Văn Đồng", typeAddressId: 2 },
    { id: 7, label: "73 Triều khúc", typeAddressId: 3 },
    { id: 8, label: "23 Nam Định", typeAddressId: 3 },
    { id: 9, label: "45 Hải Hà", typeAddressId: 3 },
    { id: 10, label: "tầng 6 tòa B", typeAddressId: 4 },
    { id: 11, label: "tầng 7 tòa A", typeAddressId: 4 },
    { id: 12, label: "tầng 9 Tòa H", typeAddressId: 4 },
  ];

  const [cars, setCars] = useState([
    { id: 1, name: "Toyota Camry" },
    { id: 2, name: "Honda Civic" },
    { id: 3, name: "Ford Mustang" },
    { id: 4, name: "Chevrolet Cruze" },
    { id: 5, name: "BMW 3 Series" },
    { id: 6, name: "Mercedes-Benz C-Class" }
  ]);

  const [typeCalendarOptions, setTypeCalendarOptions] = useState([
    { id: 1, label: "Lịch đón khách sân bay" },
    { id: 2, label: "Lịch nhà hàng" },
    { id: 3, label: "Lịch đón khách" },
    { id: 4, label: "Lịch họp công ty" },
    { id: 5, label: "Lịch khác" },
  ]);

  const [unionOptions, setUnionOptions] = useState([
    { id: 1, label: "Nghiệp đoàn 1" },
    { id: 2, label: "Nghiệp đoàn 2" },
    { id: 3, label: "Nghiệp đoàn 3" },
    { id: 4, label: "Nghiệp đoàn 4" },
    { id: 5, label: "Nghiệp đoàn 5" }
  ]);

  const [companyOptions, setCompanyOptions] = useState(
    [
      { id: 1, name: "Công ty Mitsubishi Group" },
      { id: 2, name: "Công ty Sumitomo Group" },
      { id: 3, name: "Công ty Sharp Corporation" },
      { id: 4, name: "Công ty Panasonic Corporation" },
    ]
  )

  const [employrCharge, setEmployrCharge] = useState([
    { id: 1, label: "Nguyễn chính nghĩa" },
    { id: 2, label: "Nguyễn công quyết" },
    { id: 3, label: "Phạm gia hưng" },
    { id: 4, label: "Nguyễn thái bảo" },
    { id: 5, label: "Nguyễn văn duy" }
  ])

  const [progress, setProgress] = useState([
    { id: 1, label: "0%" },
    { id: 2, label: "10%" },
    { id: 3, label: "20%" },
    { id: 4, label: "30%" },
    { id: 5, label: "40%" },
    { id: 6, label: "50%" },
    { id: 7, label: "60%" },
    { id: 8, label: "70%" },
    { id: 9, label: "80%" },
    { id: 10, label: "90%" },
    { id: 11, label: "100%" }
  ])

  const [priorityLevel, setPriorityLevel] = useState([
    { id: 1, label: "Cao" },
    { id: 2, label: "Trung Bình" },
    { id: 3, label: "Thấp" },
  ])

  //end
  useEffect(() => {
    const renderComponent = (typeNumber) => {
      switch (typeNumber) {
        case 1:
          setTypeAddress('Danh sách sân bay')
          break;
        case 2:
          setTypeAddress('Danh sách nhà hàng')
          break;
        case 3:
          setTypeAddress('Địa điểm')
          break;
        case 4:
          setTypeAddress('Danh sách phòng họp')
          break;
        default:
          setTypeAddress('Địa điểm')
      }
    };
    renderComponent(typeNumber);
  }, [typeNumber])

  // const getPlainText = (html) => {
  //   const tempDiv = document.createElement("div");
  //   tempDiv.innerHTML = html;
  //   return tempDiv.innerText;
  // };

  // useEffect(() => {
  //   formik.setFieldValue('noidungcongviec', getPlainText(valueNoidung));
  // }, [valueNoidung]);

  // Sử lý code
  const validationSchema = Yup.object({
    tieuDe: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này')
      .min(10, 'Tiêu đề phải chứa ít nhất 10 ký tự'),
    loaiLich: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
    nghiepDoan: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
    congTyTiepNhan: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
    congTyPhongBan: Yup
      .array()
      .min(1, 'Chọn ít nhất một phòng ban')
      .required('Vui lòng chọn thông tin vào trường này'),
    khachHang: Yup
      .array()
      .min(1, 'Vui lòng chọn ít nhất một khách hàng')
      .required('Không được để trống khách hàng'),
    diaDiem: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    ngayBatDau: Yup
      .date()
      .required('Ngày bắt đầu không được để trống'),
    ngayKetThuc: Yup
      .date()
      .required('Ngày kết thúc không được để trống')
      .nullable()
      .test("is-greater", "Ngày kết thúc phải lớn hơn ngày bắt đầu", function (value) {
        const ngayBatDau = this.resolve(Yup.ref("ngayBatDau"));
        return dayjs(value).isAfter(ngayBatDau);
      }),
    nhanVienThamGia: Yup
      .array()
      .min(1, 'Vui lòng chọn ít nhất một nhân viên')
      .required('Nhân viên không được để trống'),
    nhanVienPhuTrach: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
    // quaTang: Yup
    //   .array()
    //   .min(1, 'Chọn ít nhất một quà tặng')
    //   .required('Quà tặng không được để trống'),
    // xe: Yup
    //   .array()
    //   .min(1, 'Chọn ít nhất một xe')
    //   .required('Xe không được để trống'),
    tienDo: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
    mucDoUuTien: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cheDoRiengTu: false,
      tieuDe: rowData?.tieuDe || "",
      noiDungCongViec: rowData?.noiDungCongViec || "",
      loaiLich: rowData?.loaiLich || "",
      nghiepDoan: rowData?.nghiepDoan || "",
      congTyTiepNhan: rowData?.congTyTiepNhan || "",
      congTyPhongBan: [],
      khachHang: [],
      diaDiem: rowData?.diaDiem || "",
      ngayBatDau: "",
      ngayKetThuc: "",
      nhanVienThamGia: [],
      nhanVienPhuTrach: rowData?.nhanVienPhuTrach || "",
      quaTang: rowData?.quaTang || [],
      xe: rowData?.xe || [],
      tienDo: rowData?.tienDo || "",
      mucDoUuTien: rowData?.mucDoUuTien || "",
      gmail: true,
      sms: false,
      submit: null
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const data = JSON.stringify(values);
        console.log("check value", values)
        alert("Thanh cong")
        handleClose();
        // handleSave();
        // formik.resetForm();
        // return data;
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  })

  // Hàm dùng để lấy ID
  const handleAutocompleteChangeId = (field, value) => {
    if (field === "loaiLich") {
      setTypeNumber(value?.id || null);
    } else if (field === "nghiepDoan") {
      setTypeUnionNumber(value?.id || null);
    }
    formik.setFieldValue(field, value?.id || null)
  }
  // List danh sách địa điểm theo id
  const filteredOptions = listCalendarAddress.filter((item) => item.typeAddressId === typeNumber);

  return (
    <Dialog
      fullScreen
      open={openEdit}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{ sx: { backgroundColor: "#eae7e7" } }}
    >
      <AppBar sx={{ position: "fixed", backgroundColor: '#1C2536' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <SvgIcon fontSize="small">
              <XCircleIcon />
            </SvgIcon>
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            SỬA THÔNG TIN
          </Typography>
          <Button autoFocus color="inherit" onClick={formik.handleSubmit}>
            Lưu
          </Button>
        </Toolbar>
      </AppBar>
      <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            sm={12}
            md={12}
            xs={12}
          >
            <Box
              sx={{
                bgcolor: "#f5f5f5",
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ marginBottom: "16px" }}
              >
                Thông tin cần chỉnh sửa
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch
                      style={switchStyle}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      name="cheDoRiengTu"
                      checked={formik.values.cheDoRiengTu}
                    />}
                    label="Chế độ riêng tư"
                  />
                </FormGroup>
              </Box>
              <Grid container>
                <TextField
                  error={!!(formik.touched.tieuDe && formik.errors.tieuDe)}
                  helperText={formik.touched.tieuDe && formik.errors.tieuDe}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.tieuDe}
                  name="tieuDe"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  label="Tiêu đề công  việc"
                  fullWidth
                  variant="outlined"
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
                    // value={formik.values.noiDungCongViec}
                    // onChange={(content) => setValueNoidung(content)}
                    // name="noiDungCongViec"
                    onChange={(v) => formik.setFieldValue('noiDungCongViec', v)}
                    value={formik.values.noiDungCongViec}
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

                <Grid container spacing={0.4}>
                  <Grid item xs={10} md={11} lg={11} xl={11}>
                    <Autocomplete
                      sx={{ margin: "4px", marginTop: "12px" }}
                      fullWidth
                      size="small"
                      value={typeCalendarOptions.find(option => option.id === formik.values.loaiLich) || null}
                      onChange={(event, value) => handleAutocompleteChangeId('loaiLich', value)}
                      onBlur={formik.handleBlur('loaiLich')}
                      options={typeCalendarOptions}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          label="Loại lịch"
                          name="loaiLich"
                          error={formik.touched.loaiLich && Boolean(formik.errors.loaiLich)}
                          helperText={formik.touched.loaiLich && formik.errors.loaiLich}
                        />
                      )}
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
                  options={unionOptions}
                  value={unionOptions.find(option => option.id === formik.values.nghiepDoan) || null}
                  onChange={(event, value) => handleAutocompleteChangeId('nghiepDoan', value)}
                  onBlur={formik.handleBlur('nghiepDoan')}
                  renderInput={(params) => (
                    <TextField
                      variant="outlined"
                      {...params}
                      label="Nghiệp đoàn"
                      name="nghiepDoan"
                      error={formik.touched.nghiepDoan && Boolean(formik.errors.nghiepDoan)}
                      helperText={formik.touched.nghiepDoan && formik.errors.nghiepDoan}
                    />
                  )}
                />

                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  size="small"
                  fullWidth
                  options={companyOptions}
                  limitTags={5}
                  disableCloseOnSelect
                  sx={{ margin: "12px 4px 0px 4px ", width: "100%" }}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    const selectedNames = newValue.map((option) => option.id);
                    formik.setFieldValue('congTyTiepNhan', selectedNames);
                  }}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      onBlur={formik.handleBlur}
                      error={!!(formik.touched.congTyTiepNhan && formik.errors.congTyTiepNhan)}
                      helperText={formik.touched.congTyTiepNhan && formik.errors.congTyTiepNhan}
                      {...params}
                      label="Công ty tiếp nhận"
                      variant="outlined"
                    />
                  )}
                />

                <Autocomplete
                  onChange={(_, newValue) => {
                    formik.setFieldValue('congTyPhongBan', newValue.map(option => option.value));
                  }}
                  name="congTyPhongBan"
                  fullWidth
                  multiple
                  limitTags={5}
                  id="checkboxes-congTyPhongBan"
                  disableCloseOnSelect
                  size="small"
                  sx={{ margin: "12px 4px 0px 4px " }}
                  options={optionCompanyDepartment}
                  groupBy={(option) => option.company}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        checked={selected}
                      />
                      {option.label}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      onBlur={formik.handleBlur}
                      error={!!(formik.touched.congTyPhongBan && formik.errors.congTyPhongBan)}
                      helperText={formik.touched.congTyPhongBan && formik.errors.congTyPhongBan}
                      variant="outlined"
                      {...params}
                      label="Công ty - Phòng ban" />
                  )}
                />
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  size="small"
                  fullWidth
                  options={customers}
                  limitTags={5}
                  disableCloseOnSelect
                  sx={{ margin: "12px 4px 0px 4px ", width: "100%" }}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    const selectedNames = newValue.map((option) => option.id);
                    formik.setFieldValue('khachHang', selectedNames);
                  }}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      onBlur={formik.handleBlur}
                      error={!!(formik.touched.khachHang && formik.errors.khachHang)}
                      helperText={formik.touched.khachHang && formik.errors.khachHang}
                      {...params}
                      label="Khách hàng"
                      variant="outlined"
                    />
                  )}
                />

                <Grid container spacing={0.4} >
                  <Grid item xs={10} md={11} lg={11} xl={11}>
                    <Autocomplete
                      sx={{ margin: "4px", marginTop: "12px" }}
                      fullWidth
                      size="small"
                      options={filteredOptions}
                      value={filteredOptions.find((item) => item.id === formik.values.diaDiem) || null}
                      onChange={(_, newValue) => {
                        formik.setFieldValue('diaDiem', newValue ? newValue.id : null);
                      }}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          label={typeAddress}
                          name="diaDiem"
                          onBlur={formik.handleBlur}
                          error={formik.touched.diaDiem && Boolean(formik.errors.diaDiem)}
                          helperText={formik.touched.diaDiem && formik.errors.diaDiem}
                        />
                      )}
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
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          // disableFuture
                          label="Ngày bắt đầu"
                          ampm={false} // 
                          format="DD-MM-YYYY HH:mm"
                          onBlur={formik.handleBlur}
                          value={formik.values.ngayBatDau}
                          sx={{ width: "100%", margin: "4px 0px 0px 0px ", marginTop: "12px" }}
                          onChange={(value) => {
                            // const formattedDate = dayjs(value).format("YYYY-MM-DD HH:mm");
                            formik.setFieldValue("ngayBatDau", value);
                          }}
                          slotProps={{
                            textField: {
                              variant: 'outlined',
                              onBlur: formik.handleBlur,
                              error: !!(formik.touched.ngayBatDau && formik.errors.ngayBatDau),
                              helperText: formik.touched.ngayBatDau && formik.errors.ngayBatDau,
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          // disableFuture
                          label="Ngày kết thúc"
                          ampm={false} // 
                          format="DD-MM-YYYY HH:mm"
                          onBlur={formik.handleBlur}
                          value={formik.values.ngayKetThuc}
                          sx={{ width: "100%", margin: "4px 0px 0px 0px ", marginTop: "12px" }}
                          onChange={(value) => {
                            // const formattedDate = dayjs(value).format("YYYY-MM-DD HH:mm");
                            formik.setFieldValue("ngayKetThuc", value);
                          }}
                          slotProps={{
                            textField: {
                              variant: 'outlined',
                              onBlur: formik.handleBlur,
                              error: !!(formik.touched.ngayKetThuc && formik.errors.ngayKetThuc),
                              helperText: formik.touched.ngayKetThuc && formik.errors.ngayKetThuc,
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Box>
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  size="small"
                  fullWidth
                  options={persons}
                  limitTags={5}
                  disableCloseOnSelect
                  sx={{ margin: "12px 4px 0px 4px ", width: "100%" }}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    const selectedNames = newValue.map((option) => option.id);
                    formik.setFieldValue('nhanVienThamGia', selectedNames);
                  }}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      onBlur={formik.handleBlur}
                      error={!!(formik.touched.nhanVienThamGia && formik.errors.nhanVienThamGia)}
                      helperText={formik.touched.nhanVienThamGia && formik.errors.nhanVienThamGia}
                      {...params}
                      label="Nhân viên tham gia"
                      variant="outlined"
                    />
                  )}
                />

                {/* <Autocomplete
                  onChange={(event, newValue) => formik.setFieldValue("nhanVienPhuTrach", newValue || "")}
                  value={formik.values.nhanVienPhuTrach}
                  name="nhanVienPhuTrach"
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
                  renderInput={(params) => <TextField
                    onBlur={formik.handleBlur}
                    error={!!(formik.touched.nhanVienPhuTrach && formik.errors.nhanVienPhuTrach)}
                    helperText={formik.touched.nhanVienPhuTrach && formik.errors.nhanVienPhuTrach}
                    {...params} label="Nhân viên phụ trách" variant="outlined" />}
                /> */}

                <Autocomplete
                  sx={{ margin: "12px 4px 0px 4px " }}
                  fullWidth
                  size="small"
                  options={employrCharge}
                  value={employrCharge.find(option => option.id === formik.values.nhanVienPhuTrach) || null}
                  onChange={(event, value) => handleAutocompleteChangeId('nhanVienPhuTrach', value)}
                  onBlur={formik.handleBlur('nhanVienPhuTrach')}
                  renderInput={(params) => (
                    <TextField
                      variant="outlined"
                      {...params}
                      label="Nhân viên phụ trách"
                      name="nhanVienPhuTrach"
                      error={formik.touched.nhanVienPhuTrach && Boolean(formik.errors.nhanVienPhuTrach)}
                      helperText={formik.touched.nhanVienPhuTrach && formik.errors.nhanVienPhuTrach}
                    />
                  )}
                />

                <Grid container spacing={0.4}>
                  <Grid item xs={10} md={11} lg={11} xl={11}>
                    <Autocomplete
                      multiple
                      id="checkboxes-tags-demo"
                      size="small"
                      fullWidth
                      options={gifts}
                      limitTags={5}
                      disableCloseOnSelect
                      sx={{ margin: "12px 4px 0px 4px ", width: "100%" }}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, newValue) => {
                        const selectedNames = newValue.map((option) => option.id);
                        formik.setFieldValue('quaTang', selectedNames);
                      }}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.name}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          onBlur={formik.handleBlur}
                          error={!!(formik.touched.quaTang && formik.errors.quaTang)}
                          helperText={formik.touched.quaTang && formik.errors.quaTang}
                          {...params}
                          label="Quà tặng"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={2} md={1} lg={1} xl={1} >
                    <Box style={{ marginTop: '10px', display: "flex" }}>
                      <Tooltip title="Thêm">
                        <IconButton aria-label="add" style={{ color: "#000000" }} onClick={openPresent}>
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Danh sách">
                        <IconButton aria-label="edit" style={{ color: "#000000" }} onClick={openEditPresent}>
                          <FormatListNumberedRtlRoundedIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                </Grid>
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  size="small"
                  fullWidth
                  options={cars}
                  limitTags={5}
                  disableCloseOnSelect
                  sx={{ margin: "12px 4px 0px 4px ", width: "100%" }}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    const selectedNames = newValue.map((option) => option.id);
                    formik.setFieldValue('xe', selectedNames);
                  }}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      onBlur={formik.handleBlur}
                      error={!!(formik.touched.xe && formik.errors.xe)}
                      helperText={formik.touched.xe && formik.errors.xe}
                      {...params}
                      label="Xe"
                      variant="outlined"
                    />
                  )}
                />

                <Autocomplete
                  sx={{ margin: "12px 4px 0px 4px " }}
                  fullWidth
                  size="small"
                  options={progress}
                  value={progress.find(option => option.id === formik.values.tienDo) || null}
                  onChange={(event, value) => handleAutocompleteChangeId('tienDo', value)}
                  onBlur={formik.handleBlur('tienDo')}
                  renderInput={(params) => (
                    <TextField
                      variant="outlined"
                      {...params}
                      label="Tiến độ"
                      name="tienDo"
                      error={formik.touched.tienDo && Boolean(formik.errors.tienDo)}
                      helperText={formik.touched.tienDo && formik.errors.tienDo}
                    />
                  )}
                />

                <Autocomplete
                  sx={{ margin: "12px 4px 0px 4px " }}
                  fullWidth
                  size="small"
                  options={priorityLevel}
                  value={priorityLevel.find(option => option.id === formik.values.mucDoUuTien) || null}
                  onChange={(event, value) => handleAutocompleteChangeId('mucDoUuTien', value)}
                  onBlur={formik.handleBlur('mucDoUuTien')}
                  renderInput={(params) => (
                    <TextField
                      variant="outlined"
                      {...params}
                      label="Mức độ ưu tiên"
                      name="mucDoUuTien"
                      error={formik.touched.mucDoUuTien && Boolean(formik.errors.mucDoUuTien)}
                      helperText={formik.touched.mucDoUuTien && formik.errors.mucDoUuTien}
                    />
                  )}
                />
                <Grid container spacing={3} style={{ margin: "20px 30px" }}>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch
                          style={switchStyle}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          name="gmail"
                          checked={formik.values.gmail}
                        />}
                        label="Gmail"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch
                          style={switchStyle}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          name="sms"
                          checked={formik.values.sms}
                        />}
                        label="SMS"
                      />
                    </FormGroup>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Stack>

      {/* Open popups in the calendar */}
      < EditCalander openEditCalendar={isCalendar} closeEditCalendar={closeEditCalendar} />
      <TypeCalendarNew openTypeCalendar={isTypeCalendarNew} closeTypeCalendar={closeTypeCalendarNew} onAddCalendarType={addCalendarType} />
      <AddPresentCalendar openPresent={IsPresent} closePresent={closePresent} onAddPresentType={addPresentType} />
      <EditPresent openEditPresent={IsEditPresent} closeEditPresent={closeEditPresent} />
      <AddCustomer openCustomer={IsCustomer} closeCustomer={closeCustomer} typeUnionNumber={typeUnionNumber} onAddCustomerType={addCusTomerType} />
      <EditCustomer openEditCustomer={IsEditCustomer} closeEditCustomer={closeEditCustomer} />
      <EditAddress openEditAdress={IsEditAddress} closeEditAdress={closeEditAddress} />
      <AddAdressCalendar openAddCalendar={IsAddressPb} closeAddCalendar={closeAddressPb} />
      {/* Close popups in the calendar */}
    </Dialog>
  );
}