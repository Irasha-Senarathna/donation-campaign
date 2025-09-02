// module.exports = function(req, res, next) {
//   // Set Content Security Policy headers
//   res.setHeader(
//     'Content-Security-Policy',
//     "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'"
//   );
  
//   // Set other security headers
//   res.setHeader('X-XSS-Protection', '1; mode=block');
//   res.setHeader('X-Content-Type-Options', 'nosniff');
//   res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  
//   next();
// };