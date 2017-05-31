// smart.js
var app = getApp()

var devices = [
  {
    id:1,
    dtype:'空调',
    dname:'海尔',
    position:'卧室'
  },
  {
    id:2,
    dtype: '窗帘',
    dname: '格力',
    position: '卧室'
  },  
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    appid:null,
    isLogin:false,
    devices: devices,
  },

  doAddDev: function (e) {
    wx.navigateTo({
      url: './create/create',
    })
  },

  doEdit: function (e) {
    var id = e.target.id
    var urls = './edit/edit?ID'
    urls = urls.replace(/ID/, id)
    wx.navigateTo({
      url: urls,
    })
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

    if(isLogin)
    {
      wx.request({
        url: 'https://wx.tonki.com.cn/dev',
        method:'POST',
        data:{
          appid:that.data.appid,
          action:'list'
        },
        success:function(res){
          if(res.data.err_no == 200)
          {
            that.setData({
              devices:res.data.devices
            })
          }
        }
      })
    }
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