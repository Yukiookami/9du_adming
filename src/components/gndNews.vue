<template>
  <div class="hello">
    <Button @click="open()" type="success">添加</Button>
    <Modal @on-ok="okPost()" v-model="valueT" title="输入修改内容">
      <!-- <img class="img-box" :src="alignT" alt="">
      <Upload
        :on-success="okBackT"
        multiple
        type="drag"
        action="http://47.107.163.62:8089/ftp/addFile">
          <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或者拖拽上传</p>
          </div>
      </Upload> -->
      <Input v-model="titleT" type="text" placeholder="新闻标题" style="width: 100%;margin: 1rem 0" />
      <Input v-model="newsTimeT" type="text" placeholder="新闻时间（请务必按照 2019.01.08 格式书写）" style="width: 100%;margin: 1rem 0" />
      <Input v-model="weightT" type="text" placeholder="权重" style="width: 100%;margin: 1rem 0" />
      <RadioGroup v-model="typeIdT">
        <Radio :label="1">
            <span>新闻动态</span>
        </Radio>
        <Radio :label="2">
            <span>奖项荣誉</span>
        </Radio>
        <Radio :label="3">
            <span>杂志书籍</span>
        </Radio>
      </RadioGroup>
    </Modal>
    <Table width='1000px' class="table-box" border :columns="newsList" :data="newsData"></Table>
    <Modal @on-ok="okPut()" v-model="valueX" title="输入修改内容">
      <!-- <img class="img-box" :src="alignX" alt=""> -->
      <!-- <Upload
        :on-success="okBack"
        multiple
        type="drag"
        action="http://47.107.163.62:8089/ftp/addFile">
          <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或者拖拽上传</p>
          </div>
      </Upload> -->
      <Input v-model="titleX" type="text" placeholder="新闻标题" style="width: 100%;margin: 1rem 0" />
      <Input v-model="newsTimeX" type="text" placeholder="新闻时间（请务必按照 2019.01.08 格式书写）" style="width: 100%;margin: 1rem 0" />
      <Input v-model="weightX" type="text" placeholder="权重" style="width: 100%;margin: 1rem 0" />
      <RadioGroup v-model="typeIdX">
        <Radio :label="1">
            <span>新闻动态</span>
        </Radio>
        <Radio :label="2">
            <span>奖项荣誉</span>
        </Radio>
        <Radio :label="3">
            <span>杂志书籍</span>
        </Radio>
      </RadioGroup>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      valueX: false,
      alignX: '',
      titleX: '',
      idX: '',
      typeIdX: '',
      detailsX: '',
      alignT: '',
      titleT: '',
      typeIdT: '',
      newsTimeT: '',
      newsTimeX: '',
      weightX: '',
      weightT: '',
      valueT: false,
      newsList: [
        {
          title: '新闻id',
          key: 'id',
          align: 'center'
        },
        {
          title: '类型名称',
          key: 'typeName',
          align: 'center'
        },
        {
          title: '新闻时间',
          key: 'newsTime',
          align: 'center'
        },
        // {
        //   title: '封面图片',
        //   key: 'img',
        //   align: 'center',
        //   render: (h, params) => {
        //     return h('img', {
        //       attrs: {
        //         src: params.row.img
        //       },
        //       style: {
        //         width: '200px',
        //         height: '200px',
        //         margin: '1rem 0'
        //       }
        //     })
        //   }
        // },
        {
          title: '新闻标题',
          key: 'name',
          align: 'center'
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
                    this.idX = params.row.id
                    this.typeIdX = params.row.typeId
                    this.titleX = params.row.name
                    this.alignX = params.row.img
                    this.detailsX = params.row.details
                    this.newsTimeX = params.row.newsTime
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
                    this.$http.delete('http://47.107.163.62:8089/admin/deleteNewById?id=' + params.row.id)
                      .then((res) => {
                        this.$http.get('http://47.107.163.62:8089/news/getAllNewsInfo')
                          .then((res) => {
                            this.newsData = res.data.data
                          })
                      })
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      newsData: []
    }
  },
  mounted: function () {
    if (sessionStorage.getItem('loginData') !== '1') {
      this.$router.push('/login')
    }
    this.$http.get('http://47.107.163.62:8089/news/getAllNewsInfo')
      .then((res) => {
        this.newsData = res.data.data
      })
  },
  methods: {
    okBack: function (response, file, fileList) {
      this.alignX = response.data
    },
    okBackT: function (response, file, fileList) {
      this.alignT = response.data
    },
    okPut: function () {
      this.$http.put('http://47.107.163.62:8089/admin/updateNew', {
        'id': this.idX,
        'img': this.alignX,
        'name': this.titleX,
        'typeId': this.typeIdX,
        'details': this.detailsX,
        'weight': this.weightX,
        'newsTime': this.newsTimeX
      }).then((res) => {
        this.$http.get('http://47.107.163.62:8089/news/getAllNewsInfo')
          .then((res) => {
            this.newsData = res.data.data
          })
      })
    },
    okPost: function () {
      if (this.typeIdT === '') {
        this.$Message.warning('请选择新闻类型')
      } else {
        this.$http.post('http://47.107.163.62:8089/admin/addNew', {
          'details': '',
          'img': this.alignT,
          'name': this.titleT,
          'typeId': this.typeIdT,
          'newsTime': this.newsTimeT,
          'weight': this.weightT
        }).then((res) => {
          this.$http.get('http://47.107.163.62:8089/news/getAllNewsInfo')
            .then((res) => {
              this.newsData = res.data.data
            })
        })
      }
    },
    open: function () {
      this.valueT = !this.valueT
    }
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
</style>
