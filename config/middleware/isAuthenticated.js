// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function (req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    console.log("\nUtente già autenticato.");
    return next();
  }
  // If the user isn't logged in => redirect to login
  console.log("\nUtente non autenticato => login");
  return res.redirect("/");
};