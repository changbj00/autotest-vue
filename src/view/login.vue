<template>
  <div class="login">
    <Logo></Logo>
    <h1>登录</h1>
    <Form ref="loginform" :model="loginform" :rules="ruleInline">
      <FormItem prop="username">
        <Input type="text" v-model="loginform.username" placeholder="请输入用户名">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" password v-model="loginform.password" placeholder="请输入密码">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" long @click="loginSubmit('loginform')">登录</Button>
      </FormItem>
      <span @click="register">没有账号?去注册</span>
      <span @click="forgot">忘记密码</span>
    </Form>
  </div>
</template>

<script>
  // 在这个组件script标签的export default上面引入一个东西
  import {mapMutations} from 'vuex'
  import Logo from '../components/logo'
  export default {
    name: 'login',
    components: {Logo},
    data() {
      return {
        usertoken: '',
        loginform: {
          username: '',
          password: ''
        },
        ruleInline: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {type: 'email',message: '邮件格式错误', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度需大于6位', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapMutations(['setToken']),
      loginSubmit(name) {
        this.$refs[name].validate((valid) => {
          console.log(valid)
          if (valid) {
            this.$axios.post('/user/login', this.loginform)
              .then(res => {
                console.log(res)
                var code = res.code
                var mes = res.msg
                if (code === 10000) {
                  this.$message.success('登录成功')
                  this.usertoken = res.data.usertoken
                  console.log('usertoken', this.usertoken)
                  this.setToken({usertoken: this.usertoken})
                  var storage = window.localStorage
                  if (this.$store.state.usertoken) {
                    this.$router.push('/home')
                    console.log(this.$store.state.usertoken.usertoken)
                  } else {
                    this.$router.replace('/login')
                  }
                } else {
                  this.$message.error(mes)
                }
              }).catch(err => {
              console.log(err)
              this.$message.error('登录错误，请联系程序开发人员！！')
            })
          } else {
            this.$Message.error('请重新输入！');
          }
        })
      },
      register() {
        this.$router.push('/register')
      },
      forgot() {
        this.$router.push('/forgot')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    width: 300px;
    margin: 0 auto;
  }

  h1 {
    font-weight: normal;
  }

  span {
    cursor: pointer;
  }

  span:hover {
    color: green;
  }
</style>
