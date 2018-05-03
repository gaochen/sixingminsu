import api from './api/index'
import ajax from './api/ajax'

//app.js
App({
  data: {
    mini_key: 'master_dev_v1'
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          // wx.request({
          //   url: api.getUserOpenId,
          //   method: 'POST',
          //   header: {
          //     "content-type": "application/x-www-form-urlencoded"
          //   },
          //   data: {
          //     jscode: res.code,
          //     mini_key: this.globalData.mini_key
          //   },
          //   success: res => {
          //     this.globalData.openId = res.data.data.openid
          //   },
          //   fail: res => {
          //     wx.showModal({
          //       title: '提示',
          //       content: '网络繁忙，请稍后重试',
          //       showCancel: false
          //     })
          //   }
          // })
          ajax({
            url: api.getUserOpenId,
            method: 'POST',
            data: {
              jscode: res.code,
              mini_key: this.globalData.mini_key
            },
            success: res => {
              this.globalData.openId = res.data.data.openid
            }
          }).then((res) => {
            return ajax({
              url: api.isExistAppUser,
              method: 'POST',
              data: {
                open_id: this.globalData.openId,
                mini_key: this.globalData.mini_key
              }
            })
          }).then((res) => {
            if (res.data.data.is_exist === 0) {
              wx.getUserInfo({
                success: (res) => {
                  this.globalData.userInfo = res.userInfo
                  ajax({
                    url: api.createUser,
                    method: 'POST',
                    data: {
                      open_id: this.globalData.openId,
                      mini_key: this.globalData.mini_key,
                      user_name: res.userInfo.nickName,
                      user_head: res.userInfo.avatarUrl,
                      user_sex: res.userInfo.gender
                    }
                  })
                }
              })
            } else {
              console.log('当前用户已存在')
            }
          }).catch((error) => {
            console.log(error)
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    mini_key: 'master_dev_v1',
    openId: null,
    userInfo: null
  }
})