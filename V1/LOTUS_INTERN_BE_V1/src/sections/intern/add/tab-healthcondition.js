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
import { HANDLERS_INTERN } from "src/contexts/reducer/intern/reducer-intern";
import { useApp } from "src/hooks/use-app";
import * as Yup from "yup";
import { actionSetTouched } from "./tab-infobasic";

export function validateFieldHealthCondition(dispatch, tab, fieldName, fieldValue) {
  const validationSchema = Yup.object().shape({
    nhomMau: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    canNang: Yup.string()
      .max(4000)
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[0-9]+$/, "Vui lòng nhập số vào trường này"),
    chieuCao: Yup.string()
      .max(4000)
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[0-9]+$/, "Vui lòng nhập số vào trường này"),
    uongRuou: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    hutThuoc: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    thiLucTrai: Yup.string()
      .max(4000)
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[1-9]$|^10$/, "Vui lòng nhập một số trong khoảng 1 đến 10"),
    thiLucPhai: Yup.string()
      .max(4000)
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[1-9]$|^10$/, "Vui lòng nhập một số trong khoảng 1 đến 10"),
    tayThuan: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
  });
  let newValue;
  validationSchema
    .validateAt(fieldName, { [fieldName]: fieldValue })
    .then(() => {
      newValue = null;
      dispatch({
        type: HANDLERS_INTERN.SET_ERRORS_INTERN,
        payload: { tab, fieldName, newValue },
      });
    })
    .catch((error) => {
      newValue = error.message;
      dispatch({
        type: HANDLERS_INTERN.SET_ERRORS_INTERN,
        payload: { tab, fieldName, newValue },
      });
    });
}

export default function TabHealthCondition() {
  const tab = "tinhTrangSucKhoe";
  const [state, dispatch] = useApp();
  const { intern } = state;
  const { tinhTrangSucKhoe } = intern;
  const {
    nhomMau,
    canNang,
    chieuCao,
    uongRuou,
    hutThuoc,
    thiLucTrai,
    thiLucPhai,
    tayThuan,
    touched,
    errors,
  } = tinhTrangSucKhoe;

  const handleChange = (event, fieldName) => {
    actionSetTouched(dispatch, tab, fieldName);

    const fieldValue = event.target.value;
    let newValue;

    if (fieldValue.length >= 0) {
      newValue = fieldValue;
      dispatch({
        type: HANDLERS_INTERN.SET_INPUT_INTERN,
        payload: { tab, fieldName, newValue },
      });
    } else {
      newValue = "";
      dispatch({
        type: HANDLERS_INTERN.SET_INPUT_INTERN,
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
        type: HANDLERS_INTERN.SET_INPUT_INTERN,
        payload: { tab, fieldName, newValue },
      });
    } else {
      newValue = "";
      dispatch({
        type: HANDLERS_INTERN.SET_INPUT_INTERN,
        payload: { tab, fieldName, newValue },
      });
    }

    validateFieldHealthCondition(dispatch, tab, fieldName, newValue);
  };

  const handleBlur = (fieldName) => {
    actionSetTouched(dispatch, tab, fieldName);
  };

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
              <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                Tình trạng sức khỏe
              </Typography>
              <Autocomplete
                onBlur={() => handleBlur("nhomMau")}
                onChange={(event, newValue) => handleChangeSelect(event, "nhomMau", newValue)}
                value={nhomMau}
                name="nhomMau"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "A", "B", "O", "AB"]}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    label="Nhóm máu"
                    error={!!(touched.nhomMau && errors.nhomMau)}
                    helperText={touched.nhomMau && errors.nhomMau}
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
                  error={!!(touched.canNang && errors.canNang)}
                  helperText={touched.canNang && errors.canNang}
                  onBlur={() => handleBlur("canNang")}
                  onChange={(event) => handleChange(event, "canNang")}
                  value={canNang}
                  name="canNang"
                  variant="outlined"
                  required
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  label="Cân nặng"
                  fullWidth
                />
                <TextField
                  error={!!(touched.chieuCao && errors.chieuCao)}
                  helperText={touched.chieuCao && errors.chieuCao}
                  onBlur={() => handleBlur("chieuCao")}
                  onChange={(event) => handleChange(event, "chieuCao")}
                  value={chieuCao}
                  name="chieuCao"
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
                <TextField
                  error={!!(touched.uongRuou && errors.uongRuou)}
                  helperText={touched.uongRuou && errors.uongRuou}
                  onBlur={() => handleBlur("uongRuou")}
                  onChange={(event) => handleChange(event, "uongRuou")}
                  value={uongRuou}
                  name="uongRuou"
                  fullWidth
                  sx={{ margin: "4px", marginTop: "12px" }}
                  label="Uống rượu"
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                >
                  <option value="Không lựa chọn">Không lựa chọn</option>
                  <option value="Không">Không</option>
                  <option value="Có">Có</option>
                </TextField>

                <TextField
                  error={!!(touched.hutThuoc && errors.hutThuoc)}
                  helperText={touched.hutThuoc && errors.hutThuoc}
                  onBlur={() => handleBlur("hutThuoc")}
                  onChange={(event) => handleChange(event, "hutThuoc")}
                  value={hutThuoc}
                  name="hutThuoc"
                  fullWidth
                  sx={{ margin: "4px", marginTop: "12px" }}
                  label="Hút thuốc"
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                >
                  <option value="Không lựa chọn">Không lựa chọn</option>
                  <option value="Không">Không</option>
                  <option value="Có">Có</option>
                </TextField>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  error={!!(touched.thiLucTrai && errors.thiLucTrai)}
                  helperText={touched.thiLucTrai && errors.thiLucTrai}
                  onBlur={() => handleBlur("thiLucTrai")}
                  onChange={(event) => handleChange(event, "thiLucTrai")}
                  value={thiLucTrai}
                  name="thiLucTrai"
                  variant="outlined"
                  required
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  label="Thị lực (trái)"
                  fullWidth
                />
                <TextField
                  error={!!(touched.thiLucPhai && errors.thiLucPhai)}
                  helperText={touched.thiLucPhai && errors.thiLucPhai}
                  onBlur={() => handleBlur("thiLucPhai")}
                  onChange={(event) => handleChange(event, "thiLucPhai")}
                  value={thiLucPhai}
                  name="thiLucPhai"
                  variant="outlined"
                  required
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  label="Thị lực (phải)"
                  fullWidth
                />
              </Box>
              <TextField
                error={!!(touched.tayThuan && errors.tayThuan)}
                helperText={touched.tayThuan && errors.tayThuan}
                onBlur={() => handleBlur("tayThuan")}
                onChange={(event) => handleChange(event, "tayThuan")}
                value={tayThuan}
                name="tayThuan"
                fullWidth
                sx={{ margin: "4px", marginTop: "12px" }}
                label="Tay thuận"
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                <option value="Không lựa chọn">Không lựa chọn</option>
                <option value="Trái">Trái</option>
                <option value="Phải">Phải</option>
                <option value="Hai tay">Hai tay</option>
              </TextField>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
