<template>
    <div>
      <div id="editor" style="line-height: 20px;"></div>
    </div>
</template>

<script>
    import '../../../static/ue/ueditor.config.js'
    import '../../../static/ue/ueditor.all.min.js'
    import '../../../static/ue/lang/zh-cn/zh-cn.js'
    import '../../../static/ue/ueditor.parse.min.js'

    export default {
        name: "UEditor",
        props: {
          defaultValue: {
            type: String,
            default: ''
          }
        },
        watch: {
          defaultValue(content){
            if(this.ready && this.content.length == 0){
              this.editor.setContent(content);
            }
          },
          ready(status){
            if(status){
              this.editor.setContent(this.defaultValue);
            }
          },
          content(content){
            this.$emit("change", content);
          }
        },
        data(){
          return {
            editor: null,
            ready: false,
            content: '',
          }
        },
        mounted(){
          var _self = this;
          this.editor = UE.delEditor('editor');
          this.editor = UE.getEditor('editor');
          this.editor.addListener('ready', function () {
            _self.ready = true;
          });
          this.editor.addListener('contentchange', function () {
            _self.content = _self.editor.getContent();
          });
        }
    }
</script>
<style scoped>

</style>
