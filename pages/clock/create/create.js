// create.js
const minutes = []
const hours = []

for (let i = 0; i < 24; i++) {
  hours.push(i)
}

for (let i = 0; i < 60; i++) {
  minutes.push(i)
}

var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    clock:{
      hours: hours,
      minutes: minutes,
      value: [6, 30],
      items:[
        { name: '每天', value: 'everyday' },
        { name: '周末', value: 'weekend' },
        { name: '临时', value: 'temporary', checked: 'true' },
        { name: '工作日', value: 'workingday' },
      ],
      affair:"闹钟",
    },
    appid:null,
    isLogin:false,
    repeat: null,    
    hour:null,
    minute:null
  },

  radioChange:function(e){
    console.log(e.detail.value)
    this.setData({
      repeat:e.detail.value
    })
  },

  setClock: function (e) {
    console.log("affire: " + e.detail.value.affair)

    if(!this.data.isLogin){
      wx.showToast({
        title: '您未注册',
      })
      return
    }

    var clock = {};
    clock["hour"] = this.data.hour
    clock["minute"] = this.data.minute
    clock['affair'] = e.detail.value.affair
    clock['repeat'] = this.data.repeat

    wx.request({
      url: 'https://wx.tonki.com.cn/clock',
      method:'POST',
      data:{
        appid:this.data.appid,
        action:'add',
        clock:clock
      },
      success:function(res){
        if(res.data.err_no == 200){
          wx.navigateBack({
            delta:1
          })
        }
      }
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

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var that = this
    app.getAppId(function(appid){
      that.setData({
        appid:appid
      })
    })
    
    var isLogin = app.isLogin()
    that.setData({
      isLogin:isLogin
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