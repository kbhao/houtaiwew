<template>
  <div class="tt">
      <el-form class="top" ref="form" :model="user" >
  <el-form-item >
    <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
  </el-form-item>
    <el-form-item >
    <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
  </el-form-item>
  <el-form-item>
  <el-checkbox v-model="checked">我已阅读用户协议并同意</el-checkbox>
    
  </el-form-item>
    <el-form-item>
    <el-button class="dlw" type="primary" @click="onSubmit">登录</el-button>
    
  </el-form-item>
      </el-form>
  </div>
</template>

<script>
import {request} from '@/api/api'
export default {
data(){
    return{
        user:{
            mobile:'13911111111',
            code:'246810',
            checked:false
        }
    }
},
methods:{
    onSubmit(){
        const user = this.user
        request({
            method:'POST',
            url:'/mp/v1_0/authorizations',
            data:user
        }).then(res =>{
           
            localStorage.setItem('token',JSON.stringify(res.data.data))
            this.$router.push('/')
        }).catch(err => {
            console.log('登录失败',err);
        })
    }
}
}
</script>

<style lang="less" scoped>
.tt{
    position:fixed;
    left:0;
    bottom: 0;
    right:0;
    top:0;
    display:flex;
    justify-content: center;
    align-items: center;
    background:url('./login/login_bg.jpg') no-repeat;
    background-size:cover;
    .top{
        background-color:#fff;
       padding:50px;
       min-width: 300px;
    }
    .dlw{
        width:100%;
    }
}
</style>