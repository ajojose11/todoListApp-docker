const jwt = require('jsonwebtoken');
module.exports = {
    authenticate: function(req,res,next) {
          // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];;
  // decode token
  if (token) {
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
    // verifies secret and checks exp
    jwt.verify(token, 'bumblebee', function(err, decoded) {       if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });       } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
             next();
      }
    });
  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
}
    }