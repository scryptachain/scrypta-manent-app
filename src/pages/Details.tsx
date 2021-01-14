import React from 'react';
import { IonContent, IonHeader, IonPage, IonIcon, IonText, IonBackButton, IonToolbar, IonButtons, IonButton, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem } from '@ionic/react';
import { arrowDown, arrowUp } from 'ionicons/icons';
import './Details.css';




const Details: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="purple">
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
          <h6 style={{ color: "#f1e6e4" }}>LATEST TRANSACTIONS</h6><br/><hr/>
        </IonItem>
        <IonCard>
          <div style={{ display: "flex" }}>
            <div>
              <IonItem style={{ position: "relative", left: "0px", top: "20px" }}>
                <IonIcon color="success" icon={arrowDown} />
              </IonItem>
            </div>
            <div>
              <IonCardHeader style={{padding: "15px 5px"}}>
                <IonCardSubtitle>FROM <br />LUAx3gDxXXwgKRWNcd2Kn8s282NFr...</IonCardSubtitle>
                <IonCardTitle color="smoke">+12 BEUR</IonCardTitle>
              </IonCardHeader>
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
              <IonCardHeader style={{padding: "15px 5px"}}>
                <IonCardSubtitle>TO <br />LUAx3gDxXXwgKRWNcd2Kn8s282NFr...</IonCardSubtitle>
                <IonCardTitle color="smoke">+50 BEUR</IonCardTitle>
              </IonCardHeader>
            </div>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Details;
