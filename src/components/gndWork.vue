<template>
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
      <Input v-model="enameT" type="text" placeholder="英文名称" style="width: 100%;margin: 1rem 0" />
      <Input v-model="weightT" type="text" placeholder="权重" style="width: 100%;margin: 1rem 0" />
    </Modal>
    <Modal @on-ok="okPut()" v-model="valueX" title="拖入修改图片">
      <img class="img-box" :src="img" alt="">
      <Upload
        :on-success="okGoBack"
        multiple
        type="drag"
        action="http://47.107.163.62:8089/ftp/addFile">
          <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或者拖拽上传</p>
          </div>
      </Upload>
      <Input v-model="nameX" type="text" style="width: 100%;margin: 1rem 0" />
      <Input v-model="enameX" type="text" style="width: 100%;margin: 1rem 0" />
      <Input v-model="weightX" type="text" style="width: 100%;margin: 1rem 0" />
    </Modal>
    <Table width='1000px' class="table-box" border :columns="workList" :data="workData"></Table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      valueX: false,
      valueT: false,
      img: '',
      nameX: '',
      idX: '',
      idEX: '',
      imgT: '',
      nameT: '',
      weightT: '',
      weightX: '',
      enameX: '',
      enameT: '',
      workList: [
        {
          title: '项目ID',
          key: 'id',
          align: 'center'
        },
        {
          title: '项目名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '项目英文名称',
          key: 'englishName',
          align: 'center'
        },
        {
          title: '项目封面',
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
                    this.img = params.row.img
                    this.nameX = params.row.name
                    this.idX = params.row.id
                    this.idEX = params.row.expertiseId
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
                    this.$http.delete('http://47.107.163.62:8089/admin/deleteProject/' + params.row.id)
                      .then((res) => {
                        this.$http.get('http://47.107.163.62:8089/admin/getProjectIntroduct')
                          .then((res) => {
                            this.workData = res.data.data
                          })
                      })
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      workData: []
    }
  },
  mounted: function () {
    if (sessionStorage.getItem('loginData') !== '1') {
      this.$router.push('/login')
    }
    this.$http({
      method: 'get',
      url: 'http://47.107.163.62:8089/admin/getProjectIntroduct'
    }).then((res) => {
      this.workData = res.data.data
    })
  },
  methods: {
    okGoBack: function (response, file, fileList) {
      this.img = response.data
    },
    okPut: function () {
      this.$http.put('http://47.107.163.62:8089/admin/updateProject', {
        'id': this.idX,
        'expertiseId': this.idEX,
        'img': this.img,
        'name': this.nameX,
        'weight': this.weightX,
        'englishName': this.enameX
      }).then((res) => {
        this.$http.get('http://47.107.163.62:8089/admin/getProjectIntroduct')
          .then((res) => {
            this.workData = res.data.data
          })
      })
    },
    open: function () {
      this.imgT = ''
      this.valueT = !this.valueT
    },
    okBackT: function (response, file, fileList) {
      this.imgT = response.data
    },
    okPost: function () {
      this.$http.post('http://47.107.163.62:8089/admin/addProject', {
        'expertiseId': 1,
        'img': this.imgT,
        'name': this.nameT,
        'englishName': this.enameT,
        'weight': this.weightT
      }).then((res) => {
        this.$http.get('http://47.107.163.62:8089/admin/getProjectIntroduct')
          .then((res) => {
            this.workData = res.data.data
          })
      })
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

.img-box {
  display: block;
  width: 50%;
  margin: .5rem auto;
}
</style>
