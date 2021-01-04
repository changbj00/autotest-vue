<template>
  <Header>
    <div class="logo">
      <img src="../assets/logo.jpeg" onclick="toHome"/>
    </div>
    <Menu mode="horizontal" theme="dark" active-name="1">
      <div class="layout-nav">
        <Dropdown trigger="custom" :visible="visible" style="margin-left: 20px">
          <a href="javascript:void(0)" @click="handleOpen(visible)">{{userdata.username}}
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <p>确定退出吗？</p>
            <div style="text-align: right;margin:10px;">
              <Button type="primary" @click="handleClose">退出</Button>
            </div>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Menu>
  </Header>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    name: "header",
    data() {
      return {
        userdata: {
          username: '',
          department: '',
          role: '',
          email: ''
        },
        visible: false
      }
    },
    methods: {
      ...mapMutations(['delAll']),
      handleOpen(visible) {
        this.visible = !visible
      },
      handleClose() {
        //var storage = window.localStorage
        //this.userdata.username = storage.getItem('user')
        if (this.userdata.email != null) {
          //console.log(storage.getItem('usertoken'))
          this.$axios.post('/user/logOut', {"username": this.userdata.email}).then(res => {
            console.log("response", res)
            if (res.code === 10000) {
              this.delAll()
              this.$message.success('退出登录')
              this.$router.push('/login')
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            //console.log("err",err)
            this.$message.error('会话已过期，请重新登录！')
          })
        }
      },
      toHome() {
        this.router.push('/home')
      }
    },
    created() {
      var storage = window.localStorage
      this.userdata.username = JSON.parse(storage.getItem('user')).data.username
      this.userdata.role = JSON.parse(storage.getItem('user')).data.role
      this.userdata.department = JSON.parse(storage.getItem('user')).data.department
      this.userdata.email = JSON.parse(storage.getItem('user')).data.email
    }
  }
</script>

<style scoped>
  .ivu-layout-header {
    display: flex;
    justify-content: space-between;
  }

  .logo {
    height: 64px;
    margin-left: 0px;
  }

  .logo img {
    display: inline-block;
    width: 100px;
    height: 30px;
    margin-top: 17px;

  }

  .layout-nav {
    width: 420px;

    margin-right: 20px;
  }
</style>
