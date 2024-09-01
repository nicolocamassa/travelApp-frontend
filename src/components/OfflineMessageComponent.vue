<template lang="">
    <!-- Aggiungi questo elemento all'interno del tuo HTML principale -->
<div id="offline-notice"  class="offline-notice" style="display: none;">
  <p>Sei offline. Le modifiche saranno aggiornate non appena sarai nuovamente online.</p>
</div>
</template>
<script>
export default {
    name: "OfflineMessageComponent",
}
</script>
<style lang="scss" scoped>
    /* Aggiungi questi stili nel tuo file CSS */
.offline-notice {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ff4c4c; /* Colore di sfondo rosso per indicare errore */
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 16px;
  z-index: 1000; /* Assicurati che sia sopra gli altri contenuti */
}

</style>