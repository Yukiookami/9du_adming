<template>
  <div class="hello">
    <Button type="success" @click="open()" style="margin-top: 1rem">添加</Button>
    <Modal @on-ok="okPost()" v-model="valueT" title="输入添加内容">
      <Input v-model="titleT" type="text" style="width: 100%" placeholder="职位" />
      <Input class="iput-mid" v-model="alignT" type="text" style="width: 100%" placeholder="职位英文" />
      <Input v-model="contentT" type="textarea" :rows="10" style="width: 100%" placeholder="职位信息" />
    </Modal>
    <Table width='1000px' class="table-box" border :columns="workList" :data="workData"></Table>
    <Modal @on-ok="okPut()" v-model="valueX" title="输入修改内容">
      <Input v-model="titleX" type="text" style="width: 100%" />
      <Input class="iput-mid" v-model="alignX" type="text" style="width: 100%" />
      <Input v-model="content" type="textarea" :rows="10" style="width: 100%" />
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      valueX: false,
      idX: '',
      titleX: '',
      alignX: '',
      content: '',
      titleT: '',
      alignT: '',
      contentT: '',
      valueT: false,
      workList: [
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
          title: '招聘信息',
          key: 'recruitmentInfo',
          type: 'html'
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
                    this.titleX = params.row.position
                    this.alignX = params.row.positionEnglish
                    this.content = params.row.recruitmentInfo
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
                    this.$http.delete('http://47.107.163.62:8089/admin/deletePositionInfo/' + params.row.id)
                      .then((res) => {
                        this.$http.get('http://47.107.163.62:8089/admin/getPositionInfo')
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
      url: 'http://47.107.163.62:8089/admin/getPositionInfo'
    }).then((res) => {
      this.workData = res.data.data
    })
  },
  methods: {
    okPut: function () {
      this.$http.put('http://47.107.163.62:8089/admin/updatePositionInfo', {
        'id': this.idX,
        'position': this.titleX,
        'positionEnglish': this.alignX,
        'recruitmentInfo': this.content
      }).then((res) => {
        this.$http.get('http://47.107.163.62:8089/admin/getPositionInfo')
          .then((res) => {
            this.workData = res.data.data
          })
      })
    },
    open: function () {
      this.valueT = !this.valueT
    },
    okPost: function () {
      this.$http.post('http://47.107.163.62:8089/admin/addPositionInfo', {
        'position': this.titleT,
        'positionEnglish': this.alignT,
        'recruitmentInfo': this.contentT
      }).then((res) => {
        this.$http.get('http://47.107.163.62:8089/admin/getPositionInfo')
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

.iput-mid {
  margin: 1rem 0;
}
</style>
