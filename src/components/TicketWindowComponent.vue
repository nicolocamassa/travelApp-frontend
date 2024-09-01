<template lang="">
    <div class="ticket-window">
        <h2>Your Next Trip</h2>
        <div class="details-container">
      <div class="flight-info">
        <div class="flight-detail">
          <span class="icon">✈️ </span>
          <span class="flight-text">Takeoff from <strong>Brindisi</strong></span>
          <span class="flight-time">07:30, 27 Jan</span>
        </div>
        <div class="flight-detail">
          <span class="icon">🛬 </span>
          <span class="flight-text">Landing in <strong>Milan</strong></span>
          <span class="flight-time">09:36, 27 Jan</span>
        </div>
      </div>
    </div>
        <div class="circles-container">
            <div class="circle-ticket top"></div>
            <div class="circle-ticket bottom"></div>
        </div>
        

        <div class="next-trip-window"></div>
    </div>
</template>
<script>
export default {
    name: "TicketWindowComponent",
}
</script>
<style lang="scss" scoped>
.ticket-window {
    width: calc(100vw - (100vw + 15px - (100vw - (340px * 4) - 40px)));
    height: 180px;
    min-width: 300px;
    background-color: #368DFF;
    border-radius: 20px;
    position: relative;
    padding: 20px 30px;
    color: white;
}

.circle-ticket {
  width: 40px;
  height: 20px;
  border-radius: 10rem 10rem 0 0;
  margin: 1rem auto;
  background-color: black;
}

.top{
    position: absolute;
    top: calc(100% - 25px);
    left: 70%;
}

.bottom{
    position: absolute;
    bottom: calc(100% - 25px);
    left: 70%;
    transform: rotate(180deg);
}

.next-trip-window {
    width: 20%;
    height: 90%;
    background-color: #D6E8FF;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translate(0, -50%);
    border-radius: 10px;
}

.flight-detail{
    margin: 20px 0;
}
</style>