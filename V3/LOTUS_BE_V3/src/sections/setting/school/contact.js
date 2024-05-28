import React, { useState } from "react";
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
} from "@mui/material";
import { Add } from "@mui/icons-material";

export default function TabContact() {
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({
    Stt: "",
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
    setRows([...rows, newRow]);
    setNewRow({
      Stt: "",
      HoTen: "",
      NamSinh: "",
      QuanHe: "",
      NgheNghiep: "",
      DiaChi: "",
      DiDong: "",
      SongChung: "",
      ThuNhap: "",
    });
  };

  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleFieldChange = (e, fieldName) => {
    const updatedNewRow = { ...newRow };
    updatedNewRow[fieldName] = e.target.value;
    setNewRow(updatedNewRow);
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
                    <TableCell align="center">Xóa</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="left">
                        <TextField
                          size="small"
                          value={row.HoTen}
                          onChange={(e) => handleFieldChange(e, "HoTen")}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          size="small"
                          value={row.NamSinh}
                          onChange={(e) => handleFieldChange(e, "NamSinh")}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          size="small"
                          value={row.QuanHe}
                          onChange={(e) => handleFieldChange(e, "QuanHe")}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          size="small"
                          value={row.NgheNghiep}
                          onChange={(e) => handleFieldChange(e, "NgheNghiep")}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          size="small"
                          value={row.DiaChi}
                          onChange={(e) => handleFieldChange(e, "DiaChi")}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          size="small"
                          value={row.DiDong}
                          onChange={(e) => handleFieldChange(e, "DiDong")}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          size="small"
                          value={row.SongChung}
                          onChange={(e) => handleFieldChange(e, "SongChung")}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          size="small"
                          value={row.ThuNhap}
                          onChange={(e) => handleFieldChange(e, "ThuNhap")}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button variant="text" onClick={() => deleteRow(index)}>
                          Xóa
                        </Button>
                      </TableCell>
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
