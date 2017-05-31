//app.js
App({
  onLaunch: function () {
    var that = this
    //调用API从本地缓存中获取数据
    //wx.removeStorageSync("userInfo")
    var userInfo = wx.getStorageSync('userInfo')
    if(userInfo)
    {
      console.log("appid: " + userInfo.appid)
      that.globalData.userInfo = userInfo
    }
    else
    {
      //调用登录接口
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: 'https://wx.tonki.com.cn/login/',
              data: {
                code: res.code
              },
              success: function (res) {
                console.log(res.data.openid)
                that.globalData.userInfo.appid = res.data.openid
                wx.setStorageSync("userInfo", that.globalData.userInfo)
              },
              fail: function (res) {
                console.log("fail" + res)
              }
            })

            wx.getUserInfo({
              success: function (res) {
                console.log("userinfo:" + res.userInfo.nickName)
                that.globalData.userInfo.nickName = res.userInfo.nickName
                that.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl
                wx.setStorageSync("userInfo", that.globalData.userInfo)
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

  isLogin:function(){
    var that = this
    var deviceid = that.globalData.userInfo.deviceid
    if(deviceid)
      return true
    else
      return false
  },

  getDeviceid:function(cb){
    var that = this
    if (that.globalData.userInfo.deviceid) {
      typeof cb == "function" && cb(that.globalData.userInfo.deviceid)
    } else {
      console.log("getAppId error")
    }
  },

  getAppId:function(cb){
    var that = this
    if (that.globalData.userInfo.appid) {
      typeof cb == "function" && cb(that.globalData.userInfo.appid)
    } else {
      console.log("getAppId error")
    }
  },

  delUserInfo:function(){
    var that = this
    that.globalData.userInfo.deviceid = null
    wx.setStorageSync("userInfo", that.globalData.userInfo)
  },

  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }
    else{
      console.log("getUserInfo error")
    }
  },

  setUserInfo:function(data){
    var that = this
    if(data.deviceid)
    {
      that.globalData.userInfo.deviceid = data.deviceid
    }
    if(data.nickName)
    {
      that.globalData.userInfo.nickName = data.nickName
    }
    if(data.city)
    {
      that.globalData.userInfo.city = data.city
    }
    if (data.avatarUrl)
    {
      that.globalData.userInfo.avatarUrl = data.avatarUrl
    }
    if (data.phone) {
      that.globalData.userInfo.phone = data.phone
    }

    wx.setStorageSync("userInfo", that.globalData.userInfo)
  },

  globalData:{
    userInfo:{
      appid:null,
      nickName:null,
      city:null,
      deviceid:null,
      avatarUrl:null,
      phone:null
    }
  }
})