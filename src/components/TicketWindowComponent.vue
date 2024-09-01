<template>
    <div class="ticket-window">
      <h2>Your Next Trip</h2>
      <div class="details-container">
        <div class="flight-info">
          <div class="flight-detail">
            <span class="icon"><img src="../assets/flight-2.svg" alt=""></span>
            <span class="flight-text">Takeoff from <strong>Brindisi</strong></span>
            <span class="flight-time">07:30, 27 Jan</span>
          </div>
          <div class="flight-detail">
            <span class="icon"><img src="../assets/flight-1.svg" alt=""></span>
            <span class="flight-text">Landing in <strong>{{ nextTripTitle }}</strong></span>
            <span class="flight-time">09:36, 27 Jan</span>
          </div>
        </div>
      </div>
      <div class="circles-container">
        <div class="circle-ticket top"></div>
        <div class="circle-ticket bottom"></div>
      </div>
  
      <div class="next-trip-window">
        <p class="city">{{ nextTripTitle }}</p>
        <p class="days">{{ daysUntilNextTrip }} Days</p>
        <p class="write">Until the trip</p>
        <!-- Mostra il pulsante Details solo se nextTripId è disponibile -->
        <router-link v-if="nextTripId" :to="{ name: 'TravelDetail', params: { id: nextTripId } }">
          <div class="details-button">Details</div>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "TicketWindowComponent",
    data() {
      return {
        nextTripTitle: "", 
        daysUntilNextTrip: null,
        nextTripId: null, // Aggiungi una variabile per l'ID del prossimo viaggio
      };
    },
    mounted() {
      this.getNextTrip();
    },
    methods: {
      async getNextTrip() {
        try {
          const response = await axios.get('http://localhost:8000/api/travels');
          const travels = response.data;
  
          const now = new Date();
          let closestTrip = null;
          let minTimeDifference = Infinity;
  
          travels.forEach(trip => {
            const tripDate = new Date(trip.start_date);
            const timeDifference = tripDate - now;
  
            if (timeDifference > 0 && timeDifference < minTimeDifference) {
              closestTrip = trip;
              minTimeDifference = timeDifference;
            }
          });
  
          if (closestTrip) {
            this.nextTripTitle = closestTrip.title; 
            this.daysUntilNextTrip = Math.ceil(minTimeDifference / (1000 * 60 * 60 * 24)); 
            this.nextTripId = closestTrip.id; // Imposta l'ID del prossimo viaggio
          } else {
            this.nextTripTitle = "No upcoming trips"; 
            this.daysUntilNextTrip = null;
            this.nextTripId = null; // Nessun viaggio disponibile
          }
        } catch (error) {
          console.error('Error fetching the next trip:', error);
          this.nextTripTitle = "Error fetching trip data"; 
          this.daysUntilNextTrip = null;
          this.nextTripId = null; // Errore nel recupero dell'ID del viaggio
        }
      },
    },
  };
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

img{
    width: 20px;
    filter: invert(100%);
    margin-right: 10px;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #368DFF;

    .city{
        
    }
    
    .days{
        display: flex;
        align-items: center;
        font-weight: 900;
        font-size: 1.4rem;
        margin-top: 20px;
    }

    .write{
        font-size: 0.8rem;
    }

    .details-button{
        width: 80px;
        height: 20px;
        background-color: white;
        border: none;
        color: #368DFF;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        margin-top: 50px;
        text-align: center;
        font-weight: 800;
    }

    a{
        text-decoration: none;
        color: inherit;
    }
}

.flight-detail{
    margin: 20px 0;
    display: flex;
    align-items: center;
}
</style>