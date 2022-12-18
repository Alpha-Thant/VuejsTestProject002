import { createStore } from 'vuex'

export default createStore({
  state: {
    username: '',
    showTeamDialog: false,
    teams: [],
    isUpdate: false,
    currentTeam: '',
    playerTeamRecord: [],
  },
  getters: {

  },
  mutations: {
    setUserName(state, payload) {
      state.username = payload
    },
    clearUserName(state) {
      state.username = '';
    },
    showTeamDialog(state, {payload, isUpdate, currentTeam}) {
      state.showTeamDialog = payload;
      state.isUpdate = isUpdate;
      state.currentTeam = currentTeam;

      console.log(state.isUpdate)
      console.log(state.currentTeam)
    },
    saveAllTeam(state) {
      localStorage.setItem('teams',JSON.stringify(state.teams))
    },
    saveTeamRecord(state) {
      localStorage.setItem('playerTeamRecord',JSON.stringify(state.playerTeamRecord))
    }
  },
  actions: {


    // obj is player id and team name (there is no id, name is used as  id here)
    addNewPlayerRecord({commit, state}, obj) {
      state.playerTeamRecord = [...state.playerTeamRecord, obj];
      commit('saveTeamRecord');
    },

    loadAllRecord({commit, state}) {
      // get all team
      if (localStorage.getItem("playerTeamRecord")){
        state.playerTeamRecord = JSON.parse(localStorage.getItem("playerTeamRecord"))
      }
    },

    deleteARecord({commit, state}, playerID) {
      state.teams = state.teams.filter(team => team.playerID !== playerID);
      commit('saveTeamRecord');
    } ,


    addNewTeam({commit, state}, team) {
      state.teams = [...state.teams, team];
      commit('saveAllTeam');
    },

    loadAllTeam({commit, state}) {
      // get all team
      if (localStorage.getItem("teams")){
        state.teams = JSON.parse(localStorage.getItem("teams"))
      }
    },

    deleteATeam({commit, state}, name) {
      state.teams = state.teams.filter(team => team.name !== name);
      commit('saveAllTeam');


      // need to remove player 
    } ,

    updateATeam({commit, state}, team) {

      let objIndex = state.teams.findIndex(obj=> obj.name === team.name);
      state.teams[objIndex].player_count = team.player_count;
      state.teams[objIndex].region = team.region;
      state.teams[objIndex].country = team.country;
      commit('saveAllTeam');
    },


    
  },
  modules: {
   
  }
})
