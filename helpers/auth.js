const jwt = require("jsonwebtoken");

module.exports = {
  tokenValid: (req, res, next) => {
    jwt.verify(req.headers.token, "itIsSecretBeetweenUs", function(
      err,
      decoded
    ) {
      if (err) {
        console.log("error", err);
        res.send(err);
      } else {
        next();
      }
    });
  }
};


