<template>
  <div class="todo-window">
    <h2>To Do Plan For The Year</h2>
    <div>
      <!-- Form Visibility Toggle -->
      <div class="add-todo" @click="toggleForm">
        Add New To Do
      </div>
      <div v-if="showForm" class="form-container">
        <form @submit.prevent="createTodo" class="todo-form">
          <input v-model="todo.title" placeholder="Task" required class="input-title" />
          
          <div class="date-picker-container">
            <input ref="datepicker" v-model="todo.due_date" type="text" placeholder="" class="input-date" readonly />
            <i class="fas fa-calendar-alt calendar-icon"></i>
          </div>
          
          <button type="submit" class="add-todo-button">+</button>
        </form>
      </div>

      <ul class="todo-list">
        <li v-for="todo in todos" :key="todo.id" class="todo-item">
          <div class="custom-checkbox" :class="{ checked: todo.is_completed }" @click="toggleTodoStatus(todo)">
            <i class="fas fa-check"></i>
          </div>
          <span :class="{ completed: todo.is_completed }">
            {{ todo.title }} - {{ formatDate(todo.due_date) }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default {
  watch: {
    showForm(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          const datepickerElement = this.$refs.datepicker;
          if (datepickerElement) {
            flatpickr(datepickerElement, {
              enableTime: false,
              dateFormat: "Y-m-d",
              altInput: true,
              altFormat: "d/m/Y",
              defaultDate: null,
            });
          } else {
            console.error('Datepicker reference is not available');
          }
        });
      }
    }
  },
  name: 'ToDoWindowComponent',
  data() {
    return {
      todo: {
        title: '',
        is_completed: false,
        due_date: null,
      },
      todos: [],
      showForm: false,  // Variabile per controllare la visibilità del modulo
    };
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;  // Alterna la visibilità del modulo
    },
    async createTodo() {
      try {
        const response = await axios.post('http://localhost:8000/api/todos', this.todo);
        this.todos.push(response.data);
        this.resetForm();
        this.showForm = false;  // Nascondi il modulo dopo aver aggiunto il to-do
      } catch (error) {
        console.error('Error creating todo:', error);
      }
    },
    async fetchTodos() {
      try {
        const response = await axios.get('http://localhost:8000/api/todos');
        this.todos = response.data;
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    async updateTodoStatus(todo) {
      try {
        await axios.put(`http://localhost:8000/api/todos/${todo.id}`, {
          ...todo,
          is_completed: todo.is_completed ? 1 : 0
        });
      } catch (error) {
        console.error('Error updating todo status:', error);
      }
    },
    toggleTodoStatus(todo) {
      todo.is_completed = !todo.is_completed;
      this.updateTodoStatus(todo);
    },
    resetForm() {
      this.todo = {
        title: '',
        is_completed: false,
        due_date: null,
      };
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB');
    }
  },
  created() {
    this.fetchTodos();
  }
};
</script>


<style lang="scss" scoped>
.add-todo {
  width: 90%;
  height: 50px;
  background-color: #007bff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translate(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s;
  z-index: 999;
}


.form-container {
  width: 90%;
  margin: 10px auto;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 50%;
  bottom: 60px; /* Spazio per il bottone 'Add New To Do' */
  transform: translate(-50%);
  z-index: 999;
  transition: all 0.3s ease-in-out;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px; /* Maggiore spazio tra gli elementi */
}

.todo-window {
  background-color: #f9f9f9;
  border-radius: 20px;
  width: calc(100vw - (340px * 4) - 50px);
  min-width: 300px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  color: #333;
  height: 360px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  max-height: 250px;
  overflow-y: auto;
  padding-bottom: 30px;
}

.todo-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.custom-checkbox {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #D6E7FF;
  background-color: #D6E7FF;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s, border-color 0.3s;
}

.custom-checkbox.checked {
  background-color: #368DFF;
  border-color: #368DFF;
}

.custom-checkbox i {
  color: white;
  font-size: 12px;
  display: none;
}

.custom-checkbox.checked i {
  display: block;
}

.todo-item span {
  font-size: 16px;
  color: #333;
}

.todo-item span.completed {
  text-decoration: line-through;
  color: #888;
}

.todo-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-title {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-title, .input-date {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
}

.input-title:focus, .input-date:focus {
  border-color: #007bff;
  outline: none;
}

.date-picker-container {
  position: relative;
}

.calendar-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #007bff;
  cursor: pointer;
}

.add-todo-button {
  padding: 12px 24px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.2s;
}
</style>
