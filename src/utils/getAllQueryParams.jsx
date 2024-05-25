export const getAllQueryParams = (params) => {
  const queryParams = {};
  for (const [key, value] of params) {
    queryParams[key] = value;
  }
  return queryParams;
};
