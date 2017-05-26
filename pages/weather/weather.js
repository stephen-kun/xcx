
// weather.js
var app = getApp()

var cities = [
  { id: "广东", city: ["深圳", "广州"] }, { id: "湖南", city: ["长沙", "邵阳"] }, { id: "北京", city: ["北京"] }, { id: "上海", city: ["上海"] }
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    appid:null,
    city: "深圳",
    cities: cities,
    value:null,
    values:[0, 0],
    deviceid:null,
    subcities:cities[0].city
  },

  bindChange: function (e) {
    var val = e.detail.value
    console.log(val)
    this.setData({
      subcities: this.data.cities[val[0]].city,
      value: this.data.subcities[val[1]]
    })
  },

  setCity:function(e){
    var that = this
    console.log("set city: " + that.data.value)
    console.log("setCity appid: " + that.data.appid)

    wx.request({
      url: 'https://bp.qubaba88.com/setCity',
      data:{
        appid: that.data.appid,
        deviceid: that.data.deviceid,
        action:"set",
        city: that.data.value
      },
      success:function(res){
        console.log("setcity:" + res.data.city)
        that.setData({
          city: res.data.city
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.getAppId(function (appid) {
      console.log(appid)
      that.setData({
        appid: appid
      })
    })
    console.log("appid:" + that.data.appid)

    // 获取城市信息
    wx.request({
      url: 'https://bp.qubaba88.com/city',
      data: {
        appid: that.data.appid,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          city: res.data
        })
      }
    })   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
 
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