<template>
  <el-carousel v-if="data.length" trigger="click">
    <el-carousel-item v-for="item in data" :key="item">
      <div class="text-center">
        <el-image
          :src="item"
          :preview-src-list="[item]"
          fit
          preview-teleported
        >
        </el-image>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import { ElCarousel, ElCarouselItem, ElImage } from 'element-plus'

const { data } = defineProps({
  data: {
    type: Array,
    default: [],
  }
})
</script>

<style>
  .el-carousel__container {
    height: 400px !important;
  }
</style>