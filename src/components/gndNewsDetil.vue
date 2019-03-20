<template>
  <div class="hello">
    <div class="table-box">
      <Input v-model="newsID" placeholder="输入新闻ID" style="width: 90%" />
      <Button @click="getDetil()" type="info">查询</Button>
    </div>
    <div v-html="contentX" class="content"></div>
    <div id="editorElem" height='1000' style="text-align:left; width: 90%;"></div>
    <Button class="put-button" type="warning" @click="okPut()" size='large'>确认提交修改</Button>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'editor',
  data () {
    return {
      newsID: '',
      contentX: '',
      idX: '',
      typeIdX: '',
      imgX: '',
      nameX: '',
      text: '',
      editorContent: ''
    }
  },
  methods: {
    getDetil: function () {
      this.$http.get('http://47.107.163.62:8089/admin/getNewsInfoByid?id=' + this.newsID)
        .then((res) => {
          this.contentX = res.data.data.details
          this.idX = this.newsID
          this.typeIdX = res.data.data.typeId
          this.imgX = res.data.data.img
          this.nameX = res.data.data.name
        })
    },
    okPut: function () {
      this.$http.put('http://47.107.163.62:8089/admin/updateNew', {
        'details': this.editorContent,
        'id': this.idX,
        'img': this.imgX,
        'name': this.nameX,
        'typeId': this.typeIdX
      }).then((res) => {
        this.getDetil()
      })
    }
  },
  mounted: function () {
    var editor = new E('#editorElem')
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.customConfig.uploadFileName = 'file'
    editor.customConfig.uploadImgTimeout = 50000;
    editor.customConfig.uploadImgHooks = {
      customInsert: function (insertImg, result, editor) {
        var url = result.data;
        insertImg(url)
      }
    }
    editor.customConfig.uploadImgServer = 'http://47.107.163.62:8089/ftp/addFile'
    editor.create()
  }
}
</script>

<style scoped>
.hello {
  margin: 2rem 0 0 20rem;
}

.table-box {
  margin: 2rem 5rem 2rem 2rem;
}

.img-box {
  display: block;
  width: 50%;
  margin: .5rem auto;
}

.content {
  margin: 5rem auto;
}

.put-button {
  display: block;
  margin: 2rem auto;
}
</style>
