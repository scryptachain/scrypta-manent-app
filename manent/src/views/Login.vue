<template>
  <ion-page>
    <ion-slides pager="true">
      <ion-slide>
        <div style="padding:0 20px">
          <h1>Scrypta Manent</h1>
          <h3>Official Scrypta Wallet</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec finibus arcu. Suspendisse potenti. Curabitur vulputate elit at tellus tincidunt, feugiat egestas quam sollicitudin. Mauris tortor lacus, mattis at sodales ac, molestie sit amet diam. Curabitur at orci eros. Curabitur mollis et tellus in pretium. 
          </p>
        </div>
      </ion-slide>
      <ion-slide>
        <div style="padding:0 20px">
          <h1>How to start</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec finibus arcu. Suspendisse potenti. Curabitur vulputate elit at tellus tincidunt, feugiat egestas quam sollicitudin. Mauris tortor lacus, mattis at sodales ac, molestie sit amet diam. 
          </p>
          <hr>
          <h1>What can you do</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec finibus arcu. Suspendisse potenti. Curabitur vulputate elit at tellus tincidunt, feugiat egestas quam sollicitudin. Mauris tortor lacus, mattis at sodales ac, molestie sit amet diam.
          </p>
        </div>
      </ion-slide>
      <ion-slide>
        <div style="padding:0 20px">
          <h1>Start with a new Wallet</h1>
          <i>- or -</i>
          <h1>Import an existent one</h1>
        </div>
      </ion-slide>
    </ion-slides>
  </ion-page>
</template>

<script lang="ts">
import { IonSlides, IonSlide, IonPage } from "@ionic/vue";
import ScryptaCore from "@scrypta/core";
import { defineComponent } from "vue";
import { User } from "../libs/user"

export default defineComponent({
  name: "Login",
  components: { IonSlides, IonSlide, IonPage },
  data() {
    return {
      scrypta: new ScryptaCore(true),
      xsid: null,
      configs: {}
    };
  },
  async mounted() {
    const app = this;
    const user = new User
    const configs = await user.configs()
    app.configs = configs
  },
});
</script>