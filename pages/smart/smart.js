// smart.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
  },


  goAircondition:function(e){
    var that = this
    if(that.data.isLogin){
      wx.navigateTo({
        url: 'aircondition/aircondition',
      })
    }else{
      wx.showToast({
        title: '未绑定设备',
      })
    }
  },

  goFan:function(e){

  },

  goAcoustics:function(e){

  },

  goTV:function(e){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

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
      isLogin:isLogin
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  }
})