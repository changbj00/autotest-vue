<template>
<div class="forgot">
  <logo></logo>
  <h1>忘记密码</h1>
  <Form ref="userdata" :model="userdata" :rules="ruleValidate" :label-width="80">
    <FormItem label="邮箱" prop="email">
      <Input v-model="userdata.email" placeholder="请输入邮箱">
      <Icon type="ios-at-outline" slot="prepend"/>
      </Input>
    </FormItem>
    <FormItem label="密码" prop="password">
      <Input type="password" password v-model="userdata.password" placeholder="请输入密码">
      <Icon type="ios-lock-outline" slot="prepend"/>
      </Input>
    </FormItem>
    <FormItem label="验证码" prop="code">
      <Input v-model="userdata.code" maxlength="6" placeholder="请输入验证码">
      <Icon type="ios-checkmark-circle-outline" slot="prepend"/>
      <Button slot="append" v-show="show" @click="getCode('userdata')">获取验证码</Button>
      <Button slot="append" v-show="!show" class="count">{{count}} s</Button>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" long @click="forgotSubmit('userdata')">忘记密码</Button>
      <span @click="login" >已有账号！去登录</span>
      <span @click="register" >没有账号！去注册</span>
    </FormItem>
  </Form>
</div>
</template>

<script>
import Logo from "../components/logo"
import {mapMutations} from 'vuex'
export default {
  name: 'forgot',
  components: {Logo},

  data () {
    return {
      userdata: {
        email: '',
        password: '',
        code: ''
      },
      usertoken: '',
      show: true,
      timer: null,
      count: '',
      ruleValidate: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {type: 'string', min: 6, message: '密码长度需大于6位', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {type: 'number', message: '验证码格式错误', trigger: 'blur',transform(value) {
              return Number(value);
            }}
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['setToken','setUser','delAll']),
    getCode(name) {
      this.$refs[name].validateField('email',(valid) => {
        console.log(valid)
        if (!valid) {
          console.log(this.userdata)
          const TIME_COUNT = 60;
          this.$axios.post('/sendEmailCode', this.userdata).then(res => {
            console.log(res)
            var code = res.code
            var mes = res.msg
            if (code === 10000) {
              this.$message.success('发送成功!')
              if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                  } else {
                    this.show = true;
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000)
              }
            } else {
              this.$message.error(mes)
            }
          }).catch(err => {
            console.log(err)
            this.$message.error('验证码发送失败，请联系程序开发人员！！')
          })
        }
        else {
            this.$Message.error('请检查后重新输入!');
          }
      })
    },
    forgotSubmit (name) {
      this.$refs[name].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.$axios.post('/user/forgetUser', this.userdata).then(res => {
            console.log(res)
            var code = res.code
            var mes = res.msg
            if (code === 10000) {
              this.$message.success('密码重置成功!')
              this.usertoken = res.data.usertoken
              console.log('usertoken', this.usertoken)
              this.delAll()
              this.setToken({usertoken: this.usertoken})
              this.setUser(res.data.user)
              var storage = window.localStorage
              if (storage) {
                this.$router.push('/home')
                console.log(this.$store.state.usertoken.usertoken)
              } else {
                this.$router.replace('/forgot')
              }
            } else {
              this.$message.error(mes)
            }
          }).catch(err => {
            console.log(err)
            this.$message.error('密码重置失败，请联系程序开发人员！！')
          })
        }
        else {
          this.$Message.error('请检查后重新输入!');
        }
      })
    },
    login () {
      this.$router.push('/login')
    },
    register() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
  .forgot {
    width: 400px;
    margin: 0 auto;
  }
</style>
