Component({
  properties: {
    index: Number
  },
  methods: {
    toList: function () {
      if (this.properties.index !== 0) {
        wx.redirectTo({
          url: `/pages/index/index`
        })
      }
    },
    toData: function () {
      if (this.properties.index !== 1) {
        wx.redirectTo({
          url: `/pages/data/data`
        })
      }
    },
    toClean: function () {
    },
    toDesign: function () {
    }
  }
})
