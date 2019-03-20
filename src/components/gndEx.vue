<template>
  <div class="Ex-box">
    <Modal @on-ok="okPut()" v-model="valueX" title="输入修改内容">
      <img class="img-box" :src="alignX" alt="">
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
      <Input v-model="titleX" type="text" style="width: 100%;margin: 1rem 0" />
      <Input v-model="content" type="textarea" :rows="10" style="width: 100%" />
    </Modal>
    <Table class="table-box" border :columns="exList" :data="exData"></Table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      valueX: false,
      titleX: '',
      alignX: '',
      content: '',
      imgUrl: '',
      idX: '',
      exList: [
        {
          title: '专长封面图',
          key: 'img',
          align: 'center',
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.img
              },
              style: {
                width: '200px',
                margin: '1rem 0'
              }
            })
          }
        },
        {
          title: '专长名称',
          key: 'name',
          align: 'center',
          width: 200
        },
        {
          title: '专长详情',
          key: 'introduction'
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
                    this.idX = params.row.id
                    this.alignX = params.row.img
                    this.titleX = params.row.name
                    this.content = params.row.introduction
                  }
                }
              }, '修改')
              // h('Button', {
              //   props: {
              //     type: 'error',
              //     size: 'large'
              //   },
              //   style: {
              //     margin: '0 1rem'
              //   },
              //   on: {
              //     click: () => {
              //       this.$http.delete('http://47.107.163.62:8089/admin/deleteExpertise/' + params.row.id)
              //         .then((res) => {
              //           this.$http.get('http://47.107.163.62:8089/admin/getExpertiseInfo')
              //             .then((res) => {
              //               this.exData = res.data.data
              //             })
              //         })
              //     }
              //   }
              // }, '删除')
            ])
          }
        }
      ],
      exData: []
    }
  },
  mounted: function () {
    if (sessionStorage.getItem('loginData') !== '1') {
      this.$router.push('/login')
    }
    this.$http({
      mounted: 'get',
      url: 'http://47.107.163.62:8089/admin/getExpertiseInfo'
    }).then((res) => {
      this.exData = res.data.data
    })
  },
  methods: {
    okPut: function () {
      this.$http.put('http://47.107.163.62:8089/admin/updateExpertise', {
        'id': this.idX,
        'img': this.alignX,
        'introduction': this.content,
        'name': this.titleX
      }).then((res) => {
        this.$http.get('http://47.107.163.62:8089/admin/getExpertiseInfo')
          .then((res) => {
            this.exData = res.data.data
          })
      })
    },
    okBack: function (response, file, fileList) {
      this.alignX = response.data
    }
  }
}
</script>

<style scoped>
.Ex-box {
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
