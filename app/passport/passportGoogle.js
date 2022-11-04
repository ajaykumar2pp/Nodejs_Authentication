const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser((user , done) => {
	done(null , user);
})
passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(new GoogleStrategy({
	clientID:"31366552284-sveh686piodi69ja3juepjsjvp3u9rl7.apps.googleusercontent.com",
	clientSecret:"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",
	callbackURL:"http://localhost:5000/home",
	passReqToCallback:true
},
function(request, accessToken, refreshToken, profile, done) {
	return done(null, profile);
}
));