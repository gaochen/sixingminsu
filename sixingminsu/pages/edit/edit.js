import api from '../../api/index'
import ajax from '../../api/ajax'

const app = getApp()

Page({
  data: {
    dateList: [],
    status: -1,
    houseId: null,
    selectDate: []
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
    // 格式化
    selectDate = selectDate.map(x => x.replace(/\//g, '-'))
    this.setData({
      selectDate: selectDate
    })
  },
  onLoad: function(option) {
    // 获取房间id
    this.setData({
      houseId: option.id
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
    if (status === 2) {
      status = -1
    } else {
      status = 2
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
      let selectDate = this.data.selectDate.join('|')
      // 提交状态，返回上一页
      ajax({
        url: api.setHouseDisableDate,
        method: 'POST',
        data: {
          master_user_token: app.globalData.token,
          house_id: this.data.houseId,
          chose_date: selectDate,
          enable: status
        },
        success: res => {
          console.log(res.data)
        }
      })

      wx.navigateBack({
        delta: 1
      })
    }
  }
})
