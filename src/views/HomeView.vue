<template>
    <div class="cards-section" @mousedown="startDrag" @mouseup="endDrag" @mousemove="onDrag">
      <ul ref="cardList" v-if="travels.length">
          <li v-for="travel in travels" :key="travel.id">
            <router-link :to="{ name: 'TravelDetail', params: { id: travel.id } }">
                <h2>
                    {{ travel.title }}
                </h2>
                <p>{{ travel.description }}</p>
                <p><strong>Start Date:</strong> {{ travel.start_date }}</p>
                <p><strong>End Date:</strong> {{ travel.end_date }}</p>
                <img :src="travel.image_url" alt="Travel Image" />
            </router-link>
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
        isDragging: false,
        startX: 0,
        scrollLeft: 0,
      };
    },
    created() {
      this.fetchTravels();
    },
    methods: {
      async fetchTravels() {
        try {
          const response = await axios.get('http://localhost:8000/api/travels'); // URL of the API endpoint
          this.travels = response.data; 
        } catch (error) {
          console.error('Error fetching travels:', error);
        }
      },
      startDrag(event) {
        this.isDragging = true;
        this.startX = event.pageX - this.$refs.cardList.offsetLeft;
        this.scrollLeft = this.$refs.cardList.scrollLeft;
      },
      endDrag() {
        this.isDragging = false;
      },
      onDrag(event) {
        if (!this.isDragging) return;
        event.preventDefault();
        const x = event.pageX - this.$refs.cardList.offsetLeft;
        const walk = (x - this.startX) * 2; 
        this.$refs.cardList.scrollLeft = this.scrollLeft - walk;
      },
    },
  }
  </script>
  
  <style lang="scss" scoped>
    
  </style>
