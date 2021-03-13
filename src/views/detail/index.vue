<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="学号">
        <el-input v-model="stu_id" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.real_name" />
      </el-form-item>
      <el-form-item label="选择组别">
        <el-input v-model="form.group_id" />
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="form.sex" />
      </el-form-item>
      <el-form-item label="评语">
        <el-input v-model="form.comments" />
      </el-form-item>
      <el-form-item label="分数">
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
    </el-form>
  </div>
</template>

<script>
import { getdata } from '@/api/stu'
export default {
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
      }
    }
  },
  // 计算属性
  computed: {},
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
    getdata() {
      getdata(this.query).then(res => {
        console.log('res: ', res)
        this.form = res.data
      })
    }
  }
}
</script>
<style>

</style>
