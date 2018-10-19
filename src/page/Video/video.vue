<template>
  <el-main>

    <div class="top">
      <el-button @click="dialogVisible = true" type="primary"><i class="el-icon-plus" style="marginRight: 10px"></i>新增视频</el-button>
    </div>

    <el-table stripe :data="tableData">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" label="序号" width="100">
      </el-table-column>
      <el-table-column prop="nick" label="姓名">
      </el-table-column>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="description" label="描述">
      </el-table-column>
      <el-table-column prop="click" label="点击数">
      </el-table-column>
      <el-table-column prop="comment" label="评论数">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
      </el-table-column>
      <el-table-column prop="modifiedTime" label="修改时间">
      </el-table-column>
    </el-table>

    <el-dialog title="新增视频" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('form')">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>


<style lang="scss" rel="stylesheet/scss" scoped>
@import "./index";
</style>


<script>
import { getVideo, delVideo, addVideo, updateVideo } from "/api/video";
export default {
    data() {
        return {
            tableData: [],
            dialogVisible: false,
            form: {
                title: "",
                description: "",
                url: ""
            },
            rules: {
                title: [
                    {
                        required: true,
                        message: "请输入标题",
                        trigger: "blur"
                    }
                ],
                description: [
                    {
                        required: true,
                        message: "请输入描述",
                        trigger: "blur"
                    }
                ],
                url: [
                    {
                        required: true,
                        message: "请输入链接",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        submit(form) {
            this.$refs[form].validate(valid => {
                console.log(valid);
                if (valid) {
                    addVideo(this.form).then(res => {
                        if (res.code === 0) {
                            getVideo().then(res => {
                                if (res.code === 0) {
                                    this.tableData = res.data;
                                } else {
                                }
                            });
                            this.dialogVisible = false;
                        } else {
                        }
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    },
    created() {
        getVideo().then(res => {
            if (res.code === 0) {
                this.tableData = res.data;
            } else {
            }
        });
    }
};
</script>