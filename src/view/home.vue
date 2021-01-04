<template>
    <Layout>
      <Header/>
      <Layout>
        <Sider>
          <div style="overflow: auto;height: 80%">
            <Menu/>
          </div>
        </Sider>

          <Content><router-view/></Content>


      </Layout>
      <Footer class="layout-footer-center">互联网平台事业部-测试组</Footer>
    </Layout>
</template>

<script>
  import Header from '../components/header'
  import Menu from '../components/menu'

  export default {
    name: 'home',
    components: {
      Header, Menu
    },
    data() {
      return {
        userdata: {
          username: '',
          department: '',
          role: '',
          email: ''
        },
      }
    },
    methods: {},
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
  /*.layout {*/
    /*border: 1px solid #d7dde4;*/
    /*background: #f5f7f9;*/
    /*border-radius: 4px;*/
    /*overflow: hidden;*/
    /*position: absolute;*/
    /*height: 100%;*/
    /*width: 100%;*/
  /*}*/

  /*.layout-footer-center {*/
    /*text-align: center;*/
    /*height: 30px;*/
    /*position: absolute;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*right: 0;*/
  /*}*/
  .ivu-layout {
    height: 100%;
  }

</style>
