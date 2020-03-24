<template>
  <div class="valid-container">
    <div class="head">
      <p class="company-name">BROCCOLI & CO.</p>
    </div>
    <div class="section">
      <h2 class="section-name">A better way</h2>
      <h2 class="section-name">to enjoy every day</h2>
      <p class="mark-name">Be the first to know when we launch.</p>
      <el-button type="primary" @click.native.prevent="openDialog">
        Request an invite
      </el-button>
    </div>
    <div class="bottom">
      <p class="bottom-name">made with ❤️ in Melbourne</p>
      <p class="bottom-name">
        <span>&copy; </span>
        <span>2016</span>
        <span>Broccoli& Co. All Rights Reserved.</span>
      </p>
    </div>
    <el-dialog ref="validModel" :title="title" class="valid-model" center :close-on-click-modal="false" top="10vh" :visible.sync="validVisible" :width="getWidthByClient()" style="height: 100%;" @close="closeDialog">
      <el-form ref="validForm" :model="validForm" :rules="validRules" class="login-form" auto-complete="on" label-position="left">
        <div v-show="validFlag">
          <el-form-item prop="fullname">
            <el-input
              ref="fullname"
              v-model="validForm.fullname"
              placeholder="Full name"
              name="fullname"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="email">
            <el-input
              ref="email"
              v-model="validForm.email"
              placeholder="Email"
              name="email"
              type="text"
              tabindex="2"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="confirmEmail">
            <el-input
              ref="confirmEmail"
              v-model="validForm.confirmEmail"
              placeholder="Confirm email"
              name="confirmEmail"
              type="text"
              tabindex="3"
              auto-complete="on"
            />
          </el-form-item>
        </div>
        <div v-show="!validFlag" class="done-zone">
          <p>You will be one of the first to experience</p>
          <p>Broccoli & Co. when we launch.</p>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="loading" type="primary" @click.native.prevent="handleSend">
          {{ send }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { validUsername, validEmail } from '@/utils/validate'
import { validEmailInfo } from '@/api/valid'

export default {
  name: 'Valid',
  data() {
    const validateFullname = (rule, value, callback) => {
      if (!value) {
        callback(new Error('full name can not be empty!'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('The email must be legal!'))
      } else {
        callback()
      }
    }
    const validateConfirmEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('The confirmEmail must be legal!'))
      } else if (value !== this.validForm.email) {
        callback(new Error('The confirmEmail must equal email!'))
      } else {
        callback()
      }
    }
    return {
      title: 'Request an invitation',
      validForm: {
        fullname: '',
        email: '',
        confirmEmail: ''
      },
      validRules: {
        fullname: [{ required: true, trigger: 'blur', validator: validateFullname }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        confirmEmail: [{ required: true, trigger: 'blur', validator: validateConfirmEmail }]
      },
      loading: false,
      send: 'Send',
      validFlag: true,
      validVisible: false
    }
  },
  methods: {
    openDialog() {
      this.validVisible = true
      this.send = 'Send'
      this.title = 'Request an invitation'
      this.validFlag = true
    },
    getWidthByClient(){
      return /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? '80%': '45%'
    },
    handleSend() {
      this.$refs.validForm.validate(valid => {
        if (valid) {
          if (this.send === 'OK') {
            this.validVisible = false
          } else {
            this.loading = true
            this.send = 'Sending, please wait...'
            const requestParam = {
              name: this.validForm.fullname,
              email: this.validForm.email
            }
            validEmailInfo(requestParam).then(response => {
              this.$message({
                message: response,
                type: 'success'
              })
              this.title = 'All done!'
              this.loading = false
              this.validFlag = false
              this.send = 'OK'
            }).catch(error => {
              if (error.response != null) {
                this.$message.error(error.response.data.errorMessage)
              } else {
                this.$message.error('请求异常，请稍后重试')
              }
              this.loading = false
              this.send = 'Send'
              this.listLoading = false
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeDialog(){
      this.validVisible = false
      this.$refs.validForm.resetFields()
    }
  }
}
</script>

<style lang="scss">

$bg:#fff;
$light_gray:#787878;
$cursor: #787878;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .valid-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.valid-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#fff;
$dark_gray:#889aa4;
$light_gray:#eee;

.valid-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  justify-content: space-between;
  .head {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid rgb(45, 43, 43);
    .company-name {
      margin: 30px auto 30px 40px;
      color: #787878;
    }
  }
  .section {
    text-align: center;
    width: 100%;
    vertical-align: middle;
  }
  .bottom {
    width: 100%;
    height: 80px;
    text-align: center;
    border-top: 1px solid rgb(45, 43, 43);
    .bottom-name {
      color: #787878;
    }
  }
  .valid-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .done-zone {
      color: $light_gray;
      text-align: center;
    }
  }

  .tips {
    font-size: 14px;
    color: $light_gray;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $dark_gray;
      margin: 0px auto 0px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>