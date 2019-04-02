<template >
    <div class="positionDialog">
        <div class="dialogWarp" >
            <el-dialog
                :visible.sync="dialogVisible"
                width="1400px"
            >
                <div class="dialogContent clearfix">
                    <div class="left fl">
                        <select-uid @change="getUid" ref='uid'/>
                        <!-- 插入 -->
                        <div class="more">
                            <slot></slot>
                        </div>
                        <!-- 插入结束 -->
                        <div class="uploadImgWrap">
                            <span class="txt">
                                请上传用户图片：
                            </span>
                            <form ref='form' class="form">
                                <input type="file" id="uploads"                               
                                accept="image/png, image/jpeg, image/gif, image/jpg"
                                @change="uploadImg($event, 1)"/>
                            </form> 
                        </div>
                        <!-- 预览 -->
                        <div class="preview" v-show="previews.url">
                            <span class="txt">预览：</span>
                            <div class="previewContent">
                                <div class="show-preview" 
                                    :style="{'width': previews.w + 'px', 
                                             'height': previews.h + 'px', 
                                             'overflow': 'hidden', 
                                             'borderRadius': styleObj.borderRadius,
                                             'border':'1px solid #C8CBD3',
                                             'margin': '5px auto'}">
                                    <div :style="previews.div">
                                        <img :src="previews.url" :style="previews.img">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="right fl">
                        <div class="cropperWrap">
                            <vueCropper
                                ref="cropper"
                                :img="option.img"
                                :autoCrop="option.autoCrop"
                                :autoCropWidth="option.autoCropWidth"
                                :autoCropHeight="option.autoCropHeight"
                                :centerBox="option.centerBox"
                                :fixedBox="option.fixedBox"

                                :outputSize="option.size"
                                :outputType="option.outputType"
                                :info="true"
                                :full="option.full"
                                :canMove="option.canMove"
                                :canMoveBox="option.canMoveBox"
                                
                                :original="option.original"
                                @realTime="realTime"
                                ></vueCropper>
                        </div>
                    </div>  

                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submit">提交</el-button>
                    <el-button @click="dialogVisible = false">返回</el-button>
                </span> 
            </el-dialog>
        </div>
    </div>
</template>

<script>
// 首页设置  热门推荐 推荐运营 新人入驻 banner 的弹窗   
import SelectUid from '@/base/selectUid.vue'
import vueCropper from 'vue-cropper'
export default {
    props:{
        styleObj:{},
    },
    mounted(){
        this.init();
    },
    data(){
        return{
            uid:'',
            dialogVisible:false, 
            option:{  //cropper 剪切
                img:"",
                size:1, //剪切后的图片质量（0.1-1）
                outputType:'jpg',            
                canMove:true, //能否拖动图片
                canMoveBox:true,  //能否拖动截图框

                original:false, //上传图片是否显示原始宽高
                full:false,  //是否输出原图比例的截图
                
                fixedBox:true, //截图框是否固定大小
                centerBox:false, //截图框是否限制在图片里 (只有自动生成截图款时才能生效)
                autoCrop:true, //自动生成 截图框
                autoCropWidth:580, //自动生成的 截图框的宽
                autoCropHeight:341, //自动生成的 截图框的高
            },
            file:'', //文件
            previews:{}, //预览
        }
    },
    methods:{
        init(){
            if(this.styleObj){
                this.option.autoCropWidth=parseInt(this.styleObj.width);
                this.option.autoCropHeight=parseInt(this.styleObj.height);
            }
        },
        getUid(uid){
            this.uid=uid;
        },
        show(){
            this.dialogVisible=true;

            this.$nextTick(()=>{
                this.$refs.form.reset(); //清空input
                this.$refs.uid.clearUid(); //清空uid
            })
           
            this.option.img=" ";
            this.uid="";
            this.previews={};       
        },
        hide(){
            this.dialogVisible=false;
        },
        submit(){ //提交
            if(!this.uid){
                this.$notify({
                    type:"warning",
                    message:"请输入用户uid"
                })
                return
            }
            if(!this.file){
                this.$notify({
                    type:"warning",
                    message:"请上传图片"
                })
                return
            }
            this.$refs.cropper.getCropBlob((data) => {
     
                let formData =new FormData();
                formData.append('img',data,this.file.name);
                formData.append('employeeId',this.uid);
                this.$emit('submit',formData)
                
            })
        },

        uploadImg(e, num){   //上传图片
               
            var file = e.target.files[0];
            this.file =file;
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                    alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
                    return false
                }
            var reader = new FileReader();
            
            reader.onload = (e) => {
                let data
                if (typeof e.target.result === 'object') {
                    // 把Array Buffer转化为blob
                    data = window.URL.createObjectURL(new Blob([e.target.result]))
                }
                this.option.img = data                      
            }
            reader.readAsArrayBuffer(file)
        },

        realTime(data){ //实时预览函数
            this.previews = data;
        }, 
    },
    watch:{
        styleObj(newVal,oldVal){
            this.init();
        }  
    },
    components:{
        SelectUid,
        vueCropper,
    },
    

}
</script>

<style lang='scss'>
.positionDialog{
    .dialogWarp{
        .uploadImgWrap{
            .txt{
                display: inline-block;
                width: 120px;
                text-align: right;
            }
            .form{
                display: inline-block;
            }        
        }
        .preview{
            .txt{
                display:block;
                width: 120px;
                padding: 20px 0;
                text-align: right;
            }
        }
        .right{
            margin: 50px 0  0 60px;
            .cropperWrap{
                width: 640px;
                height: 400px;
                border: 1px solid #707070;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }

    }

}

</style>
