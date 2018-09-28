import api from '../../api/index'
import ajax from '../../api/ajax'

const app = getApp()

Page({
    data: {
        disabled: [], // 屏蔽的时间
        length: 3,
        dataList: [],
        selected: {},
        houseId: null,
        globalValue: [] // 存储在storage里面
    },
    toSync: function() {
        wx.showToast({
            icon: 'none',
            duration: 1500,
            title: '暂无该功能'
        })
    },
    toEdit: function() {
        let globalValue = this.data.globalValue
        if (globalValue.length === 0) {
            wx.showToast({
                title: '请先选择日期',
                icon: 'none',
                duration: 1000
            })
        } else {
            wx.navigateTo({
                url: '../edit/edit?id=' + this.data.houseId
            })
        }
    },
    onLoad: function(option) {
        // 获取房间id
        this.setData({
            houseId: option.id
        })
    },
    onReady: function(option) {},
    clickDate: function(e) {
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

        // 获取屏蔽的时间
        const DB = wx.cloud.database()
        const DATE = DB.collection('date')

        DATE.where({
            userId: app.globalData.userId,
            roomId: this.data.houseId
        })
            .get()
            .then(res => {
                console.log(res)
                let dataList = []
                let currentYear = new Date().getFullYear()
                let currentMonth = new Date().getMonth()
                let disabled = res.data[0].disabled

                for (let i = 0; i < this.data.length; i++) {
                    let year = new Date(
                        currentYear,
                        currentMonth + i
                    ).getFullYear() // 获取当前年份
                    let month = new Date(
                        currentYear,
                        currentMonth + i
                    ).getMonth() // 获取当前月份
                    let monthCN = [
                        '一',
                        '二',
                        '三',
                        '四',
                        '五',
                        '六',
                        '七',
                        '八',
                        '九',
                        '十',
                        '十一',
                        '十二'
                    ][month] // 月份转化为中文
                    let maxDay = new Date(year, month + 1, 0).getDate() // 日期传0，则获取上一月最后一天
                    let firstDay = new Date(year, month, 1).getDay() // 获取第一天是周几
                    let days = []
                    for (let i = 0; i < firstDay; i++) {
                        days.push({
                            value: '',
                            disable: false,
                            name: '',
                            overdue: true
                        }) // 空白格用overdue来屏蔽点击事件
                    }
                    let data = {
                        year: year,
                        month: month + 1,
                        monthCN: monthCN,
                        days: days,
                        maxDay: maxDay
                    }
                    for (let j = 1; j < maxDay + 1; j++) {
                        let value = `${year}/${('0' + (month + 1)).slice(
                            -2
                        )}/${('0' + j).slice(-2)}`
                        let day = {
                            value: value,
                            disable: false, // 判断是否被屏蔽
                            name: j,
                            overdue: false // 判断是否已过期
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
            })
            .catch(error => {
                wx.showToast({
                    icon: 'none',
                    duration: 3000,
                    title: error
                })
            })
    }
})
