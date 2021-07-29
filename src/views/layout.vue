<template>
  <el-container class="layout-container">
    <el-aside
      class="aside"
    >
    <a-side class="a"></a-side></el-aside>
    <el-container>
      <el-header class="header"><h-eader></h-eader></el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import aSide from '@/components/aside'
import HEader from '@/components/Header'

export default {


    
  
 components:{
     aSide,
     HEader
  
 }
}
</script>

<style lang="less" scoped>
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: #d3dce6;
  .a{
      height:100%;
  }
}

.header {
  background-color: #b3c0d1;
}

.main {
  background-color: #e9eef3;
}
</style>