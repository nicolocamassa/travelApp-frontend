<template>
    <div>
      <h1>Travels</h1>
      <ul v-if="travels.length">
        <li v-for="travel in travels" :key="travel.id">
          <h2>{{ travel.title }}</h2>
          <p>{{ travel.description }}</p>
          <p><strong>Start Date:</strong> {{ travel.start_date }}</p>
          <p><strong>End Date:</strong> {{ travel.end_date }}</p>
          <img :src="travel.image_url" alt="Travel Image" />
        </li>
      </ul>
      <p v-else>Loading...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'TravelsSectionComponent',
    data() {
      return {
        travels: [], 
      };
    },
    created() {
      this.fetchTravels();
    },
    methods: {
      async fetchTravels() {
        try {
          const response = await axios.get('http://localhost:8000/api/travels'); 
          this.travels = response.data; 
        } catch (error) {
          console.error('Error fetching travels:', error);
        }
      }
    }
  }
  </script>
  
  <style scoped>

  </style>
  