<template>
  <ion-page>
    <ion-slides v-if="showIntro" pager="true">
      <ion-slide>
        <div style="padding: 0 20px">
          <img
            src="/assets/images/logo.svg"
            style="height: 35px; margin-bottom: 40px"
          />
          <h3 style="font-weight: 600">Official Scrypta Wallet</h3>
          <p>
            Manent is the first official Scrypta App supported by the Scrypta
            Foundation, developed to interact with the blockchain in a simple,
            fast and secure way! Manage your LYRA and Tokens with Manent.
          </p>
        </div>
      </ion-slide>
      <ion-slide>
        <div style="padding: 0 20px">
          <h1 style="font-weight: 600">How to start</h1>
          <p style="margin-bottom: 5px !important">
            Create your account with a single click, if you don't have one, or
            import an existing one. We recommend using the Scrypta Card for a
            better experience and greater security.
          </p>
          <small
            >For more information go to:
            <a
              style="color: #d8273a; margin: 0; padding: 0"
              href="https://scrypta.shop/"
              >Scrypta Shop</a
            >
          </small>
          <hr />
          <h1 style="font-weight: 600">What can you do</h1>
          <p>
            Manage your LYRA and Tokens with Manent! You can send and receive
            LYRA or Tokens simply by scanning a QR Code or via NFC. When you
            send or receive LYRA by the app, everything is immediate and
            verifiable within the blockchain thanks to its distributed ledger.
          </p>
        </div>
      </ion-slide>
      <ion-slide>
        <div style="padding: 0 20px">
          <h1
            v-on:click="
              showIntro = false;
              showNew = true;
            "
          >
            Start with a new Wallet
          </h1>
          <i>- or -</i>
          <h1
            v-on:click="
              showIntro = false;
              showImport = true;
            "
          >
            Import an existent one
          </h1>
        </div>
      </ion-slide>
    </ion-slides>
    <div v-if="!showIntro && showNew">
      <div v-if="showPassword">
        <ion-item>
          <ion-label>Address Label</ion-label>
          <ion-input v-model="label"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Insert password</ion-label>
          <ion-input v-model="password" type="password"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Repeat password</ion-label>
          <ion-input v-model="passwordrepeat" type="password"></ion-input>
        </ion-item>
        <ion-button shape="round" v-on:click="createNewSid">
          Create Now
        </ion-button>
      </div>
      <div v-if="showMnemonic">
        fai il backup, prendi un folio di carta e scriviti le parole
        <hr />
        {{ mnemonic }}
        <hr />
        <ion-button shape="round" v-on:click="location.reload()">
          Continue
        </ion-button>
      </div>
    </div>
    <div v-if="!showIntro && showImport">
      <div v-if="showSelection">
        <ion-button
          shape="round"
          v-on:click="
            showImportMnemonic = true;
            showSelection = false;
          "
        >
          MNEMONIC
        </ion-button>
        <ion-button shape="round"> NFC </ion-button>
        <ion-button shape="round"> QR </ion-button>
        <ion-button shape="round"> SID</ion-button>
        <ion-button shape="round"> PRIV KEY </ion-button>
      </div>
      <div v-if="!showSelection && showImportMnemonic">
        <ion-item>
          <ion-label>Insert Mnemonic</ion-label>
          <ion-input v-model="mnemonic"></ion-input>
        </ion-item>
        <ion-button shape="round" v-on:click="importMnemonic">
          Import Account
        </ion-button>
      </div>

      <div v-if="!showSelection && showImportCardNFC"></div>
      <div v-if="!showSelection && showImportCardQR"></div>
      <div v-if="!showSelection && showImportFileSID"></div>
      <div v-if="!showSelection && showImportPrivateKey"></div>
    </div>
  </ion-page>
</template>

<script lang="ts">
import {
  IonSlides,
  IonSlide,
  IonPage,
  IonLabel,
  IonInput,
  IonItem,
} from "@ionic/vue";
import ScryptaCore from "@scrypta/core";
import { defineComponent } from "vue";
import { User } from "../libs/user";
import { alertController } from "@ionic/vue";
import { ScryptaDB } from "../libs/db";

const db = new ScryptaDB();

export default defineComponent({
  name: "Login",
  components: { IonSlides, IonSlide, IonPage, IonLabel, IonInput, IonItem },
  data() {
    return {
      scrypta: new ScryptaCore(true),
      db: db,
      xsid: null,
      configs: {},
      showImport: false,
      showNew: false,
      showIntro: true,
      showPassword: true,
      showMnemonic: false,
      showImportCardNFC: false,
      showImportCardQR: false,
      showImportFileSID: false,
      showImportMnemonic: false,
      showImportPrivateKey: false,
      showSelection: true,
      password: "",
      passwordrepeat: "",
      mnemonic: "",
      newSeed: { walletstore: "", mnemonic: "" },
      recover: false,
      label: "",
    };
  },
  async mounted() {
    const app = this;
    const user = new User();
    const configs = await user.configs();
    app.configs = configs;
  },
  methods: {
    async presentAlert(title: string, message: string) {
      const alert = await alertController.create({
        header: title,
        message: message,
        buttons: ["OK"],
      });
      return alert.present();
    },
    async createNewSid() {
      const app = this;
      if (
        app.password === app.passwordrepeat &&
        app.password !== "" &&
        app.password.length > 0
      ) {
        app.newSeed = await app.scrypta.buildxSid(
          app.password,
          "latin",
          true,
          "",
          app.label
        );
        app.mnemonic = app.newSeed.mnemonic;
        app.showMnemonic = true;
        app.showPassword = false;
      } else {
        if (app.password !== app.passwordrepeat) {
          app.presentAlert("Error", "Le password non corrispondono");
        } else if (app.password === "") {
          app.presentAlert("Error", "Immetti una password.");
        }
      }
    },
    async importMnemonic() {
      const app = this;
      if (
        app.password === app.passwordrepeat &&
        app.password !== "" &&
        app.password.length > 0
      ) {
        app.newSeed = await app.scrypta.buildxSid(
          app.password,
          "latin",
          true,
          app.mnemonic,
          app.label
        );
        app.mnemonic = app.newSeed.mnemonic;
        app.showMnemonic = true;
        app.showPassword = false;
      } else {
        if (app.password !== app.passwordrepeat) {
          app.presentAlert("Error", "Le password non corrispondono");
        } else if (app.password === "") {
          app.presentAlert("Error", "Immetti una password.");
        }
      }
    },
  },
});
</script>