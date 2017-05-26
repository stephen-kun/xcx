// clock.js
const minutes = []
const hours = []

for(let i = 0; i < 24; i++)
{
  hours.push(i)
}

for(let i = 0; i<60; i++){
  minutes.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hours: hours,
    hour:6,
    minutes: minutes,
    minute:30,
    value:[6,30],
    clocks:[],
  },

  setClock: function(e){
    console.log("curr: " + this.data.value)
    var clock = {};
    clock["hour"] = this.data.hour
    clock["minute"] = this.data.minute
    var clocks = this.data.clocks
    var size = this.data.clocks.length
    if(size > 0)
    {
      var cnt = 0
      for(var i=0; i<size; i++){
        if((clocks[i].hour != clock.hour)|| (clocks[i].minute != clock.minute))
          continue
        else{
          cnt++
          break
        }
      }
      if(cnt == 0)
        clocks.push(clock)
    }
    else
      clocks.push(clock)
    this.setData({
      clocks:clocks
    })
    console.log(this.data.clocks)
  },

  bindChange: function (e) {
    var val = e.detail.value
    console.log(val)
    this.setData({
      hour: this.data.hours[val[0]],
      minute: this.data.minutes[val[1]]
    })
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