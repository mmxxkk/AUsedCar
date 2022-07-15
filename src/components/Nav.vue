<template>
  <div class="navigate">
    <div class="navigate-main">
      <div class="navigate-left">
        <router-link to="/" class="logo">
          <img src="@/assets/腾发.png" alt="" />
        </router-link>
        <img src="@/assets/定位.png" alt="" class="location" />
        <div @click="onOpen">{{ $store.state.address.name }}</div>
      </div>
      <div class="navigate-right">
        <template v-for="(item, index) in navList" :key="index">
          <router-link :to="item.path" active-class="right-active">{{
            item.text
          }}</router-link>
        </template>
        <div class="phone">
          咨询电话
          <span>400-0606-777</span>
        </div>
      </div>
    </div>

    <div id="mask" :style="{ display: flag ? 'block' : 'none' }">
      <div class="main">
        <div class="city-top">
          <div></div>
          <div>选择城市</div>
          <div class="city-top-close">
            <img src="https://www.tf2sc.cn/static/img/Shape.png" alt="" />
          </div>
        </div>
        <div class="city-body">
          <div class="city-code">
            <div class="item" key="#" @click="onLeftChange(0)">#</div>
            <div
              class="item"
              v-for="(item, index) in codes"
              :key="index"
              @click="onLeftChange(index + 1)"
            >
              {{ item }}
            </div>
          </div>

          <div class="city-list">
            <div :ref="setTier">
              <div class="title">#</div>
              <div class="city-item-list">
                <div class="item">
                  <span
                    :class="{ active: selectAddress.cityId == '#' }"
                    @click="onClick({ cityId: '#', name: '全国' })"
                    >全国</span
                  >
                </div>
              </div>
            </div>

            <div v-for="item in codes" :key="item" :ref="setTier">
              <div class="title">{{ item }}</div>
              <div class="city-item-list">
                <div class="item" v-for="it in adress[item]" :key="it.cityId">
                  <span
                    :class="{ active: selectAddress.cityId == it.cityId }"
                    @click="onClick(it)"
                  >
                    {{ it.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="city-bottom">
          <button @click="onenter">确定</button>
          <button @click="onclose">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import adress from "@/assets/citytest.json";
import { useStore } from "vuex";
export default {
  setup() {
    let navList = ref([
      {
        text: "首页",
        path: "/index",
      },
      {
        text: "二手车",
        path: "/usedcar",
      },
      {
        text: "新车",
        path: "/newcar",
      },
      {
        text: "卖车",
        path: "/sellcar",
      },
      {
        text: "腾发金融",
        path: "/usedfinance",
      },
      {
        text: "腾发服务",
        path: "/usedservice",
      },
    ]);

    let codes = Object.keys(adress);
    let flag = ref(false);

    let addressTier = [];
    let setTier = (el) => {
      addressTier.push(el);
    };

    let onLeftChange = (index) => {
      addressTier[index].scrollIntoView();
    };

    let store = useStore();

    let selectAddress = ref({});
    selectAddress.value = store.state.address;
    let onClick = (obj) => {
      selectAddress.value = obj;
    };

    const body = window.document.getElementsByTagName("body")[0];
    let onOpen = () => {
      body.style.overflow = "hidden";
      flag.value = true;
    };

    // 确定
    let onenter = () => {
      store.commit("setAddress", selectAddress.value);
      flag.value = false;
      body.style.overflow = "auto";
    };
    // 关闭
    let onclose = () => {
      selectAddress.value = store.state.address;
      flag.value = false;
      body.style.overflow = "auto";
    };

    return {
      navList,

      adress,
      codes,
      flag,
      onClick,
      selectAddress,
      onOpen,
      onenter,
      onclose,
      
      setTier,
      onLeftChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.navigate {
  height: 70px;
  background-color: #fff;
  .navigate-main {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    color: #333;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .navigate-left {
      display: flex;
      align-items: center;

      font-size: 14px;
      .logo {
        width: 130px;
        height: 42px;
        margin-right: 21px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .location {
        height: 14px;
        width: 14px;
        margin-right: 5px;
      }
      .address {
        cursor: pointer;
      }
    }

    .navigate-right {
      display: flex;

      .right-active {
        border-bottom: 2px solid #5685fe;
      }

      a {
        margin-right: 50px;
        padding: 12px 0;
        text-decoration: none;
        color: #333;
      }
      .phone {
        padding: 12px 0;
        span {
          color: #5685fe;
          margin-left: 4px;
        }
      }
    }
  }
}

#mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  .main {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 900px;
    height: 674px;
    background-color: #fff;
    .city-top {
      padding: 0 30px;
      height: 74px;
      font-size: 20px;
      color: #333;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .city-top-close {
        font-size: 0;
        img {
          height: 14px;
          width: 14px;
        }
      }
    }
    .city-body {
      height: 524px;
      display: flex;
      .city-code {
        width: 38px;
        height: 100%;
        padding-top: 30px;
        border-right: 1px solid #ccc;
        .item {
          font-size: 12px;
          color: #333;
          height: 20px;
          line-height: 20px;
          text-align: center;
        }
      }
      .city-list {
        height: 100%;
        overflow-y: auto;
        flex: 1;
        font-size: 14px;
        color: #333;

        .title {
          background: #eff2f9;
          padding-left: 30px;
          line-height: 24px;
          opacity: 0.5;
        }
        .city-item-list {
          padding: 14px 0 20px 0;
          display: flex;
          flex-wrap: wrap;
          .item {
            width: 205px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span {
              display: inline-block;
              padding: 7px 30px;
            }

            .active {
              color: rgb(86, 133, 254);
              background: rgb(245, 247, 254);
            }
          }
        }
      }
    }
    .city-bottom {
      height: 76px;
      display: flex;
      justify-content: center;
      align-items: center;

      // box-shadow: 0 0 5px 2px #ccc;
      button {
        width: 72px;
        height: 40px;
        background: #5685fe;
        border-radius: 4px;
        color: #ffffff;
        border: none;
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>