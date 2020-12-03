<template>
  <ion-page color="purple">
    <div v-if="!showIntro && (showNew || showImport)">
      <ion-header translucent>
        <ion-toolbar color="purple">
          <ion-title color="smoke" v-if="showNew">Create New Account</ion-title>
          <ion-title color="smoke" v-if="showImport">Import Account</ion-title>
          <ion-buttons slot="start">
            <ion-button
              v-if="!showMnemonic"
              v-on:click="
                showIntro = true;
                showNew = false;
                showImport = false;
              "
              >Go Back</ion-button
            >
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    </div>
    <ion-content>
      <ion-slides v-if="showIntro" pager="true">
        <ion-slide>
          <div style="padding: 0 20px">
            <img
              src="/assets/images/logo-light.svg"
              style="height: 35px; margin-bottom: 40px"
            />
            <ion-text color="smoke">
              <h3 style="font-weight: 300">Official Scrypta Wallet</h3>
            </ion-text>
            <ion-text color="smoke">
              <p style="font-weight: 150">
                Manent is the first official Scrypta App supported by the
                Scrypta Foundation, developed to interact with the blockchain in
                a simple, fast and secure way! Manage your LYRA and Tokens with
                Manent.
              </p>
            </ion-text>
          </div>
        </ion-slide>
        <ion-slide>
          <div style="padding: 0 20px">
            <ion-text color="smoke" style="font-weight: 300">
              <h1>How to start</h1>
            </ion-text>
            <ion-text color="smoke" style="font-weight: 150">
              <p style="margin-bottom: 5px !important">
                Create your account with a single click, if you don't have one,
                or import an existing one. We recommend using the Scrypta Card
                for a better experience and greater security.
              </p>
            </ion-text>
            <small style="font-weight: 150; color: white"
              >For more information go to:
              <a
                style="color: #d8273a; margin: 0; padding: 0"
                href="https://scrypta.shop/"
                >Scrypta Shop</a
              >
            </small>
            <hr />
            <ion-text color="smoke" style="font-weight: 300">
              <h1 style="font-weight: 600">What can you do</h1>
            </ion-text>
            <ion-text color="smoke" style="font-weight: 150">
              <p>
                Manage your LYRA and Tokens with Manent! You can send and
                receive LYRA or Tokens simply by scanning a QR Code or via NFC.
                When you send or receive LYRA by the app, everything is
                immediate and verifiable within the blockchain thanks to its
                distributed ledger.
              </p>
            </ion-text>
          </div>
        </ion-slide>
        <ion-slide>
          <ion-content>
            <div style="padding: 50px 20px">
              <img src="/assets/icon/icon-light.svg" style="height: 60px" />
            </div>
            <div style="margin-top: 100px">
              <div>
                <ion-button
                  style="padding: 0 50px"
                  color="smoke"
                  expand="block"
                  fill="outline"
                  v-on:click="
                    showIntro = false;
                    showNew = true;
                  "
                >
                  <ion-icon
                    style="margin-right: 30px"
                    src="/assets/icon/add-circle.svg"
                  ></ion-icon>
                  Start with a new wallet</ion-button
                >
              </div>
              <div style="padding: 10px 0">
                <ion-text color="smoke">
                  <i>- or -</i>
                </ion-text>
              </div>
              <div>
                <ion-button
                  style="padding: 0 50px"
                  color="smoke"
                  expand="block"
                  fill="outline"
                  v-on:click="
                    showIntro = false;
                    showImport = true;
                  "
                >
                  <ion-icon
                    style="margin-right: 30px"
                    src="/assets/icon/import.svg"
                  ></ion-icon>
                  Import an existing one</ion-button
                >
              </div>
            </div>
          </ion-content>
        </ion-slide>
      </ion-slides>
      <div v-if="!showIntro && showNew">
        <div v-if="showPassword">
          <div style="padding: 100px 20px">
            <ion-item style="--background: transparent; margin-bottom: 20px">
              <ion-icon
                style="margin-right: 5px; height: 18px"
                src="/assets/icon/label.svg"
              ></ion-icon>
              <ion-label>Address Label</ion-label>
              <ion-input v-model="label"></ion-input>
            </ion-item>
            <ion-item style="--background: transparent; margin-bottom: 20px">
              <ion-icon
                style="margin-right: 5px; height: 18px"
                src="/assets/icon/lock.svg"
              ></ion-icon>
              <ion-label>Insert password</ion-label>
              <ion-input v-model="password" type="password"></ion-input>
            </ion-item>
            <ion-item style="--background: transparent; margin-bottom: 50px">
              <ion-icon
                style="margin-right: 5px; height: 18px"
                src="/assets/icon/lock.svg"
              ></ion-icon>
              <ion-label>Repeat password</ion-label>
              <ion-input v-model="passwordrepeat" type="password"></ion-input>
            </ion-item>
            <ion-button
              shape="round"
              color="purple"
              expand="block"
              v-on:click="createNewSid"
            >
              Create Now
            </ion-button>
          </div>
        </div>
        <div v-if="showMnemonic">
          <ion-row class="ion-justify-content-center" style="padding: 30px 0px">
            <ion-col size="3" offset="1">
              <img src="/assets/icon/create.svg" />
            </ion-col>
          </ion-row>
          <div class="ion-text-center" style="padding: 0 30px">
            <ion-text color="smoke">
              <h1 style="font-weight: 300">Make a backup</h1>
              <p style="font-weight: 150">
                Take a piece of paper and write down the words, then keep it in
                a safe place
              </p>
            </ion-text>
            <div style="margin-top: 40px">
              <ion-card class="box-card">
                <ion-card-content>
                  <ion-text
                    class="ion-text-uppercase"
                    color="smoke"
                    style="font-weight: 200"
                  >
                    {{ mnemonic }}
                  </ion-text>
                </ion-card-content>
              </ion-card>
            </div>
            <ion-button
              shape="round"
              expand="block"
              color="purple"
              v-on:click="location.reload()"
            >
              Continue
            </ion-button>
          </div>
        </div>
      </div>
      <div v-if="!showIntro && showImport">
        <div v-if="showSelection">
          <ion-row class="ion-justify-content-center" style="padding: 30px 0px">
            <ion-col size="3" offset="1">
              <ion-icon
                class="my-icon"
                color="smoke"
                src="/assets/icon/selection.svg"
              ></ion-icon>
            </ion-col>
          </ion-row>
          <div class="ion-text-center" style="padding: 0 30px">
            <ion-text color="smoke">
              <h1 style="font-weight: 300">Make a select</h1>
              <p style="font-weight: 150">
                Import your Account from your Scrypta Blockchain Card, Mnemonic
                Seeds or from your Private Key.
              </p>
            </ion-text>
          </div>
          <!-- fab placed to the top start -->
          <ion-fab horizontal="end" vertical="bottom" slot="fixed">
            <ion-fab-button color="dark">
              <ion-icon
                md="caret-up"
                ios="chevron-up-circle-outline"
              ></ion-icon>
            </ion-fab-button>
            <ion-fab-list side="top">
              <ion-fab-button color="light">
                <ion-icon name="logo-facebook"></ion-icon>
              </ion-fab-button>
              <ion-fab-button color="light">
                <ion-icon name="logo-twitter"></ion-icon>
              </ion-fab-button>
              <ion-fab-button color="light">
                <ion-icon name="logo-vimeo"></ion-icon>
              </ion-fab-button>
              <ion-fab-button color="light">
                <ion-icon name="logo-google"></ion-icon>
              </ion-fab-button>
            </ion-fab-list>
          </ion-fab>
          <div>
            <ion-button
              shape="round"
              v-on:click="
                showImportMnemonic = true;
                showSelection = false;
              "
            >
              MNEMONIC
            </ion-button>
          </div>
          <div>
            <ion-button
              shape="round"
              v-on:click="
                showImportCardNFCc = true;
                showSelection = false;
              "
            >
              NFC
            </ion-button>
          </div>
          <div>
            <ion-button
              shape="round"
              v-on:click="
                showImportCardQR = true;
                showSelection = false;
              "
            >
              QR
            </ion-button>
          </div>
          <ion-button
            shape="round"
            v-on:click="
              showImportPrivateKey = true;
              showSelection = false;
            "
          >
            PRIV KEY
          </ion-button>
        </div>
        <div v-if="!showSelection && showImportMnemonic">
          <ion-item>
            <ion-label>Insert Mnemonic</ion-label>
            <ion-input v-model="mnemonic"></ion-input>
          </ion-item>
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
          <ion-button shape="round" v-on:click="importMnemonic">
            Import Account
          </ion-button>
        </div>
        <div v-if="!showSelection && showImportCardNFC"></div>
        <div v-if="!showSelection && showImportCardQR"></div>
        <div v-if="!showSelection && showImportPrivateKey">
          <div>
            <ion-item
              ><ion-label>Create Label</ion-label
              ><ion-input v-model="label"> </ion-input
            ></ion-item>
          </div>
          <div>
            <ion-item
              ><ion-label>Private Key</ion-label
              ><ion-input v-model="privkey"> </ion-input
            ></ion-item>
          </div>
          <div>
            <ion-item
              ><ion-label>Password</ion-label
              ><ion-input v-model="password"> </ion-input
            ></ion-item>
          </div>
          <div>
            <ion-item
              ><ion-label>Repeat Password</ion-label
              ><ion-input v-model="passwordrepeat"> </ion-input
            ></ion-item>
          </div>
          <div>
            <ion-button shape="round" v-on:click="importPrivKey()">
              Import Account
            </ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonSlide,
  IonPage,
  IonLabel,
  IonInput,
  IonItem,
  IonFab,
  IonFabButton,
  IonFabList,
} from "@ionic/vue";
import {
  add,
  arrowBackCircle,
  arrowForwardCircle,
  logoFacebook,
  logoInstagram,
  logoTwitter,
  logoVimeo,
  person,
  settings,
  share,
} from "ionicons/icons";

import ScryptaCore from "@scrypta/core";
import { defineComponent } from "vue";
import { User } from "../libs/user";
import { alertController } from "@ionic/vue";
import { ScryptaDB } from "../libs/db";

const db = new ScryptaDB();

export default defineComponent({
  name: "Login",
  components: {
    IonContent,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    IonSlide,
    IonPage,
    IonLabel,
    IonInput,
    IonItem,
    IonFab,
    IonFabButton,
    IonFabList,
  },
  setup() {
    return {
      add,
      arrowBackCircle,
      arrowForwardCircle,
      logoFacebook,
      logoInstagram,
      logoTwitter,
      logoVimeo,
      person,
      settings,
      share,
    };
  },

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
      showImportMnemonic: false,
      showImportPrivateKey: false,
      showSelection: true,
      password: "",
      passwordrepeat: "",
      mnemonic: "",
      newSeed: { walletstore: "", mnemonic: "" },
      recover: false,
      label: "",
      privkey: "",
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
    async importPrivKey() {
      const app = this;
      let sid;
      if (
        app.privkey !== "" &&
        app.password !== "" &&
        app.passwordrepeat !== ""
      ) {
        if (app.password === app.passwordrepeat) {
          const wallet = await app.scrypta.importPrivateKey(
            app.privkey,
            app.password,
            false
          );
          sid = wallet.walletstore;
        } else {
          app.presentAlert("Error", "Le password non corrispondono");
        }
      } else {
        app.presentAlert("Error", "Immetti una password.");
      }
      await app.scrypta.saveWallet(sid, app.label);
      location.reload();
    },
  },
});
</script>

<style scoped>
.ion-page {
  --ion-background-color: linear-gradient(
    340deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(85, 83, 94, 1) 100%
  );
}
.box-card {
  --background: linear-gradient(
    125deg,
    rgba(2, 0, 36, 0.1) 0%,
    rgba(206, 205, 224, 0.05) 100%
  );
}

.my-icon {
  font-size: 64px;
}
</style>