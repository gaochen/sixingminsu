import api from './api/index'
import ajax from './api/ajax'

//app.js
App({
  data: {
    mini_key: 'master_dev_v1'
  },
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          // 获取用户openId
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
            // 获取openId成功之后，判断该用户是否已存在
            return ajax({
              url: api.isExistAppUser,  
              method: 'POST',
              data: {
                open_id: this.globalData.openId,
                mini_key: this.globalData.mini_key
              }
            })
          }).then((res) => {
            // 如果该用户不存在小程序，则创建
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
  },
  globalData: {
    mini_key: 'master_dev_v1',
    openId: null,
    userInfo: null,
    token: null
  }
})