import { useEffect, useState } from "react";
import axios from "axios";

const useFetchLocation = (cityId, districtId) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  //fetch City
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://lotus.a.tisbase.online/api/Location/getCities");
        setCities(response.data.map((city) => ({ value: city.id, label: city.name })));
      } catch (error) {
        setCities({ value: 1, label: "Lấy dữ liệu không thành công!" });
      }
    };
    if (cities.length === 0) {
      fetchCities();
    }
  }, []);

  //fetch district
  useEffect(() => {
    const fetchDistricts = async (cityId) => {
      try {
        const response = await axios.get(
          `http://lotus.a.tisbase.online/api/Location/getDistricts?cityId=${cityId}`
        );
        setDistricts(
          response.data.map((district) => ({
            cityId: district.cityId,
            value: district.id,
            label: district.name,
          }))
        );
      } catch (error) {
        setDistricts([]);
      }
    };
    if (cities.length !== 0 || cities?.label !== "Lấy dữ liệu không thành công!") {
      fetchDistricts(cityId);
    }
  }, [cityId]);

  //fetch ward
  useEffect(() => {
    const fetchWards = async (districtId) => {
      try {
        const response = await axios.get(
          `http://lotus.a.tisbase.online/api/Location/getWards?districtId=${districtId}`
        );
        setWards(
          response.data.map((ward) => ({
            districtId: ward.districtId,
            value: ward.id,
            label: ward.name,
          }))
        );
      } catch (error) {
        setWards([]);
      }
    };
    if (districts.length !== 0 || districts?.label !== "Lấy dữ liệu không thành công!") {
      fetchWards(districtId);
    }
  }, [districtId]);

  return {
    cities,
    districts,
    wards,
  };
};

export default useFetchLocation;
