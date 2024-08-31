<template>
    <div class="todo-window">
      <h2>To Do Plan For The Year</h2>
      <div>
        <form @submit.prevent="createTodo" class="todo-form">
          <input v-model="todo.title" placeholder="Title" required class="input-title" />
          
          <div class="date-picker-container">
            <input
              ref="datepicker"
              v-model="todo.due_date"
              type="text"
              placeholder=""
              class="input-date"
              readonly
            />
            <i class="fas fa-calendar-alt calendar-icon"></i>
          </div>
          
          <button type="submit" class="add-todo-button">+</button>
        </form>
  
        <ul class="todo-list">
          <li v-for="todo in todos" :key="todo.id" class="todo-item">
            <input type="checkbox" v-model="todo.is_completed" />
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
  name: 'ToDoWindowComponent',
  data() {
    return {
      todo: {
        title: '',
        is_completed: false,
        due_date: null,
      },
      todos: [],
    };
  },
  methods: {
    async createTodo() {
      try {
        const response = await axios.post('http://localhost:8000/api/todos', this.todo);
        this.todos.push(response.data);
        this.resetForm();
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
    resetForm() {
      this.todo = {
        title: '',
        is_completed: false,
        due_date: null,
      };
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB'); 
    }
  },
  mounted() {
    flatpickr(this.$refs.datepicker, {
      enableTime: false,
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "d/m/Y",
      defaultDate: null,
    });
  },
  created() {
    this.fetchTodos();
  }
};
</script>

  
<style lang="scss">
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
  margin: 0;
  max-height: 250px;
  overflow-y: auto;
}

.todo-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.todo-item input[type="checkbox"] {
  margin-right: 10px;
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
  align-items: center;
  margin-bottom: 10px;
}

.input-title {
  flex: 2;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-date {
  width: 40px;
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.date-picker-container{
    position: relative;
}

.calendar-icon {
  position: absolute;
  left: 40%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  color: #555;
  cursor: pointer;
}

.add-todo-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.add-todo-button:hover {
  background-color: #0056b3;
}

form {
  position: absolute;
  bottom: 10px;
  display: flex;
  align-items: center;
}
</style>
