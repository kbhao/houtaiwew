<template>
  <div>
      <el-card class="box-card">
  <div slot="header" class="clearfix">
 <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">评论管理</a></el-breadcrumb-item>
 </el-breadcrumb>
  </div>
  
       <el-table
      :data="articles"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        >
      </el-table-column>
      <el-table-column
      prop="total_comment_count"
        label="总评论数"
        >
      </el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数">

      </el-table-column>
        <el-table-column label="评论状态">
            <template slot-scope="scope">
                {{scope.row.comment_status ? '正常':'关闭'}}
                </template>

      </el-table-column>
        <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
                <el-switch
  v-model="scope.row.comment_status"
  active-color="#13ce66"
  inactive-color="#ff4949"
  :disabled="scope.row.statusDisabled"
  @change="ztgb(scope.row)">
</el-switch>
            </template>
      </el-table-column>
       
    </el-table>
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>
  </div>
</template>

<script>
import {artc,zt} from '@/api/article'
export default {
name:'comments',
data(){
    return{
        articles: [],
        pagesize:20,
        page:1,
        total:0
    }
},
created () {
    this.loadArticles(1)
    },
    methods:{
       async loadArticles(page){
           this.page = page
           const res = await artc({
               response_type:'comment',
               page,
               per_page:this.pagesize
           })
           console.log(res);
        this.total = res.data.data.total_count
           const {results} = res.data.data
           results.forEach(article =>{
               article.statusDisabled = false
           })
           this.articles = results
        },
       async ztgb(article){
           article.statusDisabled =true
       const res =   await zt(article.id.toString(),article.comment_status)
       console.log(res);
       article.statusDisabled = false
        },
        handleCurrentChange(page){
          this.loadArticles(page)
        },
        handleSizeChange(){
          this.loadArticles(1)
        }
    }


}
</script>

<style>

</style>