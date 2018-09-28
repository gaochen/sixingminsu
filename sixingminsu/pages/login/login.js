import api from '../../api/index'
import ajax from '../../api/ajax'

const app = getApp()

Page({
    data: {
        username: '',
        password: '',
        checked: true
    },
    onLoad: function() {
        // wx.getStorage({
        //   key: 'token',
        //   success: function(res) {
        //     console.log('token:' + res.data)
        //     app.globalData.token = res.data
        //     wx.redirectTo({
        //       url: '../index/index'
        //     })
        //   }
        // })
    },
    change: function(e) {
        let checked = this.data.checked
        checked = !checked
        this.setData({
            checked: checked
        })
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
        let password = this.data.password
        let checked = this.data.checked

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

        if (!checked) {
            wx.showToast({
                title: '请先阅读并同意《服务协议》',
                icon: 'none',
                duration: 1000
            })
            return false
        }

        // 登录验证
        const DB = wx.cloud.database()
        const USER = DB.collection('user')

        USER.where({
            username: username
        })
            .get()
            .then(res => {
                console.log(res)
                if (res.data.length > 0) {
                    if (res.data[0].password === password) {
                        app.globalData.userId = res.data[0]._id
                        wx.redirectTo({
                            url: '../index/index'
                        })
                    } else {
                        wx.showModal({
                            title: '提示',
                            content: '密码输入错误',
                            showCancel: false
                        })
                    }
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '用户名无效',
                        showCancel: false
                    })
                }
            })
            .catch(error => {
                wx.showToast({
                    icon: 'none',
                    duration: 3000,
                    title: error
                })
            })

        // ajax({
        //   url: api.login,
        //   method: 'POST',
        //   data: {
        //     open_id: app.globalData.openId,
        //     mini_key: app.globalData.mini_key,
        //     account: username,
        //     password: password
        //   },
        //   success: res => {
        //     wx.setStorage({
        //       key: "token",
        //       data: res.data.data.master_user_token
        //     })
        //     app.globalData.token = res.data.data.master_user_token

        //     wx.redirectTo({
        //       url: '../index/index'
        //     })
        //   }
        // })
    }
})
