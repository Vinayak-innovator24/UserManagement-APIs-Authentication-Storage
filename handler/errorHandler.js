// handler/errorHandler.js
module.exports = (res, error) => {
  console.error('Error:', error);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
};