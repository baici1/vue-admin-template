<template>
  <div>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <echarts />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <echartsline />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <echartsaxis />
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import echarts from '@/components/echarts/index'
import echartsline from '@/components/echarts/line'
import echartsaxis from '@/components/echarts/axis'
export default {
  name: 'Dashoard',
  // import引入的组件需要注入到对象中才能使用
  components: { echarts, echartsline, echartsaxis },
  data() {
    // 这里存放数据
    return {}
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
  methods: {}
}
</script>

<style>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

}
.github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }
.chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-top: 32px;
    margin-bottom: 32px;
  }
@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
