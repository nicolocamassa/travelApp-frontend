<template lang="html">
  <div class="container">
    <div class="row">
      <!-- Card per creare un nuovo viaggio -->
      
      <!-- Card per viaggi esistenti -->
      <div class="cards-section">
        <ul v-if="travels.length">
          <li>
            <router-link to="/create-travel">
        <div class="card create-card">
          <div class="image-container">
            <img class="add-img" src="../assets/add.svg" alt="">
          </div>
          <div class="content">
            <h2>Create New Travel</h2>
            <p>Click here to add a new travel plan.</p>
          </div>
        </div>
      </router-link>
          </li>
          <li v-for="travel in travels" :key="travel.id">
            <router-link :to="{ name: 'TravelDetail', params: { id: travel.id } }">
              <div class="card">
                <div class="image-container">
                  <img :src="travel.image_url" alt="Travel Image">
                </div>
                <div class="content">
                  <h2>{{ travel.title }}</h2>
                  <p>{{ formatDate(travel.start_date) }} &rarr; {{ formatDate(travel.end_date) }}</p>
                  <div class="footer">
                    <div class="temperature">
                      <span>☀️ 31°</span>
                    </div>
                    <a href="#" class="button">View trip</a>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <p v-else>Loading...</p>
      </div>
    </div>
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
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    },
  }
}
</script>

<style lang="scss" scoped>

.container {
  padding: 20px;
}

.row {
  margin: 10px 0;
}

.cards-section {
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: center;
  }

  li {
    margin: 10px;
  }
}

a {
  text-decoration: none;
}

.card {
  background-color: #ffffff;
  border-radius: 20px;
  width: 300px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.create-card {
  cursor: pointer;
  transition: background-color 0.3s;
  height: 359px;
}

.create-card:hover {
  background-color: #f0f8ff;
}

.image-container {
  width: 100%;
  height: 200px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  padding: 20px;
  color: rgb(24, 24, 24);
  text-align: left;
}

h2 {
  margin: 0 0 10px 0;
  font-size: 24px;
}

p {
  margin: 0 0 20px 0;
  color: #8a8a8a;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.temperature {
  font-size: 16px;
}

.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 10px;
  font-weight: bold;
}

.button:hover {
  background-color: #0056b3;
}

@media (max-width: 639px) {
  .todo-window {
    width: 100px;
    background-color: rgb(255, 255, 255);
  }
}

@media (min-width: 640px) and (max-width: 768px) {
  .cards-section ul {
    justify-content: center;
  }
}

@media (min-width: 640px) and (max-width: 1700px) {
  .todo-window {
    width: 620px;
    background-color: rgb(255, 255, 255);
  }

  .calendar-window {
    width: 620px;
    height: calc(100vh - 410px);
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
  }
}
</style>
