//logs.js
const util = require("../../utils/util.js");
import request from "../../common/request";

Page({
  data: {
    movieId: -1,
    movieDetail: {}
  },
  onLoad: function(option) {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })

    this.setData({
      movieId: parseInt(option.id)
    });
    this.getMovieDetail()
      .then(res => {
        console.log(res);
        this.setData({
          movieDetail: {...res}
        })
      })
      .catch(err => {
        console.log(err);
      });
  },

  // 获取影片详情
  getMovieDetail: function() {
    const locationId = wx.getStorageSync("locationId");

    return new Promise((resolve, reject) => {
      request
        .get(`/movie/detail.api`, { locationId, movieId: this.data.movieId })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    });
  },
  //
  goOpenUrl: function() {
    wx.navigateTo({
      url: "http://vfx.mtime.cn/Video/2019/04/03/mp4/190403103412401676.mp4"
    })
  }
});