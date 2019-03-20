<template>
  <div class="hello">
    <div>
      <span>公司地址</span>
      <Input v-model="addressChinese" type="text" style="width: 100%; margin-top: .5rem" />
    </div>
    <div>
      <span>公司地址英文</span>
      <Input v-model="addressEnglish" type="text" style="width: 100%; margin-top: .5rem" />
    </div>
    <div>
      <span>公司邮箱1</span>
      <Input v-model="businessEmail" type="text" style="width: 100%; margin-top: .5rem" />
    </div>
    <div>
      <span>公司邮箱2</span>
      <Input v-model="recruitEmail" type="text" style="width: 100%; margin-top: .5rem" />
    </div>
    <div>
      <span>公司电话1</span>
      <Input v-model="contactNumber1" type="text" style="width: 100%; margin-top: .5rem" />
    </div>
    <div>
      <span>公司电话2</span>
      <Input v-model="contactNumber2" type="text" style="width: 100%; margin-top: .5rem" />
    </div>
    <div>
      <span>公司合作伙伴</span>
      <Input v-model="cooperativeUnit" type="textarea" :rows="10" style="width: 100%; margin-top: .5rem" />
    </div>
    <div>
      <span>公司介绍</span>
      <Input v-model="introduce" type="text" style="width: 100%; margin-top: .5rem" />
    </div>
    <div>
      <span>公司名称</span>
      <Input v-model="name" type="text" style="width: 100%; margin-top: .5rem" />
    </div>
    <div>
      <span>公司服务</span>
      <Input v-model="service" type="text" style="width: 100%; margin-top: .5rem" />
    </div>
    <div>
      <img class="img-box" :src="img" alt="">
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
    </div>
    <Button @click="okPut()" type="warning">提交修改</Button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      addressChinese: '',
      addressEnglish: '',
      businessEmail: '',
      contactNumber1: '',
      contactNumber2: '',
      cooperativeUnit: '',
      introduce: '',
      name: '',
      recruitEmail: '',
      service: '',
      img: ''
    }
  },
  mounted: function () {
    if (sessionStorage.getItem('loginData') !== '1') {
      this.$router.push('/login')
    }
    this.$http.get('http://47.107.163.62:8089/admin/companyInfo')
      .then((res) => {
        var r = res.data.data
        this.addressChinese = r.addressChinese
        this.addressEnglish = r.addressEnglish
        this.businessEmail = r.businessEmail
        this.contactNumber1 = r.contactNumber1
        this.contactNumber2 = r.contactNumber2
        this.cooperativeUnit = r.cooperativeUnit
        this.introduce = r.introduce
        this.name = r.name
        this.recruitEmail = r.recruitEmail
        this.service = r.service
        this.img = r.cooperationUnitImg
      })
  },
  methods: {
    okBack: function (response, file, fileList) {
      this.img = response.data
    },
    okPut: function () {
      this.$http.put('http://47.107.163.62:8089/admin/updateCompanyInfo', {
        'addressChinese': this.addressChinese,
        'addressEnglish': this.addressEnglish,
        'businessEmail': this.businessEmail,
        'contactNumber1': this.contactNumber1,
        'contactNumber2': this.contactNumber2,
        'cooperativeUnit': this.cooperativeUnit,
        'cooperationUnitImg': this.img,
        'id': 1,
        'introduce': this.introduce,
        'name': this.name,
        'recruitEmail': this.recruitEmail,
        'service': this.service
      }).then((res) => {
        this.$http.get('http://47.107.163.62:8089/admin/companyInfo')
          .then((res) => {
            var r = res.data.data
            this.addressChinese = r.addressChinese
            this.addressEnglish = r.addressEnglish
            this.businessEmail = r.businessEmail
            this.contactNumber1 = r.contactNumber1
            this.contactNumber2 = r.contactNumber2
            this.cooperativeUnit = r.cooperativeUnit
            this.introduce = r.introduce
            this.name = r.name
            this.recruitEmail = r.recruitEmail
            this.service = r.service
            this.img = r.cooperationUnitImg
          })
      })
    }
  }
}
</script>

<style scoped>
.hello {
  margin: 2rem 20rem;
  width: 80%;
}

.hello div {
  margin: 1rem 0;
}

.img-box {
  display: block;
  width: 80%;
  margin: 0 auto;
}
</style>
