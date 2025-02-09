<script setup lang="ts">
import { Cropper, RectangleStencil, CircleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { FileUpload, Dialog, type FileUploadSelectEvent, Button, Image } from 'primevue'
import { ref, toRaw, type PropType, type Ref } from 'vue'

function onCrop({ canvas }: { canvas: HTMLCanvasElement }): string {
  return canvas.toDataURL('image/jpeg')
}

const props = defineProps({
  data: {
    type: String,
    required: true,
  },
  previewClass: {
    type: String,
    required: false,
    default: '',
  },
  stencilProps: {
    type: Object,
    required: false,
  },
  stencilComponent: {
    type: Object as PropType<typeof RectangleStencil | typeof CircleStencil>,
    required: false,
    default: RectangleStencil,
  },
})

const emit = defineEmits<{
  (e: 'update:data', val: string): string
}>()

const uploadImage: Ref<string | null, string | null> = ref(null)
const uploadTempCropped: Ref<string | null, string | null> = ref(null)
const uploadCropped: Ref<string | null, string | null> = ref(props.data)

const cropVisible: Ref<boolean | boolean> = ref(false)

function onUpload(event: FileUploadSelectEvent) {
  uploadImage.value = toRaw(event.files)[0].objectURL
  cropVisible.value = true
  console.log(toRaw(event.files)[0].objectURL)
}

function onCropApply() {
  uploadCropped.value = uploadTempCropped.value
  cropVisible.value = false
  emit('update:data', uploadCropped.value ?? '')
}

function onRemoveImage() {
  uploadCropped.value = null
  uploadImage.value = null
  uploadTempCropped.value = null
  emit('update:data', uploadCropped.value ?? '')
}
</script>

<template>
  <div class="image-upload">
    <FileUpload
      mode="basic"
      accept="image/*"
      :multiple="false"
      :auto="true"
      @select="onUpload"
      customUpload
      chooseLabel="Upload Image"
      class="p-button-outlined"
    />
    <Button v-if="uploadCropped" severity="danger" outlined @click="onRemoveImage"
      >Delete Image</Button
    >
  </div>
  <div v-if="uploadCropped" :class="previewClass">
    <Image :src="uploadCropped" />
  </div>
  <span class="crop-dialog-wrapper">
    <Dialog v-model:visible="cropVisible" header="Crop Image" class="crop-dialog">
      <Cropper
        class="cropper"
        :src="uploadImage"
        :stencil-props="stencilProps"
        :resize-image="false"
        :stencil-component="stencilComponent"
        @change="uploadTempCropped = onCrop($event)"
      />
      <div class="dialog-control">
        <Button label="Apply" @click="onCropApply"></Button>
      </div>
    </Dialog>
  </span>
</template>

<style scoped>
.cropper {
  max-height: 300px;
}
</style>

<style scoped src="/src/assets/crop-dialog.css" />

<style>
.crop-dialog {
  width: 90vw;
}
.crop-dialog .p-dialog-content {
  overflow: hidden;
}
</style>
