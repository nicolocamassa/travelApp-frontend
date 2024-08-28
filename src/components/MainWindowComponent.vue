<template lang="">
    <section>
        <RouterView />
    </section>
</template>
<script>
export default {
    name: 'MainWindowComponents',
}
</script>
<style lang="scss">
    section {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: green;
    }
</style>