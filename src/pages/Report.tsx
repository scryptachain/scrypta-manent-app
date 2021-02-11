import React from 'react';
import { IonContent, IonHeader, IonButton, IonText, IonPage, IonIcon, IonLabel, IonInput, IonBackButton, IonToolbar, IonButtons, IonTitle, IonCardSubtitle, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonCol } from '@ionic/react';
import './Report.css';
import {send} from 'ionicons/icons'

const Tab2: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="risingblack">
                    <IonTitle>Sending Report</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tab3" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard>
                    <IonCardHeader className="ion-text-center">
                        <IonCardSubtitle color="#2F374C">
                            You are sending:
                  </IonCardSubtitle>
                        <IonCardTitle style={{ marginTop: "20px" }} color="smoke">
                            100.34 LYRA
                  </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonRow>
                            <IonCol size="4" style={{ textAlign: "left" }}>
                                <h4>Assets:</h4>
                            </IonCol>
                            <IonCol size="8" style={{ textAlign: "right" }}>
                                <h4 style={{ fontWeight: 600 }}>LYRA</h4>
                            </IonCol>
                            <IonCol size="4" style={{ textAlign: "left" }}>
                                <h4 style={{ fontWeight: 600 }}>To:</h4>
                            </IonCol>
                            <IonCol size="8" style={{ textAlign: "right" }}>
                                <h4 style={{ fontWeight: 600 }}>Lh76UHJh767yhHGGHG76rdGFS545rfHBm</h4>
                            </IonCol>
                            <IonCol size="4" style={{ textAlign: "left" }}>
                                <h4>from:</h4>
                            </IonCol>
                            <IonCol size="8" style={{ textAlign: "right" }}>
                                <h4 style={{ fontWeight: 600 }}>Stefano</h4>
                            </IonCol>
                            <IonCol size="4" style={{ textAlign: "left" }}>
                                <h4>fee:</h4>
                            </IonCol>
                            <IonCol size="8" style={{ textAlign: "right" }}>
                                <h4 style={{ fontWeight: 600 }}>0.001</h4>
                            </IonCol>
                            <IonCol size="4" style={{ textAlign: "left" }}>
                                <h4>Total:</h4>
                            </IonCol>
                            <IonCol size="8" style={{ textAlign: "right" }}>
                                <h4 style={{ fontWeight: 600 }}>100.341</h4>
                            </IonCol>
                        </IonRow>
                    </IonCardContent>
                </IonCard>
                <IonItem className="myInput">
                    <IonLabel color="smoke">Password:</IonLabel>
                    <IonInput color="smoke"> </IonInput>
                </IonItem>
                <IonItem style={{ marginBottom: "100px" }}>
                    <IonButton href="/report" color="risingblack" style={{ width: "100%", height: "50px", paddingRight: "15px" }}>
                        <IonIcon icon={send}></IonIcon>
                        <IonText style={{ marginLeft: "10px" }}>SEND</IonText>
                    </IonButton>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;
