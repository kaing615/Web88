const responseWithData = (res, statusCode, data) => {
    res.status(statusCode).json({
        status: statusCode,
        data: data
    });
}

const error = (res) => responseWithData(res, 500, {
    status: 500,
    message: "Oops! Something went wrong",
});

const badRequest = (res, message) => responseWithData(res, 400, {
    status: 400,
    message: message || "Bad Request",
});

const ok = (res, message) => responseWithData(res, 200, data)

const created = (res, message) => responseWithData(res, 201, data)

const unauthorized = (res, message) => responseWithData(res, 401, {
    status: 401,
    message: "Unauthorized",
});

const notFound = (res, message) => responseWithData(res, 404, {
    status: 404,
    message: message || "Not Found",
});

export default {
    error,
    badRequest,
    ok,
    created,
    unauthorized,
    notFound
}
