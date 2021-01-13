<template>
  <a-form-model ref="ruleForm" :model="loginForm" :rules="rules" v-bind="layout">
    <a-form-model-item has-feedback label="邮箱：" prop="email">
      <a-input v-model="loginForm.email" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="密码：" prop="password">
      <a-input v-model="loginForm.password" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }" class="btn-group">
      <a-button type="primary" @click="submitForm('ruleForm')">
        提交
      </a-button>
      <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
        重置
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import api from '@/api/user.js';
export default {
  data() {
    let checkPending;
    const emailReg = /^[\w-]+@[\w.-]+.com$/;
    let checkEmail = (rule, value, callback) => {
      clearTimeout(checkPending);
      if (!value) {
        return callback(new Error("Please input the email"));
      }
      checkPending = setTimeout(() => {
        if (!emailReg.test(value)) {
          callback(new Error("Please input digits"));
        } else {
          callback();
        }
      }, 1000);
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        password: 'a18520521423',
        email: '1571827357@qq.com'
      },
      rules: {
        password: [{ validator: validatePass, trigger: "change" }],
        email: [{ validator: checkEmail, trigger: "change" }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.login(this.loginForm).then(res => {
            this.$store.dispatch('setUserInfo', res);
            this.$router.push({
              name: 'Home'
            })
          }).catch(error => {
            this.$message.error(error)
          });
          return true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang='less' scoped>
@import url('~@/styles/login/index.less');
</style>