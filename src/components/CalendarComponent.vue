<template lang="">
  <div class="calendar-window">
    <div class="upcoming-travels">
      <div class="title">
        <h2>Upcoming Travels</h2>
        <p>Here you'll find your upcoming trips.</p>
      </div>
      <div class="timeline">
        <div v-for="travel in sortedTravels" :key="travel.id" class="timeline-item">
          <div class="date">{{ formatDate(travel.start_date) }}</div>
          <div class="event">
            <img :src="travel.image_url" :alt="travel.title">
            <div class="event-info">
              <h3>{{ travel.title }}</h3>
              <p>{{ travel.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="next-trip" v-if="nextTrip">
      <h3>Next trip</h3>
      <p>In this section, you can see the countdown to your next destination, along with detailed weather information to help you plan ahead.</p>
      <div class="countdown">
        <p><span>{{ countdown.days }}</span> <br> Days</p>
        <p><span>{{ countdown.hours }}</span> <br> Hours</p>
        <p><span>{{ countdown.minutes }}</span> <br> Minutes</p>
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
import axios from 'axios';

export default {
  name: 'CalendarComponent',
  data() {
    return {
      travels: [],
      countdown: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      nextTrip: null,
      countdownInterval: null,
    };
  },
  created() {
    this.fetchTravels();
  },
  beforeDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  },
  methods: {
    async fetchTravels() {
      try {
        const response = await axios.get('http://localhost:8000/api/travels');
        this.travels = response.data;
        this.startCountdown();
      } catch (error) {
        console.error('Error fetching travels:', error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    },
    startCountdown() {
      if (this.sortedTravels.length > 0) {
        this.nextTrip = this.sortedTravels[0]; // First in sorted array is the next trip
        this.updateCountdown();
        this.countdownInterval = setInterval(this.updateCountdown, 1000);
      }
    },
    updateCountdown() {
      const now = new Date();
      const tripDate = new Date(this.nextTrip.start_date);
      const timeDifference = tripDate - now;

      if (timeDifference <= 0) {
        clearInterval(this.countdownInterval);
        this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return;
      }

      this.countdown.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      this.countdown.hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      this.countdown.minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      this.countdown.seconds = Math.floor((timeDifference / 1000) % 60);
    },
  },
  computed: {
    sortedTravels() {
      return this.travels.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
    }
  }
};
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

  p {
    text-align: center;
    margin: 50px 20px;

    span {
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
