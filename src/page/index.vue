<template>
  <el-container style="height: 100vh">
  <el-aside width="200px" style="background-color: #ffffff">
    <img style="height: 120px"  src="./../../static/images/smartisan_4ada7fecea.png"/>
    <el-menu :default-openeds="['1','2']">
       <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>首页</template>
        <el-menu-item-group>
          <el-menu-item @click="checkTab('1-1')"  :class="{'is-active': tabId === '1-1'}" index="1-1"><i class="el-icon-view"></i>控制台</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-info"></i>图文管理</template>
        <el-menu-item-group>
          <el-menu-item @click="checkTab('2-1')" :class="{'is-active': tabId === '2-1'}"  index="2-1"><i class="el-icon-picture-outline"></i>视频管理</el-menu-item>
          <el-menu-item @click="checkTab('2-2')" :class="{'is-active': tabId === '2-2'}"  index="2-2"><i class="el-icon-picture"></i>图片管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>

    <router-view class="main"></router-view>

    </el-container>
</el-container>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      tabId: '1-1'
    };
  },
  computed: {
    ...mapState(["cartPositionT"]),
  },
  methods: {
    ...mapMutations(["ADD_ANIMATION"]),
    checkTab(tabId) {
      let path;
      switch (tabId) {
        case "1-1":
          path = "/home";
          break;
        case "2-1":
          path = "/video";
          break;
        case "2-2":
          path = "/photo";
          break;
      }
      this.tabId = tabId
      this.$router.push({
        path
      });
    }
  },
  created() {
    let path = this.$route.path;
    let tabId
     switch (path) {
        case "/home":
          tabId = "1-1";
          break;
        case "/video":
          tabId = "2-1";
          break;
        case "/photo":
          tabId = "2-2";
          break;
      }
      this.tabId = tabId
  },
  components: {}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "./index";
</style>
