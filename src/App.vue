<template lang="">

<section class="flex-section">
  <SidebarComponent />
  <MainWindowComponent />
  <OfflineMessageComponent /> 
</section>


</template>
<script>
import SidebarComponent from "../src/components/SidebarComponent.vue"
import MainWindowComponent from "../src/components/MainWindowComponent.vue"
import OfflineMessageComponent from "../src/components/OfflineMessageComponent.vue"


export default {
  components: {
    SidebarComponent,
    MainWindowComponent,
    OfflineMessageComponent
  }
}
</script>
<style lang="scss">
  .flex-section{
    display: flex;
  }
</style>