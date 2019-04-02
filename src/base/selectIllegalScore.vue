<template>
    <div class="illegalScore">
        <el-select v-model="illegalScore" :placeholder="placeholder" @change="selectChange">
            <el-option
                v-for="item in illegalScoreOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>


<script>
export default {
    props:{
        placeholder:"请选择",
    },
    data(){
        return{
            illegalScore:'',
            illegalScoreOptions:[
                {value:0,label:"不扣分"},
                {value:3,label:"3"},
                {value:6,label:"6"},
                {value:12,label:"12"},
                {value:24,label:"24"},
            ],

        }
    },
    methods:{
        selectChange(){
            this.$emit('change',this.illegalScore)
        },
        setValue(score){
            this.illegalScore=score;
            this.$emit('change',this.illegalScore)
        }

    }

}
</script>



<style lang='scss'>
.illegalScore{

}

</style>



