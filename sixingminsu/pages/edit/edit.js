

Page({
  data: {
    dateList: []
  },
  onReady: function () {
    let selectDate = wx.getStorageSync('selectDate')
    let dateList = []
    selectDate.forEach(element => {
      let date = new Date(element)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()]
      dateList.push(`${year}年${month}月${day}日 ${week}`)
    })
    this.setData({
      dateList: dateList
    })
  }
})
