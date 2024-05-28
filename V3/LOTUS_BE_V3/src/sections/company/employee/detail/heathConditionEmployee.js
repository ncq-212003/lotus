import {
  Box,
  Grid,
  Typography,
  TextField,
  Autocomplete, // Import Autocomplete
  Paper,
} from "@mui/material";
import { HANDLERS_EMPLOYEE } from "src/contexts/reducer/company/reducer-employee";
import { useApp } from "src/hooks/use-app";

export default function HealthConditionEmployee() {
  const [state, dispatch] = useApp();
  const tab = "healthCondition";
  const { employee } = state;
  const { healthCondition } = employee;
  const {
    bloodGroup,
    weight,
    height,
    isAlcohol,
    isSmoke,
    eyesightLeft,
    eyesightRight,
    preferredHand,
  } = healthCondition;

  const handleChange = (event, fieldName) => {
    const newValue = event.target.value;
    dispatch({
      type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
      payload: { tab, fieldName, newValue },
    });
  };

  const handleChangeSelect = (event, fieldName, newValue) => {
    dispatch({
      type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
      payload: { tab, fieldName, newValue },
    });
  };

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        marginBottom: "12px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item sm={12} md={12} xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Tình trạng sức khỏe
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Nhóm máu:</span> O
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Cân nặng:</span> 70kg
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Chiều cao:</span> 1m70
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Uống rượu:</span> Có
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Hút thuốc:</span> Có
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Thị lực (Trái):</span> 6/10
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Thị lực (Phải):</span> 5/10
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Tay thuận:</span> Trái
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
