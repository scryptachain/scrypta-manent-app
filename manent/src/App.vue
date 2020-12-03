<template>
  <ion-app>
    <ion-router-outlet v-if="isLogged" />
    <Login :embed="false" v-if="!isLogged" />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { User } from "./libs/user";
import Login from "./views/Login.vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    Login,
  },
  data() {
    return {
      isLogged: {},
      User: new User(),
    };
  },
  async mounted() {
    this.isLogged = await this.User.auth();
    console.log(this.isLogged);
  },
});
</script>

<style>
:root {
  --ion-color-purple: #545262;
  --ion-color-purple-rgb: 84, 82, 98;
  --ion-color-purple-contrast: #ffffff;
  --ion-color-purple-contrast-rgb: 255, 255, 255;
  --ion-color-purple-shade: #4a4856;
  --ion-color-purple-tint: #656372;

  --ion-color-smoke: #f1e6e4;
  --ion-color-smoke-rgb: 241, 230, 228;
  --ion-color-smoke-contrast: #000000;
  --ion-color-smoke-contrast-rgb: 0, 0, 0;
  --ion-color-smoke-shade: #d4cac9;
  --ion-color-smoke-tint: #f2e9e7;
}

.ion-color-purple {
  --ion-color-base: var(--ion-color-purple);
  --ion-color-base-rgb: var(--ion-color-purple-rgb);
  --ion-color-contrast: var(--ion-color-purple-contrast);
  --ion-color-contrast-rgb: var(--ion-color-purple-contrast-rgb);
  --ion-color-shade: var(--ion-color-purple-shade);
  --ion-color-tint: var(--ion-color-purple-tint);
}

.ion-color-smoke {
  --ion-color-base: var(--ion-color-smoke);
  --ion-color-base-rgb: var(--ion-color-smoke-rgb);
  --ion-color-contrast: var(--ion-color-smoke-contrast);
  --ion-color-contrast-rgb: var(--ion-color-smoke-contrast-rgb);
  --ion-color-shade: var(--ion-color-smoke-shade);
  --ion-color-tint: var(--ion-color-smoke-tint);
}

</style>