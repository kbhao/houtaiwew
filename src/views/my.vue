<template>
  <div>
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">个人设置</a></el-breadcrumb-item>
</el-breadcrumb>
  </div>
  <el-row>
  <el-col :span="16">
      <el-form ref="form" :model="user" label-width="80px">
  <el-form-item label="活动名称">
    <el-input v-model="user.name"></el-input>
  </el-form-item>
  
<el-form-item label="编号">
    <el-input v-model="user.id"></el-input>
  </el-form-item>
  <el-form-item label="手机">
    <el-input v-model="user.mobile"></el-input>
  </el-form-item>
  

  <el-form-item label="活动形式">
    <el-input type="textarea" v-model="user.intro"></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="user.email"></el-input>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    
  </el-form-item>
</el-form>
  </el-col>
    <el-col :offset="2" :span="4">
        <label for="file">
            <el-avatar
            shape="square"
            :size="150"
            fit="cover"
            :src="user.photo">

            </el-avatar>
            <input id="file" type="file" hidden ref="file" @change="ssw">
        </label>
    </el-col>
</el-row>

</el-card>
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  append-to-body
  @opened="sswq"
  @close="gbv"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <div class="ee">
  <img ref="sa" :src="tt" alt="">
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sctp">确 定</el-button>
  </span>
</el-dialog>


  </div>
</template>

<script>
import { user } from '@/api/user'
import { acav,gxyh } from '@/api/image'
 import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs'
import globalBus from '@/api/global'
export default {
    name:'my',
 data(){
     return{
         user:{
             email:'',
             id:'',
             intro:'',
             mobile:'',
             name:'',
             photo:''
         },
         dialogVisible:false,
         tt:'',
     cropper:null
         
     }
 },
 created(){
     this.gerusr()
 },
 methods:{
    async gerusr(){
       const res =  await user()
       console.log(res);
      this.user = res.data.data
     },
     ssw(){
         const file = this.$refs.file
         console.log(file);
        const dd = window.URL.createObjectURL(file.files[0])
        this.tt = dd
         this.dialogVisible = true
         this.$refs.file.value = ''
     },
     sswq(){
      
const image = this.$refs['sa']
this.cropper = new Cropper(image, {
  aspectRatio: 16 / 9,
  movable:true,
  crop(event) {
    console.log(event.detail.x);
    console.log(event.detail.y);
    console.log(event.detail.width);
    console.log(event.detail.height);
    console.log(event.detail.rotate);
    console.log(event.detail.scaleX);
    console.log(event.detail.scaleY);
  },
});},
  gbv(){
    this.cropper.destroy()
  },
  sctp(){
   this.cropper.getCroppedCanvas().toBlob( file => {
        const fd = new FormData()
        fd.append('photo',file)
       acav(fd).then(res =>{
          console.log(res);
       this.dialogVisible = false
       this.user.photo = window.URL.createObjectURL(file)
       })
    
       


  }
    )},
  async onSubmit(){
   const res =  await gxyh(this.user)
   
   globalBus.$emit('users',this.user)
   }
 }
}

</script>

<style lang="less" scoped>
.ee{
  img {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
}
</style>