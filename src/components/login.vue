<template>
  <div class="hello">
    <form @keyup.enter="loginIn()">
      <div class="login-box">
        <Input class="input-box" v-model="username" placeholder="输入用户名" clearable />
        <Input class="input-box" type="password" v-model="password" placeholder="输入密码" clearable />
        <Button class="login" @click="loginIn()" type="success">登录</Button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    loginIn: function () {
      if (this.username === '' || this.password === '') {
        this.$Message.warning('用户名或密码为空')
      } else {
        this.$http.post('http://47.107.163.62:8089/admin/login?password=' + this.password + '&username=' + this.username)
          .then((res) => {
            if (res.data.status === 2000) {
              this.$Message.success('登录成功')
              this.$router.push('/')
              window.location.reload()
              sessionStorage.setItem('loginData', 1)
            } else {
              this.password = ''
              this.$Message.error('用户名或密码错误')
            }
          })
      }
    }
  }
// password 123
// username admin
}
</script>

<style scoped>
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
