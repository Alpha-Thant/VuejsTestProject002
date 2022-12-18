<template>
  <v-container>
    <span class="title">Hello,  {{this.$store.state.username}}
      Welcome to Project 002 
      <v-btn @click="logout" class="ml-15" color="white">Logut</v-btn>
    </span>


    <div class="title1">Player List </div>

    <transition name="fade">
      <div class="loading" v-show="loading">
        <span class="fa fa-spinner fa-spin"></span> Loading
      </div>
    </transition>
    
    <v-list class="list-group mt-5" id="infinite-list">
      <v-list-item class="list-group-item" v-for="item in items" :key="item">
        <player-card class="mt-10" :player="item"></player-card>
      </v-list-item>
    </v-list>


    <div class="title1 mt-10 mb-10">Team List <v-btn @click="createTeam" class="ml-15" color="white">Create Team</v-btn></div>
    <team-card-dialog></team-card-dialog>
    
    <v-list class="list-group" id="infinite-list">
      <v-list-item class="list-group-item" v-for="team in this.$store.state.teams" :key="team.name">
        <team-card :team="team"></team-card>
      </v-list-item>
    </v-list>


  </v-container>


</template>

<script>
import playerCard from '@/components/playerCard.vue'
import teamCardDialog from '@/components/teamCardDialog.vue'
import router from '@/router'
import dataServices from '@/services/dataServices'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import TeamCard from '@/components/teamCard.vue'


export default {
  components: { playerCard, teamCardDialog, TeamCard },
  setup() {
    const players = ref([])
    const loading = ref(false)
    const nextItem = ref(1)
    const items = ref([])
    const store = useStore()


    const getAllPlayer = () => {
      dataServices.getAll()
        .then(response => {
          players.value = response.data;
          loadMore();

        })
        .catch(e => {
          console.log(e);
        });
    }

    getAllPlayer();

    const loadMore = () => {
      loading.value = true;
      setTimeout(e => {

        if(players.value.data.length == undefined)
        {
          getAllPlayer();
        }

        if (nextItem.value >= players.value.data.length)
        {
          nextItem.value = 0;
        }

        for (var i = 0; i < 10; i++) {
          items.value.push(players.value.data[nextItem.value]);
          nextItem.value++;
          if (nextItem.value >= players.value.data.length)
          {
            nextItem.value = 0;
          }
        }
        loading.value = false;
      }, 500);
      /**************************************/
      
    }


    onMounted(() => {
      const listElm = document.querySelector('#infinite-list');
      listElm.addEventListener('scroll', e => {
        if((listElm.scrollTop + listElm.clientHeight) + 400 >= listElm.scrollHeight) {
          loadMore();
        }});

        store.dispatch("loadAllTeam"); 
    });



    const logout = () => {
      router.push({ path: '/' })
    }

    const createTeam = () => {
      store.commit('showTeamDialog', { payload: true, isUpdate: false, currentTeam: {} })
    }
      

    return {loading, nextItem, items, logout, createTeam};
  },
  

}
</script>

<style lang="scss">
$purple: #5c4084;

.title {
  color: white;
  font-weight: 100 !important;
  font-size: 1.5rem !important;
}

.title1 {
  color: white;
  font-weight: bold !important;
  font-size: 3rem !important;
}


.list-group-wrapper {
  position: relative;
}
.list-group {
  overflow: auto;
  height: 50vh;
  border: 2px solid #dce4ec;
  border-radius: 5px;
}
.list-group-item {
  margin-top: 1px;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 2px solid #dce4ec;
}
.loading {
  text-align: center;
  position: absolute;
  color: #fff;
  z-index: 9;
  background: $purple;
  padding: 8px 18px;
  border-radius: 5px;
  left: calc(50% - 45px);
  top: calc(50% - 18px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>