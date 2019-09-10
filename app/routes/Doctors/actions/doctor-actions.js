import axios from "../../../utils/axios";
import api from "../../../utils/api";

export const getAll = async () => {
  const url = api.doctorApiBaseUrl + "/Doctors";
  console.log("getAll URL", url);

  const params = {
    include_count: true,
    continue: true,
    order: "",
    filter: "",
    limit: "",
    offset: ""
  };
  return axios.get(url, params);
};
