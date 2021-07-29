<template>
  <div>
      <el-card class="box-card">
  <div slot="header" class="clearfix">
   <el-breadcrumb separator="/">
  <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
  <el-breadcrumb-item>素材管理</el-breadcrumb-item>
  
</el-breadcrumb>
  </div>
  <div class="btm">
   <el-radio-group v-model="collect" size="mini" @change="gs">
      <el-radio-button :label="false" >全部</el-radio-button>
      <el-radio-button :label="true" >收藏</el-radio-button>
    </el-radio-group>
    <el-button type="success" plain @click="dialo = true">上传素材</el-button>
  </div>
<el-row :gutter="10" v-for="item in results" :key="item.id">
  <el-col :xs="12" :sm="6" :md="6" :lg="4">  <el-image
      style=" height: 100px"
      :src="item.url"
      fit="cover"></el-image> </el-col>




</el-row>
<el-pagination
  background
  :current-page="page"
  layout="prev, pager, next"
  :total="total"
  @current-change="fenye"
  :page-size="pagesize">
</el-pagination>

</el-card>


<el-dialog title="上传素材" :append-to-body="true" :visible.sync="dialo">
<el-upload
  class="upload-demo"
  drag
  :headers="tx"
  :on-success="ffs"
  name="image"
  action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>

</el-dialog>

  </div>
</template>

<script>
import { getImages }  from  '@/api/image'
export default {
    name:'ff',
 data() {
     const user = JSON.parse(localStorage.getItem('token'))
     
      return {
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        
        tx:{
         Authorization:`Bearer${user.token}`
        },
        results:[],
        dialo:false,
        collect:false,
        pagesize:20,
        total:[]
      }
    },
    created(){
        this.hg(1)
    },
    methods:{
      async hg(page){
          this.page = page
       const {data:res} = await getImages({
           collect:this.collect,
           page:page,
           per_page:this.pagesize
       })
       this.results = res.data.results
     this.total = res.data.total_count
       console.log(res);
      },
      async gs(value){
          this.hg(1)
      },
      ffs(){
          this.dialo = false
          
          this.hg(1)
      },

      fenye(page){
      this.hg(page)
      }
    }
}
</script>

<style scoped lang="less">
.btm{
    display:flex;
    justify-content: space-between;
    padding-bottom: 20px;
}
</style>