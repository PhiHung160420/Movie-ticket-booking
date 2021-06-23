const { request, response } = require("express");

const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const router = require("express").Router();
const passport = require('passport');


router.use((request, response, next) => {
  response.locals.layout = "users/layouts/layout";
  next();
});

router.get("/sign-in", (req, res) => {
  res.render("users/sign-in");
});



router.post("/sign-in", asyncHandler(async(req, res)=>{
  const {email, password} = req.body;
  const user = await User.findUserByEmail(email);
  if(!user){
    const string = encodeURIComponent('Thông tin đăng nhập không đúng');
    return res.redirect('/user/sign-in/?validErr=' + string);  
  }
  if(user.user_password==null){
    const string = encodeURIComponent('Tài khoản chưa thiết lập mật khẩu, chọn quên mật khẩu để thiết lập.');
    return res.redirect('/user/sign-in/?validErr='+string);
  }
  if(user && !bcrypt.compareSync(password, user.user_password)){
    const string = encodeURIComponent('Thông tin đăng nhập không đúng');
    return res.redirect('/user/sign-in/?validErr=' + string);  
  }
  if(user.user_verify)
  {
      if(user && bcrypt.compareSync(password, user.user_password))
      {
          req.session.user_id = user.user_id;
          req.session.user_role = user.user_role;
          res.redirect("/user");
      }
      else
      { 
          res.render("users/sign-in");
      }   
  }
  else
  {
      const string = encodeURIComponent('Tài khoản của bạn chưa được xác thực');
      return res.redirect('/user/sign-in/?validErr=' + string);     
  }

}));

router.get("/sign-in-facebook", passport.authenticate('facebook', { scope: 'email' }));


router.get('/sign-in/facebook/callback',
    passport.authenticate('facebook',{
        successRedirect: '/user/sign-in/facebook/success',
        failureRedirect: '/user/sign-in'    
}));

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/user');
}

router.get('/sign-in/facebook/success',isLoggedIn, (req, res, next) => {
  console.log(req.user);
  if(req.user)
  {
      req.session.user_id = req.user.user_id;
      res.redirect('/user');
  }
  else {
      const string = "Đã có lỗi sảy ra"
      res.redirect('/user/sign-in/?validErr=' + string);
  }
    // res.render('users/home', {
    //     user : req.user // get the user out of session and pass to template
    // });
});

router.get("/logout", (req, res) => {
  delete req.session.user_facebookid;
  delete req.session.user_id;
  res.redirect("/user");
});


module.exports = router;
