<template>
<div>
  <div class="hello">
    <Button type="success" @click="open()" style="margin-top: 1rem">添加</Button>
    <Modal @on-ok="okPost()" v-model="valueT" title="输入添加内容 都可以为空">
      <Upload
        :on-success="okBackT"
        multiple
        type="drag"
        action="http://47.107.163.62:8089/ftp/addFile">
          <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或者拖拽上传</p>
          </div>
      </Upload>
      <Input v-model="nameT" type="text" placeholder="名称" style="width: 100%;margin: 1rem 0" />
      <Input v-model="nameET" type="text" placeholder="姓名英文" style="width: 100%;margin: 1rem 0" />
      <Input v-model="posT" type="text" placeholder="职位" style="width: 100%;margin: 1rem 0" />
      <Input v-model="posET" type="text" placeholder="职位英文" style="width: 100%;margin: 1rem 0" />
      <Input v-model="weightT" type="text" placeholder="权重（权重越大越靠前）" style="width: 100%;margin: 1rem 0" />
      <Input v-model="contentT" type="textarea" :rows="10" style="width: 100%" />
    </Modal>
    <Modal @on-ok="okPut()" v-model="valueX" title="输入修改内容">
      <img class="img-box" :src="imgX" alt="">
      <Upload
        :on-success="okBack"
        multiple
        type="drag"
        action="http://47.107.163.62:8089/ftp/addFile">
          <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或者拖拽上传</p>
          </div>
      </Upload>
      <Button type="info" @click="clear()">{{clearCheck}}</Button>
      <Input v-model="nameX" placeholder="姓名" type="text" style="width: 100%;margin: 1rem 0" />
      <Input v-model="nameEX" placeholder="姓名拼音" type="text" style="width: 100%;margin: 1rem 0" />
      <Input v-model="posX" placeholder="职位名称" type="text" style="width: 100%;margin: 1rem 0" />
      <Input v-model="posEX" placeholder="职位英文" type="text" style="width: 100%;margin: 1rem 0" />
      <Input v-model="weightX" placeholder="职位英文" type="text" style="width: 100%;margin: 1rem 0" />
      <Input v-model="content" placeholder="详细描述" type="textarea" :rows="10" style="width: 100%" />
    </Modal>
    <Table width='1000px' class="table-box" border :columns="memberList" :data="memberData"></Table>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      valueX: false,
      valueT: false,
      clearCheck: '保留当前图片',
      single: false,
      content: '',
      nameX: '',
      nameEX: '',
      posX: '',
      posEX: '',
      imgX: '',
      idX: '',
      weightX: '',
      contentT: '',
      nameT: '',
      nameET: '',
      posT: '',
      posET: '',
      imgT: '',
      weightT: '',
      memberList: [
        {
          title: '名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '拼音',
          key: 'nameEnglish',
          align: 'center'
        },
        {
          title: '职位',
          key: 'position',
          align: 'center'
        },
        {
          title: '职位英文',
          key: 'positionEnglish',
          align: 'center'
        },
        {
          title: '详细介绍',
          key: 'introduction',
          align: 'center'
        },
        {
          title: '照片',
          key: 'img',
          align: 'center',
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.img
              },
              style: {
                width: '200px',
                height: '200px',
                margin: '1rem 0'
              }
            })
          }
        },
        {
          title: '操作方式',
          key: 'yaRiKaTa',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'large'
                },
                on: {
                  click: () => {
                    this.valueX = !this.valueX
                    this.nameX = params.row.name
                    this.nameEX = params.row.nameEnglish
                    this.posX = params.row.position
                    this.posEX = params.row.positionEnglish
                    this.content = params.row.introduction
                    this.idX = params.row.id
                    this.imgX = params.row.img
                    this.weightX = params.row.weight
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'large'
                },
                style: {
                  margin: '0 1rem'
                },
                on: {
                  click: () => {
                    this.$http.delete('http://47.107.163.62:8089/admin/deleteDesigner/' + params.row.id)
                      .then((res) => {
                        this.$http.get('http://47.107.163.62:8089/admin/getDesignerAllPartInfo')
                          .then((res) => {
                            this.memberData = res.data.data
                          })
                      })
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      memberData: []
    }
  },
  mounted: function () {
    if (sessionStorage.getItem('loginData') !== '1') {
      this.$router.push('/login')
    }
    this.$http({
      method: 'get',
      url: 'http://47.107.163.62:8089/admin/getDesignerAllPartInfo'
    }).then((res) => {
      this.memberData = res.data.data
    })
  },
  methods: {
    okBack: function (response, file, fileList) {
      this.imgX = response.data
    },
    okBackT: function (response, file, fileList) {
      this.imgT = response.data
    },
    okPut: function () {
      if (this.single === true) {
        this.imgX = ''
      }
      this.$http.put('http://47.107.163.62:8089/admin/updateDesigner', {
        'id': this.idX,
        'img': this.imgX,
        'name': this.nameX,
        'nameEnglish': this.nameEX,
        'position': this.posX,
        'positionEnglish': this.posEX,
        'introduction': this.content,
        'weight': this.weightX
      }).then((res) => {
        this.$http.get('http://47.107.163.62:8089/admin/getDesignerAllPartInfo')
          .then((res) => {
            this.memberData = res.data.data
          })
      })
    },
    okPost: function () {
      this.$http.post('http://47.107.163.62:8089/admin/addDesigner', {
        'img': this.imgT,
        'name': this.nameT,
        'nameEnglish': this.nameET,
        'position': this.posT,
        'positionEnglish': this.posET,
        'introduction': this.contentT,
        'weight': this.weightT
      }).then((res) => {
        this.$http.get('http://47.107.163.62:8089/admin/getDesignerAllPartInfo')
          .then((res) => {
            this.memberData = res.data.data
          })
      })
    },
    open: function () {
      this.imgT = ''
      this.valueT = !this.valueT
    },
    clear: function () {
      if (this.clearCheck === '保留当前图片') {
        this.clearCheck = '清除当前图片'
        this.single = !this.single
      } else {
        this.clearCheck = '保留当前图片'
        this.single = !this.single
      }
    }
  }
}
</script>

<style scoped>
.hello {
  margin-left: 20rem;
}

.table-box {
  margin: 2rem 5rem 2rem 2rem;
}
</style>
