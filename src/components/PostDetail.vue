<script setup lang="ts">
import {
  Tag,
  Image,
  InputText,
  FloatLabel,
  Button,
  Message,
  Select,
  FileUpload,
  type FileUploadSelectEvent,
  Dialog,
} from 'primevue'
import { ref, toRaw, type PropType, type Ref } from 'vue'
import type { Post } from '@/types/post'
import Base64Cropper from './Base64Cropper.vue'
import { Form, type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms'
import Editor from 'primevue/editor'
import 'quill/dist/quill.core.css'

const uploadImage: Ref<string | null, string | null> = ref(null)
const uploadTempCropped: Ref<string | null, string | null> = ref(null)
const uploadCropped: Ref<string | null, string | null> = ref(null)

const cropVisible: Ref<boolean | boolean> = ref(false)
const previewVisible: Ref<boolean | boolean> = ref(false)

const isLoading = ref(false)

const categories = [
  {
    name: 'Technology',
    uuid: '35dbaec3-6738-42e5-bfd8-79e5877e3ffd',
  },
]

async function onFormSubmit(event: FormSubmitEvent) {
  if (event.valid) {
    isLoading.value = true
    const formData = toRaw(event.states)
    console.log(formData)
  }
}

const resolver = ({ values }: FormResolverOptions) => {
  const errors: Promise<Record<string, unknown>> | Record<string, unknown> | undefined = {}

  if (!values.title) {
    errors.title = [{ message: 'Title is required.' }]
  }

  if (!values.category) {
    errors.category = [{ message: 'Category is required.' }]
  }

  if (!values.body) {
    errors.body = [{ message: 'Body is required.' }]
  }

  return {
    errors,
  }
}

function onUpload(event: FileUploadSelectEvent) {
  previewVisible.value = false
  uploadImage.value = toRaw(event.files)[0].objectURL
  cropVisible.value = true
  console.log(toRaw(event.files)[0].objectURL)
}

function onCropApply() {
  uploadCropped.value = uploadTempCropped.value
  previewVisible.value = true
  cropVisible.value = false
}
</script>

<style scoped src="/src/assets/post.css" />

<template>
  <div class="post-border detail">
    <span v-if="!edit">
      <h1 class="post-title">{{ initValues.title }}</h1>
      <div class="post-meta detail">
        <h2>
          created&nbsp;by
          <span class="post-author">{{ initValues.author.replace(' ', '&nbsp;') }}</span>
          on&nbsp;<span class="post-created">{{
            new Date(initValues.created * 1000).toLocaleDateString()
          }}</span
          ><!-- convert timestamp in seconds to milliseconds -->
        </h2>
        <div class="post-tags">
          <Tag class="post-category">{{ initValues.categoryUUID }}</Tag>
        </div>
      </div>
      <!-- 32:9 Image ratio seems good -->
      <Image
        v-bind:src="'https://images.pexels.com/photos/226746/pexels-photo-226746.jpeg'"
        alt="Image"
        class="post-banner"
        preview
      />
      <div class="post-body">
        <p>
          <span v-html="initValues.body"></span>
        </p>
      </div>
    </span>
    <Form
      v-else
      v-slot="$form"
      class="edit"
      :resolver
      @submit="onFormSubmit"
      :initial-values="initValues"
    >
      <!-- TODO: add banner upload + Cropper (in dialog?) -->
      <div class="post-banner-upload">
        <FileUpload
          mode="basic"
          accept="image/*"
          :multiple="false"
          :auto="true"
          @select="onUpload"
          customUpload
        >
          <template #header> </template>
        </FileUpload>
      </div>
      <div class="post-banner-preview">
        <Image :src="uploadCropped" />
      </div>
      <Dialog v-model:visible="cropVisible" header="Crop Image" class="post-banner-crop-dialog">
        <Base64Cropper
          v-if="uploadImage"
          :source="uploadImage"
          v-model:base64-result="uploadTempCropped"
        ></Base64Cropper>
        <div class="dialog-control">
          <Button label="Apply" @click="onCropApply"></Button>
        </div>
      </Dialog>
      <div class="post-meta edit">
        <div class="post-meta-title">
          <FloatLabel variant="in" class="post-title edit">
            <InputText name="title" id="title" />
            <label for="title">Title</label>
          </FloatLabel>
          <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{
            $form.title.error.message
          }}</Message>
        </div>
        <div class="post-meta-category">
          <FloatLabel variant="in" class="post-category edit">
            <Select
              name="categoryUUID"
              class="post-category-select edit"
              id="category"
              filter
              :options="categories"
              option-label="name"
              option-value="uuid"
            ></Select>
            <label for="category">Category</label>
          </FloatLabel>
          <Message v-if="$form.category?.invalid" severity="error" size="small" variant="simple">{{
            $form.category.error.message
          }}</Message>
        </div>
      </div>
      <div class="post-body edit">
        <Editor name="body" editorStyle="height: 320px">
          <template v-slot:toolbar>
            <span class="ql-formats">
              <select class="ql-header" defaultValue="0">
                <option value="1">Heading</option>
                <option value="2">Subheading</option>
                <option value="">Normal</option>
              </select>
            </span>
            <span class="ql-formats">
              <button class="ql-bold" type="button"></button>
              <button class="ql-italic" type="button"></button>
              <button class="ql-underline" type="button"></button>
            </span>
            <span class="ql-formats">
              <select class="ql-color"></select>
              <select class="ql-background"></select>
            </span>
            <span class="ql-formats">
              <button class="ql-list" value="ordered" type="button"></button>
              <button class="ql-list" value="bullet" type="button"></button>
              <!-- uncomment following to also allow check boxes -> will require special handling -->
              <!-- <button class="ql-list" value="check" type="button"></button> -->
              <select class="ql-align">
                <option defaultValue></option>
                <option value="center"></option>
                <option value="right"></option>
                <option value="justify"></option>
              </select>
            </span>
            <span class="ql-formats">
              <button class="ql-link" type="button"></button>
              <button class="ql-code-block" type="button"></button>
            </span>
            <span class="ql-formats">
              <button class="ql-clean" type="button"></button>
            </span>
          </template>
        </Editor>
        <Message v-if="$form.body?.invalid" severity="error" size="small" variant="simple">{{
          $form.body.error?.message
        }}</Message>
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>

<style>
/* Fix Quill Editor Bullet */
.edit .ql-editor ol li:before {
  content: none;
}

.post-banner-crop-dialog {
  width: 90vw;
}

.post-banner-crop-dialog .p-dialog-content {
  overflow: hidden;
}
</style>

<script lang="ts">
export default {
  props: {
    initValues: {
      type: Object as PropType<Post>,
      required: true,
    },
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['update:post'],
}
</script>
