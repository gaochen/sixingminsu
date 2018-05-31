import api from '../../api/index'
import ajax from '../../api/ajax'

const app = getApp()

Page({
  data: {
  },
  getUserInfo: function(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      ajax({
        url: api.createUser,
        method: 'POST',
        data: {
          open_id: app.globalData.openId,
          mini_key: app.globalData.mini_key,
          user_name: e.detail.userInfo.nickName,
          user_head: e.detail.userInfo.avatarUrl,
          user_sex: e.detail.userInfo.gender
        }
      })
      wx.redirectTo({
        url: '../login/login'
      })
    }
  },
  onLoad: function () {
  }
})
