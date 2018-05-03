const ajax = (options) => {
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: options.url,
      method: options.method ? options.method : 'GET',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: options.data,
      complete: () => {
        if (options.complete) {
          options.complete()
        }
      },
      success: res => {
        if (res.data.code === 200) {
          if (options.success) {
            options.success(res)
          }
          resolve(res)
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.info,
            showCancel: false
          })
        }
      },
      fail: res => {
        if (options.fail) {
          options.fail()
        } else {
          wx.showModal({
            title: '提示',
            content: '网络繁忙，请稍后重试',
            showCancel: false
          })
        }
        reject(res)
      }
    })
  })

  return promise
}

export default ajax

