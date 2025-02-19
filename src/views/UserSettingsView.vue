<script setup lang="ts">
import { ToggleSwitch, SelectButton, Button } from 'primevue'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { ref, type Ref } from 'vue'
import type { userSettings } from '@/types/userSettings'

const themes = ref(['System', 'Light', 'Dark'])

const data: Ref<userSettings | undefined> = ref(undefined)

data.value = {
  displayEmailOnProfile: true,
  useDarkMode: true,
}

const initialValues = ref(
  data.value !== undefined
    ? {
        theme:
          data.value.useDarkMode === true
            ? 'Dark'
            : data.value.useDarkMode === false
              ? 'Light'
              : 'System',
        displayEmailOnProfile: data.value.displayEmailOnProfile,
      }
    : {
        theme: 'System',
        displayEmailOnProfile: false,
      },
)

function onSubmit(event: FormSubmitEvent): void {
  data.value = {
    displayEmailOnProfile: event.states.displayEmailOnProfile.value,
    useDarkMode: event.states.theme.value === 'Dark'
            ? true
            : event.states.theme.value === 'Light'
              ? false
              : null,
  }
  console.log(data.value)
}
</script>

<template>
  <h1 class="blue">Settings</h1>
  <Form class="settings" :initialValues="initialValues" @submit="onSubmit">
    <div class="settings-list">
      <span>Theme</span>
      <div class="frame">
        <SelectButton name="theme" input-id="theme" :options="themes"></SelectButton>
      </div>
      <label for="displayEmail">Display email on Profile page</label>
      <ToggleSwitch name="displayEmailOnProfile" inputId="displayEmail" />
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
  </Form>
</template>

<style scoped src="/src/assets/settings.css" />
