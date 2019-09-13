import axios from '../../../utils/axios';
import api from '../../../utils/api';
import qs from 'qs';

const defaultParams = {
  include_count: true,
  continue: true,
  order: 'ASC',
  sortBy: 'name',
  filter: '',
  limit: '10',
  offset: '0'
};

const formatParams = params => {
  const formattedParams = {
    include_count: true,
    continue: true,
    order: `${params.sortBy} ${params.order}`,
    offset: `${params.offset}/resource`,
    filter: params.filter,
    limit: params.limit
  };

  return formattedParams;
};

export const getAllDoctors = async (params = defaultParams) => {
  console.log('API | GET | /Doctors');
  const formattedParams = formatParams(params);
  const url = `${api.doctorApiBaseUrl}/Doctors?${qs.stringify(
    formattedParams
  )}`;
  return axios.get(url, params);
};

export const updateDoctor = async data => {
  console.log('API | PATCH | /Doctors');
  const url = `${api.doctorApiBaseUrl}/Doctors`;
  const updatedData = { resource: [data] };
  return axios.patch(url, updatedData);
};
