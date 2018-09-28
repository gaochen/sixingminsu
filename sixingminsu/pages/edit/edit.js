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
    onReady: function() {
        let selectDate = wx.getStorageSync('selectDate')
        selectDate.sort()
        let dateList = []
        selectDate.forEach(element => {
            let date = new Date(element)
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            let week = [
                '星期日',
                '星期一',
                '星期二',
                '星期三',
                '星期四',
                '星期五',
                '星期六'
            ][date.getDay()]
            dateList.push(`${year}年${month}月${day}日 ${week}`)
        })
        this.setData({
            selectDate: selectDate,
            dateList: dateList
        })
        // 格式化
        // selectDate = selectDate.map(x => x.replace(/\//g, '-'))
        // this.setData({
        //   selectDate: selectDate
        // })
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
        console.log(status)
        if (status === -1) {
            wx.showToast({
                title: '请先选择状态',
                icon: 'none',
                duration: 1000
            })
        } else {
            // 获取屏蔽的时间
            const DB = wx.cloud.database()
            const DATE = DB.collection('date')
            console.log(DATE)

            wx.showLoading()

            DATE.where({
                userId: app.globalData.userId,
                roomId: this.data.houseId
            })
                .get()
                .then(res => {
                    console.log('获取当前用户已屏蔽日期成功')
                    console.log(res)
                    let _id = res.data[0]._id
                    let disabled = res.data[0].disabled
                    let selectDate = this.data.selectDate
                    let result = []

                    if (status === 1) {
                        result = disabled.filter(item => {
                            return selectDate.indexOf(item) === -1
                        })
                        console.log(result)
                    } else if (status === 2) {
                        result = [].concat(disabled, this.data.selectDate)
                        // 去重
                        result = Array.from(new Set(result))
                        console.log(result)
                    }

                    // 调动云函数
                    wx.cloud
                        .callFunction({
                            name: 'updateDate',
                            data: {
                                _id: _id,
                                result: result
                            }
                        })
                        .then(res => {
                            wx.hideLoading()
                            console.log('调用云函数成功')
                            console.log(res)
                            wx.navigateBack({
                                delta: 1
                            })
                        })
                        .catch(error => {
                            wx.hideLoading()
                            wx.showToast({
                                icon: 'none',
                                duration: 3000,
                                title: error
                            })
                            console.log('调用云函数失败')
                            console.log(error)
                        })
                }).catch(error => {
                    wx.hideLoading()
                    wx.showToast({
                        icon: 'none',
                        duration: 3000,
                        title: error
                    })
                    console.log('获取当前用户已屏蔽日期失败')
                    console.log(error)
                })
        }
    }
})
