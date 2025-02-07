<script setup lang="ts">
import { Tag, Image, InputText, FloatLabel, Button, Message, Select } from 'primevue'
import { ref, type PropType } from 'vue'
import type { Post } from '@/types/post'
import Base64Cropper from './Base64Cropper.vue'
import { Form } from '@primevue/forms'
import Editor from 'primevue/editor'
import "quill/dist/quill.core.css";

const croppedBase64 = ref('')

const categories = [{
  name: "Technology",
  uuid: "35dbaec3-6738-42e5-bfd8-79e5877e3ffd",
}]
</script>

<style scoped src="/src/assets/post.css" />

<template>
  <div class="post-border detail">
    <span v-if="!edit">
      <h1 class="post-title">{{ post.title }}</h1>
      <div class="post-meta detail">
        <h2>
          created&nbsp;by
          <span class="post-author">{{ post.author.replace(' ', '&nbsp;') }}</span> on&nbsp;<span
            class="post-created"
            >{{ new Date(post.created * 1000).toLocaleDateString() }}</span
          ><!-- convert timestamp in seconds to milliseconds -->
        </h2>
        <div class="post-tags">
          <Tag class="post-category">{{ post.category }}</Tag>
        </div>
      </div>
      <Base64Cropper
        v-model:base64-result="croppedBase64"
        source="https://images.pexels.com/photos/226746/pexels-photo-226746.jpeg"
      />
      <!-- 32:9 Image ratio seems good -->
      <Image v-bind:src="croppedBase64" alt="Image" class="post-banner" preview />
      <div class="post-body">
        <p>
          <span v-html="post.body"></span>
        </p>
      </div>
    </span>
    <Form v-else v-slot="$form" class="edit">
      <!-- TODO: add banner upload + Cropper (in dialog?) -->
      <div class="post-meta edit">
        <FloatLabel variant="in" class="post-title edit">
          <InputText name="title" id="title" />
          <label for="title">Title</label>
        </FloatLabel>
        <FloatLabel variant="in" class="post-category edit">
          <Select name="category" class="post-category-select edit" id="category" filter :options="categories" option-label="name" option-value="uuid"></Select>
          <label for="category">Category</label>
        </FloatLabel>
      </div>
      <div class="post-body edit">
        <Editor name="content" editorStyle="height: 320px">
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
              <button class="ql-image" type="button"></button>
              <button class="ql-code-block" type="button"></button>
            </span>
            <span class="ql-formats">
              <button class="ql-clean" type="button"></button>
            </span>
          </template>
        </Editor>
        <Message v-if="$form.content?.invalid" severity="error" size="small" variant="simple">{{
          $form.content.error?.message
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
</style>

<script lang="ts">
export default {
  props: {
    post: {
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
