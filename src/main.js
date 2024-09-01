import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('Service Worker registrato con successo:', registration);
    }).catch((error) => {
      console.error('Registrazione del Service Worker fallita:', error);
    });
  });
}


document.addEventListener('DOMContentLoaded', () => {
    const offlineNotice = document.getElementById('offline-notice');
  
    function updateOnlineStatus() {
      if (navigator.onLine) {
        offlineNotice.style.display = 'none';
      } else {
        offlineNotice.style.display = 'block';
      }
    }
  
    updateOnlineStatus();
  
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  });
  
