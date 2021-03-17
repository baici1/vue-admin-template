<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-position="left" label-width="80px">
      <el-row class="row">
        <el-col :span="6" class="flex_center">
          <img
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
            alt="photo"
            width="130"
            height="160"
          >
        </el-col>
        <el-col :span="8" class="col">
          <el-form-item label="学号:">
            <div class="input_id">{{ stu_id }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col">
          <el-form-item label="姓名:">
            <div class="input_id">{{ form.real_name }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="组别:">
            <div class="input_id">{{ group_id }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别:">
            <div class="input_id">{{ sex }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12" class="flex_center">
          <el-form-item label="C语言情况" style="width:500px">
            <el-input v-model="form.degree" />
          </el-form-item>
        </el-col>
        <el-col :span="12" class="flex_center">
          <el-form-item label="附加题" style="width:500px">
            <el-input v-model="form.attach" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12" class="flex_center">
          <el-form-item label="自学能力" style="width:500px">
            <el-input v-model="form.self_study" />
          </el-form-item>
        </el-col>
        <el-col :span="12" class="flex_center">
          <el-form-item label="能力拓展" style="width:500px">
            <el-input v-model="form.development" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="24" class="flex-center">
          <el-form-item label="准备工作" class="ready">
            <el-input v-model="form.ready" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="flex-center">
          <el-form-item label="评语" class="ready">
            <el-input v-model="form.comments" type="textarea" :autosize="{ minRows: 10, maxRows: 15}" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="综评:" style="padding-left:70px">
            <el-rate
              v-model="form.grades"
              :max="10"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              :low-threshold="3"
              :high-threshold="6"
              style="display:inline-block"
              show-score
              :allow-half="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-form-item label="学号">
        <el-input v-model="stu_id" :disabled="true" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.real_name" :disabled="true" />
      </el-form-item>
      <el-form-item label="选择组别">
        <el-input v-model="group_id" :disabled="true" />
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="sex" :disabled="true" />
      </el-form-item> -->
      <!-- <el-form-item label="分数">
        <el-input v-model="form.grades" />
      </el-form-item>
      <el-form-item label="自学能力">
        <el-input v-model="form.self_study" />
      </el-form-item>
      <el-form-item label="附加题">
        <el-input v-model="form.attach" />
      </el-form-item>
      <el-form-item label="能力拓展">
        <el-input v-model="form.development" />
      </el-form-item>
      <el-form-item label="准备工作">
        <el-input v-model="form.ready" />
      </el-form-item>
      <el-form-item label="C语言情况">
        <el-input v-model="form.degree" />
      </el-form-item>
      <el-form-item label="评语">
        <el-input v-model="form.comments" type="textarea" />
      </el-form-item> -->
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
            <el-button @click="callback">取消</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button id="one" type="primary" round @click="updateone">一面通过</el-button>
          <el-button id="two" class="two" type="success" round @click="updatetwo">二面通过</el-button>
        </el-col>
      </el-row>

    </el-form>

  </div>
</template>

<script>
import { getdata, upateddata, updateone, updatetwo } from '@/api/stu'
export default {
  inject: ['reload'],
  name: 'Detail',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: ['stu_id'],
  data() {
    // 这里存放数据
    return {
      query: {
        stu_id: this.stu_id
      },
      form: {
      },
      update: {
        one: '0',
        two: '0',
        stu_id: this.stu_id
      }
    }
  },
  // 计算属性
  computed: {
    group_id() {
      return this.form.group_id === 1 ? '开发组' : '智能组'
    },
    sex() {
      return this.form.sex === '0' ? '男' : '女'
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getdata()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 这里存放数据
  beforeCreate() {},
  // 生命周期 - 挂载之前
  beforeMount() {},
  // 生命周期 - 更新之前
  beforeUpdate() {},
  // 生命周期 - 更新之后
  updated() {},
  // 生命周期 - 销毁之前
  beforeDestroy() {},
  // 生命周期 - 销毁完成
  destroyed() {},
  // 如果页面有keep-alive缓存功能，这个函数会触发
  activated() {},
  // 方法集合
  methods: {
    async getdata() {
      const { data } = await getdata(this.query)
      console.log('data: ', data)
      this.form = data
      const one = document.getElementById('one')
      const two = document.getElementById('two')
      if (data.one === '1') {
        one.classList.add('one')
      }
      if (data.two === '1') {
        two.classList.add('two')
      }
    },
    async onSubmit() {
      console.log(this.form)
      const res = await upateddata(this.form)
      this.$notify({
        title: 'Success',
        message: 'update Successfully',
        type: 'success',
        duration: 2000
      })
      this.reload()
      console.log('res: ', res)
    },
    callback() {
      this.$router.go(-1)
    },
    updateone() {
      this.$confirm('此操作将让此同学一面通过, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const one = document.getElementById('one')
        const two = document.getElementById('two')
        one.classList.toggle('one')
        two.classList.toggle('two')
        this.update.one = '1'
        const res = await updateone(this.update)
        console.log('res: ', res)
        this.$message({
          type: 'success',
          message: '恭喜一面通过!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '回头是岸'
        })
      })
    },
    updatetwo() {
      this.$confirm('此操作将让此同学二面通过, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const two = document.getElementById('two')
        two.classList.toggle('two')
        this.update.two = '1'
        const res = await updatetwo(this.update)
        console.log('res2: ', res)
        this.$message({
          type: 'success',
          message: '恭喜二面通过!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '回头是岸'
        })
      })
    }
  }
}
</script>
<style>
.input_id{
  width: 100px;
  text-align: center;
  border-bottom: 1px solid black;
}
.flex_center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.row{
  margin-bottom:10px
}
.col{
  margin-bottom:20px
}
.ready{
  padding: 0 70px;
}
.one{
  display:none
  }
  .two{
  display: none;
  }
</style>
