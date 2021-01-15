import React from 'react';
import { IonContent, IonHeader, IonPage, IonIcon, IonButton, IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem } from '@ionic/react';
import { barChart } from 'ionicons/icons';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader style={{ marginTop: "20px" }} >
          <IonItem><img style={{ height: "25px" }} src="/assets/images/logo.svg" alt="manent" /></IonItem>
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
        <IonItem>
          <h6 style={{ color: "#f1e6e4" }}>My Token Assets</h6>
        </IonItem>
        <IonCard>
          <div style={{display: "flex"}}>
          <IonCardHeader>
            <IonCardSubtitle>Beese24 Token</IonCardSubtitle>
            <IonCardTitle color="smoke">120 BEUR</IonCardTitle>
          </IonCardHeader>
            <IonButton fill="outline" style={{position:"absolute", right: "20px", top:"18px"}} color="smoke" href="/details/:uuid">
              <IonIcon icon={barChart} />
            </IonButton>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
