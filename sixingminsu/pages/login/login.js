import api from '../../api/index'
import ajax from '../../api/ajax'

const app = getApp()

Page({
  data: {
    username: '',
    password: ''
  },
  setUsername: function(e) {
    this.setData({
      username: e.detail.value
    })
  },
  setPassword: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  toLogin: function() {
    let username = this.data.username
    let password = this. data.password

    if (!username) {
      wx.showToast({
        title: '账号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false
    }

    if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false
    }

    ajax({
      url: api.login,
      method: 'POST',
      data: {
        open_id: app.globalData.openId,
        mini_key: app.globalData.mini_key,
        account: username,
        password: password
      },
      success: res => {
        app.globalData.token = res.data.data.master_user_token

        wx.redirectTo({
          url: '../index/index'
        })
      }
    })
  }
})
