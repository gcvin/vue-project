<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useDark, useToggle } from '@vueuse/core'
import { ElSwitch, ElButton } from 'element-plus'
import { MyInput } from 'my-component'
import baimao from '@/assets/svgs/baimao.svg?component'
import { onMounted, ref } from 'vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const name = ref('')
const inputRef = ref<InstanceType<typeof MyInput> | null>(null)

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/svgs/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <ElSwitch v-model="isDark" @change="(val) => toggleDark(Boolean(val))" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>

      <ElButton type="primary" :icon="baimao" size="large">Get Started</ElButton>
      <MyInput
        ref="inputRef"
        v-model="name"
        placeholder="Enter your name"
        @change="(val: string) => console.log(val)"
      >
        <template #prepend>
          <span>Prefix</span>
        </template>
        <template #append>
          <span>Suffix</span>
        </template>
      </MyInput>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
