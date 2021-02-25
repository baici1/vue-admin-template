<template>

  <!-- <div class="dashboard-text">name: {{ name }}</div> -->
  <div :class="className" :style="{height:height,width:width}" />

</template>

<script>
const echarts = require('echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
import { mapGetters } from 'vuex'
import { getList } from '@/api/table'
import resize from './mixins/resize'
export default {
  name: 'Echarts',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      list: [],
      listQuery: { // 分页数据
        page: 1,
        pagesize: 1000
      },
      boy1: 0,
      girl1: 0,
      boy2: 0,
      girl2: 0,
      chart: null,
      timeid: null// 定时器标识
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  destroyed() {
    clearInterval(this.timeid)
  },
  mounted() {
    this.initCharts()
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      let index
      this.listLoading = true
      getList(this.listQuery).then(response => {
        // console.log('response: ', response)
        this.list = response.data
        this.listLoading = false
        this.total = response.total
      }).then(() => {
        for (index in this.list) {
          if (this.list[index].sex === '1' && this.list[index].group_id === '1') {
            this.girl1 = this.girl1 + 1
          } else if (this.list[index].sex === '0' && this.list[index].group_id === '1') {
            this.boy1 = this.boy1 + 1
          } else if (this.list[index].sex === '1' && this.list[index].group_id === '0') {
            this.girl2 = this.girl2 + 1
          } else if (this.list[index].sex === '0' && this.list[index].group_id === '0') {
            this.boy2 = this.boy2 + 1
          }
        }
        console.log(this.boy1)
        this.setOptions()
        // 启动定时器
        this.time()
      })
    },
    // 初始化
    initCharts() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions()
      // 对图表对象鼠标事件进行监听
      this.chart.on('mouseover', () => {
        clearInterval(this.timeid)
      })
      this.chart.on('mouseout', () => {
        this.time()
      })
    },
    // 设置定时器
    time() {
      if (this.timeid) {
        clearInterval(this.timeid)
      }
      this.timeid = setInterval(() => {
        this.setOptions()
      }, 3000)
    },
    // 设置option
    setOptions() {
      this.chart.setOption({
        title: {
          text: '启明星男女比例'
        },
        tooltip: {},
        legend: {
          data: ['开发组', '智能组']
        },
        xAxis: {
          data: ['男', '女', '总人数']
        },
        yAxis: {},
        series: [{
          name: '开发组',
          type: 'bar',
          data: [this.boy1, this.girl1, this.boy1 + this.girl1]
        },
        {
          name: '智能组',
          type: 'bar',
          data: [this.boy2, this.girl2, this.boy2 + this.girl2]
        }]
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
