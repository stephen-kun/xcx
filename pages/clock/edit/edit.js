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
    repeat: null,
    hour: null,
    minute: null,
    clock: {
      hours: hours,
      minutes: minutes,
      value: [6, 30],
      items: [
        { name: '每天', value: 'everyday' },
        { name: '周末', value: 'weekend' },
        { name: '临时', value: 'temporary'},
        { name: '工作日', value: 'workingday' }
      ],
      affair: "闹钟",
    },
  },

  radioChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      repeat: e.detail.value
    })
  },

  bindChange: function (e) {
    var val = e.detail.value
    console.log(val)
    this.setData({
      hour: this.data.clock.hours[val[0]],
      minute: this.data.clock.minutes[val[1]]
    })
    console.log(this.data.hour)
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
    console.log("affire: " + e.detail.value.affair)
    var that = this

    var clock = {};
    clock['id'] = that.data.id
    clock["hour"] = that.data.hour
    clock["minute"] = that.data.minute
    clock['affair'] = e.detail.value.affair
    clock['repeat'] = that.data.repeat

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

          for(var i=0; i<clk.items.length; i++)
          {
            if(clk.items[i].value == clock.repeat)
            {
              clk.items[i]['checked'] = 'true'
            }
          }

          that.setData({
            id:clock.id,
            hour:clock.hour,
            minute:clock.minute,
            affair:clock.affair,
            repeat:clock.repeat,
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