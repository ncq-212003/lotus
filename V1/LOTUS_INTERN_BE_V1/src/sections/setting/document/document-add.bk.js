import * as React from "react";
import { TextField, Grid, Stack, Box, Autocomplete, Button } from "@mui/material";

export default function DocumentAdd() {
  const optionTypeDocument = [{ value: 1, label: "hello" }];

  return (
    <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={12} xs={12}>
          <Box
            sx={{
              bgcolor: "#fff",
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            <Autocomplete
              fullWidth
              size="small"
              options={optionTypeDocument}
              sx={{ margin: "10px auto 15px" }}
              renderInput={(params) => <TextField {...params} label="Loại giấy tờ" />}
            />
            <TextField
              required
              sx={{ marginBottom: "20px" }}
              size="small"
              label="Thứ tự"
              fullWidth
            />
            <Box sx={{display:"flex", justifyContent:"flex-end"}}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1C2536",
                }}
              >
                Thêm
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}
