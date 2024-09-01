<template>
    <div>
      <input
        type="text"
        :id="inputId"
        v-model="place"
        placeholder="Inserisci un luogo..."
        @focus="initializeAutocomplete"
        class="autocomplete-input"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      inputId: {
        type: String,
        required: true,
      },
      onPlaceSelected: {
        type: Function,
        required: true,
      },
    },
    data() {
      return {
        place: '',
        autocomplete: null,
      };
    },
    methods: {
      initializeAutocomplete() {
        if (!this.autocomplete) {
          this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById(this.inputId),
            { types: ['geocode'] }
          );
  
          this.autocomplete.addListener('place_changed', this.onPlaceChanged);
        }
      },
      onPlaceChanged() {
        const place = this.autocomplete.getPlace();
        if (place.geometry) {
          const location = {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
          };
          this.onPlaceSelected(location);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .autocomplete-input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
    color: #555;
    transition: border-color 0.3s ease;
  }
  
  .autocomplete-input:focus {
    border-color: #007bff;
    outline: none;
  }
  </style>
  