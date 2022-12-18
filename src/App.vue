<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  
  export default {
    name: "root",
  
    components: {
      
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Poppins:wght@400;500;600;700&display=swap');

  #app{
    font-family: 'Poppins', sans-serif;
    background-color: #2e242d;
  }
  body {
    height: 100vh;
    background-color: #2e242d !important;
  }
</style>
