<template lang="">
    <section class="travels-card-container">
        <TravelsCardsComponent />
        <TravelsCardsComponent />
        <TravelsCardsComponent />
    </section>
</template>
<script>
import TravelsCardsComponent from './TravelsCardsComponent.vue'

export default {
    name: "TravelsSectionComponent",

    components: {
        TravelsCardsComponent
    }
 
}
</script>
<style lang="scss">
    .travels-card-container {
        width: calc(100% - 500px);
        height: 45%;
        background-color: rgb(0, 200, 255);
        display: flex;
        padding: 20px;
    }
</style>