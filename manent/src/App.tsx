import React from 'react';
import { Redirect, Route } from 'react-router-dom';
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
  IonContent
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
const ScryptaCore = require('@scrypta/core')
const scrypta = new ScryptaCore(true)

const slideOpts = {
  initialSlide: 0,
  speed: 400
};

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
   * COMPONENT MANAGEMENT SHOWCREATE
   */
  const [showCreate, setShowCreate] = useState<boolean>(false);

  async function createLogin() {
    let xsid = await scrypta.buildxSid('dodododo')
    localStorage.setItem('xSID', JSON.stringify(xsid))
    setToken(JSON.stringify(xsid))
  }

  function toggleShowCreate() {
    if(showCreate){
      setShowCreate(false)
    }else{
      setShowCreate(true)
    }
  }

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
    if (!showCreate) {
      return (
        <IonApp>
          <IonPage>
            <IonContent>
              <IonSlides pager={true} options={slideOpts}>
                <IonSlide>
                  <h1>Slide 1</h1>
                </IonSlide>
                <IonSlide>
                  <h1>Slide 2</h1>
                </IonSlide>
                <IonSlide>
                  <IonButton onClick={toggleShowCreate} color="primary">CREATE NEW MNEMONIC</IonButton>
                </IonSlide>
              </IonSlides>
            </IonContent>
          </IonPage>
        </IonApp>
      )
    } else {
      return (
        <IonApp>
          <IonPage>
            <IonContent>
              Create<br></br>
              <IonButton onClick={createLogin} color="primary">CREATE</IonButton><br></br><br></br>
              <IonButton onClick={toggleShowCreate} color="primary">BACK</IonButton>
            </IonContent>
          </IonPage>
        </IonApp>
      )
    }
  }
}

export default App;
