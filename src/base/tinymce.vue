<template>
    <div class="tinymceWrap">
        <!-- @input="handleInput" -->
        <textarea class="tinymce" :value="currentValue" ></textarea>
    </div>
</template>

<script>
export default {
    props:{
        defaultMsg:{
            type:String,
        },
        value:'',
    },
    computed:{
        currentValue(){
            return this.value;
        }
    },
    mounted(){
        this.$nextTick(()=>{
  
            let _this=this;
            tinymce.init({
                selector: '.tinymce',
                plugins: [
                'advlist  autolink autoresize link image lists charmap  preview hr anchor pagebreak spellchecker searchreplace',
                'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                'save table contextmenu directionality emoticons template paste textcolor imagetools '
                ],
                menubar: false,
                content_css: 'css/content.css',
                autoresize_min_height: 500,
                // min_height: 500,
                paste_data_images: true, //插入截图
                toolbar:'insertfile undo redo | styleselect   fontselect fontsizeselect | bold italic underline strikethrough  forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist | link image removeformat  | table searchreplace  insertdatetime  fullscreen',
                fontsize_formats:'10px 11px 12px 14px 16px 18px 20px 24px',
                style_formats: [
                    {title: '1', styles: { 'line-height': '1' }, inline: 'span'},
                    {title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span'},
                    {title: '2', styles: { 'line-height': '2' }, inline: 'span'},
                    {title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span'},
                    {title: '3', styles: { 'line-height': '3' }, inline: 'span'}
                    // {
                    //     title: '首行缩进',
                    //     block: 'p',
                    //     styles: { 'text-indent': '2em' }
                    // },
                    
                    // {
                    //     title: '行高',
                    //     items: [
                    //         {title: '1', styles: { 'line-height': '1' }, inline: 'span'},
                    //         {title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span'},
                    //         {title: '2', styles: { 'line-height': '2' }, inline: 'span'},
                    //         {title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span'},
                    //         {title: '3', styles: { 'line-height': '3' }, inline: 'span'}
                    //     ]
                    // }
                ],
                font_formats: `
                    微软雅黑=微软雅黑;
                    宋体=宋体;
                    黑体=黑体;
                    仿宋=仿宋;
                    楷体=楷体;
                    隶书=隶书;
                    Arial=arial, helvetica,
                    sans-serif`,
                images_upload_handler: function (blobInfo, success, failure) {  //上传图片
                    _this.uploadPic(blobInfo,success,failure);
                },
                file_picker_callback:function(callback,value,meta){  //上传文件
                    _this.fileUpload(callback,value,meta)                   
                },
                // imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
                
                // file_picker_callback: function (callback, value, meta) {

                // },
                // file_browser_callback: function(field_name, url, type, win) {
                // },
                // paste_convert_word_fake_lists: false,  //插入word文档
                // paste_word_valid_elements: '*[*]', // word需要它
            });
            // window.tinymce.baseURL = '/static/tinymce'
            if(this.defaultMsg){
                this.setContent(this.defaultMsg);
            }
        })
    },
    methods:{
        uploadPic(blobInfo,success,failure){
            let formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename())

            this.$api.submitInformationPic(formData)
            .then(res =>{
                if(res.code === 0){
                    success(res.data);
                }else{
                    failure(res.msg)
                }
                
            })
        },
        getContent(){
           let html=tinyMCE.activeEditor.getContent(); 
           return html;
        },
        setContent(content){ //设置内容
            tinyMCE.activeEditor.setContent(content);
        },
        fileUpload(callback){
            let input = document.createElement('input');
            input.setAttribute('type', 'file');
            let _this=this;

            input.onchange = function() {
                let file = this.files[0];
                let formData = new FormData();
                formData.append("file", file,file.name); 
                _this.$api.submitInformationPic(formData)
                .then(res =>{
                    if(res.code === 0){
                        callback(res.data);
                    }else{
                        _this.$notify.warning(res.msg);                     
                    }
                })
            }       
            input.click();

        },
    },
    watch:{
        // defaultMsg(newData,oldData){
        //     if(newData){
        //         this.setContent(newData);
        //     }
        // }
        value(newDate){
            this.setContent(newDate);
        }
    }
}
</script>

<style>

</style>

