import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Autocomplete, // Import Autocomplete
  MenuItem,
  Button,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({});

const initialValues = {
  bloodGroup: "",
  weight: "",
  height: "",
  isAlcohol: "",
  isSmoke: "",
  eyesightLeft: "",
  eyesightRight: "",
  preferredHand: "",
};

export default function HealthConditionEmployee() {
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
        bgcolor: "#fff",
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        marginBottom: "12px",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                Tình trạng sức khỏe
              </Typography>
              <Autocomplete
                error={!!(formik.touched.bloodGroup && formik.errors.bloodGroup)}
                helperText={formik.touched.bloodGroup && formik.errors.bloodGroup}
                onBlur={formik.handleBlur}
                onChange={(event, newValue) => formik.setFieldValue("bloodGroup", newValue)}
                value={formik.values.bloodGroup}
                name="bloodGroup"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "A", "B", "O", "AB"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Nhóm máu" />
                )}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  error={!!(formik.touched.weight && formik.errors.weight)}
                  helperText={formik.touched.weight && formik.errors.weight}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.weight}
                  name="weight"
                  variant="outlined"
                  required
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  label="Cân nặng"
                  fullWidth
                />
                <TextField
                  error={!!(formik.touched.height && formik.errors.height)}
                  helperText={formik.touched.height && formik.errors.height}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.height}
                  name="height"
                  variant="outlined"
                  required
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  label="Chiều cao"
                  fullWidth
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Autocomplete
                  error={!!(formik.touched.isAlcohol && formik.errors.isAlcohol)}
                  helperText={formik.touched.isAlcohol && formik.errors.isAlcohol}
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue("isAlcohol", newValue)}
                  value={formik.values.isAlcohol}
                  name="isAlcohol"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={["Không lựa chọn", "Không", "Có"]}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Uống rượu" />
                  )}
                />
                <Autocomplete
                  error={!!(formik.touched.isSmoke && formik.errors.isSmoke)}
                  helperText={formik.touched.isSmoke && formik.errors.isSmoke}
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue("isSmoke", newValue)}
                  value={formik.values.isSmoke}
                  name="isSmoke"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={["Không lựa chọn", "Không", "Có"]}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Hút thuốc" />
                  )}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  error={!!(formik.touched.eyesightLeft && formik.errors.eyesightLeft)}
                  helperText={formik.touched.eyesightLeft && formik.errors.eyesightLeft}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.eyesightLeft}
                  name="eyesightLeft"
                  variant="outlined"
                  required
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  label="Thị lực (trái)"
                  fullWidth
                />
                <TextField
                  error={!!(formik.touched.eyesightRight && formik.errors.eyesightRight)}
                  helperText={formik.touched.eyesightRight && formik.errors.eyesightRight}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.eyesightRight}
                  name="eyesightRight"
                  variant="outlined"
                  required
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  label="Thị lực (phải)"
                  fullWidth
                />
              </Box>
              <Autocomplete
                error={!!(formik.touched.preferredHand && formik.errors.preferredHand)}
                helperText={formik.touched.preferredHand && formik.errors.preferredHand}
                onBlur={formik.handleBlur}
                onChange={(event, newValue) => formik.setFieldValue("preferredHand", newValue)}
                value={formik.values.preferredHand}
                name="preferredHand"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "Trái", "Phải", "Hai tay"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Tay thuận" />
                )}
              />
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
