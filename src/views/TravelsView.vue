<template lang="html">
    <div>
      <h1>Inserisci un Nuovo Viaggio</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="title">Titolo:</label>
          <input type="text" id="title" v-model="form.title" required />
        </div>
        <div>
          <label for="description">Descrizione:</label>
          <textarea id="description" v-model="form.description" required></textarea>
        </div>
        <div>
          <label for="start_date">Data di Inizio:</label>
          <input type="date" id="start_date" v-model="form.start_date" required />
        </div>
        <div>
          <label for="end_date">Data di Fine:</label>
          <input type="date" id="end_date" v-model="form.end_date" required />
        </div>
        <div>
          <label for="image_url">URL Immagine:</label>
          <input type="text" id="image_url" v-model="form.image_url" required />
        </div>
        <button type="submit">Inserisci Viaggio</button>
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
          image_url: ''
        }
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await axios.post('http://localhost:8000/api/travels', this.form);
          console.log('Viaggio inserito con successo:', response.data);
          this.resetForm();
        } catch (error) {
          console.error('Errore durante l\'inserimento del viaggio:', error);
        }
      },
      resetForm() {
        this.form = {
          title: '',
          description: '',
          start_date: '',
          end_date: '',
          image_url: ''
        };
      }
    }
  };
  </script>
  
  <style lang="scss">

  </style>
  