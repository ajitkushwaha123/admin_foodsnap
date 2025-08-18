export const RESPONSE_CODES = Object.freeze({
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: "Internal Server Error",
  },
  MISSING_REQUIRED_FIELDS: (field) => ({
    status: 400,
    message: `${field} field is required`,
  }),
  CREATED_SUCCESS: {
    status: 201,
    message: "Created Successfully",
  },
  FETCHED_SUCCESS: {
    status: 200,
    message: "Fetched Successfully",
  },
});
