import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  
} from "@mui/material";
import { Box } from "@mui/system";

export default function Province() {
  return (
    <>
      <Stack
        spacing={3}
        sx={{
          margin: "0 auto",
        }}
      >
        <TextField
          label="Tên tỉnh "
          variant="filled"
          sx={{ margin: "4px", marginTop: "12px",minWidth:"700px"}}
        />
          <TextField
          label="Tên vùng "
          variant="filled"
          sx={{ margin: "4px", marginTop: "12px"}}
        />
          <TextField
          label="Tên kanj "
          variant="filled"
          sx={{ margin: "4px", marginTop: "12px"}}
        />
        <Button variant="contained" sx={{ margin: "4px", marginTop: "12px"}}>
          Thêm
        </Button>
      </Stack>
    </>
  );
}
