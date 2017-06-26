var app = getApp()
var playImage = '../../imags/love_no.jpg'
var pauseImage = '../../imags/love_yes.jpg'



Page({

  /**
   * 页面的初始数据
   */
  data: {
    appid: null,
    FMs: {
      play: playImage,
      pause: pauseImage,
      items: []
    },
  },

  doAction: function (e) {
    console.log(e.currentTarget.id)
    var that = this
    var id = e.currentTarget.id

    wx.request({
      url: 'https://wx.tonki.com.cn/bbc',
      data: {
        appid: that.data.appid,
        action: 'update',
        id: id
      },
      success: function (res) {
        if (res.data.err_no == 200) {
          var FMs = that.data.FMs
          for (var i = 0; i < FMs.items.length; i++) {
            if (FMs.items[i].id == id) {
              if (FMs.items[i].state == 0)
                FMs.items[i].state = 1
              else
                FMs.items[i].state = 0
            }
          }

          that.setData({
            FMs: FMs
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
      url: 'https://wx.tonki.com.cn/bbc',
      data: {
        appid: that.data.appid,
        action: 'list'
      },
      success: function (res) {
        if (res.data.err_no == 200) {
          var FMs = that.data.FMs
          var fms = res.data.FMs
          for (var i = 0; i < res.data.FMs.length; i++) {
            fms[i]['state'] = 0
          }
          FMs.items = fms
          that.setData({
            FMs: FMs
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
  
  }
})