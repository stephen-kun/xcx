// login.js
//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null
  },


  doSave:function(e){
    var that = this
    var info = e.detail.value
    console.log("deviceid:" + info.deviceid)
    console.log("city:" + info.city)
    console.log("phone:" + info.phone)

    if(info.deviceid)
    {
      wx.request({
        url: 'https://wx.tonki.com.cn/userLogin',
        data: {
          appid: that.data.userInfo.appid,
          action: "login",
          deviceid: info.deviceid,
          city:info.city,
          phone:info.phone
        },
        success:function(res){
          if(res.data.err_no == 200)
          {
            console.log("login deviceid: " + res.data.deviceid)
            var userInfo = that.data.userInfo
            userInfo.deviceid = info.deviceid
            userInfo.city = info.city
            userInfo.phone = info.phone
            app.setUserInfo(userInfo)

            wx.showToast({
              title: '注册成功',
            })
            wx.navigateBack({
              url: '../me',
            })
          }
          else{
            wx.showToast({
              title: res.data.err_msg,
            })
          }
        }
      })


    }
    else
    {
      wx.showToast({
        title: '设备ID为空',
      })
      return
    }

},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})