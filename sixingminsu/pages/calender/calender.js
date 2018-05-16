Page({
  data: {
    disabled: ['2018/4/21', '2018/4/22', '2018/4/23', '2018/4/24', '2018/4/25'],
    length: 3,
    dataList: [],
    selected: {},
    globalValue: [] // 存储在storage里面
  },
  toEdit: function () {
    let globalValue = this.data.globalValue
    if (globalValue.length === 0) {
      wx.showToast({
        title: '请先选择日期',
        icon: 'none',
        duration: 1000
      })
    } else {
      wx.navigateTo({
        url: '../edit/edit'
      })
    }
  },
  onLoad: function(option) {
    // 获取房间id
    console.log(option.id)
  },
  onReady: function (option) {
    let dataList = []
    let length = this.data.length
    let disabled = this.data.disabled

    let currentYear = new Date().getFullYear()
    let currentMonth = new Date().getMonth()
    let lastMonth = currentMonth + length

    for (let i = 0; i < length; i++) {
      let year = new Date(currentYear, currentMonth + i).getFullYear() // 获取当前年份
      let month = new Date(currentYear, currentMonth + i).getMonth()  // 获取当前月份
      let monthCN = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'][month] // 月份转化为中文
      let maxDay = new Date(year, month + 1, 0).getDate() // 日期传0，则获取上一月最后一天
      let firstDay = new Date(year, month, 1).getDay() // 获取第一天是周几
      let days = []
      for (let i = 0; i < firstDay; i++) {
        days.push({ 'value': '', 'disable': false, 'name': '', 'overdue': true })  // 空白格用overdue来屏蔽点击事件
      }
      let data = { 'year': year, 'month': month + 1, 'monthCN': monthCN, days: days, maxDay: maxDay }
      for (let j = 1; j < maxDay + 1; j++) {
        let value = `${year}/${month + 1}/${j}`
        let day = {
          'value': value,
          'disable': false,   // 判断是否被屏蔽
          'name': j,
          'overdue': false    // 判断是否已过期
        }
        if (disabled.indexOf(value) !== -1) {
          day.disable = true
        }
        if (new Date().getTime() > new Date(value).getTime()) {
          day.overdue = true
        }
        data.days.push(day)
      }
      dataList.push(data)
    }
    this.setData({
      dataList: dataList
    })
  },
  clickDate: function (e) {
    let date = e.currentTarget.dataset.date
    let overdue = e.currentTarget.dataset.overdue
    let selected = this.data.selected
    let globalValue = this.data.globalValue
    let num = globalValue.indexOf(date)
    if (overdue) {
      return false
    }
    if (!selected[date]) {
      selected[date] = true
      globalValue.push(date)
      this.setData({
        selected: selected,
        globalValue: globalValue
      })
    } else {
      selected[date] = false
      globalValue.splice(num, 1)
      this.setData({
        selected: selected,
        globalValue: globalValue
      })
    }
    wx.setStorageSync('selectDate', globalValue)
  },
  onShow: function() {
    this.setData({
      selected: {},
      globalValue: []
    })
    wx.setStorageSync('selectDate', [])
  }
})