<template>
    <div id="baseSearch">
        <input type="text"
            @keyup.enter="search" 
            v-model.trim="query" 
            :placeholder="placeholder" 
            class="searchInput">
        <button @click="search" class="searchBtn">搜索</button>
    </div>
</template>

<script>
export default {
    props:{
        placeholder:String
    },
    data(){
        return{
            query:"",
        }
    },
    methods:{
        search(){
            this.$emit('search',this.query)
        },
        setQuery(str){
            this.query=str;
        }
    }
}
</script>

<style lang='scss' scoped>
#baseSearch{
    width: 500px; //统一样式，可能要改
    margin: 26px auto 0; //统一样式，可能要改
    .searchInput{
        width: 363px;
        height: 36px;
        box-sizing: border-box;
        vertical-align: top;
        text-indent: 10px;
        border:1px solid #D4D4D4;
        color: #7d7a7a;
        font-size: 14px;
    }
    .searchBtn{
        width: 89px;
        height: 36px;
        line-height: 36px;
        vertical-align: top;
        text-align: center;
        font-size: 14px;
        background-color: #15C3F9;
        color: #fff;
        cursor: pointer;
    }
}

</style>
