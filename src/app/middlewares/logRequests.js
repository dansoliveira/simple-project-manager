let numberOfRequests = 0;

export default (req, res, next) => {
  numberOfRequests += 1;
  console.log(
    `Number of requests: ${numberOfRequests}; Method: ${req.method}; URL: ${req.url}`
  );

  return next();
};
