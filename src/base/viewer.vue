<template>
    <div :id="id">
        <slot></slot>
    </div>
</template>

<script>
//查看图片
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
export default {
    props:{
        id:{
            type:String,
            required: true
        },
    },
    mounted(){
        Viewer.noConflict();
        this.$nextTick(() =>{
            let  viewer = new Viewer(document.getElementById(this.id), {
                viewed: function() {
                },
            });
        })
    },
}
</script>

<style lang='scss' scoped>
#dialog{
}
</style>
