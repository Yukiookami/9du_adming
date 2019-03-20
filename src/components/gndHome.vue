<template>
  <div class="hello">
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
    </Modal>
    <Table width='1000px' class="table-box" border :columns="slideList" :data="slideData"></Table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      valueX: false,
      img: '',
      idX: '',
      slideList: [
        {
          title: 'id',
          key: 'id',
          width: 150,
          align: 'center'
        },
        {
          title: '轮播图片',
          key: 'slide',
          align: 'center',
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.slide
              },
              style: {
                width: '200px',
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
                    this.img = params.row.slide
                    this.idX = params.row.id
                  }
                }
              }, '修改')
            ])
          }
        }
      ],
      slideData: []
    }
  },
  mounted: function () {
    if (sessionStorage.getItem('loginData') !== '1') {
      this.$router.push('/login')
    }
    this.$http({
      method: 'get',
      url: 'http://47.107.163.62:8089/admin/getSlides'
    }).then((res) => {
      this.slideData = res.data.data
    })
  },
  methods: {
    okGoBack: function (response, file, fileList) {
      this.img = response.data
    },
    okPut: function () {
      this.$http.put('http://47.107.163.62:8089/admin/updateSlides', {
        'id': this.idX,
        'slide': this.img
      }).then((res) => {
        console.log(this.img)
        this.$http.get('http://47.107.163.62:8089/admin/getSlides')
          .then((res) => {
            this.slideData = res.data.data
          })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
