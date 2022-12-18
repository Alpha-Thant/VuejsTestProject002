<template>
  <v-card>
    <v-card-title>Name : {{ player.first_name }}</v-card-title>

    <v-card-title>ID : {{ player.id }}</v-card-title>

    <v-card-title>Team : </v-card-title>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="showTeamList" style="background-color:black; color: white;">Add to Team</v-btn>

      <v-btn @click="removeFromTeam" style="background-color:red; color: white;">Remove from Team</v-btn>
    </v-card-actions>

      <v-dialog
        v-model="dialog"
        max-width="800">
        <v-card>
          <v-card-title >Choose Team to Add </v-card-title>
          <v-list v-for="(item, i) in this.$store.state.teams"
                  :key="i" v-model="selectedTeam" dense class="mx-5 my-5">
              <v-card-title @mousedown="addToTeam">Team Name : {{item.name}}</v-card-title>
              <v-divider></v-divider>
            </v-list>
        </v-card>
            
      </v-dialog>

  </v-card>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
  props: ['player'],

    setup(props) {
      const store = useStore();
      const dialog = ref(false);
      const selectedTeam = ref('');
      
      const showTeamList = () => {
        dialog.value = true;
      }

      const addToTeam = () => {
          // check is he is add or not 
          console.log(selectedTeam.value)
          const obj = {
              player_id: props.player.id,
              team_name: selectedTeam,
            }
          store.dispatch('addNewPlayerRecord', obj)
          dialog.value = false;
      }


      const removeFromTeam = () => {
          // unfinish part here 
          // store.dispatch("deleteATeam", props.team.name)
      }

      return {addToTeam, removeFromTeam, showTeamList, selectedTeam, dialog}
    }
}
</script>

<style>

</style>