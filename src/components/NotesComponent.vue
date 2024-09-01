<template lang="">
    <div class="notes-window">
        <h2>Notes</h2>
        <textarea v-model="noteText" placeholder="Write your notes here..." @input="handleNoteChange"></textarea>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "NotesComponent",
    data() {
        return {
            noteText: '',
            noteId: null 
        };
    },
    async mounted() {
        await this.loadLatestNote();
    },
    methods: {
        async loadLatestNote() {
            try {
                const response = await axios.get('http://localhost:8000/api/notes/latest');
                if (response.data) {
                    this.noteText = response.data.content;
                    this.noteId = response.data.id;
                }
            } catch (error) {
                console.error('Error loading latest note:', error);
            }
        },
        async handleNoteChange() {
            if (this.noteText.trim() === '') {
                // Se il testo è vuoto, cancella la nota se esiste
                if (this.noteId) {
                    await this.deleteNote();
                }
                this.noteId = null; // Resetta l'ID della nota
                return;
            }

            try {
                // Verifica se c'è già una nota
                if (this.noteId) {
                    // Se esiste una nota, aggiorna
                    await axios.put(`http://localhost:8000/api/notes/${this.noteId}`, {
                        content: this.noteText
                    });
                } else {
                    // Se non esiste una nota, crea una nuova
                    const response = await axios.post('http://localhost:8000/api/notes', {
                        content: this.noteText
                    });
                    this.noteId = response.data.id; // Salva l'ID della nuova nota
                }
            } catch (error) {
                console.error('Error handling note:', error);
            }
        },
        async deleteNote() {
            try {
                await axios.delete(`http://localhost:8000/api/notes/${this.noteId}`);
                console.log('Note deleted successfully!');
            } catch (error) {
                console.error('Error deleting note:', error);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .notes-window {
        padding: 20px;

        textarea {
            width: 100%;
            height: 150px; 
            padding: 0px; 
            border: none; 
            border-radius: 5px; 
            font-size: 16px; 
            box-sizing: border-box; 
            resize: none; 
            background-color: #fff; 
        }
    }
</style>
