<template lang="html">
  <div class="create-travel-container">
    <h1>Inserisci un Nuovo Viaggio</h1>
    <form @submit.prevent="submitForm" class="travel-form">
      <div class="form-group">
        <label for="title">Titolo:</label>
        <input type="text" id="title" v-model="form.title" required />
      </div>

      <div class="form-group">
        <label for="description">Descrizione:</label>
        <textarea id="description" v-model="form.description" required></textarea>
      </div>

      <div class="form-group">
        <label for="start_date">Data di Inizio:</label>
        <input type="date" id="start_date" v-model="form.start_date" required />
      </div>

      <div class="form-group">
        <label for="end_date">Data di Fine:</label>
        <input type="date" id="end_date" v-model="form.end_date" required />
      </div>

      <div class="form-group">
        <label for="image_url">URL Immagine:</label>
        <input type="text" id="image_url" v-model="form.image_url" required />
      </div>

      <h2>Aggiungi Destinazioni</h2>
      <div v-for="(destination, index) in form.destinations" :key="index" class="destination-group">
        <h3>Destinazione {{ index + 1 }}</h3>

        <div class="form-group">
          <label for="destination_name">Nome Destinazione:</label>
          <input type="text" id="destination_name" v-model="destination.destination_name" required />
        </div>

        <div class="form-group">
          <label for="description">Descrizione:</label>
          <textarea id="description" v-model="destination.description" required></textarea>
        </div>

        <div class="form-group">
  <label for="vist_date">Data di Visita:</label>
  <input type="date" id="vist_date" v-model="destination.vist_date" required />
</div>


        <div class="form-group">
          <label for="image_url">URL Immagine:</label>
          <input type="text" id="image_url" v-model="destination.image_url" required />
        </div>

        <div class="form-group">
          <label for="food">Cibo:</label>
          <textarea id="food" v-model="destination.food" required></textarea>
        </div>

        <div class="form-group">
          <label for="notes">Note:</label>
          <textarea id="notes" v-model="destination.notes" required></textarea>
        </div>

        <div class="form-group">
          <label for="latitude">Latitudine:</label>
          <input type="number" step="0.000001" id="latitude" v-model="destination.latitude" required />
        </div>

        <div class="form-group">
          <label for="longitude">Longitudine:</label>
          <input type="number" step="0.000001" id="longitude" v-model="destination.longitude" required />
        </div>

        <button type="button" @click="removeDestination(index)" class="remove-button">Rimuovi Destinazione</button>
      </div>

      <button type="button" @click="addDestination" class="add-button">Aggiungi Destinazione</button>
      <button type="submit" class="submit-button">Inserisci Viaggio</button>
    </form>
  </div>
  </template>
  
  <script>
  import axios from 'axios';

export default {
  data() {
    return {
      form: {
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        image_url: '',
        destinations: [
          {
            destination_name: '',
            description: '',
            vist_date: '',
            image_url: '',
            food: '',
            notes: '',
            latitude: '',
            longitude: ''
          }
        ]
      }
    };
  },
  methods: {
    async submitForm() {
        try {
      const travelResponse = await axios.post('http://localhost:8000/api/travels', this.form);
      const travelId = travelResponse.data.id;

      for (const destination of this.form.destinations) {
        destination.travel_id = travelId; // Associa la destinazione al viaggio creato
        await axios.post('http://localhost:8000/api/destinations', destination);
      }

      console.log('Viaggio e destinazioni inseriti con successo');
      this.resetForm();
    } catch (error) {
      console.error('Errore durante l\'inserimento del viaggio o delle destinazioni:', error.message);
    }
},
    addDestination() {
      this.form.destinations.push({
        destination_name: '',
        description: '',
        vist_date: '',
        image_url: '',
        food: '',
        notes: '',
        latitude: '',
        longitude: ''
      });
    },
    removeDestination(index) {
      this.form.destinations.splice(index, 1);
    },
    resetForm() {
      this.form = {
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        image_url: '',
        destinations: [
          {
            destination_name: '',
            description: '',
            vist_date: '',
            image_url: '',
            food: '',
            notes: '',
            latitude: '',
            longitude: ''
          }
        ]
      };
    }
  }
};

  </script>
  
  <style lang="scss">
.create-travel-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h1, h2, h3 {
    color: #333;
  }

  .form-group {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input, textarea {
      width: 100%;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
      font-size: 14px;
    }
  }

  .destination-group {
    background-color: #eef;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .add-button, .remove-button, .submit-button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
  }

  .remove-button {
    background-color: #dc3545;
    margin-top: 15px;
  }

  .add-button {
    background-color: #28a745;
    display: block;
    margin-bottom: 20px;
  }

  .submit-button {
    display: block;
    width: 100%;
    background-color: #007bff;
  }

  .add-button:hover, .remove-button:hover, .submit-button:hover {
    background-color: darken(#007bff, 10%);
  }
}
  </style>
  