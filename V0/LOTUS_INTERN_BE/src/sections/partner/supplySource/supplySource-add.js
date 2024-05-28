import React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Tab, Tabs, Divider, AppBar } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { Box } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({});

const initialValues = {
  name: "",
  phone: "",
  email: "",
  personalDescription: "",
  city: "",
  cityDescription: "",
};

export default function AddSupplySource({ open, onClose }) {
  const [cityOptions, setCityOptions] = useState([]);
  const [tabValue, setTabValue] = useState(0); // Initialize tab value

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://erp2.a.tisbase.online/api/v2/Location/getCities");
        const cities = response.data.map((city) => ({ label: city.name, value: city.id })); // Assuming the response contains an array of cities

        setCityOptions(cities);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleClose = () => {
    onClose();
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;

  //   if (name === "phone" && value.length > 10) {
  //     return;
  //   }

  //   if (name === "phone" && !/^\d*$/.test(value)) {
  //     return; // Không cập nhật giá trị nếu không phải là số
  //   }

  //   const newData = {
  //     ...formData,

  //     [name]: value,
  //   };
  //   setFormData(newData);

  //   if (props.onDataChange) {
  //     const newDataProps = {
  //       ...props.dataRow,
  //       [name]: value,
  //     };
  //     props.onDataChange(newDataProps);
  //     setFormData(newDataProps);
  //   }
  // };

  // const handleCityChange = (newValue) => {
  //   if (newValue !== null) {
  //     const updatedFormData = { ...formData };
  //     updatedFormData.cityId = newValue.value;
  //     setFormData(updatedFormData);
  //   }

  //   if (newValue === null) {
  //     const updatedFormData = { ...formData };
  //     updatedFormData.cityId = 0;
  //     setFormData(updatedFormData);
  //   }
  // };

  // const findLabelCityFromValue = (value) => {
  //   const cityOption = cityOptions.find((option) => option.value === value);
  //   return cityOption ? cityOption.label : "";
  // };

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
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <AppBar sx={{ position: "relative", backgroundColor: "#1C2536", padding: "16px" }}>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Chọn loại cung ứng
          </Typography>
        </AppBar>
        <Box sx={{ borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            textColor="inherit"
            variant="fullWidth"
          >
            {/* <Tab label="Cá nhân" sx={{ "&.Mui-selected": { backgroundColor: "#1C2536" } }}/>
            <Tab label="Tỉnh / thành phố" sx={{ "&.Mui-selected": { backgroundColor: "#1C2536" } }} />*/}
            <Tab label="Cá nhân"/>
            <Tab label="Tỉnh / thành phố" /> 
          </Tabs>
        </Box>
        <Box
          sx={{
            padding: "0 16px 16px 16px",
            border: "1px solid #ccc",
            width: "600px",
            height: "330px",
          }}
        >
          {tabValue === 0 && (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                variant="outlined"
                name="name"
                required
                sx={{ margin: "0 auto", marginTop: "20px", width: "80%" }}
                label="Tên"
                margin="normal"
              />
              <TextField
                error={!!(formik.touched.phone && formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                variant="outlined"
                name="phone"
                sx={{ margin: "0 auto", marginTop: "10px", width: "80%" }}
                required
                label="Số điện thoại"
                margin="normal"
              />
              <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                variant="outlined"
                name="email"
                sx={{ margin: "0 auto", marginTop: "10px", width: "80%" }}
                required
                label="Email"
                margin="normal"
              />
              <TextField
                error={!!(formik.touched.descriptionPerson && formik.errors.descriptionPerson)}
                helperText={formik.touched.descriptionPerson && formik.errors.descriptionPerson}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.descriptionPerson}
                variant="outlined"
                multiline
                name="descriptionPerson"
                sx={{ margin: "0 auto", marginTop: "10px", width: "80%" }}
                label="Ghi chú"
                margin="normal"
              />
            </Box>
          )}
          {tabValue === 1 && (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Autocomplete
                error={!!(formik.touched.city && formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                onBlur={formik.handleBlur}
                onChange={(event, newValue) => formik.setFieldValue("city", newValue)}
                value={formik.values.city}
                name="city"
                sx={{ margin: "0 auto", marginTop: "70px", width: "80%" }}
                required
                autoHighlight
                options={cityOptions}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    label={"Tỉnh / thành phố"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
              <TextField
                error={!!(formik.touched.descriptionCity && formik.errors.descriptionCity)}
                helperText={formik.touched.descriptionCity && formik.errors.descriptionCity}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.descriptionCity}
                variant="outlined"
                name="descriptionCity"
                multiline
                sx={{ margin: "10px auto 30px", width: "80%" }}
                label="Ghi chú"
                margin="normal"
              />
            </Box>
          )}
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
                backgroundColor: "#1C2536",
                marginTop: "20px",
              }}
            >
              Lưu
            </Button>
          </Box>
        </Box>
      </form>
    </Dialog>
  );
}
