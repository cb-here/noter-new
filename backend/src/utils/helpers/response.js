const errorResponse = (message, code = 401) => ({
  error: true,
  statusCode: code,
  message,
});

const sendResponse = ({
  message,
  title,
  Response = {},
  Error = null,
  statusCode = 200,
  status = true,
  res,
}) => {
  return res.status(statusCode).json({
    statusCode,
    status,
    title,
    message,
    ...(status !== false &&
      Response &&
      ((Array.isArray(Response) && Response.length > 0) ||
        (!Array.isArray(Response) && Object.keys(Response).length > 0)) && {
        Response,
      }),
    ...(Error && Error),
  });
};

// bad request responses
const badRequest = (res, statusCode = 400, message, Error = {}) =>
  sendResponse({
    res,
    statusCode: statusCode,
    status: false,
    message,
    title: "Request failed",
    Error,
  });

const successResponse = (res, statusCode = 200, message = "", Response = {}) =>
  sendResponse({
    res,
    statusCode: statusCode,
    status: true,
    message,
    title: "Request successful",
    Response,
  });

export { errorResponse, sendResponse, badRequest, successResponse };
