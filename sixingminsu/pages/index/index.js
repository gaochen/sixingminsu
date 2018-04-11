Page({
  data: {
    dataList: [],
    total: 4
  },
  toCalender: function() {
    wx.navigateTo({
      url: '../calender/calender'
    })
  },
  onLoad: function () {
    
  }
})
