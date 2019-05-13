//logs.js
const util = require("../../utils/util.js");
import request from "../../common/request";

Page({
  data: {
    movieId: -1,
    movieDetail: {}, // 影片详情
    movieActors: {},

    commentPageIndex: 1, // 评论的页数
    comment: {}
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
          movieDetail: { ...res }
        });
      })
      .catch(err => {
        console.log(err);
      });

    this.getHotComments()
      .then(res => {
        console.log(res);
        this.setData({
          comment: { ...res }
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      commentPageIndex: ++this.data.commentPageIndex
    });
    if (this.data.comment.comments.length < this.data.comment.totalCount) {
      this.getHotComments()
      .then(res => {
        let arr = [...this.data.comment.comments, ...res.comments];
        this.setData({
          comment: {
            comments: [...arr],
            totalCount: this.data.comment.totalCount
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      wx.showToast({
        title: '没有更多了。。。',
        icon: 'none'
      })
    }
  },
  /**
   * 获取影片详情
   */
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

  /**
   * 前往演职员表
   */
  goToCast: function() {},

  /**
   * 精选评论
   */
  getHotComments: function() {
    return new Promise((resolve, reject) => {
      request
        .get(`/Movie/HotLongComments.api`, {
          pageIndex: this.data.commentPageIndex,
          movieId: this.data.movieId
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
});
