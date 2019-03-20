<template>
  <div class="hello">
    <div class="login-box">
      <Input class="input-box" v-model="password" placeholder="输入新密码" clearable />
      <Button class="login" @click="loginIn()" type="success">确认修改</Button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      password: ''
    }
  },
  mounted: function () {
    if (sessionStorage.getItem('loginData') !== '1') {
      this.$router.push('/login')
    }
  },
  methods: {
    loginIn: function () {
      this.$http.put('http://47.107.163.62:8089/admin/updatePassword?password=' + this.password + '&username=jdspace')
        .then((res) => {
          if (res.data.status === 2000) {
            this.$Message.success('修改成功')
          } else {
            this.$Message.error('修改失败，请检查网络设置')
          }
        })
    }
  }
}
</script>

<style scoped>
.hello {
  margin-left: 20rem;
}

.login-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  margin: 5rem auto;
  padding: 2rem 0;
  border-radius: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, .3);
}

.input-box {
  width: 80%;
  margin: 1rem 0;
}

.login {
  width: 40%;
  margin: .5rem 0;
}
</style>
