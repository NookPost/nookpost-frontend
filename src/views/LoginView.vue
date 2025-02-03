<script setup lang="ts">
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { InputText, Password, Button, useToast } from 'primevue'
import { toRaw, ref } from 'vue'
import { authStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const isLoading = ref(false);

const router = useRouter();

const toast = useToast();

async function onFormSubmit(event: FormSubmitEvent) {
  isLoading.value = true;
  const formData = toRaw(event.states)
  const auth = authStore()
  const success: boolean = await auth.login({
    username: formData.username.value,
    password: formData.password.value,
  })
  if(success) {
    router.push('/');
  } else {
    isLoading.value = false;
    toast.add({ severity: 'error', summary: 'Error', detail: 'Login failed', life: 3000, group: 'bottom-center' });
  }
}
</script>

<template>
  <div class="form-center outer">
    <div class="form-center inner">
      <Form class="flex flex-col gap-4 fit" @submit="onFormSubmit">
        <img src="/src/assets/logo.svg" />
        <InputText name="username" placeholder="Username" />
        <Password name="password" placeholder="Password" :feedback="false" />
        <Button type="submit" :is-loading="isLoading" :loading="isLoading" label="Submit" />
      </Form>
    </div>
    <RouterLink to="/register">Register</RouterLink>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.gap-1 {
  gap: 0.25rem;
}
.gap-4 {
  gap: 1rem;
}
.form-center.outer {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form-center.inner {
  border: 1px solid var(--p-inputtext-border-color);
  border-radius: var(--p-inputtext-border-radius);
  padding: 25px;
  background-color: var(--vt-c-divider-dark-2);
}
a:hover {
  background-color: transparent;
}
</style>
