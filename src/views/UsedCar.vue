<template>
  <div>
    <Nav></Nav>
    <div class="box">
      <div class="main">
        <!-- 搜索 -->
        <div class="buy-search">
          <input type="text" placeholder="搜索品牌、车型" />
          <button>搜索</button>
        </div>

        <div class="buy-sift">
          <div class="buy-sift-div">
            <div>品牌：</div>
            <div
              class="item"
              @click="onBrand({ id: '' })"
              :class="{
                'sift-div-checked': '' === $store.state.brand.id,
              }"
            >
              不限
            </div>
            <template v-for="item in recommend" :key="item.id">
              <div
                class="item"
                @click="onBrand(item)"
                :class="{
                  'sift-div-checked': item.id === $store.state.brand.id,
                }"
              >
                {{ item.brand }}
              </div>
            </template>
          </div>

          <div class="buy-sift-div">
            <div class="text">车系：</div>
            <div class="series-list">
              <div
                class="item"
                @click="onSerie({ id: '' })"
                :class="{
                  'sift-div-checked': '' === $store.state.serie.id,
                }"
              >
                不限
              </div>

              <template v-for="item in carSerieList" :key="item.id">
                <div
                  class="item"
                  @click="onSerie(item)"
                  :class="{
                    'sift-div-checked': item.id === $store.state.serie.id,
                  }"
                >
                  {{ item.series }}
                </div>
              </template>
            </div>
          </div>

          <div class="buy-sift-div">
            <div>车型：</div>
            <div
              class="item"
              @click="onModel({ id: '' })"
              :class="{
                'sift-div-checked': '' === $store.state.model.id,
              }"
            >
              不限
            </div>

            <template v-for="item in carModel" :key="item.id">
              <div
                class="item"
                @click="onModel(item)"
                :class="{
                  'sift-div-checked': item.id === $store.state.model.id,
                }"
              >
                {{ item.model }}
              </div>
            </template>
          </div>

          <div class="buy-sift-div">
            <div>价格：</div>
            <div
              class="item"
              @click="onPrice({ sortValue: '' })"
              :class="{
                'sift-div-checked': '' === $store.state.price.sortValue,
              }"
            >
              不限
            </div>
            <template v-for="item in priceOfTheCar" :key="item.sortValue">
              <div
                class="item"
                @click="onPrice(item)"
                :class="{
                  'sift-div-checked':
                    item.sortValue === $store.state.price.sortValue,
                }"
              >
                {{ item.label }}
              </div>
            </template>
          </div>

          <div class="buy-sift-div">
            <div>更多：</div>

            <div
              class="select"
              v-for="(item, index) in moreScreen"
              :key="index"
            >
              <span> {{ $store.state.screen[index].label }} </span>
              <i></i>
              <div class="select-list">
                <div
                  class="option"
                  :class="{
                    active: -1 === $store.state.screen[index].sortValue,
                  }"
                  @click="onScreen(index)"
                >
                  不限
                </div>
                <div
                  v-for="it in item"
                  :key="it.sortValue"
                  class="option"
                  :class="{
                    active:
                      it.sortValue === $store.state.screen[index].sortValue,
                  }"
                  @click="onScreen(index, it)"
                >
                  {{ it.label }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="sift-num"></div>

        <div class="sift-list">
          <div class="sift-car-top">
            <div class="car-top-left">
              <div
                class="item"
                :class="{ active: -1 == sale_type }"
                @click="getType({ saleType: -1 })"
              >
                全部
              </div>
              <div
                class="item"
                :class="{ active: 0 == sale_type }"
                @click="getType({ saleType: 0 })"
              >
                腾发自营
              </div>
              <div
                class="item"
                :class="{ active: 1 == sale_type }"
                @click="getType({ saleType: 1 })"
              >
                车主直售
              </div>
              <div
                class="item"
                :class="{ active: 2 == sale_type }"
                @click="getType({ saleType: 2 })"
              >
                限时秒杀
              </div>
              <div
                class="item"
                :class="{ active: 3 == sale_type }"
                @click="getType({ saleType: 3 })"
              >
                严选车源
              </div>
            </div>
            <div class="car-top-right">
              <div class="item active">默认排序</div>
              <span></span>
              <div class="item">最新发布</div>
              <span></span>
              <div class="item">价格最高</div>
              <span></span>
              <div class="item">价格最低</div>
            </div>
          </div>
          <div class="sift-car-body">
            <template v-for="item in list" :key="item.ind">
              <ListItem :item="item"></ListItem>
            </template>
          </div>
          <div class="sift-car-fy">
            <span class="total">共{{ total }}条</span>
            <el-pagination
              prev-text="上一页"
              next-text="下一页"
              v-model:currentPage="page"
              :page-size="40"
              layout="prev, pager, next,
            jumper"
              :total="total"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </div>
    <Floor></Floor>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";
import Nav from "@/components/Nav.vue";
import ListItem from "@/components/ListItem.vue";
import Floor from "@/components/Floor.vue";

import {
  getCustomSeries,
  getModel,
  getPrice,
  getMoreScreen,
  getList,
  getCarSeries,
} from "@/api/usedcar";

let router = useRouter();
let route = useRoute();
let store = useStore();

const page = ref(1);
const total = ref(0);
let list = ref([]);

let getlist = (data) => {
  getList(data).then((res) => {
    // console.log(res.data);
    list.value = res.data.data.content;
    total.value = res.data.data.totalElements;
  });
};

/**
 * 全部
 *
 * */
getlist({
  page: page.value,
  carSeries: store.state.serie.id,
  carBrand: store.state.brand.id,
  carModel: store.state.model.id,
});

let carSerieList = ref([]);
let getCarSerie = (id) => {
  getCarSeries(id).then((res) => {
    if (res.data.success) {
      carSerieList.value = res.data.data.content;
    } else {
      carSerieList.value = [];
    }
  });
};

let sale_type = ref(-1);
let getType = ({ saleType }) => {
  sale_type.value = saleType;
  if (saleType == -1) {
    getlist({
      page: page.value,
    });
  } else {
    getlist({
      page: page.value,
      saleType,
    });
  }
};

//获取车系
let onSerie = (item) => {
  store.commit("setModel", { id: "" });
  store.commit("setPrice", { sortValue: "" });
  store.commit("setScreen");

  /**
   *
   *
   * */
  store.commit("setSerie", item);
  getlist({
    page: page.value,
    carBrand: store.state.brand.id,
    carSeries: item.id,
  });
};

getCarSerie(store.state.brand.id);

//推荐
let onBrand = (item) => {
  onSerie({ id: "" });
  /**
   *
   *
   * */
  store.commit("setBrand", item);
  getCarSerie(item.id);
  getlist({
    page: page.value,
    carBrand: item.id,
  });
};

let recommend = ref([]);
getCustomSeries().then((res) => {
  recommend.value = res.data.data[0].brands;
});

// 车型
let onModel = (item) => {
  /**
   *
   *
   * */
  store.commit("setModel", item);
  getlist({
    page: page.value,
    carSeries: store.state.serie.id,
    carBrand: store.state.brand.id,
    carModel: item.id,
  });
};

let carModel = ref([]);
getModel().then((res) => {
  carModel.value = res.data.data.content;
});

// 价格
let onPrice = (item) => {
  store.commit("setPrice", item);
};

let priceOfTheCar = ref([]);
getPrice().then((res) => {
  priceOfTheCar.value = res.data.data;
});

let onScreen = (index, item) => {
  store.commit("setScreen", {
    item,
    index,
  });
};

let moreScreen = ref([]);
getMoreScreen().then((res) => {
  let obj = res.data.data;
  let arr = [];
  for (const key in obj) {
    arr.push({
      label: obj[key][0].attrZh,
      sortValue: -1,
    });
    moreScreen.value.push(obj[key]);
  }
  store.commit("initscreenlist", arr);
});

const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`);
};
</script>


<style lang="scss" scoped>
.box {
  width: 100%;
  padding-top: 38px;
  background-color: #f9f9f9;
  .main {
    width: 1200px;
    margin: 0 auto;

    // 搜索
    .buy-search {
      width: 880px;
      height: 40px;

      background: #ffffff;
      border-radius: 8px;
      border: 1px solid #f0f0f0;
      padding-left: 20px;
      font-size: 14px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      input {
        height: 100%;
        width: 750px;
        line-height: 20px;
        border: none;
        outline: none;
      }
      button {
        width: 96px;
        height: 40px;
        background: #5685fe;
        box-sizing: border-box;
        border-radius: 0px 8px 8px 0px;
        border: 1px solid #f0f0f0;
        color: #ffffff;
      }
    }

    .buy-sift {
      padding: 20px;
      background: #ffffff;
      margin-top: 20px;

      font-size: 14px;
      color: #333;

      .buy-sift-div {
        display: flex;
        margin-top: 30px;

        .sift-div-checked {
          color: #ffffff;
          background-color: #5685fe;
        }
        .text {
          min-width: 42px;
        }
        .series-list {
          width: 1030px;
          display: flex;
          flex-wrap: wrap;
          .item {
            margin-bottom: 30px;
          }
        }
        .item {
          margin-left: 20px;
          padding: 0 10px;
          line-height: 20px;
          height: 20px;
        }

        .select {
          width: 116px;
          height: 40px;
          border-radius: 4px;
          border: 1px solid #f0f0f0;
          padding: 0 13px;
          margin-left: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;

          i {
            width: 14px;
            height: 7px;
            display: block;
            background-image: url(https://www.tf2sc.cn/static/img/icon.png);
            background-position: -6px -5px;
          }
          .select-list {
            border: 1px solid #5685fe;
            position: absolute;
            z-index: 10;
            top: 39px;
            left: -1px;
            width: 116px;
            background-color: #fff;
            display: none;
            .option {
              width: 100%;
              height: 34px;
              line-height: 34px;
              padding-left: 14px;
            }
            .option:hover {
              color: #fff;
              background-color: #5685fe;
            }
            .active {
              color: #fff;
              background-color: #5685fe;
            }
          }
        }

        .select:hover {
          border: 1px solid #5685fe;
          border-radius: 4px 4px 0 0;
          .select-list {
            display: block;
          }
        }
      }
    }

    .sift-num {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      font-size: 14px;
    }

    .sift-list {
      padding-bottom: 82px;
      .sift-car-top {
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        // align-items: center;
        justify-content: space-between;

        .car-top-left {
          display: flex;
          align-items: center;
          margin-top: 11px;
          .item {
            line-height: 32px;
            font-weight: 600;
            color: #333;
            padding-bottom: 6px;
            margin-right: 30px;
          }
          .active {
            color: #5685fe;
            border-bottom: 4px solid #5685fe;
            border-radius: 2px;
          }
        }
        .car-top-right {
          display: flex;
          align-items: center;
          background-color: #fff;
          margin-bottom: 13px;
          .item {
            text-align: center;
            width: 76px;
            padding: 10px 0;
            font-size: 14px;
            color: #333;
          }
          span {
            display: inline-block;
            width: 1px;
            height: 20px;
            background: #f0f0f0;
          }
          .active {
            color: #5685fe;
          }
        }
      }
      .sift-car-body {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-top: 30px;
      }
      .sift-car-fy {
        display: flex;
        justify-content: center;
        align-items: center;
        .total {
          display: block;
          height: 32px;
          padding: 0 6px;

          font-size: 14px;
          color: #333;
          background-color: #fff;
          margin-right: 10px;

          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
