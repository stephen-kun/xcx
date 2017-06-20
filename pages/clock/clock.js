// clock.js

var app = getApp()

/*
var clocks = [
  {
    id:12,
    hour:6,
    minute:30,
    repeate:[1, 2, 3],
    affair:"跑步",
    state:1
  },
  {
    id: 16,
    hour: 6,
    minute: 30,
    repeate: [1, 2, 3],
    affair: "起床",
    state: 0
  }  
]
*/

Page({
  /**
   * 页面的初始数据
   */
  data: {
    appid:null,
    clocks:[],
    isLogin:false,
    isEdit:0,
    isDel:0,
    listDel:[],
  },

  doAddClock:function(e){
    wx.navigateTo({
      url: './create/create',
    })
  },

  doEdit:function(e){
    console.log(e.currentTarget.id)
    var id = e.currentTarget.id
    var urls = './edit/edit?id=ID'
    urls = urls.replace(/ID/, id)
    wx.navigateTo({
      url: urls,
    })
  },

  doDel:function(e){
    var that = this

    wx.request({
      url: 'https://wx.tonki.com.cn/clock',
      method: 'POST',
      data: {
        appid: that.data.appid,
        action: 'del',
        id: that.data.listDel
      },
      success: function (res) {
        if (res.data.err_no == 200) {
          wx.reLaunch({
            url: 'clock',
          })
        }
      }
    })
  },

  onEdit:function(e){
    console.log('onEdit')
    var that = this
    that.setData({
      isEdit:1
    })
  },

  onCancel:function(e){
    var that = this
    that.setData({
      isEdit:0,
      isDel:0,
      listDel:[]
    })
  },

  doChange:function(e){
    console.log(e.detail.value)
    var that = this
    var value = e.detail.value
    if (value.length)
    {
      that.setData({
        isDel:1
      })
    }
    else
    {
      that.setData({
        isDel:0
      })
    }

    that.setData({
      listDel:value
    })
  },

  clockSwitch:function(e){
    console.log(e.target.id)    
    var that = this
    var id = e.target.id
    var value = e.detail.value
    var state = 0
    if(value)
      state = 1
    else
      state = 0

    wx.request({
      url: 'https://wx.tonki.com.cn/clock',
      data:{
        appid:that.data.appid,
        action:'update',
        clock:{
          id: id,
          state:state,
        }
      },
      method:"POST",
      success:function(res){
        if(res.data.err_no == 200)
        {
          var clocks = that.data.clocks
          for(var i=0; i<clocks.length; i++)
          {
            if(id == clocks[i].id)
            {
              clocks[i].state = state
              that.setData({
                clocks:clocks
              })
              break
            }
          }
        }
      }
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

      var isLogin = app.isLogin()
      that.setData({
        isLogin:isLogin
      })

      if(isLogin)
      {
        // get clock list
        wx.request({
          url: 'https://wx.tonki.com.cn/clock',
          data: {
            appid: appid,
            action: "list"
          },
          method:"POST",
          success: function (res) {
            console.log(res.data.err_no)
            console.log(res.data.err_msg)
            console.log(res.data.clocks)            
            if (res.data.err_no == 200) {
              that.setData({
                clocks:res.data.clocks
              })
            }
          }
        })
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
    var isLogin = app.isLogin()
    that.setData({
      isLogin: isLogin
    })  
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