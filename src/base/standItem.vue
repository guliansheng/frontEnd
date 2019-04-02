<template>
    <div class="standItem" v-if="info">
        <!-- <p class="orderNumber" @click='sort(3)'>序号：4</p> -->

        <div class="imgWrap " :style='styleObj' v-show="info.img">
            <img :src="info.img" alt="用户照片" class="user_img" :style='styleObj'>
            <div class="maskingWrap" :style="{borderRadius:styleObj.borderRadius}">
                <div class="masking" >
                    <p class="changePic" @click="replace(info.id)">更换</p> 
                    <p class="removePic" @click="removePic(info.id)">移除</p>
                </div>   
            </div>
        </div>
        <div class="upload-wrap" v-show="!info.img" @click="upload(info.id)" :style='styleObj'>            
            <span class="plus">+</span>
        </div>  
        <p class="uid">UID:{{info.employeeId}}</p>
    </div>
</template>

<script>
//推荐页 展位
export default {
    props:{
        info:{
            type:Object,
            require:true
        },
        styleObj:{  //设置宽、高、boredrRadius
            type:Object,
        },
        removeFunc:{  //自定义 移除方法
            type:Function,
        }
    },
    methods:{
        upload(id){  //上传图片
            
            this.$emit('upload',id);
        },
        replace(id){  //更换
            //id为位置ID
            // this.$emit('replace',id)
            this.$emit('upload',id);  //暂时将更换改为上传
        },
        removePic(id){  //移除

            // 如果自定义了移除方法,执行自定义移除方法，如果没有，执行下面的方法
            if(this.removeFunc){
                this.removeFunc(id);
                return 
            }

            this.$confirm('确认移除该用户？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                let params={id};
                this.$api.deleteRecommend(params)
                .then(res =>{

                    if(res.code === 0){
                        this.$parent.init();
                        this.$notify({
                            type:'success',
                            message:'移除成功',
                        })
                    }  
                }) 
            }).catch(() => {
                       
            }); 
        }        
    }

}
</script>

<style lang='scss' scoped>

.standItem{
    .imgWrap{
        // width: 293px;
        // height: 193px;
        .maskingWrap{
            position: relative;
            .masking{
                width: 60px;
                height: 52px;
                position:absolute;
                top:50%;
                left:50%;
                transform: translate(-50%,-50%);
                margin: 0 auto;
                // margin-top: 50%;
            }
        }
    }
    .user_img,.upload-wrap{
        // width: 293px;
        // height: 193px;               
    }
    .upload-wrap{
        position: relative;
        .plus{
            width: 22px;
            height: 30px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
        }
    }

}
    
.standItem{
    .orderNumber{
        font-size: 14px;
        color: #545454;
        margin-bottom: 8px;
        cursor: pointer;
    }
    .imgWrap{
        position: relative;
        cursor: pointer;
        .maskingWrap{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background-color: rgba(0,0,0,.4);
            z-index: 2;
            color:#d5d5d5;
            transition: all .5s;
            opacity: 0;
            .masking{
                text-align: center;
                .changePic,.removePic{
                    transition: all .5s;
                    line-height: 26px;
                    opacity: 0;
                    cursor: pointer;
                    &:hover{
                        text-decoration: underline;
                        color: #fff;
                    }

                }
            }
        }
        &:hover{
            .maskingWrap{
                opacity: 1;
                visibility:visible;     
            }
            .changePic,.removePic{
                opacity: 1 !important;
            }
        }
    }
    
    .upload-wrap{
        border: 1px solid #707070;
        text-align: center;
        font-size: 30px;
        cursor: pointer;
    }
    .uid{
        font-size: 14px;
        color: #545454;
        margin-top: 20px;
        text-align: center;
    }
}
</style>
