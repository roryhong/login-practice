const express = require('express')
const router = express.Router()
const login = require('../../models/login')

router.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/login')
  }
  res.render('index')
})

// 驗證req.session.user是否已經存在
function auth (req, res, next) {
  if (req.session.user) {
    console.log('authenticated')
    next()
  } else {
    console.log('not authenticated')
    return res.redirect('/')
  }
}

router.get('/login', auth, (req, res) => {
  const userName = req.session.user
  return res.render('success', { message: `Welcome back! ${userName}` })
})

router.post('/login', (req, res) => {
  login.find({ email: req.body.inputEmail })
    .lean()
    .then(user => {
      if (!user[0]) {
        const alert = '此email尚未註冊'
        res.render('index', { alert })
      } else if (user[0].password !== req.body.inputPassword) {
        const alert = '請輸入正確的密碼'
        res.render('index', { alert })
      } else {
        // 成功登入則將user name存入session中
        req.session.user = user[0].firstName
        res.render('success', { message: `Hello! ${user[0].firstName}` })
      }
    })
    .catch(error => console.log(error))
})

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    console.log('session destroy')
  })
  res.render('index')
})

module.exports = router
