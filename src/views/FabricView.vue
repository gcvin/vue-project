<template>
  <canvas id="fabric-canvas" width="500" height="300"></canvas>
</template>

<script setup lang="ts">
import * as fabric from 'fabric'
import { onMounted, onUnmounted } from 'vue'

let canvas: fabric.Canvas | null = null

onMounted(() => {
  canvas = new fabric.Canvas('fabric-canvas', {
    selection: false,
  })

  // 创建一个矩形
  const rect = new fabric.Rect({
    left: 250,
    top: 150,
    fill: '#00bd7e33',
    stroke: '#00bd7e',
    width: 200,
    height: 100,
    selectable: false,
  })

  // 将矩形添加到画布上
  canvas.add(rect)

  const text = new fabric.FabricText('hover', {
    left: 250,
    top: 150,
    fontSize: 20,
    fontFamily: 'mplus',
    fill: '#000',
  })
  let isTextAdded = false
  rect.on('mousemove', () => {
    if (!isTextAdded) {
      canvas?.add(text)
      isTextAdded = true
    }
  })
  rect.on('mouseout', () => {
    if (isTextAdded) {
      canvas?.remove(text)
      isTextAdded = false
    }
  })
})

onUnmounted(() => {
  canvas?.dispose()
  canvas = null
})
</script>

<style scoped>
#fabric-canvas {
  border: 1px solid #ccc;
}
</style>
