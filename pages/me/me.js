// me.js

//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    isLogin:false,
  },


  doLogin:function(){
    wx.navigateTo({
      url: 'login/login',
    })
  },

  doLogout:function(){
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否注销？',
      success:function(res){
        if(res.confirm)
        {
          console.log("确定")
          wx.request({
            url: 'https://wx.tonki.com.cn/userLogin',
            data: {
              appid: that.data.userInfo.appid,
              action: "logout"
            },
            success: function (res) {
              if (res.data.err_no == 200) {
                that.setData({
                  isLogin: false
                })
                app.delUserInfo()
              }
            },
            complete:function(res){
              that.setData({
                isLogin: false
              })
              app.delUserInfo()          
            }
          })         
        }
        else if(res.cancel)
        {
          console.log("取消")
        }
      },
    })
  },

  goMessage:function(e){

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo: userInfo
      })
    })

    var isLogin = app.isLogin()
    that.setData({
      isLogin: isLogin
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
    var that = this
    var isLogin = app.isLogin()
    that.setData({
      isLogin: isLogin
    }) 
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