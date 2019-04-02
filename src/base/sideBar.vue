<template>
    <div class="sideBar">
        <ul class="barList">
            <slot></slot>
        </ul>
    </div>
</template>

<script> 
/**
 * 这个组件只是为了样式以后修改方便
 * 其他并无功能
 */
export default {

}
</script>

<style lang='scss' scoped>
.sideBar{
    width: $sideBarWidth;
    height: 100%;
    border: 1px solid #e3e3e3;
    padding-top: 40px;
    .barList{
        padding-left: 22px;
        li{
            line-height: 40px;
            text-indent: 16px;
            font-size: 14px;
            color: #434444;
            cursor: pointer;
            &.router-link-active{
                color: #1BC2F6;
            }
            
        }
    }
}

</style>
