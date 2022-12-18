<template>
    <v-row justify="center">
        <v-dialog
        v-model="this.$store.state.showTeamDialog"
        max-width="500"
        >
        <v-card class="px-5">
            <v-card-title></v-card-title>
            <v-card-title v-if="!this.$store.state.isUpdate" class="text-h6">
            Create a new Team 
            </v-card-title>
            <v-card-title v-else class="text-h6">
            Update a Team 
            </v-card-title>

            <v-card-text>

                <span v-if="this.$store.state.isUpdate">Note : cannot update Name because it is unique and it use as a key. </span>

                <v-text-field v-if="!this.$store.state.isUpdate" v-model="name" label="Name"></v-text-field>
                <v-text-field v-else v-model="name" disabled label="Name"></v-text-field>

                <div class="mb-5" style="color: red;" v-if="error">
                  {{ error }}
                </div>

                <v-text-field 
                v-model="player_count" 
                label="Player Count"
                @keypress="isNumber($event)"></v-text-field>
                <div class="mb-5" style="color: red;" v-if="error">
                  {{ error }}
                </div>

                <v-text-field v-model="region" label="Region"></v-text-field>
                <div class="mb-5" style="color: red;" v-if="error">
                  {{ error }}
                </div>

                <v-text-field v-model="country" label="Country"></v-text-field>
                <div class="mb-5" style="color: red;" v-if="error">
                  {{ error }}
                </div>

            </v-card-text>


            <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color="black darken-1"
                text
                outlined
                @click="closeDialog"
            >
                Cancel
            </v-btn>


            <v-btn
                v-if="!this.$store.state.isUpdate"
                color="green darken-1"
                text
                @click="createNewTeam"
            >
                Create
            </v-btn>

            <v-btn
                v-else
                color="green darken-1"
                text
                @click="updateTeam"
            >
                Update
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted, watchEffect } from '@vue/runtime-core'

  export default {
    setup() {
      const store = useStore()

      const isNumber = (evt) =>{
        evt = evt ? evt : window.event;
        var charCode = evt.which ? evt.which : evt.keyCode;
        if (
          charCode > 31 &&
          (charCode < 48 || charCode > 57) &&
          charCode !== 46
        ) {
          evt.preventDefault();
        } else {
          return true;
        }
      } 

      const closeDialog = () => {
        store.commit('showTeamDialog', false)
      }

      const name = ref('')
      const player_count = ref('')
      const region = ref('')
      const country = ref('')

      let error = ref("")
      const createNewTeam = () => {

        if(name.value === "" || player_count === "" || region == "" || country == "") {
          error.value = "All Input field are required";
        } else {

          // check name is alredy exit or not
          const isFound = store.state.teams.some(team => {
          if (team.name === name.value) {
            return true;
          }
            return false;
          });

          if(!isFound) {

            // no similar name
            const team = {
              name: name.value,
              player_count: player_count.value,
              region: region.value,
              country: country.value,
            }

            store.dispatch("addNewTeam", team);

            name.value = ''
            player_count.value = ''
            region.value = ''
            country.value = ''


            // close the dialog
            store.commit('showTeamDialog', false)


          } else {
            // Name already exit
            alert('Name already exit, try another name.')
          }
          
        }
      }


      watchEffect(() => {
        if(store.state.isUpdate) {
          console.log(store.state.currentTeam)
          name.value = store.state.currentTeam.name;
          player_count.value = store.state.currentTeam.player_count;
          region.value = store.state.currentTeam.region;
          country.value = store.state.currentTeam.country;
        } else {
          name.value = ''
          player_count.value = ''
          region.value = ''
          country.value = ''
        }
      })


      const updateTeam = () => {
          if(name.value === "" || player_count === "" || region == "" || country == "") {
            error.value = "All Input field are required";
          } else {
            const team = {
              name: name.value,
              player_count: player_count.value,
              region: region.value,
              country: country.value,
            }

            store.dispatch("updateATeam", team);

            name.value = ''
            player_count.value = 0
            region.value = ''
            country.value = ''


            // close the dialog
            store.commit('showTeamDialog', false)            
          }
      }

      return { isNumber, closeDialog, createNewTeam, updateTeam, name, player_count, region, country, error}
    },
  }
</script>

<style>

</style>