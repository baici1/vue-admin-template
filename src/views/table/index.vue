<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="adddata" placeholder="请输入内容" class="input-with-select" style="width: 400px;" clearable @clear="searchdata">
        <el-select slot="prepend" v-model="select" placeholder="请选择">
          <el-option label="姓名" value="1" />
          <el-option label="组别" value="2" />
          <el-option label="录取情况" value="3" />
        </el-select>
        <el-button slot="append" icon="el-icon-search" />
      </el-input> -->

      <el-input v-model="adddata.real_name" placeholder="输入姓名" style="width: 200px;" class="filter-item" clearable @clear="searchdata" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchdata">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
      <a href="http://47.113.203.60:8081/download">
        <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download">
          export
        </el-button>
      </a>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;">
        录取情况
      </el-checkbox>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      :row-class-name="tableRowClassName"
      highlight-current-row
      :default-sort="{prop: 'code', order: 'descending',prop: 'stu_id'}"
    >
      <el-table-column align="center" label="序号" width="80" sortable prop="stu_id">
        <template v-slot="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>

      <el-table-column label="学号" align="center">
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

      <el-table-column
        label="选择组别"
        align="center"
        :filters="[{text: '智能组', value: '0'}, {text: '开发组', value: '1'}]"
        :filter-method="filterHandler"
      >
        <template v-slot="scope">
          <router-link :to="{name:'Detail',params:{stu_id:scope.row.stu_id}}">
            {{ scope.row.group_id ==='1'?"开发组":"智能组" }}
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
      <el-table-column label="学院" align="center" :filters="filter" :filter-method="filtercollege">
        <template v-slot="scope">
          <router-link :to="{name:'Detail',params:{stu_id:scope.row.stu_id}}">
            {{ scope.row.college }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="专业" align="center">
        <template v-slot="scope">
          <router-link :to="{name:'Detail',params:{stu_id:scope.row.stu_id}}">
            {{ scope.row.major }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="电话" align="center">
        <template v-slot="scope">
          <router-link :to="{name:'Detail',params:{stu_id:scope.row.stu_id}}">
            {{ scope.row.phone }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="qq" align="center">
        <template v-slot="scope">
          <router-link :to="{name:'Detail',params:{stu_id:scope.row.stu_id}}">
            {{ scope.row.qq }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="成绩" align="center" sortable prop="code">
        <template v-slot="scope">
          <router-link :to="{name:'Detail',params:{stu_id:scope.row.stu_id}}">
            {{ scope.row.code }}
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template v-slot="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row.stu_id)">
            Delete
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        v-if="showReviewer"
        label="是否录取"
        width="110"
        align="center"
        :filters="[{text: '为面试', value: '0'}, {text: '已录取', value: '1'},{text: '笔试通过', value: '2'},{text: '面试通过', value: '3'}]"
        :filter-method="filter_result"
      >
        <template v-slot="scope">
          {{ scope.row.result==0?"未录取": scope.row.result==1?"已录取":"测试通过" }}
        </template>
      </el-table-column>

    </el-table>
    <!-- 分页 -->
    <!-- <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="14"
      :current-page.sync="listQuery.page"
      @current-change="handleCurrentChange"
    /> -->
    <!-- update对话框 -->
    <el-dialog
      :title="dialogStatus"
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="temp" :model="temp" label-width="80px">
        <el-form-item label="学号">
          <el-input v-model="temp.stu_id" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="temp.real_name" />
        </el-form-item>
        <el-form-item label="选择组别">
          <el-select v-model="temp.group_id" placeholder="请选择">
            <el-option
              key="1"
              label="开发组"
              value="1"
            />
            <el-option
              key="0"
              label="智能组"
              value="0"
            />

          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="temp.sex" placeholder="请选择">
            <el-option
              key="0"
              label="男"
              value="0"
            />
            <el-option
              key="1"
              label="女"
              value="1"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="temp.college" />
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="temp.major" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="temp.phone" />
        </el-form-item>
        <el-form-item label="qq">
          <el-input v-model="temp.qq" />
        </el-form-item>
        <el-form-item label="成绩">
          <el-input v-model="temp.code" />
        </el-form-item>
        <el-form-item label="录取情况">
          <el-select v-model="temp.result" placeholder="请选择">
            <el-option
              key="0"
              label="未面试"
              value="0"
            />
            <el-option
              key="1"
              label="已录取"
              value="1"
            />
            <el-option
              key="2"
              label="笔试通过"
              value="2"
            />
            <el-option
              key="3"
              label="面试通过"
              value="3"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="updateData()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- add对话框 -->
    <el-dialog
      :title="dialogStatus"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="stu" :model="stu" label-width="80px">
        <el-form-item label="学号">
          <el-input v-model="stu.stu_id" placeholder="请输入正确" />
        </el-form-item>
        <!-- <el-form-item label="密码">
          <el-input v-model="adddata.password" placeholder="随意输入" />
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="createData()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: rgb(225,243,216);
  }
  .el-table .Brand-row {
    background: #d3f5c0;
  }
   .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
<script>
import { deletelist, getList, download, updatelist, addlist, searchlist } from '@/api/table'
export default {
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       published: 'success',
  //       draft: 'gray',
  //       deleted: 'danger'
  //     }
  //     return statusMap[status]
  //   }
  // },
  data() {
    return {
      value: '',
      downloadLoading: false, // 下载转动效果
      list: [], // 获取的数据
      total: 1, // 数目总数
      listLoading: true, // 转动效果
      listQuery: { // 分页数据
        page: 1,
        pagesize: 1000
      },
      stu: {
        stu_id: ''
      },
      dialogVisible1: false, // update对话框隐藏和显示
      dialogVisible2: false, // add对话框隐藏和显示
      dialogStatus: '', // 对话框标题,
      adddata: { // 添加
        real_name: '',
        group_id: '',
        result: ''
      },
      temp: { // 更改form
        id: '',
        stu_id: '',
        password: '',
        real_name: '',
        group_id: '',
        sex: '',
        college: '',
        major: '',
        phone: '',
        qq: '',
        result: '',
        code: ''
      },
      group_one: [],
      group_two: [],
      showReviewer: false, // 录取情况,
      select: 0,
      filter: [
        {
          text: '计算机与信息学院',
          value: '计算机与信息学院'
        },
        {
          text: '材料与化工学院',
          value: '材料与化工学院'
        },

        {
          text: '电气与新能源学院',
          value: '电气与新能源学院'
        },
        {
          text: '理学院',
          value: '理学院'
        }]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 显示
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        console.log('response: ', response)
        this.list = response.data
        this.listLoading = false
        this.total = response.total
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.result === '1') {
        return 'success-row'
      } else if (row.result === '2') {
        return 'warning-row'
      } else if (row.result === '3') {
        return 'Brand-row'
      }
      return ''
    },
    // 更改表单
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogVisible1 = true
      this.temp = Object.assign({}, row)
      console.log('this.temp: ', this.temp)
    },
    updateData() {
      this.$notify({
        title: 'Success',
        message: 'update Successfully',
        type: 'success',
        duration: 2000
      })
      this.dialogVisible1 = false
      updatelist(this.temp).then(res => {
        console.log('res: ', res)
        this.fetchData()
      })
    },
    // 监听页码
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.listQuery.page = val
      this.fetchData()
    },
    // 删除信息
    handleDelete(stu_id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.stu.stu_id = stu_id
        deletelist(this.stu).then(response => {
          console.log('response: ', response)
          this.fetchData()
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 增加信息
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogVisible2 = true
    },
    createData() {
      this.dialogVisible2 = false
      addlist(this.stu).then(res => {
        console.log('res: ', res)
        this.fetchData()
        this.$notify({
          title: 'Success',
          message: 'add Successfully',
          type: 'success',
          duration: 2000
        })
        this.stu.stu_id = ''
      }).catch(() => {
        this.$message.error('学号已存在')
        this.stu.stu_id = ''
      })
    },
    // 查询数据
    searchdata() {
      if (this.adddata.real_name === '') {
        this.fetchData()
      } else {
        searchlist(this.adddata).then(res => {
          console.log('res: ', res)
          // this.list.splice(0, this.list.length)
          // this.list.push(res.data)
          this.list = res.data
          this.total = res.data.length
          console.log('this.list: ', this.list)
        }).catch(() => {
          this.$message.error('找不到')
        })
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 下载
    handleDownload() {
      this.downloadLoading = true
      download().then(response => {
        console.log('response: ', response)
        this.downloadLoading = false
      })
      // import('@/vendor/Export2Excel').then(excel => {
      //   const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
      //   const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
      //   const data = this.formatJson(filterVal)
      //   excel.export_json_to_excel({
      //     header: tHeader,
      //     data,
      //     filename: 'table-list'
      //   })
      //   this.downloadLoading = false
      // })
    },
    filterHandler(value, row, column) {
      return row.group_id === value
    },
    filter_result(value, row) {
      return row.result === value
    },
    filtercollege(value, row) {
      return row.college === value
    }
  }
}
</script>
