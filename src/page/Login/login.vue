<template >
  <div class="login v2">
    <div class="wrapper">
      <div class="dialog dialog-shadow" style="display: block; margin-top: -362px;">
        <div class="title" v-if="loginPage">
          <h4>使用 ID 登录官网</h4>
        </div>
        <div v-if="loginPage" class="content">
          <ul class="common-form">
            <li class="username border-1p">
              <div class="input">
                <input type="text" v-model="ruleForm.userName" placeholder="账号">
              </div>
            </li>
            <li>
              <div class="input">
                <input type="password" v-model="ruleForm.userPwd" @keyup.enter="login" placeholder="密码">
              </div>
            </li>
            <li style="text-align: right" class="pr">
              <span class="pa" style="top: 0;left: 0;color: #d44d44">{{ruleForm.errMsg}}</span>
              <a href="javascript:;" style="padding: 0 5px" @click="loginPage = false">注册 ID</a>
            </li>
          </ul>
          <!--登陆-->
          <div>
            <y-button text="登陆" :classStyle="isLoginOk" @btnClick="login" class="btn"></y-button>
          </div>
        </div>
        <div class="registered" v-else>
          <h4>注册 ID</h4>
          <div class="content" style="margin-top: 20px;">
            <ul class="common-form">
              <li class="username border-1p">
                <div class="input">
                  <input type="text" v-model="registered.userName" placeholder="账号" @keyup="registered.userName = registered.userName.replace(/[^\w\.\/]/ig,'')">
                </div>
              </li>
              <li class="username border-1p">
                <div class="input">
                  <input type="text" v-model="registered.email" placeholder="邮箱" @keyup="registered.email = registered.email.replace(' ','')">
                </div>
              </li>
              <li>
                <div class="input">
                  <input type="password" v-model="registered.userPwd" placeholder="密码">
                </div>
              </li>
              <li>
                <div class="input">
                  <input type="password" v-model="registered.userPwd2" placeholder="重复密码">
                </div>
              </li>
            </ul>
            <div>
              <y-button :classStyle="isRegOk" text="注册" class="btn" @btnClick="regist"></y-button>
            </div>
            <ul class="common-form pr">
              <li class="pa" style="left: 0;top: 0;margin: 0;color: #d44d44">{{registered.errMsg}}</li>
              <li style="text-align: center;line-height: 48px;margin-bottom: 0;">
                <span>如果您已拥有 ID，则可在此</span>
                <a href="javascript:;" style="margin: 0 5px" @click="loginPage = true">登陆</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import YButton from "/components/YButton"
import { userLogin, register } from "/api/user"
import { setStore, getStore } from "/utils/storage"

export default {
    data() {
        return {
            loginPage: true,
            ruleForm: {
                userName: "",
                userPwd: "",
                errMsg: ""
            },
            registered: {
                userName: "",
                userPwd: "",
                userPwd2: "",
                errMsg: "",
                email: ""
            }
        };
    },
    computed: {
        // 可点击注册
        isRegOk() {
            const { userPwd, userPwd2, userName, email } = this.registered;
            return userPwd && userPwd2 && userName && email
                ? "main-btn"
                : "disabled-btn";
        },
        isLoginOk() {
            const { userPwd, userName } = this.ruleForm;
            return userPwd && userName ? "main-btn" : "disabled-btn";
        }
    },
    methods: {
        login() {
            const { userName, userPwd } = this.ruleForm;
            if (!userName || !userPwd) {
                this.ruleForm.errMsg = "账号或者密码不能为空!";
            } else {
                let params = { name: userName, pwd: userPwd };
                userLogin(params).then(res => {
                    if (res.code === 0) {
                        setTimeout(() => {
                            this.ruleForm.errMsg = "";
                            setStore("user", res.data);
                            this.$router.push({
                                path: "/home"
                            });
                        }, 1000);
                    } else {
                        this.ruleForm.errMsg = res.data;
                    }
                });
            }
        },
        regist() {
            const { userName, userPwd, userPwd2, email } = this.registered;
            if (!userName || !userPwd || !userPwd2 || !email) {
                this.registered.errMsg = "账号密码不能为空";
                return false;
            }
            if (userPwd2 !== userPwd) {
                this.registered.errMsg = "两次输入的密码不相同";
                return false;
            }
            let params = {
                name: userName,
                pwd: userPwd,
                nick: userName,
                level: 1,
                email
            };
            register(params).then(res => {
                this.registered.errMsg = res.msg;
                if (res.code === 0) {
                    setTimeout(() => {
                        this.ruleForm.errMsg = "";
                        this.registered.errMsg = "";
                        this.loginPage = true;
                    }, 1000);
                } else {
                    this.registered.errMsg = res.data;
                    return false;
                }
            });
        }
    },
    created() {
        if (getStore("user")) {
            this.$router.push({
                path: "/home"
            });
        }
    },
    components: {
        YButton
    }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "./index";
</style>
