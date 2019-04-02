<template>
    <div class="IllegalType">
        <el-select v-model="illegalType" :placeholder="placeholder" @change="selectChange">
            <el-option
                v-for="item in illegalTypeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
        </el-select>

    </div>
    
</template>

<script>
export default {
    props:{
        placeholder:"请选择",
    },
    created(){
        this.init();
    },
    data(){
        return{
            illegalType:'',
            illegalTypeOptions:[],
        }
    },
    methods:{
        init(){
            this.$api.getIllegalTypeList()
                .then(res =>{
                    this.illegalTypeOptions=res.data;
                })
        },
        selectChange(){
            this.$emit('change',this.illegalType)
        },
        setValue(type){
            this.illegalType=type;
            this.$emit('change',this.illegalType)
        }

    }

}
</script>

<style lang='scss'>

</style>
