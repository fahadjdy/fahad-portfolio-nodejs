<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Todo Manager</h2>

    <!-- Add Todo Form -->
    <form @submit.prevent="addTodo" class="mb-4">
      <input v-model="newTodo.title" placeholder="New todo title" class="border p-2" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 ml-2">Add</button>
    </form>

    <!-- Todo List -->
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="mb-2 flex justify-between items-center border-b pb-2"
      >
        <div>
          <input type="checkbox" v-model="todo.completed" @change="toggleTodo(todo)" />
          <span :class="{ 'line-through': todo.completed }">{{ todo.title }}</span>
        </div>
        <button @click="deleteTodo(todo.id)" class="text-red-500">Delete</button>
      </li>
    </ul>

    <!-- Pagination Controls -->
    <div class="mt-4 flex gap-2">
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="px-3 py-1 bg-gray-300 hover:bg-gray-400"
      >
        Previous
      </button>

       <button
            v-for="p in totalPages"
            :key="p"
            @click="goToPage(p)"
            :class="[
            'px-4 py-2 rounded',
            page === p
                ? 'bg-blue'
                : 'bg-gray'
            ]"
        >
            {{ p }}
        </button>

      <button
        @click="nextPage"
        :disabled="page === totalPages"
        class="px-3 py-1 bg-gray-300 hover:bg-gray-400"
      >
        Next
      </button>
    </div>
  </div>
</template>
<style>
.bg-gray{
    background-color: gray;
    color: aliceblue;
}
.bg-blue{
    background-color: blue;
    color: aliceblue;
}
</style>
<script setup>
import { ref, onMounted, watch } from 'vue'

const todos = ref([])
const newTodo = ref({ title: '', completed: false })
const loading = ref(false)

const page = ref(1)
const limit = 10
const totalItems = 200 // JSONPlaceholder has 200 todos max
const totalPages = Math.ceil(totalItems / limit)

const fetchTodos = async () => {
  loading.value = true
  const start = (page.value - 1) * limit
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=${limit}`)
  todos.value = await res.json()
  loading.value = false
}

// Load todos on mount and on page change
onMounted(fetchTodos)
watch(page, fetchTodos)

async function addTodo() {
  if (!newTodo.value.title.trim()) return

  const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify({
      title: newTodo.value.title,
      completed: newTodo.value.completed,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

  const data = await res.json()
  todos.value.unshift(data)
  newTodo.value.title = ''
}

function toggleTodo(todo) {
  todo.completed = !todo.completed
}

async function deleteTodo(id) {
  await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'DELETE',
  })

  todos.value = todos.value.filter((t) => t.id !== id)
}

function prevPage() {
  if (page.value > 1) page.value--
}

function nextPage() {
  if (page.value < totalPages) page.value++
}

function goToPage(p) {
  page.value = p
}
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
