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
        <label for="image_search">Cerca un'immagine:</label>
        <input type="text" id="image_search" @input="searchImage($event.target.value)" placeholder="Cerca su Unsplash..." />
        <div v-if="imageResults.length" class="image-results">
          <img v-for="image in imageResults" :src="image.urls.thumb" @click="selectImage(image.urls.full)" :alt="image.alt_description" />
        </div>
      </div>

      <div class="form-group">
        <label for="image_url">URL Immagine Selezionata:</label>
        <input type="text" id="image_url" v-model="form.image_url" readonly />
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
      },
      imageResults: [] // Definisci imageResults qui
    };
  },
  methods: {
    async submitForm() {
      try {
        const travelResponse = await axios.post('http://localhost:8000/api/travels', this.form);
        const travelId = travelResponse.data.id;

        for (const destination of this.form.destinations) {
          destination.travel_id = travelId;
          await axios.post('http://localhost:8000/api/destinations', destination);
        }

        console.log('Viaggio e destinazioni inseriti con successo');
        this.resetForm();
      } catch (error) {
        console.error('Errore durante l\'inserimento del viaggio o delle destinazioni:', error.message);
      }
    },
    async searchImage(query) {
      try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: {
            query: query,
            client_id: '-nO5SFSiXLWTJOWDBF533A9OGkaT-fIonawVoXEGIQg', // Sostituisci con la tua chiave API
            per_page: 5
          }
        });

        this.imageResults = response.data.results; // Imposta i risultati della ricerca
      } catch (error) {
        console.error('Errore durante la ricerca delle immagini:', error.message);
      }
    },
    selectImage(imageUrl) {
      this.form.image_url = imageUrl;
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
      this.imageResults = []; // Resetta i risultati dell'immagine
    }
  }
};
</script>

<style lang="scss" scoped>
.create-travel-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f7f9fc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

h2 {
  font-size: 24px;
  margin-top: 30px;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
}

h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;

  label {
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    color: #555;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
    color: #555;
    transition: border-color 0.3s ease;
  }

  input:focus,
  textarea:focus {
    border-color: #007bff;
    outline: none;
  }
}

.image-results {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;

  img {
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 5px;
    margin: 5px;
    width: 100px;
    height: 100px;
    object-fit: cover;
    transition: border-color 0.3s ease;
  }

  img:hover {
    border-color: #007bff;
  }
}

.destination-group {
  background-color: #eef5ff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  border-left: 5px solid #007bff;
}

.add-button,
.remove-button,
.submit-button {
  background-color: #007bff;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  display: block;
  width: 100%;
  text-align: center;
}

.add-button:hover,
.remove-button:hover,
.submit-button:hover {
  background-color: #0056b3;
}

.remove-button {
  background-color: #dc3545;
  margin-top: 15px;
}

.remove-button:hover {
  background-color: #c82333;
}

.submit-button {
  margin-top: 30px;
  background-color: #28a745;
}

.submit-button:hover {
  background-color: #218838;
}
</style>
