<template>
  <div class="login-box">
    <div class="login-main">
      <div class="box-title">
        <h1>管理员登录</h1>
      </div>
      <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
        <el-form-item prop="name">
          <el-input
            v-model="ruleForm.name"
            class="username"
            name="name"
            placeholder="请输入用户名" maxlength="10"
            auto-complete="on"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="pwd">
          <el-input
            v-model="ruleForm.pwd"
            class="password"
            type="password"
            name="pwd"
            placeholder="请填写密码"
            maxlength="20"
            auto-complete="on"
          >
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button v-if="!isLoading" type="primary" @click="startLogin('ruleForm')">
            登录
          </el-button>
          <el-button v-else type="info" disabled icon="el-icon-loading">
            正在登录中...
          </el-button>
        </el-form-item>

        <el-form-item>
          <div class="copyright">
            椰子皮博客2016 - {{ new Date().getFullYear() }} © 版权所有
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'

@Component
export default class extends Vue {
  $refs!: {
    ruleForm: HTMLFormElement,
  }
  ruleForm = {
    pwd: '',
    name: '',
  }
  rules = {
    pwd: [ { required: true, message: '请输入密码', trigger: 'blur' } ],
    name: [ { required: true, message: '用户名不能为空', trigger: 'blur' }],
  }
  isLoading = false

  @Mutation('setToken') setToken: any
  @Mutation('setUser') setUser: any

  mounted() {
    this.keyupSubmit()
  }

  keyupSubmit() {
    document.onkeydown = () => {
      const win: any = window
      const key = win.event.keyCode;
      if (key === 13) {
        this.startLogin();
      }
    };
  }

  startLogin() {
    this.$refs.ruleForm.validate((valid: any) => {
      if (valid) {
        this.login()
      } else {
        console.log('err submit')
      }
    })
  }

  async login() {
    try {
      this.isLoading = true
      const { result } = await this.$api.user.login({
        pwd: this.ruleForm.pwd,
        name: this.ruleForm.name,
      })
      const { token, user } = result
      this.setToken(token)
      this.setUser(user)
      this.$message({
        message: '登录成功',
        type: 'success',
        duration: 500,
        onClose: () => {
          const referrer: any = this.$route.query.referrer || '/'
          console.log('referrer', referrer)
          this.$router.replace({ path: referrer })
          this.isLoading = false
        },
      })
    } catch (e) {
      console.log(e)
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.login-box{
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  flex-wrap: wrap;
  .box-title{
    margin-bottom: 30px;
    h1{
      font-size: 26px;
      color: #888;
      font-weight: normal;
    }
  }
  .el-card__body {
    padding: 30px;
  }
  /deep/.login-main{
   width: 400px;
    .el-input__inner{height: 55px;line-height: 55px; font-size: 18px; padding-left: 60px; border-radius: 55px; &:focus{background: #ffffff}}
    .el-form-item__content{
      line-height: 45px;
      .el-input:before{
        content: '';
        display: block;
        width: 25px;
        height: 25px;
        position: absolute;
        left: 20px;
        top:0;
        bottom: 0;
        margin: auto;
        opacity: 0.6;
      }
      .username:before{ background: url("~@/assets/img/icon_user.png");background-size: 100%;}
      .password:before{background: url("~@/assets/img/icon_pwd.png");background-size: 100%;}
    }
    .el-form-item{margin-bottom: 30px;}
    .el-form-item:last-child { margin-bottom: 0 }
    .el-form-item__error{padding-top: 10px;}
    .el-button{width: 100%;padding: 0;height: 55px;line-height: 55px;font-size: 20px; border-radius: 55px;}
    .copyright{ color: #ffffff; text-shadow: 0 0 1px #555555;  font-size: 16px; }
  }
}
</style>
