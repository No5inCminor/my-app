<template>
<el-container style="height: 500px; border: 1px solid #eee">
  <el-aside v-model="search" width="200px" style="background-color: rgb(238, 241, 246)">
    
    <el-menu :default-openeds="['1']" class="el-menu-vertical-demo" >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-message"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="dialogVisible = true">选项1</el-menu-item>

          <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>

        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <template slot="title">导航二</template>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <template slot="title">导航三</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <div style="width: 200px; float: left">
        <el-input v-model="search" size="mini" placeholder="请输入内容" style="wdith: 100%"/>
      </div>
      <el-dropdown >
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item >查看</el-dropdown-item>
          <el-dropdown-item @click.native="addOpen = true">新增</el-dropdown-item>
          <el-dropdown-item >删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    <el-main>
      <el-table :data="getTableData()" 
      @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="right" fixed="right" label="操作" width="100px">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="1"
          :page-sizes="[1, 2, 5, 10]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalSize">
        </el-pagination>
      </div>
    </el-main>
  </el-container>

  <el-dialog title="编辑" :visible.sync="editOpen">
    <el-form :model="editform" :rules="rules" ref="editform">
      <el-form-item label="日期" :label-width="formLabelWidth" prop="date">
        <el-date-picker v-model="editform.date" type="date" placeholder="选择日期" 
        format="yyyy 年 MM 月 dd 日" style="width: 100%"></el-date-picker>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="editform.name" autocomplete="off" ref="name"></el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
        <el-input v-model="editform.address" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editOpen = false">取 消</el-button>
      <el-button type="primary" @click="submitEdit()">确 定</el-button>
      <el-button type="warning" plain @click="reset('editform')">重 置</el-button>
    </div>
  </el-dialog>

  <el-dialog title="添加" :visible.sync="addOpen">
    <el-form :model="addform" :rules="rules" ref="addform">
      <el-form-item label="日期" :label-width="formLabelWidth" prop="date">
        <el-date-picker v-model="addform.date" type="date" placeholder="选择日期" 
        format="yyyy 年 MM 月 dd 日" style="width: 100%"></el-date-picker>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="addform.name" autocomplete="off" ref="name"></el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
        <el-input v-model="addform.address" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addOpen = false">取 消</el-button>
      <el-button type="primary" @click="submitAdd()">确 定</el-button>
      <el-button type="warning" plain @click="reset('addform')">重 置</el-button>
    </div>
  </el-dialog>

  <el-dialog title="查看" :visible.sync="viewVisible">
    <el-table :data="rowData">
      <el-table-column property="date" label="日期" ></el-table-column>
      <el-table-column property="name" label="姓名" ></el-table-column>
      <el-table-column property="address" label="地址" show-overflow-tooltip></el-table-column>
    </el-table>
  </el-dialog>
</el-container>

</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }

  .el-dialog {
    text-align: left;
  }

</style>

<script>
import axios from 'axios'

  export default {
    data() {     
      const checkage = (rule, value, callback) => {
        if (!value) {
          callback(new Error('empty error'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      const checkname = (rule, value, callback) => {
        if (!value) {
          callback(new Error('empty error'))
        }
        else {
          callback()
        }
      };
      return {
        isCollapse: true,
        allData: [],
        instance: null,
        dialogVisible: false,
        viewVisible: false,
        rowData: [],
        editOpen: false,
        addOpen: false,
        editform: {
          date: '',
          name: '',
          address: ''
        },
        addform: {
          date: '',
          name: '',
          address: ''
        },
        formLabelWidth: '50px',
        rules: {
          date: [{
            required: true,
            trigger: 'blur'
          }],
          name: [{
            validator: checkname,
            trigger: 'blur'
          }],
          age: [{
            validator: checkage, 
            trigger: 'blur'
          }],
          address: [{
            validator: checkname,
            trigger: 'blur'
          }]
        },
        multipleSelection: [],
        search:'',
        currentPage: 1,
        pageSize: '1',
        totalSize: ''
      }
    },
    methods: {
      getAllData() {
        this.instance = axios.create({})
        this.instance.get('/data.json').then(res=>{
          this.allData = res.data
        })
      },
      getTableData() {
        var tableData = this.allData.slice((this.currentPage-1)*this.pageSize, this.currentPage*this.pageSize)
        //  console.log(`search-input: ${this.search}`)
        if(this.search != null || this.search != '') {
          var searchData = this.allData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
          this.totalSize = searchData.length
          tableData = searchData.slice((this.currentPage-1)*this.pageSize, this.currentPage*this.pageSize)
        }
        return tableData
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.totalSize = this.allData.length;
        return this.allData.slice((this.currentPage-1)*this.pageSize, this.currentPage*this.pageSize)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.totalSize = this.allData.length;
        return this.allData.slice((this.currentPage-1)*this.pageSize, this.currentPage*this.pageSize)
      },
      handleSelectionChange (val) {
        console.log(val)
      },  
      handleClick(row) {
        this.viewVisible = true;
        this.rowData.splice(0, 1, row)
        console.log(row);
      },
      editClick(row) {
        this.editOpen = true;
        this.editform = row
        console.log(row)
      },

      submitEdit() {
        let formData = new FormData()
        for(var key in this.editform) {
          formData.append(key, this.editform[key])
        }
        axios.post('/post', formData).then(res=>{
          console.log(res)
        })
        this.$refs.editform.validate((valid) => {
          if (valid) {
            this.$message('submit success')
            console.log('submit success')
            this.editOpen = false
          } else {
            console.log('submit error');
            return false;
          }
        });
      },
      submitAdd() {
        let formData = new FormData()
        for(var key in this.addform) {
          formData.append(key, this.addform[key])
        }
        axios.post('/post', formData).then(res=>{
          console.log(res)
        })
        this.$refs.addform.validate((valid) => {
          if (valid) {
            this.$message('submit success')
            console.log('submit success')
            this.addOpen = false
          } else {
            console.log('submit error');
            return false;
          }
        });
      },
      reset(form) {
        this.$refs[form].resetFields();
      }
    },
    mounted() {
      this.getAllData()
    }
  };
</script>