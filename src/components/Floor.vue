<template>
  <div class="floor">
    <div class="bottom1">
      <div class="main">
        <img src="@/assets/tengfa.png" alt="" />
        <div class="line"></div>
        <div class="text">真实车源</div>

        <template v-for="(item, index) in navList" :key="index">
          <router-link :to="item.path" active-class="right-active">{{
            item.text
          }}</router-link>
        </template>
      </div>
    </div>
    <div class="bottom2">
      <div class="main">
        <div class="top">
          <div class="left">
            <div>咨询电话：400-0606-777</div>
            <div>营业时间：周一至周日 早 8:00 - 晚 12:00</div>
          </div>
          <ul class="right">
            <li class="item" v-for="(item, index) in codeList" :key="index">
              <img :src="item.path" alt="" />
              <div>{{ item.title }}</div>
              <div>{{ item.text }}</div>
            </li>
          </ul>
        </div>

        <div class="bottom">
          <div>
            腾发二手车以二手车销售、新车销售、汽车分期、汽车保险、维修保养、汽车改装、汽车收购置换为主营业务，是集实体与线上为一体的综合性购车用车销售服务平台。
          </div>
          <div>
            门店地址：【国基路店】郑州市花园路与国基路交汇处西南角
            【天伦路店】郑州市花园路与天伦路交汇处向东50米路南
          </div>
          <div>
            腾发二手车目前营业面积3万余平实体展厅，近5000平独立的售后服务中心，3000余台的常态库存涵盖各种国际品牌名车。全国二手车经营示范基地，百万车主信赖之选！
          </div>
        </div>
      </div>
    </div>
    <div class="bottom3">
      <div class="main">
        <div class="bq">
          Copyright © 2014 - 2021 All Rights Reserved 版权所有 豫ICP备14025595号
        </div>

        <div class="imgs">
          <img src="@/assets/cert_01.jpg" alt="" />
          <img src="@/assets/cert_02.jpg" alt="" />
          <img src="@/assets/cert_03.jpg" alt="" />
          <img src="@/assets/cert_04.jpg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let navList = ref([
      {
        text: "二手车",
        path: "/usedcar",
      },
      {
        text: "新闻资讯",
        path: "",
      },
      {
        text: "常见问题",
        path: "",
      },
    ]);

    let codeList = ref([
      {
        title: "关注腾发名车",
        text: "微信公众号",
        path: require("@/assets/149815731972734978.jpg"),
      },
      {
        title: "扫码打开小程序",
        text: "关注更多信息",
        path: require("@/assets/149815731972734976.jpg"),
      },
      {
        title: "下载app",
        text: "关注更多信息",
        path: require("@/assets/149815731972734977.jpg"),
      },
    ]);

    return {
      navList,
      codeList,
    };
  },
};
</script>

<style lang="scss" scoped>
.floor {
  .bottom1 {
    background-color: #242632;
    .main {
      height: 70px;
      width: 1200px;
      margin: 0 auto;

      display: flex;
      align-items: center;

      img {
        width: 70px;
        height: 28px;
      }
      .line {
        width: 1px;
        height: 21px;
        background: #dee3ec;
        margin: 0 8px;
      }
      .text {
        font-size: 12px;
        line-height: 12px;
        color: #dee3ec;
        margin-right: 277px;
      }
      a {
        margin-right: 50px;
        color: #f9f9f9;
        line-height: 20px;
        font-size: 14px;
        text-decoration: none;
      }
    }
  }
  .bottom2 {
    background-color: #2a2c37;
    .main {
      height: 350px;
      width: 1200px;
      margin: 0 auto;
      color: #d4d4d4;
      .top {
        padding-top: 20px;
        padding-bottom: 60px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          font-size: 14px;
          div {
            margin-bottom: 14px;
          }
        }

        ul {
          list-style: none;
          display: flex;
          li {
            width: 88px;
            margin-left: 40px;
            img {
              width: 100%;
              border-radius: 5px;
            }
            div {
              font-size: 12px;
              text-align: center;
            }
          }
        }
      }
      .bottom {
        font-size: 14px;
        color: #d4d4d4;
        div {
          text-align: center;
          margin: 0 25px 14px 25px;
        }
      }
    }
  }
  .bottom3 {
    background-color: #242632;
    .main {
      width: 1200px;
      margin: 0 auto;
      height: 112px;

      .bq {
        padding: 20px 0;
        text-align: center;
        color: #d4d4d4;
        font-size: 14px;
      }
      .imgs {
        font-size: 0;
        text-align: center;
        img {
          height: 36px;
          margin-right: 20px;
        }
        img:nth-of-type(4) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>