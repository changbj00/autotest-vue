<template>
  <div>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="100" inline>
    <h2>数据库查询</h2>
    <form class="top">
      <row>
      <FormItem label="数据库" prop="dataBases">
        <Select v-model="formValidate.dataBases" placeholder="选择数据库">
          <Option value="hermes">hermes</Option>
          <Option value="spore">spore</Option>
          <Option value="orion">orion</Option>
          <Option value="showEngines">showEngines</Option>
          <Option value="brSender">brSender</Option>
          <Option value="thinker">thinker</Option>
          <Option value="groot">groot</Option>
          <Option value="market">market</Option>
          <Option value="dragonfly">dragonfly</Option>
        </Select>
      </FormItem>
      <FormItem label="查询方式" prop="type">
        <Select v-model="formValidate.type" placeholder="选择查询方式">
          <Option value="key">关键字查询</Option>
          <Option value="sql">sql查询</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="zhiXing('formValidate')">执行</Button>
        <Button @click="chongZhi('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
      </row>
    </form>

    <form v-if="formValidate.type==='key'">
      <FormItem label="tables" prop="tables">
        <Select v-model="formValidate.selectTables"  multiple style="width:260px">
          <Option v-for="item in formValidate.tables" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="key" prop="key">
        <Input v-model="formValidate.onekey" placeholder="Enter key"></Input>
      </FormItem>
      <FormItem label="value" prop="value">
        <Input v-model="formValidate.onevalue" placeholder="Enter value"></Input>
      </FormItem>

    </form>
    <form v-if="formValidate.type==='sql'">
      <FormItem label="sql" prop="sql">
        <Input v-model="formValidate.sql" type="textarea" :autosize="{minRows: 0,maxRows: 500}"
               placeholder="Enter something..." :text-align="center"></Input>
      </FormItem>
    </form>
  </Form>
    <Table v-show="data2.length>0" border width="auto" :columns="columns" :data="data2"></Table>
  </div>
</template>

<script>

  export default {
    name: "dataBase",
    data() {
      return {
        formValidate: {
          onekey: '',
          onevalue: '',
          dataBases: '',
          type: '',
          tables: [{value:'aa',label:'aa'},{value:'qq',label:'qq'}],
          selectTables:[],
          sql: ''
        },
        columns: [],
        data2: [],
        ruleValidate: {
          onekey: [
            {required: true, message: 'The key cannot be empty', trigger: 'blur'}
          ],
          onevalue: [
            {required: true, message: 'The value cannot be empty', trigger: 'blur'}
          ],
          dataBases: [
            {required: true, message: 'Please select the dataBase', trigger: 'change'}
          ],
          type: [
            {required: true, message: 'Please select type', trigger: 'change'}
          ],
          tables: [
            {required: true, message: 'Please select tables', trigger: 'change'}
          ],
          sql: [
            {required: true, message: 'Please enter sql', trigger: 'blur'},
            {type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur'}
          ]
        },
        methods: {
          zhiXing(name) {
            this.$refs[name].validate((valid) => {
              if (valid) {
                this.$Message.success('Success!');
              } else {
                this.$Message.error('Fail!');
              }
            })
          },
          chongZhi(name) {
            this.$refs[name].resetFields();
          }
        },
        create() {
          //this.formValidate.tables
        }
      }
    }
  }
</script>

<style scoped>
.top{
  margin: 0 auto;
  margin-left: 20%;
  width: 20%;
display: inline;
}
</style>
