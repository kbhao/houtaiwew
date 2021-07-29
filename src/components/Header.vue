<template>
  <div class="header-container">
    <div>
      <i class="iel-icon-s-fold" ></i>
      <span>夏做后台管理</span>
    </div>
    <el-dropdown>
      <div class="avatar-wrap">
        <img class="avatar" v-if="user.photo" :src="user.photo" alt="">
        <img v-if="!user.photo" src="@/assets/avatar.jpg" alt="">
        <span>{{user.name}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item @click.native="tuic">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import globalBus from '@/api/global'
export default {
  name: 'AppHeader',
  components: {},
  props: {},
  data () {
    return {
         isCollapse: false,
         user:{
          name:'',
          photo:''
         }
    }
  },
  computed: {},
  watch: {},
  created () {

    globalBus.$on('users',data =>{
      this.user.name = data.name
      this.user.photo = data.photo
    })

  },
  mounted () {},
  methods: {
    
      tuic(){
         this.$confirm('确认退出？')
          .then(() => {
            localStorage.removeItem('token')
            this.$router.push('/login')
          })
          .catch(()=> {
            
          })
      
      }
  }
}
</script>

<style scoped lang="less">
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>