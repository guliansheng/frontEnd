<template>
    <div class="cropper">
        <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
        ></vueCropper>
     

    </div>
</template>

<script>
//截图组件
export default {

}
</script>

<style lang='scss' scoped>
.cropper{

}


</style>
