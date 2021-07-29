<template>
  <div>

<el-card class="box-card">
  <div slot="header" class="clearfix">
       <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
  
</el-breadcrumb>
  </div>
  <el-form ref="article" :model="form" label-width="40px">
    <el-form-item label="状态">
    <el-radio-group v-model="status">
      <el-radio :label="null">全部</el-radio>
      <el-radio :label="0">草稿</el-radio>
       <el-radio :label="1">待审核</el-radio>
      <el-radio :label="2">审核成功</el-radio>
       <el-radio :label="3">审核失败</el-radio>
      <el-radio :label="4">已删除</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道">
    <el-select v-model="channelId" placeholder="请选择频道">
     <el-option label="全部" :value="null"></el-option>
      <el-option :label="channel.name" :value="channel.id" v-for="(channel,index) in channels" :key="index"></el-option>
      
    </el-select>
  </el-form-item>
  <el-form-item label="活动时间">
  <el-date-picker
      v-model="rangeDate"
      type="datetimerange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      :default-time="['12:00:00']">
    </el-date-picker>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="getarticle(1)">确定</el-button>
  
  </el-form-item>
</el-form>
</el-card>

<el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 46147 条结果：
      </div>
      <!-- 数据列表 -->
      <el-table
        :data="article"
        stripe
        style="width: 100%"
        class="list-table"
        size="mini"
        v-loading="loading"
      >
        <el-table-column
        
          label="封面"
          >
          <template slot-scope="scope">
            <img class="te" v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]" alt="">
            <img class="te" v-else src="./login/imgicon.png" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          >
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
            <el-tag  v-else-if="scope.row.status === 1" type="success">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag  v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
            <el-tag  v-else-if="scope.row.status === 4" type="info">已经删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
      
          label="操作">
          <template slot-scope="scope">
        <el-button
          size="mini"
          icon="el-icon-edit"
          @click="$router.push('/publish?id='+ scope.row.id)"
          ></el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="dl(scope.row.id)"
          ></el-button>
      </template>
        </el-table-column>
      </el-table>
      <!-- /数据列表 -->

      <!-- 列表分页 -->
      <el-pagination
        layout="prev, pager, next"
        background
        @current-change="huanye"
       :page-size="pagesize"
        :total="totalCount"
        :disabled="loading">
      </el-pagination>
      <!-- /列表分页 -->
    </el-card>
  </div>
</template>

<script>
import { artc,chanl,dele } from '@/api/article'
export default {
  name:'ar',
  data() {
      return {
     
        value1:'',
        article:[],
        totalCount:0,
      pagesize:10,
      status:null,
      channels:[],
      channelId:null,
      rangeDate:[],
      loading:false
        }
      
},
 created(){
   this.getarticle(1)
   this.chanls()
 },
 methods:{
  async getarticle(page){
    this.loading = true
    const res = await artc({
      page,
      bagin_pubdate:this.rangeDate ? this.rangeDate[0]:null,
      end_pubdate:this.rangeDate ? this.rangeDate[1] :null,
      per_page:this.pagesize,
      status:this.status,
      channel_id:this.channelId
    })
    this.loading = false
    
 
    this.article = res.data.data.results
   this.totalCount = res.data.data.total_count
   },
  async huanye(page){
       this.getarticle(page)
   },
  async chanls(){
    const {data:res} = await chanl()
    console.log(res);
    this.channels = res.data.channels
   },
   async dl(articleId){
   
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          dele(articleId).then(res =>{
            console.log(res);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   },
   //跳转

   
  
 }
}
</script>

<style lang="less" scoped>
.box-card{
    margin-bottom:15px;
}
.list-table{
    margin-bottom:15px;
}
.te{
  width:100px;
  background-size:cover;
}
</style>