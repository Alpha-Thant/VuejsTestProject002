<template>
  <v-container class="mt-15" align="center">
    <v-card
      class="mx-auto px-10"
      elevation="6"
      width="500px">

      <h1 class="mt-5 text-uppercase">Project 002 </h1>
      <h2 class="mb-5">Please Login</h2>
    
      <v-text-field
        v-model="name"
        :counter="10"
        label="Name"
        solo
      ></v-text-field>

      <div class="mb-5" style="color: red;" v-if="error">
        {{ error }}
      </div>

      <v-btn
        color="black"
        outlined
        class="mr-4 mb-5"
        @click="login"
      >
        Login
      </v-btn>
  </v-card>
  </v-container>
  
  
</template>


<script>
import { ref } from '@vue/reactivity'
import router from '@/router';
import { useStore } from 'vuex'

  export default {

    setup() {
      const store = useStore()

      let name = ref("");
      let error = ref("");

      const login = () => {
        if(name.value === "") {
          error.value = "The Input field is required";
        } else {
          error.value = "";
          store.commit('setUserName', name.value)
          router.push({ path: '/home' })
        }
      }

      return {
        name,
        error,
        login
      }
    }

  }
</script>

<style scoped>
#fundo{
    background-color: #2e242d;
}

h1 {
    color: black;
    font-weight: 100 !important;
    font-size: 2rem !important;
}
h2 {
    color: black;
    font-weight: 100 !important;
    font-size: 1rem !important;
}
</style>
