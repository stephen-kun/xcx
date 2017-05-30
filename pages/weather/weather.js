
// weather.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    appid:null,
    city: "深圳",
    cities: null,
    value:null,
    values:[0, 0],
    subcities:null
  },

  bindChange: function (e) {
    var val = e.detail.value
    console.log(val)
    this.setData({
      subcities: this.data.cities[val[0]].city,
      value: this.data.cities[val[0]].city[val[1]]
    })
  },

  setCity:function(e){
    var that = this
    console.log("set city: " + that.data.value)
    console.log("setCity appid: " + that.data.appid)

    wx.request({
      url: 'https://wx.tonki.com.cn/city',
      data:{
        appid: that.data.appid,
        action:"set",
        city: that.data.value
      },
      success:function(res){
        if(res.data.err_no == 200)
        {
          console.log("setcity:" + res.data.city)
          that.setData({
            city: res.data.city
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
      console.log(appid)
      that.setData({
        appid: appid
      })
    })

    var cities = wx.getStorageSync("cities")
    if(cities)
    {
      that.setData({
        cities:cities,
        subcities:cities[0].city,
        value:cities[0].city[0]
      })
    }
    else
    {
      // 获取城市列表
      wx.request({
        url: 'https://wx.tonki.com.cn/city',
        data:{
          appid:that.data.appid,
          action:'list'
        },
        success:function(res){
          if(res.data.err_no == 200)
          {
            that.setData({
              cities: res.data.cities,
              subcities: res.data.cities[0].city
            })   
            wx.setStorageSync("cities", res.data.cities)     
          }
          else
          {
            wx.showToast({
              title: '获取数据失败',
            })
          }
        }
      })
    }

    // 获取城市信息
    wx.request({
      url: 'https://wx.tonki.com.cn/city',
      data: {
        appid: that.data.appid,
        action:'get'
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.err_no == 200)
        {
          that.setData({
            city: res.data.city
          })
        }
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