import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { useState, useEffect } from 'react';
const ScryptaCore = require('@scrypta/core')
const scrypta = new ScryptaCore(true)

const Tab1: React.FC = () => {

  const [token, setToken] = useState(null);
  useEffect(() => {
     async function getToken() {
         const token = await scrypta.createAddress('dodododo')
         setToken(token);
     }
     getToken();
  }, [])
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        {JSON.stringify(token)}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
