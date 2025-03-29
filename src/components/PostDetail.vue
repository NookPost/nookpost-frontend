<script setup lang="ts">
import { Tag, Image, InputText, FloatLabel, Button, Message, Select, useToast } from 'primevue'
import { ref, toRaw, type PropType, type Ref } from 'vue'
import type { Post } from '@/types/post'
import CropperDialog from './CropperDialog.vue'
import { Form, type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms'
import Editor from 'primevue/editor'
import 'quill/dist/quill.core.css'
import type { Category } from '@/types/category'
import { authStore } from '@/store/auth'
import { PrimeIcons } from '@primevue/core/api'
import { deletePost } from '@/api-calls/posts'

const authData = authStore()

const toast = useToast()

const props = defineProps({
  data: {
    type: Object as PropType<Post>,
    required: true,
  },
  edit: {
    type: Boolean,
    required: false,
    default: false,
  },
  categories: {
    type: Object as PropType<Category[]>,
    required: false,
  },
})

function onClickDelete(uuid: string) {
  deletePost(toast, uuid)
}

const emit = defineEmits<{
  (e: 'update:post', val: Post): Post
}>()

const imageData: Ref<string, string> = ref(props.data.bannerImageBase64)

async function onFormSubmit(event: FormSubmitEvent) {
  if (event.valid) {
    const formData = toRaw(event.states)
    const tempPost = props.data
    tempPost.title = formData.title.value
    tempPost.body = formData.body.value
    tempPost.category = formData.category.value
    tempPost.bannerImageBase64 = imageData.value
    // waiting for image to be added to endpoint
    emit('update:post', tempPost)
  }
}

const resolver = ({ values }: FormResolverOptions) => {
  const errors: Promise<Record<string, unknown>> | Record<string, unknown> | undefined = {}

  if (!values.title) {
    errors.title = [{ message: 'Title is required.' }]
  }

  if (!values.category?.uuid) {
    errors.category = [{ message: 'Category is required.' }]
  }

  if (!values.body) {
    errors.body = [{ message: 'Body is required.' }]
  }

  return {
    errors,
  }
}
</script>

<style scoped src="/src/assets/post.css" />

<template>
  <div class="post-border frame detail">
    <span v-if="!edit">
      <h1 class="post-title">{{ data.title }}</h1>
      <div class="post-detail-meta-bar">
        <div class="post-meta detail">
          <h2>
            created&nbsp;by
            <RouterLink
              class="post-author-link"
              :to="'/profile/' + encodeURIComponent(data.authorUsername)"
            >
              <span class="post-author">{{ data.authorDisplayname.replace(' ', '&nbsp;') }}</span>
            </RouterLink>
            on&nbsp;<span class="post-created">{{
              new Date(data.created * 1000).toLocaleDateString()
            }}</span
            ><!-- convert timestamp in seconds to milliseconds -->
          </h2>
          <div class="post-tags">
            <RouterLink
              class="post-category-link"
              :to="'/category/' + encodeURIComponent(data.category.uuid)"
            >
              <Tag class="post-category"
                ><span :class="data.category.icon" />{{ data.category.name }}</Tag
              >
            </RouterLink>
          </div>
        </div>
        <div v-if="authData.userName === data.authorUsername" class="post-controls">
          <Button
            :icon="PrimeIcons.PENCIL"
            severity="secondary"
            as="router-link"
            :to="'/post/edit/' + encodeURIComponent(data.uuid)"
            v-tooltip.bottom="'Edit Post'"
          />
          <!-- Add Deletion Logic here -->
          <Button
            :icon="PrimeIcons.TRASH"
            severity="danger"
            @click="onClickDelete(data.uuid)"
            v-tooltip.bottom="'Delete Post'"
          />
        </div>
      </div>
      <Image
        v-if="data.bannerImageBase64 !== ''"
        v-bind:src="data.bannerImageBase64"
        alt="Image"
        class="post-banner"
        preview
      />
      <div class="post-body">
        <p>
          <span v-html="data.body"></span>
        </p>
      </div>
    </span>
    <Form
      v-else
      v-slot="$form"
      class="edit"
      :resolver
      @submit="onFormSubmit"
      :initial-values="data"
    >
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
              name="category"
              class="post-category-select edit"
              id="category"
              placeholder="Select a Category"
              filter
              :options="categories"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="post-meta-category-select">
                  <span :class="slotProps.value.icon" />{{ slotProps.value.name }}
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="post-meta-category-select">
                  <span :class="slotProps.option.icon" />{{ slotProps.option.name }}
                </div>
              </template>
            </Select>
            <label for="category">Category</label>
          </FloatLabel>
          <Message v-if="$form.category?.invalid" severity="error" size="small" variant="simple">{{
            $form.category.error.message
          }}</Message>
        </div>
      </div>
      <CropperDialog
        v-model:data="imageData"
        :stencil-props="{
          aspectRatio: 32 / 9,
        }"
        :preview-class="'post-banner-preview'"
      />
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

<style scoped>
/* Fix Quill Editor Bullet */
.edit:deep(.ql-editor ol li:before) {
  content: none;
}

.edit:deep(.post-banner-preview *) {
  width: 100%;
  border-radius: 6px;
}
</style>
