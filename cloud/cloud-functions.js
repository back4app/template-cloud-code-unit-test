// cloud-functions.js
module.exports.SignupUser = function(Parse) {
  return function (request, response) {
    // Copied from main.js:
    // Make sure the necessary parameters are passed first
    var params = request.params;
    if (!params.username || !params.email || !params.password || !params.firstname || !params.lastname)
        return response.error("Missing parameters: need username, email, password, firstname, & lastname");
    // Execute the signup flow
    var user = new Parse.User({
      username : params.username,
      password : params.password,
      email : params.email
    });
    user.signUp(null, {useMasterKey : true})
    .then((newUser) => {
      var Profile = Parse.Object.extend("Profile");
      var profile = new Profile({
        firstname : params.firstname,
        lastname : params.lastname,
        user : newUser
      })
      return profile.save(null, {useMasterKey : true});
    })
    .then((prof) => response.success(prof))
    .catch((e) => {
      response.error(e.message);
    })
  }
}
