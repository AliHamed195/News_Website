export const baseUrl = 'https://localhost:44332/api';

export const authEndpoints = {
  login: `${baseUrl}/Account/login`,
  register: `${baseUrl}/Account/register`,
};

export const hashTagsEndpoints = {
  createHashTag: `${baseUrl}/HashTag/create`,
  getAllHashTags: `${baseUrl}/HashTag/all`,
  getHashTagById: `${baseUrl}/HashTag/`,
  updateHashTagById: `${baseUrl}/HashTag/update/`,
  deleteHashTagById: `${baseUrl}/HashTag/delete/`,
  hashTagCountAll: `${baseUrl}/HashTag/count/all`,
  hashTagCountIsUsed: `${baseUrl}/HashTag/count/isUsed`,
};
