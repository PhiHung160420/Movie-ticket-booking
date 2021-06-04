const { request, response } = require("express");
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const router = require("express").Router();


router.use((request, response, next) => {
  response.locals.layout = "users/layouts/layout";
  next();
});

router.get("/sign-in", (req, res) => {
  const msg = req.query.valid;
  const msgErr = req.query.validErr;
  
  if(req.session.user_id){
    res.redirect("/user");
  }
  else{
    res.render("users/sign-in", {message: msg, messageErr: msgErr});
  }
  
});


router.post("/sign-in", asyncHandler(async(req, res)=>{
  const {email, password} = req.body;
  const user = await User.findUserByEmail(email);
  if(!user){
    const string = encodeURIComponent('Thông tin đăng nhập không đúng');
    return res.redirect('/user/sign-in/?validErr=' + string);  
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

router.get("/logout", (req, res) => {
  delete req.session.user_id;
  res.redirect("/user");
});


module.exports = router;
