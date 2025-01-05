<template>
  <div>

    <sidebar :pageSelected="'home'" />

    <main class="focus" :class="sidebar_full ? 'sidebar_full' : 'sidebar_mini'">


    </main>
  </div>
</template>

<script lang="ts">
import sidebar from './components/sidebar.vue';

export default {
  name: "App Assembly",
  data() {
    return {
      sidebar_full: true
    }
  },
  components: { sidebar }
}
</script>