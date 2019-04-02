<template xmlns="aside">
  <div id="operative">
    <div class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="">
      </div>
      <div class="title">
        <h2>阜阳师范学院</h2>
      </div>
      <div class="userInfo"></div>
    </div>
    <div class="operative-content">
      <el-container>
        <el-aside width="200px">
          <el-menu router = true>
            <el-submenu v-for="(val, index) in menusList" :index="`${index}`" :key="index">
              <template slot="title"><span :class="'iconfont '+val.icon"></span>{{val.title}}</template>
              <el-menu-item-group>
                <template v-for="(item, ind) in val.menuItem" >
                  <el-menu-item  :key="ind" :index="item.index">
                    {{item.submenu}}
                  </el-menu-item>
                </template>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
        </el-container>
      </el-container>

    </div>
  </div>
</template>

<script>
// 运营管理后台
export default {
  created(){
    this.menusList = this.menus.admin
  },
  data(){
    return {
      menus: {
        admin: [
          {title: '用户信息', icon:'iconyonghu1', menuItem:[{index: '/admin/studentList', submenu: '学生信息'}, {index: '/admin/teacherList', submenu: '教师信息'}]},
          {title: '课程管理', icon:'iconkechengbiao', menuItem:[{index: '/admin/courseList', submenu: '课程信息'}]},
          {title: '公告信息', icon:'iconxinwen', menuItem:[{index: '/admin/studentAnnouncement', submenu: '学生公告'}, {index: '/admin/teacherAnnouncement', submenu: '教师公告'}]},
          {title: '个人信息', icon:'iconyonghu', menuItem:[{index: '/admin/info', submenu: '信息管理'}]}
        ]
      },
      menusList: []
    }
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
#operative{
  .el-menu{
    border: none;
    box-sizing: border-box;
  }
  .header{
    height:75px;
    padding: 0 20px;
    box-sizing: border-box;
    background: #006699;
    color: #fff;
    overflow: hidden;
    line-height: 75px;
    div{
      float: left;
    }
    .logo{
      img{
        margin-top: 15px;
        width: 45px;
      }
    }
    .title{
      margin-left: 20px;
    }
  }
}

</style>

