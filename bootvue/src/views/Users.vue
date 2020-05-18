<template>
  <div>
    <!-- 导航栏 -->
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">基于SpringBoot-Vue的用户信息管理</a>
        </div>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#">欢迎登陆：<span class="userInfo">王小星</span></a></li>
          </ul>
        </div>
    </nav>
    <!-- 搜索框 -->
    <el-row :gutter="20" align="center">
        <el-col :span="6" :offset="8">
            <el-input placeholder="请输入内容" v-model="queryInfo.name" clearable @clear="getUserList">
              <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
            </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addFormVisible = true">添加用户</el-button>
        </el-col>
    </el-row>
    <!-- 中心布局 -->
    <div class="container-fluid">
      <div class="row">
        <!-- 显示数据 -->
        <div class="col-md-8 col-md-offset-2">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>编号</th>
                <th>姓名</th>
                <th>年龄</th>
                <th>密码</th>
                <th>性别</th>
                <th>电话</th>
                <th>操作</th>
              </tr>
            </thead>
            <!-- 主要数据显示 -->
            <tbody>
              <tr v-for="(item) in userList" :key="item.id">
                <td>{{ item.id}}</td>
                <td>{{ item.name}}</td>
                <td>{{ item.age}}</td>
                <td>{{ item.pwd}}</td>
                <td>{{ item.gender == 1 ? '男' : ''}}{{ item.gender == 0 ? '女' : ''}}</td>
                <td>{{ item.phone }}</td>
                <td>
                  <button class="btn btn-success" @click="showUpdateDialog(item.id)">修改</button>&nbsp;&nbsp;&nbsp;&nbsp;;&nbsp;&nbsp;
                  <button class="btn btn-danger" @click="deleteUser(item.id)">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-12 fy">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.page"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryInfo.rows"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryInfo.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 添加用户Dialog -->
    <el-dialog
      title="添加用户"
      :visible.sync="addFormVisible"
      @close="addClearForm"
      width="30%">
      <span>
        <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="80px"  >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="userForm.name"></el-input>
          </el-form-item>
           <el-form-item label="年龄" prop="age">
            <el-input type="number" v-model="userForm.age"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="userForm.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="userForm.pwd"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="userForm.phone"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户Dialog -->
    <el-dialog
      title="修改用户"
      :visible.sync="updateFormVisible"
      @close="updateClearForm"
      width="30%">
      <span>
        <el-form ref="updateFormRef" :model="updateForm" :rules="userFormRules" label-width="80px"  >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="updateForm.name"></el-input>
          </el-form-item>
           <el-form-item label="年龄" prop="age">
            <el-input type="number" v-model="updateForm.age"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="updateForm.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="updateForm.pwd"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="updateForm.phone"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 自定义电话验证规则
    const checkMobile = (rule, value, callback) => {
      const regMobile = /^1[3456789]\d{9}$/
      if (!regMobile.test(value)) return callback(new Error('电话格式不正确'))
      callback()
    }
    const checkAge = (rule, value, callback) => {
      if (value > 130 || value < 1) return callback(new Error('年龄范围在1~130之间'))
      callback()
    }
    return {
      // 用户数据列表
      userList: [],
      // 添加用户Dialog是否可见
      addFormVisible: false,
      // 修改用户Dialog是否可见
      updateFormVisible: false,
      // 添加用户Form表单数据绑定
      userForm: {
        name: '',
        age: 0,
        gender: 0,
        pwd: '',
        phone: ''
      },
      // 表单验证
      userFormRules: {
        name: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请填写年龄', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '密码的长度是3~12之间', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
          { min: 11, max: 11, message: '手机号长度必须是11位', trigger: 'blur' }
        ]
      },
      // 修改用户Form表单数据绑定
      updateForm: {},
      // 分页数据
      queryInfo: {
        name: '',
        page: 1,
        rows: 5,
        total: 0
      }
    }
  },
  methods: {
    // 获取数据列表
    async getUserList() {
      const { data: res } = await this.$http.get('getUserList', { params: this.queryInfo })
      this.userList = res.data
      this.queryInfo.total = res.total
    },
    // 关闭添加Dialog时清空数据和校验
    addClearForm() {
      this.$refs.userFormRef.resetFields()
    },
    // 关闭修改Dialog时清空数据和校验
    updateClearForm() {
      this.$refs.updateFormRef.resetFields()
    },
    // 添加用户
    addUser() {
      this.$refs.userFormRef.validate(async valid => {
        if (!valid) {
          return null
        } else {
          const param = new URLSearchParams()
          param.append('name', this.userForm.name)
          param.append('age', this.userForm.age)
          param.append('gender', this.userForm.gender)
          param.append('pwd', this.userForm.pwd)
          param.append('phone', this.userForm.phone)
          const { data: res } = await this.$http.post('addUser', param)
          if (res !== 200) return this.$message.error('添加用户失败')
          this.$message.success('添加用户成功')
          this.addFormVisible = false
          this.getUserList()
        }
      })
    },
    // 显示修改用户Dialog
    async showUpdateDialog(id) {
      const data = await this.$http.get('getUserById', { params: { id: id } })
      if (data.status !== 200) return this.$message.error('获取修改列表失败!')
      this.updateForm = data.data
      this.updateFormVisible = true
    },
    // 修改用户
    updateUser() {
      this.$refs.updateFormRef.validate(async valid => {
        if (!valid) {
          return null
        } else {
          const param = new URLSearchParams()
          param.append('id', this.updateForm.id)
          param.append('name', this.updateForm.name)
          param.append('age', this.updateForm.age)
          param.append('gender', this.updateForm.gender)
          param.append('pwd', this.updateForm.pwd)
          param.append('phone', this.updateForm.phone)
          console.log(param)
          const data = await this.$http.put('updateUser', param)
          if (data.status !== 200) return this.$message.error('修改密码')
          this.$message.success('修改成功')
          this.updateFormVisible = false
          this.getUserList()
        }
      })
    },
    // 删除用户
    deleteUser(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const data = await this.$http.delete('deleteUser/' + id)
        if (data.status !== 200) return this.$message.error('删除失败')
        this.$message.success('删除成功!')
        this.getUserList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 每页大小发生变化
    handleSizeChange(newSize) {
      this.queryInfo.rows = newSize
      this.getUserList()
    },
    // 页发生改变
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getUserList()
    }
  },
  created() {
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>
.userInfo {
  color: #ff0000 !important;
  margin-right: 10px;
}
#container {
  margin-top: 15px;
}
.table{
  margin-top: 25px;
}
.fy {
  margin-top: 15px;
  text-align:center;
}
</style>
