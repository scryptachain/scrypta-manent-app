import React from 'react';
import { IonContent, IonHeader, IonPage, IonIcon, IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem } from '@ionic/react';
import { heart, trash, star } from 'ionicons/icons';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
        </IonHeader>
        <IonCard className="cardBalance" style={{ height: "200px" }}>
          <IonItem>
            <IonBadge color="danger" slot="end">Asset</IonBadge>
          </IonItem>
          <div className="vcenter-dashboard" style={{ textAlign: "center" }}>
            <IonCardHeader>
              <IonCardSubtitle color="smoke">my balance</IonCardSubtitle>
              <IonCardTitle color="smoke"> 10,00 LYRA</IonCardTitle>
              <IonCardSubtitle color="smoke">€ 5,00</IonCardSubtitle>
            </IonCardHeader>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
