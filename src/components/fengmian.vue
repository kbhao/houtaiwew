<template>
  <div>
      <div class="tanchu" @click="showtime">
      <img  ref="" alt="">
      </div>
      <el-dialog
  title="选择封面"
  :visible.sync="dialogVisible"
  append-to-body>
   <el-tabs v-model="activeName" >
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="上传图片" name="second">
        <input type="file" ref="file" @click="tps">
        <img  ref="sw" alt="">
    </el-tab-pane>
    
  </el-tabs>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sdw">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/api/image'
export default {
 data(){
     return {
         dialogVisible:false,
         activeName: 'second'
     }
 },
 methods:{
     showtime(){
         this.dialogVisible = true
     },
     //点击上传图片的时候获取Input ref dom元素然后URL他 之后赋值给Img ref src
     tps(){
               const blob = ''
        const file = this.$refs.file.files[0]
      blob.srcObject = file
      this.$refs['sw'].src = blob
      
     },
     sdw(){
      if(this.activeName.type === 'second'){
          const file = this.$refs.file.files[0]
          if(!file){
              this.$message('请选择文件')
              return
          }
          const fd = new FormData()
          fd.append('image', file)
         uploadImage(fd).then(res =>{
             console.log(res);
         })

      }
     }
 }
}
</script>

<style lang="less" scoped>
.tanchu{
    width:200px;
    height:200px;
    border:1px solid black;
}
</style>