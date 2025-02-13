<script setup lang="ts">
import { Form, type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms'
import { InputText, Password, Button, useToast, Message } from 'primevue'
import { toRaw, ref } from 'vue'
import { authStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const isLoading = ref(false)

const router = useRouter()

const toast = useToast()

const auth = authStore()

if (auth.isLoggedIn) {
  router.push('/')
}

async function onFormSubmit(event: FormSubmitEvent) {
  if (event.valid) {
    isLoading.value = true
    const formData = toRaw(event.states)
    const success: boolean = await auth.register(
      formData.username.value,
      formData.displayname.value,
      formData.password.value,
    )
    if (success) {
      router.push('/')
    } else {
      isLoading.value = false
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Login failed',
        life: 3000,
        group: 'bottom-center',
      })
    }
  }
}

const resolver = ({ values }: FormResolverOptions) => {
  const errors: Promise<Record<string, unknown>> | Record<string, unknown> | undefined = {}

  if (!values.username) {
    errors.username = [{ message: 'Username is required.' }]
  }

  if (!values.displayname) {
    errors.displayname = [{ message: 'Displayname is required.' }]
  }

  if (!values.password) {
    errors.password = [{ message: 'Password is required.' }]
  }

  if (!values.repeat_password) {
    errors.repeat_password = [{ message: 'Repeat password is required.' }]
  }

  if (values.repeat_password !== values.password) {
    errors.repeat_password = [{ message: 'Repeat password needs to match.' }]
  }

  return {
    errors,
  }
}
</script>

<template>
  <div class="form-center outer">
    <div class="form-center inner frame">
      <Form class="flex flex-col gap-4 fit" v-slot="$form" :resolver @submit="onFormSubmit">
        <img src="/src/assets/logo.svg" />
        <div class="flex flex-col gap-1">
          <InputText name="username" placeholder="Username" />
          <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
            $form.username.error.message
          }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <InputText name="displayname" placeholder="Displayname" />
          <Message
            v-if="$form.displayname?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.displayname.error.message }}</Message
          >
        </div>
        <div class="flex flex-col gap-1 form-password">
          <Password name="password" placeholder="Password" />
          <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
            $form.password.error.message
          }}</Message>
        </div>
        <div class="flex flex-col gap-1 form-password">
          <Password name="repeat_password" placeholder="Repeat Password" :feedback="false" />
          <Message
            v-if="$form.repeat_password?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.repeat_password.error.message }}</Message
          >
        </div>
        <Button type="submit" :is-loading="isLoading" :loading="isLoading" label="Register" />
      </Form>
    </div>
    <RouterLink to="/login">Login</RouterLink>
  </div>
</template>

<style src="/src/assets/form-center.css"></style>

<style scoped>
a:hover {
  background-color: transparent;
}
</style>
