<template>
  <Sider style="height: 100%">
    <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
      <Submenu name="query">
        <template slot="title">
          <Icon type="ios-navigate"></Icon>
          数据库表
        </template>
        <MenuItem name="select">
          <router-link to="/home/dataBase">查询系统</router-link>
        </MenuItem>
        <MenuItem name="update">更新数据
          <router-link to="/home/dataBase"/>
        </MenuItem>
        <MenuItem name="delete">删除数据
          <router-link to="/home/dataBase"/>
        </MenuItem>
        <MenuItem name="inserte">插入数据
          <router-link to="/home/dataBase"/>
        </MenuItem>
      </Submenu>
      <Submenu name="system">
        <template slot="title">
          <Icon type="ios-keypad"></Icon>
          系统管理
        </template>
        <MenuItem name="2-1">Option 1</MenuItem>
        <MenuItem name="2-2">Option 2</MenuItem>
      </Submenu>
      <Submenu name="demand">
        <template slot="title">
          <Icon type="ios-keypad"></Icon>
          需求管理
        </template>
        <MenuItem name="2-1">Option 1</MenuItem>
        <MenuItem name="2-2">Option 2</MenuItem>
      </Submenu>
      <Submenu name="test">
        <template slot="title">
          <Icon type="ios-analytics"></Icon>
          测试管理
        </template>
        <MenuItem name="3-1">Option 1</MenuItem>
        <MenuItem name="3-2">Option 2</MenuItem>
      </Submenu>
      <Submenu name="defect">
        <template slot="title">
          <Icon type="ios-analytics"></Icon>
          缺陷管理
        </template>
        <MenuItem name="3-1">Option 1</MenuItem>
        <MenuItem name="3-2">Option 2</MenuItem>
      </Submenu>
      <Submenu name="error">
        <template slot="title">
          <Icon type="ios-analytics"></Icon>
          故障管理
        </template>
        <MenuItem name="3-1">Option 1</MenuItem>
        <MenuItem name="3-2">Option 2</MenuItem>
      </Submenu>
      <Submenu name="monitor">
        <template slot="title">
          <Icon type="ios-analytics"></Icon>
          系统监控
        </template>
        <MenuItem name="3-1">Option 1</MenuItem>
        <MenuItem name="3-2">Option 2</MenuItem>
      </Submenu>
    </Menu>
  </Sider>
</template>

<script>
  import dataBase from '../view/dataBase'
  export default {
    name: "menu",
    components:{
      dataBase
    }
  }
</script>

<style scoped>
.ivu-menu {
  height: 100%;
  overflow: auto;
}

</style>
