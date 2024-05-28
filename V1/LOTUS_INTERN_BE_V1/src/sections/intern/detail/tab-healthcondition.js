import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function TabHealthCondition() {
  return (
    <>
      <Stack spacing={3}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12}>
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ marginBottom: "16px" }}
                textAlign="center"
              >
                Tình trạng sức khỏe
              </Typography>
              {/* Nhóm máu */}
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Nhóm máu:</span> A
              </Typography>

              {/* Cân nặng và Chiều cao */}
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Cân nặng:</span> 65 kg
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Chiều cao:</span> 170 cm
              </Typography>

              {/* Uống rượu */}
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Uống rượu:</span> Không
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Hút thuốc:</span> Có
              </Typography>

              {/* Thị lực (trái) và Thị lực (phải) */}
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Thị lực (trái):</span> 5/10
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Thị lực (phải):</span> 5/10
              </Typography>

              {/* Tay thuận */}
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Tay thuận:</span> Trái
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
