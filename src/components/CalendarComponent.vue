<template>
  <div class="calendar-window">
    <div class="upcoming-events">
      <div class="title">
        <h2>Upcoming Events</h2>
        <p>Here you'll find your upcoming trips and todos.</p>
      </div>
      <div class="timeline">
        <div v-for="event in sortedEvents" :key="event.id" class="timeline-item" :class="{ 'next-event': isNextEvent(event) }">
          <div :class="['date', { 'next-event-date': isNextEvent(event) }]">{{ formatDate(event.date) }}</div>
          <div class="dot" :class="{ 'highlight': isNextEvent(event) }"></div>
          <div class="event">
            <img v-if="event.image_url" :src="event.image_url" :alt="event.title" :class="{ 'large-image': isNextEvent(event) }">
            <div class="event-info">
              <h3 :class="{ 'large-title': isNextEvent(event) }">{{ event.title }}</h3>
              <p :class="{ 'large-description': isNextEvent(event) }">{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="next-trip" v-if="nextEvent">
      <h3>Next Event</h3>
      <p class="descr">In this section, you can see the countdown to your next destination or todo, along with detailed weather information to help you plan ahead.</p>
      <div class="countdown">
        <p><span>{{ countdown.days }}</span> <br> Days</p>
        <p><span>{{ countdown.hours }}</span> <br> Hours</p>
        <p><span>{{ countdown.minutes }}</span> <br> Minutes</p>
      </div>
      <div class="weather" v-if="nextEvent.image_url">
        <span class="weather-info">🌡️ 31°</span> <span class="weather-info">☀️ Sunny</span>
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
      todos: [],
      countdown: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      nextEvent: null,
      countdownInterval: null,
    };
  },
  created() {
    this.fetchEvents();
  },
  beforeDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  },
  methods: {
    async fetchEvents() {
      try {
        const [travelsResponse, todosResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/travels'),
          axios.get('http://localhost:8000/api/todos'),
        ]);
        this.travels = travelsResponse.data;
        this.todos = todosResponse.data.map(todo => ({
          ...todo,
          date: todo.due_date
        }));
        this.startCountdown();
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
    isNextEvent(event) {
      return this.nextEvent && event.id === this.nextEvent.id;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    },
    startCountdown() {
      const now = new Date();

      // Find the next event that is still in the future
      this.nextEvent = this.sortedEvents.find(event => new Date(event.date) > now);

      if (this.nextEvent) {
        this.updateCountdown();
        this.countdownInterval = setInterval(this.updateCountdown, 1000);
      }
    },
    updateCountdown() {
      const now = new Date();
      const eventDate = new Date(this.nextEvent.date);
      const timeDifference = eventDate - now;

      if (timeDifference <= 0) {
        clearInterval(this.countdownInterval);
        this.startCountdown();  // Move to the next event
      } else {
        this.countdown.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        this.countdown.hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        this.countdown.minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        this.countdown.seconds = Math.floor((timeDifference / 1000) % 60);
      }
    },
  },
  computed: {
    sortedEvents() {
      const events = [
        ...this.travels.map(travel => ({ ...travel, date: travel.start_date })),
        ...this.todos
      ];
      return events.sort((a, b) => new Date(a.date) - new Date(b.date));
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
  position: relative;
  overflow: auto;
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
  position: relative;
  margin-left: 50px; /* Sposta la linea più a destra per allinearla alla data e ai puntini */
  margin-top: 60px;

  &::before {
    content: '';
    position: absolute;
    left: 22%; /* Posiziona la linea al centro delle date e dei puntini */
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: transparent; /* Linea di base trasparente */
    background-image: linear-gradient(to bottom, #888 50%, transparent 50%);
    background-size: 2px 8px; /* Definisci la larghezza e la lunghezza dei tratti */
    transform: translateX(-22%); /* Centra esattamente la linea */
    z-index: 0; /* Assicura che la linea stia sotto gli elementi */
  }
}

.timeline-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;

  .date {
    width: 80px;
    text-align: right;
    padding-right: 10px;
    position: relative;
    z-index: 1;
    background-color: transparent; // Imposta il colore di sfondo predefinito
    color: #888; // Colore del testo predefinito
    border-radius: 5px; // Arrotonda gli angoli per un aspetto migliore
    text-align: center;
  }

  .date.next-event-date {
    color: #368DFF; // Colore del testo bianco per contrastare con lo sfondo blu
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #888;
    position: absolute;
    left: 22%;
    transform: translateX(-40%);
    z-index: 2;
  }

  .highlight {
    background-color: #FFD700;
  }

  .event {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 20px;
    z-index: 1;
  }

  .event img.large-image {
    width: 100px; // Ingrandisci ulteriormente l'immagine per il prossimo evento
    height: 100px;
    margin: 20px 0px;
    margin-left: 20px;
  }

  .event-info h3.large-title {
    font-size: 1.5rem; // Aumenta la dimensione del titolo per il prossimo evento
  }

  .event-info p.large-description {
    font-size: 1.2rem; // Aumenta la dimensione della descrizione per il prossimo evento
  }

  &.next-event::before {
    background-color: #FFD700;
  }
}

.date {
  width: 100px;
  font-weight: bold;
  color: #888;
  padding: 10px;
  text-align: center;
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


.date {
  width: 100px;
  font-weight: bold;
  color: #888;
  padding: 10px;
  text-align: center;
}

.next-trip {
  position: sticky; 
  top: 0px; 
  right: 0px;
  flex: 2;
  padding: 0px;
  border-radius: 20px;
  background-color: #fff; 
  z-index: 1; 
  margin-left: 300px;

  .descr{
    color: rgb(146, 146, 146);
    margin: 5px 0;
  }
}

.countdown {
  font-size: 1.5rem;
  margin: 1px 0;
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
  font-size: 1.3rem;
  background-color: #DFEDFF;
  padding: 30px;
  border-radius: 20px;
  width: 400px;
  display: flex
}

.weather-info{
  margin: 0px 20px;
}

.recommended-trip {
  margin-top: 20px;
}

.recommendation {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
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
