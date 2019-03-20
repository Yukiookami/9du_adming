<template>
  <div class="hello">
     <Menu v-if="show" class="nav-box" theme="dark" active-name="1">
       <div class="tittle-box" @click="goHome()">
         <img src="../assets/logo.png" alt="">
         <h2></h2>
       </div>
        <MenuItem to='/' name="1">
            <Icon type="md-images" />
            首页轮播图管理
        </MenuItem>
        <MenuItem to='./gndEx' name="2">
            <Icon type="logo-steam" />
            专长管理
        </MenuItem>
        <MenuItem to='./gndKaisha' name="3">
            <Icon type="ios-pricetags" />
            公司信息管理
        </MenuItem>
        <MenuItem to='./gndMember' name="4">
            <Icon type="ios-contacts" />
            公司成员管理
        </MenuItem>
        <MenuItem to='./gndNews' name="5">
            <Icon type="md-planet" />
            新闻管理
        </MenuItem>
        <MenuItem to='./gndNewsDetil' name="10">
            <Icon type="ios-chatbubbles" />
            新闻详情管理
        </MenuItem>
        <MenuItem to='./gndWork' name="6">
            <Icon type="logo-playstation" />
            项目管理
        </MenuItem>
        <MenuItem to='./gndWorkDetil' name="8">
            <Icon type="logo-octocat" />
            项目详情管理
        </MenuItem>
        <MenuItem to='./gndJoin' name="7">
            <Icon type="md-person-add" />
            招聘信息管理
        </MenuItem>
        <MenuItem to='./changePassword' name="9">
            <Icon type="ios-construct" />
            修改密码
        </MenuItem>
    </Menu>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      show: false
    }
  },
  mounted: function () {
    if (sessionStorage.getItem('loginData') === '1') {
      this.show = true
    } else {
      this.show = false
    }
  },
  methods: {
    goHome: function () {
      window.location.href = 'http://beta.9du.vip/#/'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
}

.nav-box {
  height: 100%;
}

.tittle-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  cursor: pointer;
}

.tittle-box h2 {
  color: #FFF;
  font-weight: normal;
}
</style>
