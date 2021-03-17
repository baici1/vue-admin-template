<template>
  <div class="app-container">
    <el-table
      :data="form"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="学号"
        width="180"
      >
        <template v-slot="scope">
          <router-link :to="{name:'Detail',params:{stu_id:scope.row.stu_id}}">
            {{ scope.row.stu_id }}
          </router-link>
        </template>

      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template v-slot="scope">
          <router-link :to="{name:'Detail',params:{stu_id:scope.row.stu_id}}">
            {{ scope.row.real_name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template v-slot="scope">
          <router-link :to="{name:'Detail',params:{stu_id:scope.row.stu_id}}">
            {{ scope.row.sex ==='0'?"男":"女" }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="C语言" align="center">
        <template v-slot="scope">
          <router-link :to="{name:'Detail',params:{stu_id:scope.row.stu_id}}">
            {{ scope.row.degree }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="附加题" align="center">
        <template v-slot="scope">
          <router-link :to="{name:'Detail',params:{stu_id:scope.row.stu_id}}">
            {{ scope.row.attach }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="自学能力" align="center">
        <template v-slot="scope">
          <router-link :to="{name:'Detail',params:{stu_id:scope.row.stu_id}}">
            {{ scope.row.self_study }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="能力拓展" align="center">
        <template v-slot="scope">
          <router-link :to="{name:'Detail',params:{stu_id:scope.row.stu_id}}">
            {{ scope.row.development }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="评分" align="center">
        <template v-slot="scope">
          <router-link :to="{name:'Detail',params:{stu_id:scope.row.stu_id}}">
            {{ scope.row.grades }}
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import { getone } from '@/api/stu'
export default {
  data() {
    // 这里存放数据
    return {
      form: []
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
    async getdata() {
      const res = await getone()
      console.log('res: ', res)
      const form = []
      res.data.forEach(function(item) {
        console.log('item: ', item)
        if (item.group_id === '1') {
          form.push(item)
        }
      })
      this.form = form
    }
  }
}
</script>
<style >

</style>
