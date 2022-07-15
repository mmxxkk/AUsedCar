<template>
  <div>
    <Nav></Nav>

    <div class="box">
      <div class="body-bg"></div>

      <div class="body-search">
        <div class="search">
          <div class="search-gd">腾发二手车</div>
          <img class="body-car-img" src="@/assets/卖车的好处.png" alt="" />
          <div class="search-sr">
            <input type="text" placeholder="搜索品牌、车型" />
            <button>搜索</button>
          </div>

          <div class="buy-sell">
            <div class="buy">
              <div class="title">
                <div class="line"></div>
                <div class="text">我要买车</div>
              </div>

              <div class="buy-main">
                <div class="item">
                  <div
                    class="Brands"
                    v-for="item in Brands"
                    :key="item.sortValue"
                  >
                    <img :src="item.logo" alt="" />
                    <span>{{ item.label }}</span>
                  </div>
                </div>
                <div class="item">
                  <div
                    class="price"
                    v-for="item in Prices"
                    :key="item.sortValue"
                  >
                    {{ item.label }}
                  </div>
                </div>
                <div class="item">
                  <div
                    class="price"
                    v-for="item in Models"
                    :key="item.sortValue"
                  >
                    {{ item.label }}
                  </div>
                </div>
              </div>
            </div>
            <div class="sell">
              <div class="title">
                <div class="line"></div>
                <div class="text">我要卖车</div>
              </div>

              <div class="sell-main">
                <div class="sell-left">
                  <div class="container-input">
                    <input type="text" placeholder="请输入手机号" />
                    <button>立即估值</button>
                  </div>

                  <div class="container-gz">
                    <div class="gz-link">
                      <img
                        src="https://www.tf2sc.cn/static/img/%E4%B8%8A%E9%97%A8%E6%9C%8D%E5%8A%A1.png"
                        alt=""
                      />
                      <span>全国代购</span>
                    </div>
                    <div class="gz-line"></div>
                    <div class="gz-link">
                      <img
                        src="https://www.tf2sc.cn/static/img/%E5%88%B0%E5%BA%97%E4%BC%B0%E5%80%BC.png"
                        alt=""
                      />
                      <span>到店估值</span>
                    </div>
                  </div>
                </div>
                <div class="sell-right">
                  <img src="@/assets/我要卖车.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="body-car">
        <div class="car-list">
          <!-- 二手车 -->
          <div class="list-title">
            <div class="list-left">
              <div class="line"></div>
              <div class="text">二手车</div>
            </div>
            <div class="list-left">
              <span>查看更多</span>
              <img
                src="https://www.tf2sc.cn/static/img/icon_%E6%9B%B4%E5%A4%9A.png"
                alt=""
              />
            </div>
          </div>

          <div class="list">
            <template v-for="item in content" :key="item.ind">
              <ListItem :item="item"></ListItem>
            </template>
          </div>

          <!-- 新闻 -->
          <div class="list-title">
            <div class="list-left">
              <div class="line"></div>
              <div class="text">新闻资讯</div>
            </div>
            <div class="list-left">
              <span>查看更多</span>
              <img
                src="https://www.tf2sc.cn/static/img/icon_%E6%9B%B4%E5%A4%9A.png"
                alt=""
              />
            </div>
          </div>

          <div class="news-list">
            <template
              v-for="item in newsList.filter((it, i) => i < 2)"
              :key="item.id"
            >
              <newsItem :item="item"></newsItem>
            </template>
          </div>
        </div>
      </div>
    </div>

    <Floor></Floor>
  </div>
</template>

<script>
import { ref } from "vue";
import { getUsedCarList, getTab, getNewsList } from "@/api/list";
import Nav from "@/components/Nav.vue";
import Floor from "@/components/Floor.vue";
import ListItem from "@/components/ListItem.vue";
import newsItem from "@/components/newsItem.vue";
export default {
  components: {
    Nav,
    Floor,
    ListItem,
    newsItem,
  },
  setup() {
    let Brands = ref([]);
    let Models = ref([]);
    let Prices = ref([]);

    getTab().then((res) => {
      Brands.value = res.data.data.convenientBrands;
      Models.value = res.data.data.convenientModels;
      Prices.value = res.data.data.convenientPrices;
    });

    let content = ref([]);
    getUsedCarList().then((res) => {
      // console.log(res.data.data);
      content.value = res.data.data.content;
    });

    let newsList = ref([]);
    getNewsList().then((res) => {
      // console.log(res.data.data);
      newsList.value = res.data.data;
    });

    return {
      Brands,
      Models,
      Prices,
      content,
      newsList,
    };
  },
};
</script>


<style lang="scss" scoped>
.box {
  position: relative;
  .body-bg {
    height: 300px;
    background: url("@/assets/蓝色背景.png") no-repeat;
    background-position: 50%;
  }
  .body-search {
    position: absolute;
    z-index: 1;
    top: 73px;
    width: 100%;
    .search {
      position: relative;

      width: 1200px;
      margin: 0 auto;

      .search-gd {
        line-height: 50px;
        font-size: 40px;
        color: #f5cc4f;
        margin-bottom: 20px;
      }

      .search-sr {
        height: 56px;
        margin-bottom: 50px;

        display: flex;
        align-items: center;

        input {
          height: 100%;
          width: 490px;
          font-size: 18px;
          padding-left: 20px;
          border-radius: 8px 0px 0px 8px;
          border: 1px solid #f0f0f0;
          outline: none;
        }
        button {
          width: 116px;
          height: 100%;
          font-size: 18px;
          background: #5685fe;
          border-radius: 0px 8px 8px 0px;
          border: 1px solid #f0f0f0;
          color: #ffffff;
          cursor: pointer;
        }
      }

      .body-car-img {
        position: absolute;
        top: -24px;
        right: -28px;
        width: 420px;
        height: 229px;
        z-index: 3;
      }

      .buy-sell {
        width: 100%;
        height: 300px;
        padding-top: 50px;

        background: #ffffff;
        box-shadow: 0px 2px 20px 0px rgb(170 170 216 / 40%);
        border-radius: 14px;

        display: flex;
        justify-content: space-between;

        .title {
          display: flex;
          align-items: center;
          .line {
            width: 10px;
            height: 30px;
            background: #5685fe;
          }
          .text {
            line-height: 32px;
            font-weight: 600;
            font-size: 24px;
            margin-left: 20px;
          }
        }

        .buy {
          width: 535px;
          .buy-main {
            margin-left: 40px;
            font-size: 14px;
            margin-top: 30px;
            color: #333;

            .item {
              margin-bottom: 30px;
              display: flex;

              .Brands {
                margin-right: 30px;
                display: flex;
                align-items: center;
                img {
                  width: 29px;
                  height: 30px;
                  margin-right: 12px;
                }
              }

              .price {
                width: 90px;
                height: 34px;
                background: #f5f7fe;
                border-radius: 17px;
                line-height: 34px;
                text-align: center;
                margin-right: 15px;
              }
            }
          }
        }
        .sell {
          width: 586px;
          .sell-main {
            margin-left: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .sell-left {
              .container-input {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 40px;
                width: 330px;

                margin-bottom: 40px;
                padding-left: 20px;
                border: 1px solid #f0f0f0;
                border-radius: 8px;

                input {
                  width: 200px;
                  height: 100%;
                  border: none;
                  outline: none;
                }
                button {
                  width: 96px;
                  height: 40px;
                  background: #5685fe;
                  border: 1px solid #f0f0f0;
                  border-radius: 0px 8px 8px 0px;
                  color: #ffffff;
                }
              }
              .container-gz {
                width: 330px;
                height: 56px;
                background: #ffffff;
                box-shadow: 0px 1px 10px 0px rgb(170 170 216 / 40%);
                border-radius: 7px;
                display: flex;
                align-items: center;
                .gz-line {
                  width: 1px;
                  height: 29px;
                  background: #d8e3ff;
                }
                .gz-link {
                  width: 164px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  img {
                    width: 20px;
                    height: 20px;
                    margin-right: 4px;
                  }
                }
              }
            }
            .sell-right {
              font-size: 0;
            }
          }
        }
      }
    }
  }

  .body-car {
    padding-top: 320px;
    background: #f9f9f9;
    .car-list {
      width: 1200px;
      margin: 0 auto;

      .list-title {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .list-left {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #666;

          .line {
            width: 10px;
            height: 30px;
            background: #5685fe;
          }
          .text {
            font-size: 24px;
            line-height: 32px;
            font-weight: 600;
            margin-left: 20px;
          }
          img {
            width: 17px;
            height: 17px;
          }
        }
      }

      .list {
        padding: 30px 0 70px 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .news-list {
        padding: 30px 0 70px 0;
        display: flex;
      }
    }
  }
}
</style>