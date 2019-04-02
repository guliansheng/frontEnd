<template xmlns="login">
  <div id="login">
    <div class="login-content">
      <div class="logo">
        <div class="img"><img src="@/assets/logo.png" alt=""></div>
        <div class="title">阜阳师范学院</div>
      </div>
      <p class="subTitle">选课管理系统</p>
      <p class="title">
        <span>登</span>录
      </p>
      <div class="form">
        <el-form :model="ruleForm" :rules="rules2" ref="ruleForm">
          <el-form-item label="账户" prop="user">
            <el-input v-model="ruleForm.user"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass"></el-input>
          </el-form-item>
          <el-form-item class="item-submit">
            <button @click.prevent="submit('ruleForm')" class="btn-submit">提交</button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
      };
      let validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }
      };
      return {
        ruleForm: {
          pass: '',
          user: '',
        },
        rules2: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          user: [
            {validator: validateUser, trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
      submit() {
        let params = {
          account: this.ruleForm.user,
          password: this.ruleForm.pass
        }

        let flag = this.validator(params);
        if (!flag) {
          return false
        }

        this.$api.login(params)
          .then((res) => {
            if (res.code === 1) {
              this.$message.warning('用户名或密码错误');
            } else if (res.code === 0) {
              let redirect = this.$route.query.redirect;
              if (!redirect) {
                this.$router.push('/');
              } else {
                this.$router.push(redirect);
              }


              this.$notify({
                message: '登录成功',
                type: 'success'
              });
            }
          })

      },
      validator(params) {
        if (!params.account) {
          this.$message.warning('用户名不能为空');
          return false
        } else if (!params.password) {
          this.$message.warning("密码不能为空");
          return false
        }
        return true
      }
    },
  }
</script>

<style lang='scss'>
  #login {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 203;
    background-color: #f0f2f5;
    background-image: url('~imgs/login_bg.jpg');
    background-size: cover;
    background-position: center;
    font-family: 'Myriad Pro, Helvetica Neue, Arial, Helvetica, sans-serif';

    .login-content {
      width: 460px;
      height: 520px;
      // background-color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .logo {
        width: 100%;
        overflow: hidden;
        text-align: center;
        // display: block;
        .img{
          float: left;
        }
        .title{
          float: left;
          font-size: 34px;
        }

      }

      .subTitle {
        line-height: 2.4;
        color: #A2A2A4;
        font-size: 14px;
        text-align: center;

      }

      .title {
        text-indent: 28px;
        font-size: 16px;
        text-align: center;
        font-weight: bold;
        margin: 40px 0 20px -27px;;
        color: rgba(0, 0, 0, 0.85);

        > span {
          margin-right: 8px;
        }
      }

      .form {
        .el-input {
          width: 368px;
          height: 40px;

          input {
            width: 368px;
            height: 40px;
          }
        }

        .el-form-item__content {
          text-align: center;
        }

        .el-form-item__error {
          margin-left: 65px;
        }

        .item-submit {
          .btn-submit {
            width: 368px;
            height: 40px;
            border-radius: 5px;
            margin-left: 40px;
            background-color: #3080FE;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
          }

        }
      }

    }


  }

</style>

