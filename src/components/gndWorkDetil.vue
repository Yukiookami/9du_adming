<template>
  <div class="hello">
    <div class="table-box">
      <Input v-model="workID" placeholder="输入项目ID" style="width: 90%" />
      <Button @click="getDetil()" type="info">查询</Button>
    </div>
    <Button @click="open()" type="success">添加</Button>
    <Modal @on-ok="okPost()" v-model="valueT" title="输入修改内容">
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
      <Input v-model="weightT" type="text" placeholder="权重" style="width: 100%;margin: 1rem 0" />
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
      <Input v-model="weightX" type="text" placeholder="权重" style="width: 100%;margin: 1rem 0" />
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
      imgX: '',
      imgT: '',
      idX: '',
      workID: '',
      weightX: '',
      weightT: '',
      workList: [
        {
          title: '项目图片',
          key: 'url',
          align: 'center',
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.url
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
          key: 'tukurikata',
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
                    this.imgX = params.row.url
                    this.idX = params.row.id
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
                    this.$http.delete('http://47.107.163.62:8089/admin/deleteProjectImage?id=' + params.row.id)
                      .then((res) => {
                        this.$http.get('http://47.107.163.62:8089/admin/getProjectImageById?id=' + this.workID)
                          .then((res) => {
                            this.workData = res.data.data.list
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
  },
  methods: {
    getDetil: function () {
      this.$http.get('http://47.107.163.62:8089/admin/getProjectImageById?id=' + this.workID)
        .then((res) => {
          this.workData = res.data.data.list
        })
    },
    okPut: function () {
      this.$http.put('http://47.107.163.62:8089/admin/updateProjectImage', {
        'id': this.idX,
        'url': this.imgX,
        'projectId': this.workID,
        'weight': this.weightX
      }).then((res) => {
        this.$http.get('http://47.107.163.62:8089/admin/getProjectImageById?id=' + this.workID)
          .then((res) => {
            this.workData = res.data.data.list
          })
      })
    },
    okBack: function (response, file, fileList) {
      this.imgX = response.data
    },
    open: function () {
      this.imgT = ''
      this.valueT = !this.valueT
    },
    okBackT: function (response, file, fileList) {
      this.imgT = response.data
    },
    okPost: function () {
      this.$http.post('http://47.107.163.62:8089/admin/addProjectImage', {
        'projectId': this.workID,
        'url': this.imgT,
        'weight': this.weightT
      }).then((res) => {
        this.$http.get('http://47.107.163.62:8089/admin/getProjectImageById?id=' + this.workID)
          .then((res) => {
            this.workData = res.data.data.list
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
