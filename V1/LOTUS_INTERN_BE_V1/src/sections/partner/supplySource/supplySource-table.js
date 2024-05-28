import * as React from "react";
import { useState, useEffect } from "react";
import { Add } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {GridActionsCellItem, GridRowEditStopReasons } from "@mui/x-data-grid";
import { DataGrid } from '@mui/x-data-grid';
import Dialog from "@mui/material/Dialog";
import { TableContainer, Table, TableRow, TableCell, TableBody } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { AppBar, Toolbar, IconButton, SvgIcon, TableHead } from "@mui/material";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Stack } from "@mui/system";
import "dayjs/locale/en-gb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { Box, Button, Tooltip } from "@mui/material";

const validationSchema = Yup.object({});

const initialValues = {
  quantity: "",
  supplyDate: dayjs(),
};

const initialRows = [
  {
    id: 1,
    name: "Nguyễn Chính Nghĩa",
    typeSupple: "Cá nhân",
  },
  {
    id: 2,
    name: "Nguyễn Anh Tú",
    typeSupple: "Cá nhân",
  },
  {
    id: 3,
    name: "Hà nội",
    typeSupple: "Tỉnh / thành phố",
  },
  {
    id: 4,
    name: "Bắc ninh",
    typeSupple: "Tỉnh / thành phố",
  },
  {
    id: 5,
    name: "Nguyễn Duy Dư",
    typeSupple: "Cá nhân",
  },
];

const supplies = [
  {
    date: "22/11/2023",
    quantity: "100",
  },
  {
    date: "27/11/2023",
    quantity: "150",
  },
  {
    date: "02/01/2022",
    quantity: "200",
  },
  {
    date: "12/10/2021",
    quantity: "120",
  },
  {
    date: "05/10/2021",
    quantity: "300",
  },
];

export default function TableSupply() {
  const [openDialogAdd, setOpenDialogAdd] = React.useState(false);
  const [openDialogView, setOpenDialogView] = React.useState(false);

  const handleAddPropSupplyClick = (id) => () => {
    formik.setFieldValue("name", filteredName(id));
    setOpenDialogAdd(true);
  };

  const handleViewHistorySupplyClick = (id) => () => {
    formik.setFieldValue("name", filteredName(id));
    setOpenDialogView(true);
  };

  const handleCloseDialogAdd = () => {
    setOpenDialogAdd(false);
  };

  const handleCloseDialogView = () => {
    setOpenDialogView(false);
  };

  const columns = [
    {
      field: "name",
      headerName: "Nguồn cung ứng",
      width: 280,
      headerClassName: "bold-header",
    },
    {
      field: "typeSupple",
      headerName: "Loại cung ứng",
      width: 210,
      type: "singleSelect",
      valueOptions: ["Cá nhân", "Tỉnh / thành phố"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Thao tác",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <Tooltip title="Thêm cung ứng">
            <GridActionsCellItem
              sx={{ color: "black" }}
              icon={<Add />}
              label="Add"
              className="textPrimary"
              onClick={handleAddPropSupplyClick(id)}
              color="inherit"
            />
          </Tooltip>,
          <Tooltip title="Lịch sử cung ứng">
            <IconButton sx={{ color: "black" }}>
              <GridActionsCellItem
                icon={<VisibilityIcon />}
                label="View"
                onClick={handleViewHistorySupplyClick(id)}
                color="inherit"
              />
            </IconButton>
          </Tooltip>,
        ];
      },
    },
  ];

  const filteredName = (id) => {
    const matchingRow = initialRows.find((row) => row.id === id);
    return matchingRow ? matchingRow.name : "Name not found";
  };

  const handleEdit = (index) => {
    const updatedContacts = [...contacts];
    console.log("Chỉnh sửa thông tin của:", updatedContacts[index]);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const data = JSON.stringify(values);

        console.log(values);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <Box
      sx={{
        margin: "0 auto",
        marginTop: "30px",
        padding: "5px",
        height: 400,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          margin: "0 0 12px 0px",
        }}
      >
        <TextField
          sx={{ width: "50%" }}
          size="small"
          label="Nhập nội dung tìm kiếm"
          variant="outlined"
        />
        <Button
          sx={{
            marginLeft: "8px",
            backgroundColor: "#1C2536",
            color: "white",
          }}
          size="small"
          variant="contained"
        >
          Tìm kiếm
        </Button>
      </Box>
      <DataGrid
        rows={initialRows}
        columns={columns}
        sx={{
          borderColor: "rgb(224, 224, 224)",
          "& .MuiDataGrid-row": {
            border: "0.1px solid rgb(224, 224, 224) !important",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f0f0f0",
            borderBottom: "1px solid #ccc ",
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

      {/* Thêm ds cung ứng lần sau */}
      <Dialog open={openDialogAdd} onClose={handleCloseDialogAdd}>
        <form onSubmit={formik.handleSubmit}>
          <AppBar sx={{ position: "relative", backgroundColor: "#1C2536" }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Danh sách cung ứng
              </Typography>
              <Button
                disabled
                sx={{
                  border: "1px solid white",
                  "&.Mui-disabled": {
                    color: "white",
                  },
                  width: "170px",
                }}
              >
                {formik.values.name}
              </Button>
            </Toolbar>
          </AppBar>
          <Box
            sx={{
              padding: "16px",
              height: "290px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            <Box
              sx={{
                margin: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TableContainer sx={{ marginTop: "20px" }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Số lượng:</TableCell>
                      <TableCell>
                        <TextField
                          error={!!(formik.touched.quantity && formik.errors.quantity)}
                          helperText={formik.touched.quantity && formik.errors.quantity}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.quantity}
                          name="quantity"
                          size="small"
                          required
                          variant="outlined"
                          fullWidth
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ngày cung ứng:</TableCell>
                      <TableCell>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                          <DatePicker
                            error={!!(formik.touched.supplyDate && formik.errors.supplyDate)}
                            helperText={formik.touched.supplyDate && formik.errors.supplyDate}
                            onBlur={formik.handleBlur}
                            onChange={(value) => {
                              const formattedDate = dayjs(value).format("YYYY-MM-DD");
                              formik.setFieldValue("supplyDate", formattedDate);
                            }}
                            value={formik.values.supplyDate}
                            name="supplyDate"
                            slotProps={{
                              textField: {
                                size: "small",
                                variant: "outlined",
                              },
                            }}
                            sx={{ margin: "1px", width: "391px" }}
                          />
                        </LocalizationProvider>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  paddingLeft: "40px",
                  paddingRight: "40px",
                  fontSize: 16,
                  marginTop: "25px",
                  backgroundColor: "#1C2536",
                }}
              >
                Lưu
              </Button>
            </Box>
          </Box>
        </form>
      </Dialog>

      {/* Lịch sử cung ứng */}
      <Dialog
        open={openDialogView}
        onClose={handleCloseDialogView}
        sx={{ border: "1px solid #ccc" }}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#1C2536" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Danh sách lịch sử cung ứng
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialogView}
              aria-label="close"
            >
              <SvgIcon fontSize="small">
                <XCircleIcon />
              </SvgIcon>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Stack spacing={3} sx={{ p: 2 }}>
          <TableContainer sx={{ border: "1px solid #ccc", borderRadius: "4px", maxHeight: 400 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ngày cung ứng</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {supplies.map((supply, index) => (
                  <TableRow key={index} sx={{ borderTop: "1px solid #ccc" }}>
                    <TableCell>{supply.date}</TableCell>
                    <TableCell>{supply.quantity}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          onClick={() => {
                            handleEdit(index);
                          }}
                        >
                          <Edit />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Dialog>
    </Box>
  );
}
