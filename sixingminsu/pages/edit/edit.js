

Page({
  data: {
    dateList: [],
    status: -1
  },
  onReady: function () {
    let selectDate = wx.getStorageSync('selectDate')
    selectDate.sort()
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
  },
  clickValid: function() {
    let status = this.data.status
    if (status === 1) {
      status = -1
    } else {
      status = 1
    }
    this.setData({
      status: status
    })
  },
  clickInvalid: function() {
    let status = this.data.status
    if (status === 0) {
      status = -1
    } else {
      status = 0
    }
    this.setData({
      status: status
    })
  },
  toSave: function() {
    let status = this.data.status
    if (status === -1) {
      wx.showToast({
        title: '请先选择状态',
        icon: 'none',
        duration: 1000
      })
    } else {
      // 提交状态，返回上一页
      wx.navigateBack({
        delta: 1
      })
    }
  }
})
