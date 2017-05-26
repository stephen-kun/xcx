// air-condition.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems: [
      { name: '格力', value: '美国' },
      { name: '美的', value: '中国' },
    ],
    cmds: [
      { name: 'USA', value: '开空调' },
      { name: 'CHN', value: '关空调' },
      { name: 'BRA', value: '温度增加' },
      { name: 'JPN', value: '温度减少' }
    ],
    cmd:'开空调',
    value:[1],
    settings:[]
  },

  addCmd:function(e){
    var cnt = 0
    var settings = this.data.settings
    var devs = this.data.checkboxItems
    for (var i = 0; i < devs.length; i++) {
      if (devs[i].checked == true){
        cnt++
        var setting = {}
        setting["dev"] = devs[i].name
        setting['cmd'] = this.data.cmd

        var size = settings.length
        if(size > 0)
        {
          var cnt = 0
          for(var j=0; j<size; j++){
            if((devs[i].name != settings[j].name) && (settings[j].cmd != this.data.cmd))
              continue
            else{
              cnt++
              break
            }
          }
          if(cnt == 0)
            settings.push(setting)
        }
        else
          settings.push(setting)
      }

    }    

    if(cnt == 0)
      wx.showToast({
        title: '未选中设备',
      })

    this.setData({
      settings: settings
    })
    
  },

  bindChange: function (e) {
    var val = e.detail.value
    console.log(val)
    this.setData({
      cmd: this.data.cmds[val[0]].value
    })
  },

  checkboxChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.checkboxItems.length; i++) {
      if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
        changed['checkboxItems[' + i + '].checked'] = true
      } else {
        changed['checkboxItems[' + i + '].checked'] = false
      }
      this.setData(changed)
    }
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