import axios from "axios";
import { ElMessage } from 'element-plus'

// 环境的切换
// if (process.env.NODE_ENV == 'development') {
//     axios.defaults.baseURL = 'https://www.baidu.com';
// }
// else if (process.env.NODE_ENV == 'debug') {
//     axios.defaults.baseURL = 'https://www.ceshi.com';
// }
// else if (process.env.NODE_ENV == 'production') {
//     axios.defaults.baseURL = 'https://www.production.com';
// }


// 全局配置
//  同源请求会自动携带cookie，而非同源请求不会默认携带，需要设置
axios.defaults.withCredentials = true;

// 设置超时时间  单位毫秒  默认0
axios.defaults.timeout = 0;

// 给post请求设置全局的请求体   Content-Type是其中的一个请求体
// axios.defaults.headers.post["Content-Type"] = "application/json";

// axios.defaults.headers.get["PlatformType"] = "h5";
// console.log(axios.defaults.headers);


// 请求拦截器   use(请求前拦截器，请求错误拦截器)
axios.interceptors.request.use(
    (config) => {
        // console.log('请求前拦截器', config);

        // 扩展一些配置，可以给data扩展，也可以给headers扩展，建议之扩展headers get请求没有data
        // config.data.sex = "男";

        // headers值不支持中文
        config.headers.PlatformType = 'h5';

        // store.state.token && (config.headers.token = store.state.token);

        return config;
    },
    (err) => {
        return err;
    }
);

// 响应拦截器
axios.interceptors.response.use(
    (res) => {
        // 不建议进行处理，建议在axios请求成功之后，then中去处理
        return res;
    },
    (err) => {
        // err和res.data.code区分开  
        // res.data.code !== 1 情况是正常响应的，非错误。
        // err一般捕获都是服务端错误，给友好提示
        console.log('都是服务端错误', err);

        if (err.response.status == 404) {
            alert('接口找不到')
        } else if (err.response.status == 401) {
            // 没有登录
            alert('没有登录')
        } else if (err.response.status == 403) {
            // 403 token过期

            // 清除token
            // localStorage.removeItem('token');
            // store.commit('loginSuccess', null);

            // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 

        } else {
            alert(error.response.data.message)
        }

        return err.response
    }
);

export default axios;