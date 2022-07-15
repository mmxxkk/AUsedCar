<template>
  <div class="item">
    <img :src="item.cover" alt="" />

    <div class="info">
      <div class="title">{{ item.title }}</div>
      <div class="simple">{{ item.simple }}</div>
      <div class="time">{{ data }}</div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: ["item"],
  setup(props) {
    let data = computed(() => {
      let data = new Date(props.item.utime);
      let year = data.getFullYear();
      let month = data.getMonth() + 1;
      let day = data.getDate();
      return year + "-" + (month < 10 ? "0" + month : month) + "-" + day;
    });

    return {
      data,
    };
  },
};
</script>

<style lang="scss" scoped>
.item {
  width: 380px;
  background-color: #ffffff;
  border-radius: 8px;
  margin-right: 30px;
  margin-bottom: 70px;

  img {
    height: 285px;
    width: 100%;
    border-radius: 8px;
  }

  .info {
    margin: 20px;
    .title {
      font-size: 18px;
      line-height: 26px;
      font-weight: 600;
      color: #333333;
      margin-bottom: 14px;
      height: 52px;
    }
    .time {
      color: #999999;
      font-size: 12px;
      line-height: 20px;
    }
    .simple {
      font-size: 14px;
      color: #666666;
      line-height: 20px;
      height: 40px;
      margin-bottom: 26px;
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