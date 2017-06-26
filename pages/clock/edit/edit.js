// edit.js
var app = getApp()

const minutes = []
const hours = []

for (let i = 0; i < 24; i++) {
  hours.push(i)
}

for (let i = 0; i < 60; i++) {
  minutes.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    appid: null,
    isLogin: false,
    hour: null,
    minute: null,
    clock: {
      hours: hours,
      minutes: minutes,
      value: [6, 30],
      repeat: "从不",
      affair: "闹钟"
    },
  },

  setRepeat: function (e) {
    var that = this
    var url = '../repeat/repeat?repeat=REPEAT'
    url = url.replace(/REPEAT/, that.data.clock.repeat)
    wx.navigateTo({
      url: url,
    })
  },

  setAffair: function (e) {
    var that = this
    var url = '../affair/affair?affair=AFFAIR'
    url = url.replace(/AFFAIR/, that.data.clock.affair)
    wx.navigateTo({
      url: url,
    })
  },


  bindChange: function (e) {
    var that = this
    var val = e.detail.value
    console.log(val)
    that.setData({
      hour: that.data.clock.hours[val[0]],
      minute: that.data.clock.minutes[val[1]]
    })
    console.log(that.data.hour)
  },

  delClock:function(e){
    var that = this

    wx.request({
      url: 'https://wx.tonki.com.cn/clock',
      method:'POST',
      data:{
        appid:that.data.appid,
        action:'del',
        id:that.data.id
      },
      success:function(res){
        if(res.data.err_no == 200){
          wx.reLaunch({
            url: '../clock',
          })         
        }
      }
    })
  },

  setClock: function (e) {
    var that = this

    var clock = {};
    clock['id'] = that.data.id
    clock["hour"] = that.data.hour
    clock["minute"] = that.data.minute
    clock['affair'] = that.data.clock.affair
    clock['repeat'] = that.data.clock.repeat

    wx.request({
      url: 'https://wx.tonki.com.cn/clock',
      method: 'POST',
      data: {
        appid: that.data.appid,
        action: 'update',
        clock: clock
      },
      success: function (res) {
        if (res.data.err_no == 200) {
          wx.removeStorageSync("affair")
          wx.removeStorageSync("repeat")
          wx.reLaunch({
            url: '../clock',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    var that = this
    var id = options.id

    app.getAppId(function(appid){
      that.setData({
        appid:appid
      })
    })

    wx.request({
      url: 'https://wx.tonki.com.cn/clock',
      method:'POST',
      data:{
        appid:that.data.appid,
        action:'get',
        id:id
      },
      success:function(res){
        if(res.data.err_no == 200)
        {
          var clock = res.data.clock
          var clk = that.data.clock

          clk.value[0] = clock.hour
          clk.value[1] = clock.minute
          clk.affair = clock.affair
          clk.repeat = clock.repeat

          that.setData({
            id:clock.id,
            hour:clock.hour,
            minute:clock.minute,
            clock:clk
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
    var that = this
    var repeat = wx.getStorageSync("repeat")
    var affair = wx.getStorageSync("affair")
    console.log(repeat)
    console.log(affair)
    var clock = that.data.clock
    clock.value[0] = that.data.hour
    clock.value[1] = that.data.minute
    
    if(repeat){
      clock.repeat = repeat
      that.setData({
        clock:clock
      })
    }

    if(affair){
      clock.affair = affair
      that.setData({
        clock:clock
      })
    }
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