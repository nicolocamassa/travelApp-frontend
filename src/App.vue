<template lang="">

<section class="flex-section">
  <SidebarComponent />
  <MainWindowComponent />
</section>


<RouterView />

</template>
<script>
import SidebarComponent from "../src/components/SidebarComponent.vue"
import MainWindowComponent from "../src/components/MainWindowComponent.vue"


export default {
  components: {
    SidebarComponent,
    MainWindowComponent,
  }
}
</script>
<style lang="scss">
  .flex-section{
    display: flex;
  }
</style>