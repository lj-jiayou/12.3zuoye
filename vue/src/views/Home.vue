<template>
  <div class="home">
    <el-input
      v-model="input"
      placeholder="请输入内容"
      style="width:200px"
    ></el-input>
    <el-button type="primary" icon="el-icon-search" @click="search"
      >搜索</el-button
    >
    <el-button type="success" @click="tian">添加</el-button>

    <el-dialog title="商品" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <el-table :data="tableData" style="width: 500px">
          <el-table-column label="日期" width="80">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.username }}</p>
                <p>住址: {{ scope.row.password }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.username }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="云进货商1" name="second">云进货商1</el-tab-pane>
      <el-tab-pane label="关注用户1" name="third">关注用户1</el-tab-pane>
      <el-tab-pane label="成交" name="fourth">成交</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "home",
  components: {},
  data() {
    return {
      activeName: "second",
      input: "",
      tableData: [],
      username: "",
      password: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        username: "",
        password: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      editId: 0
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    delete() {
      this.username = "";
      this.password = "";
      this.dialogFormVisible = false;
    },
    tian() {
      this.dialogFormVisible = true;
      this.delete();
      this.editId = "";
    },
    add() {
      const { username, password, editId } = this;
      if (editId) {
        axios.post("/api/edit", { username, password, editId }).then(res => {
          if (res.data.code === 1) {
            alert("编辑成功");
            this.search();
            this.delete();
          } else {
            alert(res.data.msg);
          }
        });
      } else {
        axios.post("/api/add", { username, password }).then(res => {
          if (res.data.code === 1) {
            alert("添加成功");
            this.search();
            this.delete();
          } else {
            alert(res.data.msg);
          }
        });
      }
    },
    search() {
      axios.post("/api/list").then(res => {
        this.tableData = res.data.listHn;
      });
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.username = row.username;
      this.password = row.password;
      this.editId = row.editId;
    },
    handleDelete(index, row) {
      const { id } = row;
      axios.get("/api/del", { params: { id } }).then(res => {
        if (res.data.code === 1) {
          alert("要删除吗");
          this.search();
        } else {
          alert(res.data.msg);
        }
      });
    }
  }
};
</script>
