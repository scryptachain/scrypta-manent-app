import React from 'react';
import { IonContent, IonHeader, IonPage, IonIcon, IonLabel, IonInput, IonBackButton, IonToolbar, IonButtons, IonTitle, IonCardSubtitle, IonItem } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="purple">
          <IonTitle>Send</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonCardSubtitle color="smoke">Amount you mean to send</IonCardSubtitle>
        </IonItem>
        <IonItem>
          <IonIcon color="smoke"
            style={{ marginRight: "5px", height: "18px" }}
            src="/assets/icon/label.svg"
          ></IonIcon>
          <IonLabel color="smoke">Amount</IonLabel>
          <IonInput color="smoke" v-model="label"></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
