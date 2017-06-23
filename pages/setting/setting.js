// setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invoke:'bingo',
    imei:"89891234",
    version:'v1.0.1',
    sound: 0,
    maxSound: 50,
  },

  soundUp: function (e) {
    var that = this
    var sound = this.data.sound
    sound += 1
    that.setData({
      sound: sound
    })
  },

  soundDown: function (e) {
    var that = this
    var sound = this.data.sound
    sound -= 1
    that.setData({
      sound: sound
    })
  },

  soundChange: function (e) {
    console.log('slider 发生 change 事件，携带值为', e.detail.value)
    var that = this
    that.setData({
      sound: e.detail.value
    })
  },

  goNetwork:function(e){
    wx.showToast({
      title: '待开发',
    })
  },

  goProblems:function(e){
    wx.showToast({
      title: '待开发',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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