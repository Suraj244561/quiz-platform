export function errorHandler(error, req, res, next) {
  res.status(400).json({ message: error.message || 'Something went wrong.' });
}
