<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

function onCrop({ canvas }: { canvas: HTMLCanvasElement }): string {
  console.log(canvas)
  return canvas.toDataURL('image/jpeg')
}
</script>

<template>
  <Cropper
    class="cropper"
    :src="source"
    :stencil-props="{
      aspectRatio: 32 / 9,
    }"
    :resizeImage="false"
    @change="$emit('update:base64Result', onCrop($event))"
  />
</template>

<script lang="ts">
export default {
  props: {
    source: {
      type: String,
      required: true,
    },
    base64Result: {
      required: true,
    },
  },
  emits: ['update:base64Result'],
}
</script>

<style>
.cropper {
  max-height: 300px;
}
</style>
