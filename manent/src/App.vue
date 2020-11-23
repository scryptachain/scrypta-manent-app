<template>
  <ion-app>
    <ion-router-outlet v-if="isLogged" />
    <Login :embed="false" v-if="!isLogged" />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import { User } from './libs/user'
import Login from './views/Login.vue'

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    Login
  },
  data(){
    return {
      isLogged: false,
      User: new User
    }
  },
  mounted(){
    this.isLogged = this.User.isLogged()
  }
});
</script>