import axios from "@/request/http"

/**
* 获取选项导航
*/
export function getTab() {
    return axios({
        method: "get",
        url: "/api/tfcar/car/convenient",
    })
};
/**
* 获取二手车列表
*/
export function getUsedCarList() {
    return axios({
        method: "get",
        url: "/api/tfcar/car/list",
    })
};
/**
* 获取首页新闻列表
*/
export function getNewsList() {
    return axios({
        method: "get",
        url: "/api/tfcar/website/indexNews",
    })
};


export default {
    getTab,
    getUsedCarList,
    getNewsList
}

