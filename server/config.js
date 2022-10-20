module.exports = {
  session: {
    secret: "SECRET_KEY",
    key: "sid",
    cookie: {
      path: '/',
      maxAge: 3600000*24*30,
      secure: false
    }
  }
}