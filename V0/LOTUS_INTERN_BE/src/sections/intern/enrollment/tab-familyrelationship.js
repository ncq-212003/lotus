import {
  Box,
  Grid,
  Stack,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  Autocomplete,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import React, { useState } from "react";
import { addRowTable, setFieldInput, useStoreIntern } from "src/contexts/intern-context";

export default function TabFamilyRelationship() {
  const [state, dispatch] = useStoreIntern();
  const tab = "familyRelationShip";
  const { intern, familyRelationShip } = state;

  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [newRow, setNewRow] = useState({
    HoTen: "",
    NamSinh: "",
    QuanHe: "",
    NgheNghiep: "",
    DiaChi: "",
    DiDong: "",
    SongChung: "",
    ThuNhap: "",
  });

  const addRow = () => {
    dispatch(addRowTable(tab, newRow));
    setNewRow({
      HoTen: "",
      NamSinh: "",
      QuanHe: "",
      NgheNghiep: "",
      DiaChi: "",
      DiDong: "",
      SongChung: "",
      ThuNhap: "",
    });
    setActiveField(null);
    setOpenDialog(false);
  };

  const deleteRow = (index) => {
    // dispatch({ type: "SET_FIELD_INPUT", payload: { tab, field: "familyRelationShip", value: rows.filter((_, i) => i !== index) } });
    dispatch(
      setFieldInput(
        tab,
        familyRelationShip,
        rows.filter((_, i) => i !== index)
      )
    );
    // const updatedRows = [...rows];
    // updatedRows.splice(index, 1);
    // setRows(updatedRows);
  };

  const handleFieldChange = (index, e, fieldName) => {
    // dispatch({ type: "SET_FIELD_INPUT", payload: { tab, field: `familyRelationShip.${index}.${fieldName}`, value: e.target.value } });
    dispatch(setFieldInput(tab, familyRelationShip[index][fieldName], e.target.value));
    // const updatedRows = [...rows];
    // const value = e.target.value;

    // // Update the specific field in the current row
    // updatedRows[index] = {
    //   ...updatedRows[index],
    //   [fieldName]: value,
    // };

    // setRows(updatedRows);
  };

  const handleFieldSelectChange = (index, fieldName, newValue) => {
    dispatch({
      type: "SET_FIELD_INPUT",
      payload: { tab, field: `familyRelationShip.${index}.${fieldName}`, value: newValue },
    });
    dispatch(setFieldInput(tab, familyRelationShip[index][fieldName], newValue));
    // const updatedRows = [...rows];
    // console.log(newValue);
    // updatedRows[index] = {
    //   ...updatedRows[index],
    //   [fieldName]: newValue,
    // };

    // setRows(updatedRows);
  };

  const openDialogForTextField = (fieldName) => {
    setActiveField(fieldName);
    setNewRow({ ...newRow, [fieldName]: "" });
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const renderDialogContent = (index) => {
    const row = rows[index];

    switch (activeField) {
      case "HoTen":
        return (
          <TextField
            variant="outlined"
            size="small"
            label="Họ và tên"
            value={row.HoTen}
            onChange={(e) => handleFieldChange(index, e, "HoTen")}
          />
        );
      case "NamSinh":
        return (
          <TextField
            variant="outlined"
            size="small"
            label="Năm sinh"
            value={row.NamSinh}
            onChange={(e) => handleFieldChange(index, e, "NamSinh")}
          />
        );
      case "NgheNghiep":
        return (
          <TextField
            label="Nghề nghiệp"
            variant="outlined"
            size="small"
            value={row.NgheNghiep}
            onChange={(e) => handleFieldChange(index, e, "NgheNghiep")}
          />
        );
      case "DiaChi":
        return (
          <TextField
            label="Địa chỉ"
            variant="outlined"
            size="small"
            value={row.DiaChi}
            onChange={(e) => handleFieldChange(index, e, "DiaChi")}
          />
        );
      case "DiDong":
        return (
          <TextField
            label="Di động"
            variant="outlined"
            size="small"
            value={row.DiDong}
            onChange={(e) => handleFieldChange(index, e, "DiDong")}
          />
        );
      case "ThuNhap":
        return (
          <TextField
            label="Thu Nhập"
            variant="outlined"
            size="small"
            value={row.ThuNhap}
            onChange={(e) => handleFieldChange(index, e, "ThuNhap")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12}>
            <Button variant="text" onClick={addRow}>
              <Add />
            </Button>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Stt</TableCell>
                    <TableCell align="center">Họ & Tên</TableCell>
                    <TableCell align="center">Năm sinh</TableCell>
                    <TableCell align="center">Quan hệ</TableCell>
                    <TableCell align="center">Nghề nghiệp</TableCell>
                    <TableCell align="center">Địa chỉ</TableCell>
                    <TableCell align="center">Di động </TableCell>
                    <TableCell align="center">Sống chung</TableCell>
                    <TableCell align="center">Thu nhập</TableCell>
                    <TableCell align="center">Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="left">
                        <TextField
                          variant="outlined"
                          size="small"
                          value={row.HoTen}
                          onClick={() => openDialogForTextField("HoTen")}
                        />
                      </TableCell>

                      <TableCell align="left">
                        <TextField
                          variant="outlined"
                          size="small"
                          value={row.NamSinh}
                          onClick={() => openDialogForTextField("NamSinh")}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Autocomplete
                          onChange={(e, newValue) =>
                            handleFieldSelectChange(index, "QuanHe", newValue)
                          }
                          value={row.QuanHe}
                          name="QuanHe"
                          onClick={() => openDialogForTextField("QuanHe")}
                          fullWidth
                          size="small"
                          options={["Không lựa chọn", "Bố", "Mẹ", "Anh", "Chị", "Em"]}
                          renderInput={(params) => <TextField variant="outlined" {...params} />}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          variant="outlined"
                          size="small"
                          value={row.NgheNghiep}
                          onClick={() => openDialogForTextField("NgheNghiep")}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          variant="outlined"
                          size="small"
                          value={row.DiaChi}
                          onClick={() => openDialogForTextField("DiaChi")}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          variant="outlined"
                          size="small"
                          value={row.DiDong}
                          onClick={() => openDialogForTextField("DiDong")}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Autocomplete
                          onChange={(e, newValue) =>
                            handleFieldSelectChange(index, "SongChung", newValue)
                          }
                          value={row.SongChung}
                          name="SongChung"
                          fullWidth
                          size="small"
                          options={["Không lựa chọn", "Có", "Không"]}
                          renderInput={(params) => <TextField variant="outlined" {...params} />}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          variant="outlined"
                          size="small"
                          value={row.ThuNhap}
                          onClick={() => openDialogForTextField("ThuNhap")}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button variant="text" onClick={() => deleteRow(index)}>
                          Xóa
                        </Button>
                      </TableCell>
                      <Dialog open={openDialog} onClose={closeDialog}>
                        <Box sx={{ margin: "10px" }}>{renderDialogContent(index)}</Box>
                        <DialogActions>
                          <Button
                            onClick={closeDialog}
                            variant="contained"
                            sx={{
                              backgroundColor: "#1C2536",
                            }}
                          >
                            Hủy bỏ
                          </Button>
                          <Button
                            onClick={closeDialog}
                            variant="contained"
                            sx={{
                              backgroundColor: "#1C2536",
                            }}
                          >
                            Lưu
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
