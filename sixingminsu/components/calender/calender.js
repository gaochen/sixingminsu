Component({
  properties: {
    disabled: {
      type: Array,
      value: []
    },
    length: {
      type: Number,
      value: 3
    }
  },
  data: {
    dataList: []
  },
  ready: function() {
    let dataList = []

    let currentYear = new Date().getFullYear()
    let currentMonth = new Date().getMonth()
    let lastMonth = currentMonth + this.properties.length

    for (let i = 0; i < this.properties.length; i++) {
      let year = new Date(currentYear, currentMonth + i).getFullYear() // 获取当前年份
      let month = new Date(currentYear, currentMonth + i).getMonth()  // 获取当前月份
      let monthCN = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'][month] // 月份转化为中文
      let maxDay = new Date(year, month + 1, 0).getDate() // 日期传0，则获取上一月最后一天
      let firstDay = new Date(year, month, 1).getDay() // 获取第一天是周几
      let days = []
      for (let i = 0; i < firstDay; i++) {
        days.push({'value': '', 'disable': false, 'name': ''})
      }
      let data = {'year': year, 'month': monthCN, days: days, maxDay: maxDay}
      for (let j = 1; j < maxDay+1; j++) {
        let value = `${year}/${month+1}/${j}`
        let days = {
          'value': value,
          'disable': false,
          'name': j
        }
        if (this.properties.disabled.indexOf(value) !== -1 || new Date().getTime() > new Date(value).getTime()) {
          days.disable = true
        }
        data.days.push(days)
      }
      dataList.push(data)
    }
    this.setData({
      dataList: dataList
    })
  },
  methods: {
  }
})
