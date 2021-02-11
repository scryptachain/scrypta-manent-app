import React, { useState } from 'react';
import { IonSegment, IonIcon, IonItem, IonInput, IonLabel, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegmentButton, IonButton } from '@ionic/react';
import './Tab3.css';
import { qrCode } from 'ionicons/icons';

const Tab3: React.FC = () => {
  let [selectedSegment, setSegment] = useState('send')

  function Send() {
    if (selectedSegment === 'send') {
      return (
        <div>
          <IonItem className="myInput">
            <IonLabel color="smoke">AMOUNT:</IonLabel>
            <IonInput color="smoke"> </IonInput>
          </IonItem>
          <div className="flexbox">
            <IonItem className="myInput2">
              <IonLabel color="smoke">Address:</IonLabel>
              <IonInput color="smoke"></IonInput>
            </IonItem>
              <IonButton color="risingblack" className="btn-qr">
                <IonIcon icon={qrCode}></IonIcon>
              </IonButton>
          </div>
          <IonItem className="myInput">
            <IonLabel color="smoke">Password:</IonLabel>
            <IonInput color="smoke"> </IonInput>
          </IonItem>
          <div className="keyboard" style={{ textAlign: "center" }}>
            <div className="pos-btn">1</div>
            <div className="pos-btn">2</div>
            <div className="pos-btn noborder">3</div>
            <div className="pos-btn">4</div>
            <div className="pos-btn">5</div>
            <div className="pos-btn noborder">6</div>
            <div className="pos-btn">7</div>
            <div className="pos-btn">8</div>
            <div className="pos-btn noborder">9</div>
            <div className="pos-btn">.</div>
            <div className="pos-btn">0</div>
            <div className="pos-btn noborder">C</div>
          </div>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }

  function Receive() {
    if (selectedSegment === 'receive') {
      return (
        <div>Receive</div>
      )
    } else {
      return (<div></div>)
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="risingblack">
          <IonSegment swipeGesture={true} style={{ width: "90%" }} onIonChange={e => { if (e.detail.value !== undefined) { let selected: string = e.detail.value; setSegment(selected) } }} value={selectedSegment}>
            <IonSegmentButton value="send">
              <IonLabel>Send</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="receive">
              <IonLabel>Receive</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <Send />
        <Receive />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
