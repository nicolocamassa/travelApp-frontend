<template>
  <div class="travel" v-if="travel">
    <h1>{{ travel.title }}</h1>
    <p>{{ travel.description }}</p>
    <p><strong>Start Date:</strong> {{ travel.start_date }}</p>
    <p><strong>End Date:</strong> {{ travel.end_date }}</p>
    <img :src="travel.image_url" alt="Travel Image" />

    <div class="destinations" v-if="travel.destinations && travel.destinations.length">
      <h2>Destinazioni:</h2>
      <div v-for="destination in travel.destinations" :key="destination.id" class="destination">
        <h3>{{ destination.destination_name }}</h3>
        <p><strong>Description:</strong> {{ destination.description }}</p>
        <p><strong>Visit Date:</strong> {{ destination.vist_date }}</p>
        <img :src="destination.image_url" alt="Destination Image" />
        <p><strong>Food:</strong> {{ destination.food }}</p>
        <p><strong>Notes:</strong> {{ destination.notes }}</p>
        <p><strong>Latitude:</strong> {{ destination.latitude }}</p>
        <p><strong>Longitude:</strong> {{ destination.longitude }}</p>
      </div>
    </div>
  </div>
  <p v-else>Loading...</p>
</template>

  
  <script>
  import axios from 'axios';

export default {
  name: 'TravelDetailComponent',
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      travel: null, 
    };
  },
  created() {
    this.fetchTravel();
  },
  methods: {
    async fetchTravel() {
      try {
        const response = await axios.get(`http://localhost:8000/api/travels/${this.id}`);
        this.travel = response.data;
      } catch (error) {
        console.error('Error fetching travel:', error);
      }
    }
  }
}

  </script>
  
  <style scoped>
  .travel {
    font-family: Arial, sans-serif;
    color: #ffffff;
    padding: 20px;
    max-width: 800px;
    margin: auto;
  }
  
  h1 {
    font-size: 2em;
    margin-bottom: 10px;
  }
  
  p {
    margin: 10px 0;
    line-height: 1.5;
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }
  
  .destinations {
    margin-top: 20px;
  }
  
  .destination {
    background-color: #f9f9f9;
    border: 1px solid #1d1d1d;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    color: #1d1d1d;
  }
  
  .destination h3 {
    font-size: 1.5em;
    margin-top: 0;
  }
  
  .destination p {
    margin: 5px 0;
  }
  
  .destination img {
    border-radius: 4px;
  }
  
  </style>
  