<template>
    <div class="register">
      <logo></logo>
      <h1>注册</h1>
      <Form ref="userdata" :model="userdata" :rules="ruleValidate" :label-width="80">
        <FormItem label="姓名" prop="username">
          <Input v-model="userdata.username" placeholder="请输入用户名">
          <Icon type="ios-person-outline" slot="prepend"/>
          </Input>
        </FormItem>
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
        <FormItem label="手机号" prop="phone">
          <Input v-model="userdata.phone" maxlength="11" placeholder="请输入手机号">
          <Icon type="ios-phone-portrait" slot="prepend"/>
          </Input>
        </FormItem>
        <FormItem label="部门" prop="department">
          <Select v-model="userdata.department" placeholder="请选择部门">
            <Option value="aa">研发部</Option>
            <Option value="bb">产品部</Option>
            <Option value="cc">运营部</Option>
          </Select>
        </FormItem>
        <FormItem label="角色" prop="role">
          <Select v-model="userdata.role" placeholder="请选择职位">
            <Option value="aa">测试</Option>
            <Option value="bb">开发</Option>
            <Option value="cc">产品</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" long @click="registerSubmit('userdata')">立即注册</Button>
          <span @click="handleReset('userdata')" style="margin-left: 0px">重新输入</span>
          <span @click="login" style="margin-right: 0px">已有账号！去登录</span>
        </FormItem>
      </Form>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import Logo from "../components/logo"
export default {
  name: 'register',
  components: {Logo},
  data () {
    return {
      userdata: {
        email: '',
        username: '',
        password: '',
        phone: '',
        department: '',
        role: ''
      },
      usertoken: '',
      ruleValidate: {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
      ],
        email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
      ],
        password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {type: 'string', min: 6, message: '密码长度需大于6位', trigger: 'blur'}
      ],
        phone: [
        {required: true, message: '请输入手机号', trigger: 'blur'},
        {type: 'number', message: '手机号格式不正确', trigger: 'blur',transform(value){
          var req=/^[1][3,4,5,7,8][0-9]{9}$/;
          if (!req.test(value)) {
            return false
          } else {
            return Number(value)
          }
          }}
      ],
        department: [
        { required: true, message: '请选择部门', trigger: 'change' }
      ],
        role: [
        { required: true, message: '请选择职位', trigger: 'change' }
      ]
    }
    }
  },
  methods: {
    ...mapMutations(['setToken']),
    registerSubmit (name) {
      this.$refs[name].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.$axios.post('/user/register',this.userdata).then(res => {
            console.log(res)
            var code = res.code
            var mes = res.msg
            if (code === 10000) {
              this.$message.success('注册成功!')
              this.usertoken = res.data.usertoken
              console.log('usertoken', this.usertoken)
              this.setToken({usertoken: this.usertoken})
              var storage = window.localStorage
              if (this.$store.state.usertoken) {
                this.$router.push('/home')
                console.log(this.$store.state.usertoken.usertoken)
              } else {
                this.$router.replace('/register')
              }
            } else {
              this.$message.error(mes)
            }
          }).catch(err => {
            console.log(err)
            this.$message.error('注册错误，请联系程序开发人员！！')
          })
        } else {
          this.$Message.error('请检查后重新输入!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    login () {
        console.log(this.from)
      if (this.name === 'login') {
        this.$router.back('/login')
      }
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .register {
    width: 400px;
    margin: 0 auto;
  }
  h1{
    font-weight: normal;
  }
  Button{
    display: block;
    width: 250px;
    height: 40px;
    margin: 0 auto;
    border: none;
    background-color: green;
    color: #ffff;
    font-size: 15px;
    margin-bottom: 5px;
  }
  span{
    cursor: pointer;
  }
  span:hover{
    color: green;
  }
</style>
