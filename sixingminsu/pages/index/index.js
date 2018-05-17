import api from '../../api/index'
import ajax from '../../api/ajax'

const app = getApp()

Page({
  data: {
    dataList: [{
      id: 1,
      name: 'ROOM1',
      long_title: '',
      cover_img_url: 'http://img1.3lian.com/2015/w7/85/d/101.jpg',
      price: ''
    },
    {
      id: 2,
      name: 'ROOM1',
      long_title: '',
      cover_img_url: 'http://img1.3lian.com/2015/w7/85/d/101.jpg',
      price: ''
    }],
    total: 0
  },
  toCalender: function(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../calender/calender?id=' + id
    })
  },
  onLoad: function () {
    // 请求房间列表
    ajax({
      url: api.houstList,
      method: 'POST',
      data: {
        master_user_token: app.globalData.token
      },
      success: res => {
        this.setData({
          dataList: res.data.data,
          total: res.data.data.length
        })
      }
    })
  }
})
