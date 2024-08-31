<template lang="">
    <div class="calendar-window">
      <div class="upcoming-travels">
        <div class="title">
          <h2>Upcoming Travels</h2>
          <p>Here you'll find your upcoming trips.</p>
        </div>
        <div class="timeline">
          <div class="timeline-item">
            <div class="date">15 Dec 2024</div>
            <div class="event">
              <img src="../assets/milan.jpg" alt="Pack your bags">
              <div class="event-info">
                <h3>Pack your bags</h3>
                <p>Trip to Milano</p>
              </div>
            </div>
          </div>
          <!-- Aggiungi altri elementi della timeline qui -->
        </div>
      </div>
      <div class="next-trip">
        <h3>Next trip</h3>
        <p>In this section, you can see the countdown to your next destination...</p>
        <div class="countdown">
          <p><span>21</span> <br> Hours</p>  <p><span>21</span> <br>Minutes</p>  <p><span>21</span> <br>Seconds</p> 
        </div>
        <div class="weather">
          <span>31°</span> <span>☀️ Sunny</span>
        </div>
        <div class="recommended-trip">
          <h3>Recommended Trip</h3>
          <div class="recommendation">
            <img src="../assets/milan.jpg" alt="Brindisi, Puglia, Italy">
            <div class="recommendation-info">
              <p>Brindisi, Puglia, Italy</p>
              <span>14 people saved this trip</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CalendarComponent",
  }
  </script>
  
  <style lang="scss" scoped>
  .calendar-window {
    width: calc(100vw - 140px - (100vw - (340px * 4) - 40px));
    height: calc(100vh - 410px);
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
    display: flex;
    padding: 30px;
    gap: 20px;
  }
  
  .upcoming-travels {
    flex: 3;
  }
  
  .title h2 {
    margin: 0;
    font-size: 2rem;
  }
  
  .title p {
    color: #888;
  }
  
  .timeline {
    margin-top: 20px;
  }
  
  .timeline-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .date {
    width: 100px;
    font-weight: bold;
    color: #888;
  }
  
  .event {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .event img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    object-fit: cover;
  }
  
  .event-info h3 {
    margin: 0;
    font-size: 1rem;
  }
  
  .event-info p {
    margin: 0;
    color: #888;
  }
  
  .next-trip {
    flex: 2;
    padding: 10px;
    border-radius: 20px;
  }
  
  .countdown {
    font-size: 1.5rem;
    margin-top: 10px;
    display: flex;

    p{
        text-align: center;
        margin: 50px 20px;

        span{
            font-weight: 900;
            font-size: 2rem;
        }
    }
  }
  
  .weather {
    margin-top: 10px;
    font-size: 1.2rem;
  }
  
  .recommended-trip {
    margin-top: 20px;
  }
  
  .recommendation {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .recommendation img {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    object-fit: cover;
  }
  
  .recommendation-info p {
    margin: 0;
  }
  
  .recommendation-info span {
    font-size: 0.9rem;
    color: #888;
  }
  </style>
  