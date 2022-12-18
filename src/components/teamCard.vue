<template>
    <v-card>
      <v-card-title>Name : {{ team.name }}</v-card-title>
  
      <v-card-title>Player Count : {{ team.player_count }}</v-card-title>
  
      <v-card-title>Region : {{ team.region }}</v-card-title>
  
      <v-card-title>Country : {{ team.country }}</v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="createTeam" style="background-color:black; color: white;">Update</v-btn>

        <v-btn @click="deleteTeam" style="background-color:red; color: white;">Delete</v-btn>
      </v-card-actions>

    </v-card>
  </template>

<script>
import { useStore } from 'vuex'
  export default {
    props: ['team'],
    setup(props) {
        const store = useStore();
        const createTeam = () => {
            store.commit('showTeamDialog', { payload: true, isUpdate: true, currentTeam: props.team })
        }


        const deleteTeam = () => {
            store.dispatch("deleteATeam", props.team.name)
        }

        return {createTeam, deleteTeam}
    }

  }
</script>

<style>

</style>