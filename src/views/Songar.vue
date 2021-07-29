<template>
  <div>
      <el-card class="box-card">
  <div slot="header" class="clearfix">
 <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{this.$route.query.id ?'修改文章':'发布文章'}}</el-breadcrumb-item>
</el-breadcrumb>
  </div>
  <el-form ref="form" :model="article" label-width="80px">
  <el-form-item label="标题">
    <el-input v-model="article.title"></el-input>
  </el-form-item>
   <el-form-item label="内容">
   <el-tiptap
        lang="zh"
        v-model="article.content"
        :extensions="extensions"
        height="350"
        placeholder="请输入文章内容"
      ></el-tiptap>
  </el-form-item>
 <el-form-item label="封面">
    <el-radio-group v-model="article.cover.type">
      <el-radio :label="1">单图</el-radio>
      <el-radio :label="3">三图</el-radio>
      <el-radio :label="0">无图</el-radio>
      <el-radio :label="-1">自动</el-radio>
    </el-radio-group>
    <template  v-if="article.cover.type > 0">
    <fengmian v-for="cover in article.cover.type" :key="cover"></fengmian>
    </template>
  </el-form-item>
   
     <el-form-item label="封面">
    <el-select v-model="article.channel_id" placeholder="请选择活动区域">
      <el-option :label="item.name" v-for="(item,index) in channels" :key="index" :value="item.id"></el-option>
      
    </el-select>
  </el-form-item>

 
  <el-form-item>
    <el-button type="primary" @click="onSubmit()">发表</el-button>
    <el-button @click="cg">存入草稿</el-button>
  </el-form-item>
</el-form>
</el-card>
  </div>
</template>

<script>
import fengmian from '@/components/fengmian'
import { chanl,rr,wz,xg } from '@/api/article'
import {uploadImage} from '@/api/image'
import { Doc,
ElementTiptap,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image
 } from 'element-tiptap'
 import 'element-tiptap/lib/index.css'
export default {

  data() {
      return {
        
        article:{
             title:'',
              content:'',
               cover:{
                   type:0, 
                    images:[]
               },
                channel_id:null
        },
        channels:[],
        draft:false,
  extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new Image({
            uploadRequest(file){
                const fd = new FormData()
                fd.append('image',file)
                return uploadImage(fd).then(res =>{
                    return res.data.data.url
                })
            }}
        ),
        new OrderedList(),
      ],

      }
    },
    created(){
        this.chanls()
        this.jiazai()
    },
     components: {
    'el-tiptap': ElementTiptap,
    fengmian
  },
    methods: {
async onSubmit() {
    if(this.$route.query.id){
        const activeid = this.$route.query.id
        const draft = this.draft

    const res = await xg(activeid,draft,this.article)
    console.log(res);
    this.$router.push('/article')
    }else{
      const res = await rr(this.article,this.draft)
      console.log(res);
      }},

        async chanls(){
    const {data:res} = await chanl()
   
    this.channels = res.data.channels
   },
   async cg(){
       const res = await rr(this.article,this.draft = true)
      console.log(res);
   },
  async  jiazai(){
        if(this.$route.query.id){
            const res = await wz(this.$route.query.id)
          this.article = res.data.data
          console.log(res);
        }
    }
    }
  
}
</script>

<style>

</style>