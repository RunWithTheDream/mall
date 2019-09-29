<template>
  <div class="index">
    <mt-loadmore ref="loadmore" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="isAutoFill">
        <div class="header">
          <div class="user">
            <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1569642861&di=f927111e5ad7fc57a44224eb39a66e86&src=http://b-ssl.duitang.com/uploads/item/201808/27/20180827043223_twunu.jpg" alt="">
          </div>
          <div class="search">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconsousuo"></use>
            </svg>
          </div>
        </div>
        <div class="swipe">
          <swipe :slideshow="slideshow" ></swipe>
        </div>
        <div class="content">
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <div>
                <img :src="item.img" alt="">
              </div>
              <div class="label">
                <div>{{item.name}}</div>
                <div>{{item.content}}</div>
                <div>¥{{item.price}}</div>
              </div>
            </li>
          </ul>
        </div>
    </mt-loadmore>
  </div>
</template>

<script>
import swipe from '../swipe/swipe'
import { MessageBox } from 'mint-ui'

export default {
  data () {
    return {
      allLoaded: false, // 判断数据是否加载完毕
      page: 1, // 页码
      list: [], // 列表数据存放
      isAutoFill: false, // loadmore是否初始化加载
      slideshow: [] // 存放swipe组件的轮播图
    }
  },
  created () {
    this.getInitList()
    this.getSlideShow()
  },
  methods: {
    getInitList () {
      this.$http.get('https://shiyaming1994.github.io/mi/static/homeGoods.json?page=' + this.page)
        .then(res => {
          this.list = res.data
        }).catch(function () {
          MessageBox('提示', '初始化首页数据接口失败，请联系系统管理员！')
        })
    },
    loadTop () {
      // 下拉加载顶部数据
      let than = this
      this.page = 1
      this.$http.get('https://shiyaming1994.github.io/mi/static/homeGoods.json?page=' + this.page)
        .then(res => {
          setTimeout(function () {
            than.list = res.data
            than.$refs.loadmore.onTopLoaded()
            than.allLoaded = false
          }, 300)
        }).catch(function () {
          MessageBox('提示', '下拉加载数据接口失败，请联系系统管理员！')
        })
    },
    loadBottom () {
      // 上拉加载底部数据
      let than = this
      than.page += 1
      this.$http.get('https://shiyaming1994.github.io/mi/static/homeGoods.json?page=' + than.page)
        .then(res => {
          setTimeout(function () {
            if (than.page === 5) {
              // 数据加载完毕
              than.allLoaded = true
            } else {
              than.list = than.list.concat(res.data)
              than.$refs.loadmore.onBottomLoaded()
            }
          }, 300)
        }).catch(function () {
          MessageBox('提示', '上拉加载获取数据接口失败，请联系系统管理员！')
        })
    },
    getSlideShow () {
      this.$http.get('https://shiyaming1994.github.io/mi/static/rotationChart.json')
        .then(res => {
          this.slideshow = res.data
        }).catch(function () {
          MessageBox('提示', '获取轮播图数据接口失败，请联系系统管理员！')
        })
    }
  },
  components: {
    swipe
  }
}
</script>

<style>
/* 设置loadmore */
.mint-loadmore-text{
  font-size: 0.3rem;
}
/* index */
.index{
  max-height: 100%;
}
/* header */
.header{
  widows: 100%;
  height: 1.3rem;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  position: relative;
}
.user{
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  margin-left: 0.4rem;
  overflow: hidden;
  font-size: 0;
}
.user img{
  width: 0.8rem;
  height: 0.8rem;
}
.search{
  width: 4.3rem;
  height: 0.5rem;
  position: absolute;
  right: 0.6rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  background-color: #fff;
  display: flex;
  align-items: center;
}
.search svg{
  width: 0.35rem;
  height: 0.35rem;
  position: absolute;
  left: 0.1rem;
}
/* 轮播图 */
.swipe{
  width: 100%;
  height: 4rem;
}
/* content */
.content{
  width: 100%;
  height: auto;
}
.content ul > li:nth-of-type(1n){
  width: 49.2%;
  float: left;
  height: auto;
}
.content ul > li:nth-of-type(2n){
  width: 49.2%;
  float: right;
  height: auto;
}
.content ul > li > div{
  width: 100%;
  height: auto;
  font-size: 0;
}
.content ul > li > div > img{
  width: 3.7rem;
  height: 3.7rem;
}
.label{
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 0.15rem 0 0 0.15rem;
}
.label div{
  width: 100%;
  height: 0.3rem;
  font-size: 0.2rem;
  text-align: left;
  padding: 0.1rem;
}
.label div:first-child{
  font-size: 0.3rem;
  height: 0.3rem;
  color: rgba(0,0,0,0.87);
}
.label div:nth-last-child(2){
  color: rgba(77, 74, 74, 0.87);
}
.label div:last-child{
  color: rgb(194, 56, 56);
}
</style>
