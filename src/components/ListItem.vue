<template>
  <div class="item">
    <div class="img">
      <img :src="item.cover" alt="" />
      <span :style="{ background: typeCss }" class="item-type">{{
        typeText
      }}</span>
    </div>

    <div class="info">
      <div class="title">{{ item.carName }}</div>
      <div class="time">{{ data }}/{{ item.mileage }}万公里</div>
      <div class="price">{{ item.currentPrice }}万</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { computed } from "vue";
export default {
  props: ["item"],
  setup(props) {
    // console.log(props.item);
    let data = computed(() => {
      let data = new Date(props.item.dateOfRegistration);
      let year = data.getFullYear();
      let month = data.getMonth() + 1;
      return year + "年" + (month < 10 ? "0" + month : month) + "月";
    });

    let typeCss = ref("");
    let typeText = ref("");
    
    switch (props.item.saleType) {
      case 2:
        typeText.value = "限时特惠";
        typeCss.value = "linear-gradient(90deg, #ff1766 0%, #ff2a23 100%)";
        break;
      case 0:
        typeText.value = "腾发自营";
        typeCss.value = "linear-gradient(90deg, #FF8856 0%, #FF4725 100%)";
        break;
      case 1:
        typeText.value = "腾发自营";
        typeCss.value = "linear-gradient(90deg, #FF8856 0%, #FF4725 100%)";
        break;
      default:
        break;
    }

    return {
      data,
      typeCss,
      typeText,
    };
  },
};
</script>

<style lang="scss" scoped>
.item {
  width: 275px;
  height: 358px;
  background-color: #ffffff;
  border-radius: 8px;

  margin-bottom: 30px;

  .img {
    font-size: 0;
    position: relative;
    img {
      height: 208px;
      width: 100%;
      border-radius: 8px 8px 0 0;
    }
    .item-type {
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: center;
      line-height: 20px;
      color: #ffffff;
      font-size: 12px;
      width: 64px;
      height: 20px;
      border-radius: 0px 4px 4px 0px;
    }
  }

  .info {
    margin: 20px 0 0 10px;
    .title {
      width: 257px;
      font-size: 18px;
      color: #333;
      line-height: 26px;
      font-weight: 600;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-bottom: 10px;
    }
    .time {
      font-size: 14px;
      color: #999999;
      line-height: 20px;
      margin-bottom: 20px;
    }
    .price {
      color: #e73424;
      font-size: 18px;
      font-weight: 600;
      line-height: 24px;
    }
  }
}

.item:hover {
  box-shadow: 0 0 5px 5px #ccc;
  .info {
    .title {
      color: #5685fe;
    }
  }
}
</style>