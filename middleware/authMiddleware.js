
const jwt = require("jwt-simple");
const passport = require("passport");
//ใช้ในการ decode jwt ออกมา
const ExtractJwt = require("passport-jwt").ExtractJwt;
//ใช้ในการประกาศ Strategy
const JwtStrategy = require("passport-jwt").Strategy;

//สร้าง Strategy
const jwtOptions = {
   jwtFromRequest: ExtractJwt.fromHeader("authorization"),
   secretOrKey: process.env.secretKeyJWT
};

const jwtAuth = new JwtStrategy(jwtOptions, async (payload, done) => {
   // Check User ส่วนนี้ควรเช็ค ID User จาก Database จริง
   console.log(payload.sub)
   if (payload.sub === '1234567890') done(null, true);
   else done(null, false);
});
//เสียบ Strategy เข้า Passport
passport.use(jwtAuth);

//ทำ Passport Middleware
const requireJWTAuth = passport.authenticate("jwt", { session: false });

function loginJWT (id) {
   const payload = {
      sub: id,
      iat: new Date().getTime()
   };
   return jwt.encode(payload, SECRET);
};

function idFromToken(authorization) {
   var decoded = jwt.decode(authorization, SECRET);
   return decoded.sub;
}

exports.loginJWT = (id) => loginJWT(id);
exports.requireJWTAuth = requireJWTAuth;
exports.jwtAuth = () => jwtAuth;
exports.id = (token) => idFromToken(token);

