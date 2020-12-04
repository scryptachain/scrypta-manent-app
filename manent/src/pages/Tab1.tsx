import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { useState, useEffect } from 'react';
const ScryptaCore = require('@scrypta/core')
const scrypta = new ScryptaCore(true)

const Tab1: React.FC = () => {
  const xSID = localStorage.getItem('xSID')
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
        {xSID}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
