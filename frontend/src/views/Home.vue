<template>
    <div>
        <h1>Users</h1>
        <ul>
        <li v-for="user in users" :key="user.id">
            {{ user.name }}
        </li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/users", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { users } = await response.json();
        this.users = users;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
},
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
