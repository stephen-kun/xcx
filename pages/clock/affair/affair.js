// affair.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    affair:null
  },

  onInput:function(e){
    console.log(e.detail.value)
    var that = this
    that.setData({
      affair:e.detail.value
    })
  },

  doSave:function(e){
    var that = this 
    wx.setStorageSync("affair", that.data.affair)

    wx.navigateBack({
      delta:1
    })
  },

  doCancel:function(e){
    wx.navigateBack({
      delta: 1      
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.affair)
    var that = this
    that.setData({
      affair:options.affair
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