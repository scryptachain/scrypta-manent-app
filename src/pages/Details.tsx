import React from 'react';
import { IonContent, IonHeader, IonPage, IonIcon, IonBackButton, IonToolbar, IonButtons, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonGrid, IonRow, IonCol } from '@ionic/react';
import { arrowDown, arrowUp } from 'ionicons/icons';
import './Details.css';


const Details: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="risingblack">
          <IonTitle>MY ASSETS</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCardHeader>
          <IonCardSubtitle color="smoke">my balance</IonCardSubtitle>
          <IonCardTitle color="smoke"> 120 BEUR</IonCardTitle>
          <IonCardSubtitle color="smoke">Beesy 24 Token</IonCardSubtitle>
        </IonCardHeader>

        <IonItem>
          <h6 style={{ color: "#f1e6e4" }}>LATEST TRANSACTIONS</h6><br /><hr />
        </IonItem>
        <IonCard>
          <div style={{ display: "flex" }}>
            <div>
              <IonItem style={{ position: "relative", left: "0px", top: "20px" }}>
                <IonIcon color="success" icon={arrowDown} />
              </IonItem>
            </div>
            <div>
              <IonCardHeader style={{ padding: "15px 5px" }}>
                <IonCardSubtitle color="success">FROM </IonCardSubtitle>
                <IonCardSubtitle>LUAx3gDxXXwgKRWNcd2Kn8s282NFr...</IonCardSubtitle>
                </IonCardHeader>
                <IonGrid>
                  <IonRow>
                    <IonCol size="8">
                      <IonCardTitle color="smoke">+12 BEUR</IonCardTitle>
                    </IonCol>
                    <IonCol size="4">
                      <IonCardSubtitle style={{ fontSize: "12px" }}>11/06/2021 at 11:34</IonCardSubtitle>
                    </IonCol>
                  </IonRow>
                </IonGrid>

            </div>
          </div>
        </IonCard>
        <IonCard>
          <div style={{ display: "flex" }}>
            <div>
              <IonItem style={{ position: "relative", left: "0px", top: "20px" }}>
                <IonIcon color="danger" icon={arrowUp} />
              </IonItem>
            </div>
            <div>
              <IonCardHeader style={{ padding: "15px 5px" }}>
                <IonCardSubtitle color="danger">TO</IonCardSubtitle>
                <IonCardSubtitle>LUAx3gDxXXwgKRWNcd2Kn8s282NFr...</IonCardSubtitle>
                <IonGrid>
                  <IonRow>
                    <IonCol size="8">
                      <IonCardTitle color="smoke">-50 BEUR</IonCardTitle>
                    </IonCol>
                    <IonCol size="4">
                      <IonCardSubtitle style={{ fontSize: "12px" }}>11/06/2021 at 11:34</IonCardSubtitle>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardHeader>
            </div>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Details;
