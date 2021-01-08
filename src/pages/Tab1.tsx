import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';



const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
        </IonHeader>
        <IonCard className="cardBalance">
          <div className="vcenter" style={{textAlign: "center"}}>
            <IonCardHeader>
              <IonCardSubtitle color="smoke">my balance</IonCardSubtitle>
              <IonCardTitle color="smoke"> 10,00 LYRA</IonCardTitle>
            </IonCardHeader>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
