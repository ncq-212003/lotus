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
import { actionSetTouched } from "./tab-infobasic";
import * as Yup from "yup";

export function validateFieldHealthCondition(dispatch, tab, fieldName, fieldValue) {
  const validationSchema = Yup.object().shape({
    bloodGroup: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    weight: Yup.string()
      .max(4000)
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[0-9]+$/, "Vui lòng nhập số vào trường này"),
    height: Yup.string()
      .max(4000)
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[0-9]+$/, "Vui lòng nhập số vào trường này"),
    isAlcohol: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    isSmoke: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    eyesightLeft: Yup.string()
      .max(4000)
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[1-9]$|^10$/, "Vui lòng nhập một số trong khoảng 1 đến 10"),
    eyesightRight: Yup.string()
      .max(4000)
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[1-9]$|^10$/, "Vui lòng nhập một số trong khoảng 1 đến 10"),
    preferredHand: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
  });

  let newValue;
  validationSchema
    .validateAt(fieldName, { [fieldName]: fieldValue })
    .then(() => {
      newValue = null;
      dispatch({
        type: HANDLERS_EMPLOYEE.SET_ERRORS_EMPLOYEE,
        payload: { tab, fieldName, newValue },
      });
    })
    .catch((error) => {
      newValue = error.message;
      dispatch({
        type: HANDLERS_EMPLOYEE.SET_ERRORS_EMPLOYEE,
        payload: { tab, fieldName, newValue },
      });
    });
}

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
    touched,
    errors,
  } = healthCondition;
  console.log(touched);

  const handleChange = (event, fieldName) => {
    actionSetTouched(dispatch, tab, fieldName);

    const fieldValue = event.target.value;
    let newValue;

    if (fieldValue.length >= 0) {
      newValue = fieldValue;
      dispatch({
        type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
        payload: { tab, fieldName, newValue },
      });
    } else {
      newValue = "";
      dispatch({
        type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
        payload: { tab, fieldName, newValue },
      });
    }

    validateFieldHealthCondition(dispatch, tab, fieldName, fieldValue);
  };

  const handleChangeSelect = (event, fieldName, newValueSelect) => {
    actionSetTouched(dispatch, tab, fieldName);

    let newValue;

    if (newValueSelect !== null) {
      newValue = newValueSelect;
      dispatch({
        type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
        payload: { tab, fieldName, newValue },
      });
    } else {
      newValue = "";
      dispatch({
        type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
        payload: { tab, fieldName, newValue },
      });
    }

    validateFieldHealthCondition(dispatch, tab, fieldName, newValue);
  };

  const handleBlur = (fieldName) => {
    actionSetTouched(dispatch, tab, fieldName);
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
            <Autocomplete
              onBlur={() => handleBlur("bloodGroup")}
              onChange={(event, newValue) => handleChangeSelect(event, "bloodGroup", newValue)}
              value={bloodGroup}
              name="bloodGroup"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={["Không lựa chọn", "A", "B", "O", "AB"]}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Nhóm máu"
                  error={!!(touched.bloodGroup && errors.bloodGroup)}
                  helperText={touched.bloodGroup && errors.bloodGroup}
                />
              )}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                error={!!(touched.weight && errors.weight)}
                helperText={touched.weight && errors.weight}
                onBlur={() => handleBlur("weight")}
                onChange={(event) => handleChange(event, "weight")}
                value={weight}
                name="weight"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Cân nặng"
                fullWidth
              />
              <TextField
                error={!!(touched.height && errors.height)}
                helperText={touched.height && errors.height}
                onBlur={() => handleBlur("height")}
                onChange={(event) => handleChange(event, "height")}
                value={height}
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
                onBlur={() => handleBlur("isAlcohol")}
                onChange={(event, newValue) => handleChangeSelect(event, "isAlcohol", newValue)}
                value={isAlcohol}
                name="isAlcohol"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "Không", "Có"]}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    label="Uống rượu"
                    error={!!(touched.isAlcohol && errors.isAlcohol)}
                    helperText={touched.isAlcohol && errors.isAlcohol}
                  />
                )}
              />
              <Autocomplete
                onBlur={() => handleBlur("isSmoke")}
                onChange={(event, newValue) => handleChangeSelect(event, "isSmoke", newValue)}
                value={isSmoke}
                name="isSmoke"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "Không", "Có"]}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    label="Hút thuốc"
                    error={!!(touched.isSmoke && errors.isSmoke)}
                    helperText={touched.isSmoke && errors.isSmoke}
                  />
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
                error={!!(touched.eyesightLeft && errors.eyesightLeft)}
                helperText={touched.eyesightLeft && errors.eyesightLeft}
                onBlur={() => handleBlur("eyesightLeft")}
                onChange={(event) => handleChange(event, "eyesightLeft")}
                value={eyesightLeft}
                name="eyesightLeft"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Thị lực (trái)"
                fullWidth
              />
              <TextField
                error={!!(touched.eyesightRight && errors.eyesightRight)}
                helperText={touched.eyesightRight && errors.eyesightRight}
                onBlur={() => handleBlur("eyesightRight")}
                onChange={(event) => handleChange(event, "eyesightRight")}
                value={eyesightRight}
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
              onBlur={() => handleBlur("preferredHand")}
              onChange={(event, newValue) => handleChangeSelect(event, "preferredHand", newValue)}
              value={preferredHand}
              name="preferredHand"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={["Không lựa chọn", "Trái", "Phải", "Hai tay"]}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Tay thuận"
                  error={!!(touched.preferredHand && errors.preferredHand)}
                  helperText={touched.preferredHand && errors.preferredHand}
                />
              )}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
