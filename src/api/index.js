import axios from 'axios'
import qs from 'qs'
import {Loading,MessageBox} from 'element-ui'
import router from '@/router'

axios.defaults.timeout = 6000;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
axios.defaults.withCredentials=true;

//  axios.defaults.baseURL = 'http://dev.sq.com:8010/pocketadmin/';  //开发地址


let loading;
let overTimeFlag=false;


axios.interceptors.request.use((config) => {
   console.log(config)
    if(config.method  === 'post' && config.data && config.data.constructor !== FormData){
        config.data = qs.stringify(config.data);
    }

    // 上传图片loading
    if(config.data && config.data.constructor === FormData){

        loading = Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
    }

    return config;
},(error) =>{
    return Promise.reject(error);
});


axios.interceptors.response.use(response => {
    //登录超时
    if(response.data.code === 3){
        if(!overTimeFlag){
            overTimeFlag=true;

            MessageBox.alert('登录超时，请重新登录','提示',{
                confirmButtonText: '确定',
                type:'warning'
            }).then(() =>{
                router.push({
                    path: "/login"
                });
                overTimeFlag=false;
            }).catch(()=>{})
        }
    }
    //如果存在loading
    if(loading){
        loading.close();
        loading="";
    }
    return response
}, error => {

    // if (err.response) {
    //     switch (err.response.status) {
    //         case 401:
    //             // 返回 401 清除token信息并跳转到登录页面
    //             store.dispatch("logout");
    //             router.replace({
    //                 path: 'login',
    //                 query: { redirect: router.history.current.fullPath }
    //             });
    //     }
    // }
    return Promise.resolve(error.response)
});


function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}

function get(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: param})
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default {

    url(){
        return axios.defaults.baseURL;
    },
    getAxios(){
        return axios;
    },
    //登录模块

    login(params){
        return post('admin/login',params); //登录
    },
    logout(params){
        return get('admin/logout',params);
    },
    getLoginInfo(params){  //是否登录
        return get('admin/getLoginInfo',params)
    },


    getUserList(params){
        return get('user/getUserList',params)
    },


    getUserAuthList(params){
        return get('user/getUserAuthList',params)
    },
    getUserAuthInfo(params){
        return get('user/getUserAuthInfo',params)
    },
    auditUser(params){
        return post('user/auditUser',params)
    },

    //用户列表
    getUserInfo(params){ //获取用户详情信息
        return post('user/getUserInfo',params)
    },
    freezeUser(params){ //冻结 启动 用户
        return post('user/freezeUser',params);
    },


    //公告
    selectAnnounce(params){  //查询公告
        return post('announcement/select',params)
    },
    insertAnnounce(params){ //新增公告
        return post('announcement/insert',params)
    },
    startAnnounce(params){ //开启公告
        return post('announcement/start',params)
    },
    endAnnounce(params){ //关闭公告
        return post('announcement/end',params)
    },
    editAnnounce(params){ //修改公告
        return post('announcement/edit',params)
    },


    getFeedbackList(params){ //获取反馈列表
        return post('feedback/getFeedbackList',params)
    },
    dealFeedbackInfo(params){ //处理反馈
        return post('feedback/dealFeedbackInfo',params)
    },


    //投诉
    getComplainList(params){ //获取投诉列表
        return post('complain/getComplainList',params);
    },
    getComplainDetailInfo(params){ //获取投诉列表详细信息
        return post('complain/getComplainDetailInfo',params);
    },
    submitComplainResult(params){ //提交投诉结果
        return post('complain/submitComplainResult',params);
    },
    getIllegalTypeList(){  //获取违规类型
        return get('illegalPunish/getIllegalTypeList')
    },
    fuzzyOperativeUser(params){  //模糊匹配（测试接口,后面需要更改）
        return post('user/getNameList',params);
    },

    //举报
    getExposeList(params){  //获取列表
        return post('exposeDisputeDeduct/getExposeList',params);
    },
    submitExposeResult(params){ //判定结果
        return post('exposeDisputeDeduct/submitExposeResult',params);
    },
    getExposeInfo(params){ //获取详情
        return post('exposeDisputeDeduct/getExposeInfo',params);
    },


    //行为分信息
    getDeductScoreList(params){
        return post('exposeDisputeDeduct/getDeductScoreList',params)
    },

    // 更换创客
    getChangeEmployeeList(params){
      return post('changeEmployee/getChangeEmployeeList',params)
    },
    // 审核原因
    sendReplyContent(params){
      return get('changeEmployee/replyContent',params)
    },
    // 新闻资讯

    getInformationTypeList(params){  //获取新闻资讯类型
        return get('information/getInformationTypeList',params);
    },
    getInformationList(params){ //获取新闻资讯
        return post('information/select',params);
    },
    insertInformation(params){ //新增 新闻资讯
        return post('information/insert',params)
    },
    startInformation(params){ //开启新闻资讯
        return post('information/start',params)
    },
    endInformation(params){ //关闭新闻资讯
        return post('information/end',params);
    },
    selectInfo(params){  //查询详细信息
        return post('information/selectInfo',params);
    },
    editInformation(params){  //修改新闻资讯
        return post('information/edit',params);
    },
    submitInformationPic(params){ //上传新闻资讯图片
        return post('information/submitInformationPic',params);
    },
    deleteInformation(params){
        return post('information/deleteInformation',params);
    },



    //首页推荐设置
    getHotRecommendList(){
        return get('recommend/getHotRecommendList')
    },
    getNewPersonRecommendList(){ //新人推荐列表
        return get('recommend/getNewPersonRecommendList')
    },
    getOperatorRecommendList(){ //运营推荐列表
        return get('recommend/getOperatorRecommendList')
    },
    updateRecommend(params){ //更新
        return post('recommend/updateRecommend',params);
    },
    deleteRecommend(params){ //删除
        return post('recommend/deleteRecommend',params);
    },
    getInfoByEmployeeId(params){ //根据uid 获取雇员新增
        return post('recommend/getInfoByEmployeeId',params);
    },
    getRecommendLogs(params){  //获取推荐记录
        return post('recommend/getRecommendLogs',params);
    },
    getBannerRecommendList(params){  //获取banner 列表
        return get('recommend/getBannerRecommendList',params);
    },
    insertBannerInfo(params){  //新增 banner 位
        return post('recommend/insertBannerInfo',params);
    },
    deleteBannerInfo(params){ //删除banner 位
        return post('recommend/deleteBannerInfo',params);
    },
    getRecommendType(){
        return get('recommend/getRecommendType');
    },
    insertDispute(params){//纠纷新增
        return post('exposeDisputeDeduct/insertDispute',params)
    },
    getDisputeList(params){ //获取纠纷列表
        return post('exposeDisputeDeduct/getDisputeList',params);
    },
    getDisputeTypeList(){ //获取纠纷类型
        return get('exposeDisputeDeduct/getDisputeTypeList');
    },
    getDisputeInfo(params){ //获取纠纷详情
        return post('exposeDisputeDeduct/getDisputeInfo',params);
    },
    submitDisputeResult(params){  //纠纷结果提交
        return post('exposeDisputeDeduct/submitDisputeResult',params);
    },
    getDisputePersonList(params){
        return get('exposeDisputeDeduct/getDisputePersonList',params);
    },

    //数据中心
    getTodayData(){  //查询今日数据
        return get('backstageData/getTodayData');
    },
    // getPicTodayData(){ //查询趋势图的今日数据
    //     return get('backstageData/getPicTodayData');
    // },
    getPicThirtyDayData(){ //趋势图 30天
        return get('backstageData/getPicThirtyDayData');
    },
    getPicSevenDayData(){ //趋势图 7天
        return get('backstageData/getPicSevenDayData');
    },
  // 查询GMV backstageData/getGMVDayData
  getGMVDayData(params) {
      return post('backstageData/getGMVDayData',params)
  },
  // 查询 GMV不带分页 backstageData/getGMVDayAllData
  getGMVDayAllData(params) {
      return post('backstageData/getGMVDayAllData',params)
  },
  // backstageData/getGMVDayDataSum
  getGMVDayDataSum(params) {
      return post('backstageData/getGMVDayDataSum',params)
  },
  // 查询gmv月趋势 backstageData/getGMVMonthDataSum
  getGMVMonthDataSum(params) {
    return post('backstageData/getGMVMonthDataSum',params)
  },
  // 查询月趋势不带分页 backstageData/getGMVMonthAllData
  getGMVMonthAllData(params) {
    return post('backstageData/getGMVMonthAllData',params)
  },
  // 查询月趋势带分页 backstageData/getGMVMonthData
  getGMVMonthData(params) {
    return post('backstageData/getGMVMonthData',params)
  },
  // backstageData/getUserDayDataSum
  getUserDayDataSum(params) {
      return post('backstageData/getUserDayDataSum',params)
  },
  // 用户日数据不带分页 backstageData/getUserDayAllData
  getUserDayAllData(params) {
      return post('backstageData/getUserDayAllData',params)
  },
  //用户日数据带分页 backstageData/getUserDayData
  getUserDayData(params) {
      return post('backstageData/getUserDayData',params)
  },
  // 用户月趋势 backstageData/getUserMonthDataSum
  getUserMonthDataSum(params) {
      return post('backstageData/getUserMonthDataSum',params)
  },
  // 用户月趋势带分页 backstageData/getUserMonthData
  getUserMonthData(params) {
      return post('backstageData/getUserMonthData',params)
  },
  // 月趋势不带分页 backstageData/getUserMonthAllData
  getUserMonthAllData(params) {
    return post('backstageData/getUserMonthAllData',params)
  },
  //backstageData/getServiceDayAllData 查询服务日的趋势不带分页
  getServiceDayAllData(params) {
      return post('backstageData/getServiceDayAllData',params)
  },
  //backstageData/getServiceDayDataSum 查询服务总的趋势
  getServiceDayDataSum(params) {
    return post('backstageData/getServiceDayDataSum',params)
  },
  //backstageData/getServiceDayData 查询服务数据日的趋势带分页
  getServiceDayData(params) {
    return post('backstageData/getServiceDayData',params)
  },
  //backstageData/getServiceMonthDataSum 查询服务月的总趋势
  getServiceMonthDataSum(params) {
    return post('backstageData/getServiceMonthDataSum',params)
  },
  //backstageData/getServiceMonthData 查询服务月的趋势带分页
  getServiceMonthData(params) {
      return post('backstageData/getServiceMonthData',params)
  },
  // backstageData/getServiceMonthAllData 查询服务月的趋势不带分页
  getServiceMonthAllData(params) {
      return post('backstageData/getServiceMonthAllData',params)
  },


    //faq
    classifyList(){  //获取分类列表
        return get('faq/select/classifyList');
    },
    addTopCategory(params){ //增加一级分类
        return  post('faq/insert/parentClassify',params);
    },
    editClassifyName(params){  //修改分类名称
        return post('faq/edit/classify',params);
    },
    deleteClassify(params){  // 删除目录
        return post('faq/delete/classify',params);
    },
    addSubClassify(params){ //新增子目录
        return post('faq/insert/sonClassify',params);
    },
    addQuestion(params){ //新增问题
        return post('faq/insert/problem',params);
    },
    problemList(params){  //问题列表
        return post('faq/select/problemList',params);
    },
    deleteProblem(params){  //删除问题
        return post('faq/delete/problem',params);
    },
    editQuestion(params){  //修改问题
        return post('faq/edit/problem',params)
    },
    problemDetail(params){  //问题详情
        return post('faq/select/problemInfo',params);
    },
    editClassify(params){  //批量调整分类
        return post('faq/edit/problemClassify',params);
    },
    getGuideClassifyList(){  //快速指引列表
        return get('faq/getGuideClassifyList');
    },
    insertGuideClassify(params){  //新增快速指引
        return post('faq/insertGuideClassify',params);
    },
    editGuideClassifyRank(params){ //修改快速指引 序号
        return post('faq/editGuideClassifyRank',params)
    },
    twoLevelclassifyList(params){  //获取 一级  二级 分类
        return get('faq/homepage/classifyList',params);
    },
    editGuideClassify(params){ //修改快速指引
        return post('faq/editGuideClassify',params);
    },
    editClassifyRank(params){ //修改分类序号
        return post('/faq/editClassifyRank',params);
    },



  //订单
  // 查看所有订单 order/getOrderList
  getOrderList(params) {
      return post('order/getOrderList',params)
  },
  // 查看订单详情 order/getOrderInfo
  getOrderInfo(params) {
      return post('order/getOrderInfo',params)
  },
  // 查看订单流程 order/getOrderFlow
  getOrderFlow(params) {
      return post('order/getOrderFlow',params)
  },
  // 查看订单工作日志 order/getOrderTaskList
  getOrderTaskList(params) {
    return post('order/getOrderTaskList',params)
  },
  // 查看订单评价 order/getOrderEvaluateList
  getOrderEvaluateList(params){
      return post('order/getOrderEvaluateList',params)
  },
  // 查看薪资详情 order/getOrderSalaryList
  getOrderSalaryList(params) {
    return post('order/getOrderSalaryList',params)
  },
  // 查看订单付款信息 order/getOrderPaidInfo
  getOrderPaidInfo(params) {
    return post('order/getOrderPaidInfo',params)
  },
  // 查看发票详情 order/getInvoiceByOrderId
  getInvoiceByOrderId(params) {
      return post('order/getInvoiceByOrderId',params)
  },





    // navList(){  //用户||backdoor => navlist
    //     return post('select/classifyList');
    // },
    // submitBackFeed(params){ //用户 =>提交反馈
    //     return post('submit/backFeed',params);
    // },
    // getEditListByProblemId(params){
    //     return post('faq/getEditListByProblemId',params);
    // },
    // getBackFeedList(params){ //backdoor =>获取反馈列表
    //     return post('getBackFeedList',params);
    // },
    // getBackFeedInfo(params){  //backdoor => 获取单个反馈
    //     return post('getBackFeedInfo',params);
    // },
    // updateBackFeed(params){  //backdoor => 更改修改状态
    //     return post('update/backFeed',params)
    // },

    //广告位
    insertAdvertisement(params){  //广告新增
        return post('advertisement/insertAdvertisement',params);
    },
    getAdvertisementList(params){ //获取所有广告
        return get('advertisement/getAdvertisementList',params);
    },
    getAdvertisementType(params){ //获取广告位置类型
        return get('advertisement/getAdvertisementType',params);
    },
    editAdvertisement(params){ //修改广告位
        return post('advertisement/editAdvertisement',params);
    },

    //招聘
    getRecruitList(params){
        return post('recruit/getRecruitList',params);
    },
    getJobTimeList(params){  //获取所有工作经验信息
        return get('recruit/getJobTimeList',params)
    },
    getIndustryList(params){  //获取所有招聘信息
        return get('recruit/getIndustryList',params)
    },
    deleteCustomerRecruit(params){ //删除雇主招聘
        return post('recruit/deleteCustomerRecruit',params)
    },
    getRecruitInfo(params){ //获取招聘详情
        return post('recruit/getRecruitInfo',params)
    },
    getRecruitResumeList(params){ //获取收到简历列表
        return post('recruit/getRecruitResumeList',params);
    },
    getCollectRecruitResumeList(params){ //获取收藏简历列表
        return post('recruit/getCollectRecruitResumeList',params)
    },
    deleteResume(params){  //删除 雇员投递的简历
        return post('recruit/deleteResume',params);
    },
    editCustomerRecruit(params){  //编辑雇主招聘
        return post('recruit/editCustomerRecruit',params)
    },


    //发票接口
    getAuditingInvoiceAptitude(params){
        return post('invoice/submitAuditingInvoiceAptitude',params)
    },
    getInvoiceAptitudeList(params){
        return post('invoice/getInvoiceAptitudeList',params)
    },


    //关键词
    getKeywordList(params){  //获取关键词
        return post('iik/getKeywordList',params);
    },
    importKeyword(params){  //导入关键词
        return post('iik/importKeyword',params);
    },
    insertKeyword(params){  //新增词
        return post('iik/insertKeyword',params)
    },
    deleteKeyword(params){
        return post('iik/deleteKeyword',params);
    },

    //积分
    getIntegralList(params){
        return post('iik/getIntegralList',params);
    },
    getEmployeeIntegralList(params){
        return post('iik/getEmployeeIntegralList',params);
    },


    //首页
    getNeedHandleInfo(params){  //获取待办事项
        return get('homepage/getNeedHandleInfo',params)
    },
    getOrderStatus(params){ //获取订单状态
        return get('homepage/getOrderStatus',params)
    },
    getPlatformInfo(params){ //获取平台线上数据
        return get('homepage/getPlatformInfo',params);
    },


    //发票
    getInvoiceList(params){
        return post('invoice/getInvoiceList',params);
    },
    exportInvoiceList(params){ //导出
        return post('invoice/exportInvoiceList',params);
    },
    getInvoiceTypeList(params){
        return get('invoice/getInvoiceTypeList',params);
    },
    submitInvoiceResult(params){
        return post('invoice/submitInvoiceResult',params);
    },
    getInvoiceInfo(params){
        return post('invoice/getInvoiceInfo',params);
    },


    //设计产品
    getProductShowList(params){
        return post('recruit/getProductShowList',params);
    },
    switchProductShow(params){  //开启、关闭产品展示
        return post('recruit/switchProductShow',params)
    },
    insertProductShow(params){
        return post('recruit/insertProductShow',params);
    },
    deleteProductShow(params){
        return post('recruit/deleteProductShow',params);
    },
    editProductShow(params){
        return post('recruit/editProductShow',params)
    },
    getProductShowInfo(params){
        return post('recruit/getProductShowInfo',params)
    },

    //轮播
    getBannerCarouselList(params){
        return post('recruit/getBannerCarouselList',params)
    },
    editBannerCarousel(params){
        return post('/recruit/editBannerCarousel',params)
    },
    insertBannerCarousel(params){
        return post('/recruit/insertBannerCarousel',params);
    },
    deleteBannerCarousel(params){
        return post('recruit/deleteBannerCarousel',params);
    },

    //优惠券
    getCouponList(params){
        return post('coupon/getCouponList',params);
    },
    getCouponLogList(params){
        return post('coupon/getCouponLogList',params);
    },
    getCustomerById(params){
        return post('coupon/getCustomerById',params)
    },
    insertCoupon(params){
        return post('coupon/insert',params);
    },
    receiveCoupon(params){
        return post('coupon/receive',params);
    },















































}
