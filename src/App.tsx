import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { addCircle } from 'ionicons/icons'
import { cloudDownload, chevronBack, logoFacebook, logoInstagram, share, logoTwitter, logoYoutube, logoPwa, logoNpm, logoIonic, logoGithub, logoJavascript, logoAngular, logoVimeo, logoChrome, logoReact } from 'ionicons/icons';
import { CreateAnimation, Animation } from '@ionic/react';

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonButton,
  IonSlides,
  IonSlide,
  IonContent,
  IonText,
  IonInput,
  IonItem,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonFab, IonFabButton, IonFabList,
  IonGrid, IonRow, IonCol,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { useState, useEffect } from 'react';
import { type } from 'os';
const ScryptaCore = require('@scrypta/core')
const scrypta = new ScryptaCore(true)

const slideOpts = {
  initialSlide: 0,
  speed: 400
};

/**
 * MAIN COMPONENT
 */

const App: React.FC = () => {
  /**
   * COMPONENT MANAGEMENT ISLOGGED
   */
  const [islogged, setToken] = useState<string | null>(null);
  useEffect(() => {
    async function getToken() {
      const islogged = localStorage.getItem('xSID')
      setToken(islogged);
    }
    getToken();
  }, [])

  /**
   * COMPONENT MANAGEMENT LOGINSTATE
   */
  const [loginState, setLoginState] = useState<string>('choose');

  async function createLogin() {
    let xsid = await scrypta.buildxSid('dodododo')
    localStorage.setItem('xSID', JSON.stringify(xsid))
    setToken(JSON.stringify(xsid))
  }


  function changeLoginState(state: string) {
    return (event: React.MouseEvent) => {
      setLoginState(state)
      event.preventDefault();
    }
  }


  /**
   * USER IS LOGGED
   */
  if (islogged !== null) {
    return (
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/tab1" component={Tab1} exact={true} />
              <Route path="/tab2" component={Tab2} exact={true} />
              <Route path="/tab3" component={Tab3} />
              <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon icon={triangle} />
                <IonLabel>Dashboard</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon icon={ellipse} />
                <IonLabel>Tab 2</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon icon={square} />
                <IonLabel>Tab 3</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    );
  } else {
    /**
     * LOGIN PAGE
     */
    if (loginState === 'choose') {
      /**
       * INIT SLIDER
       */
      return (
        <IonApp>
          <IonPage>
            <IonContent>
              <IonSlides pager={true} options={slideOpts}>
                <IonSlide>
                  <img
                    src="/assets/images/logo-light.svg"
                    style={{ height: "35px", margin: "20px 40px" }} alt="Manent App Logo"
                  />
                  <div style={{ marginTop: "50%" }}>
                    <IonText color="smoke">
                      <h3 style={{ fontWeight: 300 }}>Official Scrypta Wallet</h3>
                    </IonText>
                    <IonText color="smoke">
                      <p style={{ fontWeight: 150 }}>
                        Manent is the first official Scrypta App supported by the
                        Scrypta Foundation, developed to interact with the blockchain in
                        a simple, fast and secure way! Manage your LYRA and Tokens with
                        Manent.
                    </p>
                    </IonText>
                  </div>
                </IonSlide>
                <IonSlide>
                  <div style={{ padding: "50px 20px" }}>
                    <IonText color="smoke" style={{ fontWeight: 300 }}>
                      <h1>How to start</h1>
                    </IonText>
                    <IonText color="smoke" style={{ fontWeight: 150 }}>
                      <p style={{ marginBottom: "5px" }}>
                        Create your account with a single click, if you don't have one,
                        or import an existing one. We recommend using the Scrypta Card
                        for a better experience and greater security.
                      </p>
                    </IonText>
                    <small style={{ fontWeight: 150, color: "white" }}
                    >For more information go to:
                      <a style={{ color: "#d8273a", margin: 0, padding: 0 }}
                        href="https://scrypta.shop/"
                      >Scrypta Shop
                      </a>
                    </small>
                    <hr />
                    <IonText color="smoke" style={{ fontWeight: 300 }}>
                      <h1 style={{ fontWeight: 600 }}>What can you do</h1>
                    </IonText>
                    <IonText color="smoke" style={{ fontWeight: 150 }}>
                      <p>
                        Manage your LYRA and Tokens with Manent! You can send and
                        receive LYRA or Tokens simply by scanning a QR Code or via NFC.
                        When you send or receive LYRA by the app, everything is
                        immediate and verifiable within the blockchain thanks to its
                        distributed ledger.
                      </p>
                    </IonText>
                  </div>
                </IonSlide>
                <IonSlide>
                  <IonContent style={{ padding: "0 20px" }}>
                    <div style={{ padding: "50px 20px" }}>
                      <img src="/assets/icon/icon-light.svg" style={{ height: "60px" }} alt="Manent Icon" />
                    </div>
                    <IonButton color="smoke" fill="outline" expand="block" onClick={changeLoginState('new')} >
                      <IonIcon style={{ position: "absolute", left: "10px" }} icon={addCircle}>
                      </IonIcon> Start a New Wallet</IonButton>
                    <IonText color="smoke" style={{ margin: "20px 0", display: "block" }}><i>- or -</i></IonText>
                    <IonButton color="smoke" fill="outline" expand="block" onClick={changeLoginState('importchoose')}>
                      <IonIcon style={{ position: "absolute", left: "10px" }} icon={cloudDownload} ></IonIcon> Import an existing one</IonButton>
                  </IonContent>
                </IonSlide>
              </IonSlides>
            </IonContent>
          </IonPage>
        </IonApp>
      )
    } else if (loginState === 'new') {
      return (
        <IonApp>
          <IonPage>
            <IonHeader>
              <IonToolbar color="purple">
                <IonButtons>
                  <IonButton onClick={changeLoginState('choose')}><IonIcon icon={chevronBack} color="smoke"></IonIcon></IonButton>
                </IonButtons>
                <IonTitle color="smoke">Create Account</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <div style={{ padding: "150px 20px" }}>
                <IonItem style={{ backgroundColor: "transparent", marginBottom: "20px" }}>
                  <IonIcon color="smoke"
                    style={{ marginRight: "5px", height: "18px" }}
                    src="/assets/icon/label.svg"
                  ></IonIcon>
                  <IonLabel color="smoke">Address Label</IonLabel>
                  <IonInput v-model="label"></IonInput>
                </IonItem>
                <IonItem style={{ background: "transparent", marginBottom: "20px" }}>
                  <IonIcon color="smoke"
                    style={{ marginRight: "5px", height: "18px" }}
                    src="/assets/icon/lock.svg"
                  ></IonIcon>
                  <IonLabel color="smoke">Insert password</IonLabel>
                  <IonInput v-model="password" type="password"></IonInput>
                </IonItem>
                <IonItem style={{ background: "transparent", marginBottom: "50px" }}>
                  <IonIcon color="smoke"
                    style={{ marginRight: "5px", height: "18px" }}
                    src="/assets/icon/lock.svg"
                  ></IonIcon>
                  <IonLabel color="smoke">Repeat password</IonLabel>
                  <IonInput v-model="passwordrepeat" type="password"></IonInput>
                </IonItem>
                <IonButton
                  shape="round"
                  color="purple"
                  expand="block"
                  onClick={createLogin}
                >
                  Create Now
            </IonButton>
              </div>
            </IonContent>
          </IonPage>
        </IonApp>
      )
    } else if (loginState === 'importchoose') {
      return (
        <IonApp>
          <IonPage>
            <IonContent>
              <div v-if="showSelection">
                <IonRow class="ion-justify-content-center" style={{ padding: "30px 0px" }}>
                  <IonCol size="2" >
                    <IonIcon
                      class="my-icon"
                      color="smoke"
                      src="/assets/icon/selection.svg"
                      style={{fontSize: "100px"}}
                    ></IonIcon>
                  </IonCol>
                </IonRow>
                <div style={{ padding: "0 30px" }}>
                  <IonText color="smoke">
                    <h1 style={{ fontWeight: 300 }}>Make a select</h1>
                    <p style={{ fontWeight: 150 }}>
                      Import your Account from your Scrypta Blockchain Card, Mnemonic
                      Seeds or from your Private Key.
                    </p>
                  </IonText>
                </div>
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                  <IonFabButton>
                    <IonIcon icon={share} />
                  </IonFabButton>
                  <IonFabList side="top">
                    <IonFab horizontal="end">
                      <IonButton className="myButton" onClick={changeLoginState('importmnemonic')} ><IonIcon className="myIcon" icon={logoVimeo} />Mnemonic</IonButton>
                      <IonButton className="myButton" onClick={changeLoginState('importnfc')} ><IonIcon className="myIcon" style={{padding: "0 10px"}} icon={logoFacebook} />Nfc Card</IonButton>
                      <IonButton className="myButton" onClick={changeLoginState('importqr')} ><IonIcon className="myIcon" style={{padding: "0 10px"}} icon={logoInstagram} />QR-COde</IonButton>
                      <IonButton className="myButton"onClick={changeLoginState('importprivkey')}><IonIcon className="myIcon" style={{padding: "0 10px"}} icon={logoTwitter} />Priv Key</IonButton>
                    </IonFab>
                  </IonFabList>
                </IonFab>
              </div >
            </IonContent >
          </IonPage >
        </IonApp >
      )
    } else if (loginState === 'importnfc') {
      return (
        <IonApp>
          <IonPage>
            <IonContent>
              ImportNFC<br></br>
              <IonButton color="primary">BACK</IonButton>
            </IonContent>
          </IonPage>
        </IonApp>
      )
    } else if (loginState === 'importqr') {
      const openScanner = async () => {
        const data = await BarcodeScanner.scan();
        console.log(`Barcode data: ${data.text}`);
      };
      return (
        <IonApp>
          <IonPage>
            <IonContent>
              import qr<br></br>
              <IonButton onClick={openScanner}>Scan barcode</IonButton><br></br><br></br>
              <IonButton onClick={changeLoginState('choose')} color="primary">BACK</IonButton>
            </IonContent>
          </IonPage>
        </IonApp>
      )
    } else if (loginState === 'importprivkey') {
      return (
        <IonApp>
          <IonPage>
            <IonContent>
              import privkey<br></br>
              <IonButton onClick={changeLoginState('choose')} color="primary">BACK</IonButton>
            </IonContent>
          </IonPage>
        </IonApp>
      )
    } else {
      return (
        <IonApp>
          <IonPage>
            <IonContent>
              Import mnemonic<br></br>
              <IonButton onClick={changeLoginState('choose')} color="primary">BACK</IonButton>
            </IonContent>
          </IonPage>
        </IonApp>
      )
    }
  }
}

export default App;

