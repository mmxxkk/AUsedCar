import axios from "@/request/http"

/**
* 获取车型
*/
export function getModel() {
    return axios({
        method: "get",
        url: "/api/tfcar/car/model",
    })
};
/**
* 更多
*/
export function getMoreScreen() {
    return axios({
        method: "get",
        url: "/api/tfcar/car/moreScreen",
    })
};

/**
* 车价
*/
export function getPrice() {
    return axios({
        method: "get",
        url: "/api/tfcar/car/price",
    })
};

/**
* 车标
*/
export function getBrand() {
    return axios({
        method: "get",
        url: "/api/tfcar/car/brand300",
    })
};

/**
* 推荐
*/
export function getCustomSeries() {
    return axios({
        method: "get",
        url: "/api/tfcar/car/customSeries",
    })
};
/**
* 列表
*/
export function getList(data) {
    return axios({
        method: "get",
        url: "/api/tfcar/car/list",
        params: data
    })
};

/**
* 车系
*/
export function getCarSeries(val) {
    return axios({
        method: "get",
        url: `/api/tfcar/car/series300?brandId=${val}`,
    })
};

export default {
    getModel,
    getMoreScreen,
    getPrice,
    getBrand,
    getCustomSeries,
    getList,
    getCarSeries
}