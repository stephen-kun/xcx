//  .js

var app = getApp()
var playImage = '../imags/play.jpg'
var pauseImage = '../imags/pause.jpg'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    appid: null,
    stories: {
      play: playImage,
      pause: pauseImage,
      items: []
    },
    sound:0,
    maxSound:50,
  },

  soundUp:function(e){
    var that = this
    var sound = this.data.sound
    sound += 1
    that.setData({
      sound:sound
    })
  },

  soundDown:function(e){
    var that = this
    var sound = this.data.sound
    sound -= 1
    that.setData({
      sound: sound
    })   
  },

  soundChange:function(e){
    console.log('slider 发生 change 事件，携带值为', e.detail.value)
    var that = this
    that.setData({
      sound:e.detail.value
    })
  },

  doAction: function (e) {
    console.log(e.currentTarget.id)
    var that = this
    var id = e.currentTarget.id

    wx.request({
      url: 'https://wx.tonki.com.cn/story',
      data: {
        appid: that.data.appid,
        action: 'play',
        id: id
      },
      success: function (res) {
        if (res.data.err_no == 200) {
          var stories = that.data.stories
          for (var i = 0; i < stories.items.length; i++) {
            if (stories.items[i].id == id) {
              if (stories.items[i].state == 0)
                stories.items[i].state = 1
              else
                stories.items[i].state = 0
            }
            else {
              stories.items[i].state = 0
            }
          }

          that.setData({
            stories: stories
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.getAppId(function (appid) {
      that.setData({
        appid: appid
      })
    })

    wx.request({
      url: 'https://wx.tonki.com.cn/story',
      data: {
        appid: that.data.appid,
        action: 'list'
      },
      success: function (res) {
        if (res.data.err_no == 200) {
          var stories = that.data.stories
          stories.items = res.data.stories
          that.setData({
            stories: stories
          })
        }
      }
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