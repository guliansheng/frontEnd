import * as types from './mutation-types'

const mutations={
    [types.SET_INFO](state,data){
        state.info=data
    },
    [types.SET_PAGE](state,data){
        state.page=data;
    }
}
export default mutations;