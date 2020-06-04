var createError = require('http-errors');
const express = require('express');
var router = express.Router();

var User = require('../models').User;

//Get users
router.get('/users', async (req, res) => {
  try {
    var users = await User.find({})
    res.json(users)
  } catch (e) {
    console.log(e);
    return res.status(403).json(e)
  }
});

router.delete('/user/:user_id', async (req, res) => {
  try {
    var targetUser = await User.findOne({
      _id: req.params.user_id
    })
    if(!targetUser) throw(createError("User has been delted or not found."))
    await targetUser.remove()

    var users = await User.find({})
    res.json(users)
  } catch (e) {
    console.error(e.stack);
    return res.status(403).json(e)
  }
})

// User login
router.post('/login', async (req, res) => {
  try {
    var form = req.body;
    if(!form.email) throw(createError("Email missed !"))
    if(!form.password) throw(createError("Password missed !"))
    var existed_user = await User.findOne({
      email: form.email
    })
    if (!existed_user) throw(createError("Email not found !"))
    if (existed_user.password !== form.password) throw(createError("Password incorrect !"))

    req.session.isLogin = true;
    req.session.user = existed_user;
    // res.json({message: "Successful login !"})
    res.redirect('/')
  } catch (e) {
    console.error(e.stack);
    return res.status(403).json(e)
  }
})

//User register
router.post('/register', async (req, res) => {
  try {
    var form = req.body;
    if(!form.email) throw(createError("Email missed !"))
    if(!form.password) throw(createError("Password missed !"))
    if(!form.passwordRe) throw(createError("passwordRe missed !"))
    if(!form.passwordRe || form.passwordRe !== form.password) throw(createError("Password repeatnot match!"))
    if(form.password.length < 8) throw(createError(`Your password length is ${form.password.length},password must be longer than 8 characters !`))
    var existed_user = await User.findOne({
      email: form.email
    })
    if (existed_user) throw(createError("Email has been registered !"))
    var newUser = new User({
      email: form.email,
      password: form.password
    })
    await newUser.save()

    var users = await User.find({})
    res.json(users)
  } catch (e) {
    console.error(e.stack);
    return res.status(403).json(e)
  }
})

router.get('/logout', async (req, res) => {
  try {
    await req.session.destroy();
    res.redirect('/')
  } catch (e) {
    console.error(e.stack);
    return res.status(403).json(e)
  }
})

module.exports = router;
