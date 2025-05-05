<template>
    <div v-if="item.children">
      <template v-if="item.children.length == 0">
          <el-menu-item :index="item.path">
<!--            <svg-icon :icon-class="item.svg" class="indexleft-icon" /> -->
            {{item.label}}
          </el-menu-item>
      </template>
  
      <el-submenu v-else :index="item.path">
        <template slot="title" >
     <!--     <svg-icon :icon-class="item.svg" class="indexleft-icon" /> -->
          {{item.label}}
        </template>
  
        <template v-for="child in item.children">
          <sidebar-item
            v-if="child.children&&child.children.length>0"
            :item="child"
            :key="child.path"/>
          <el-menu-item v-else :key="child.path" :index="child.path">
          <!--  <svg-icon :icon-class="child.svg" class="indexleft-icon" /> -->
            {{child.label}}
          </el-menu-item>
        </template>
      </el-submenu>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SidebarItem',
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  }
  </script>