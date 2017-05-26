//app.js
App({
  onLaunch: function () {
    var that = this
    //调用API从本地缓存中获取数据
    var userInfo = wx.getStorageSync('userInfo') || {}
    that.globalData.userInfo = userInfo
  },

  isLogin:function(){
    var that = this
    var deviceid = that.globalData.userInfo.deviceid
    if(deviceid)
      return true
    else
      return false
  },

  getAppId:function(cb){
    var that = this
    if (this.globalData.appid) {
      typeof cb == "function" && cb(this.globalData.appid)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: 'https://bp.qubaba88.com/login',
              data: {
                code: res.code
              },
              success: function (res) {
                console.log("success")
                console.log(res.data.openid)
                that.globalData.appid = res.data.openid
                typeof cb == "function" && cb(that.globalData.appid)
              },
              fail: function (res) {
                console.log("fail"+ res)
              }
            })
          }
          else {
            console.log("login error:" + res.errMsg)
          }
        }
      })
    }
  },

  setUserInfo:function(data){
    var that = this
    if(data.deviceid)
    {
      that.globalData.userInfo.deviceid = data.deviceid
    }
    if(data.name)
    {
      that.globalData.userInfo.name = data.name
    }
    if(data.city)
    {
      that.globalData.userInfo.city = data.city
    }

    wx.setStorageSync("userInfo", that.globalData.userInfo)
  },

  globalData:{
    appid:null,
    userInfo:null,
  }
})