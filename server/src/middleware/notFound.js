function notFound(req, res) {
  res.status(404).json({
    data: {},
    message: "404 | Not Found",
    status: 404
  });
}

module.exports = notFound;
