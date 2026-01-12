import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import React, { useState } from "react";

const NewActivity: React.FC = () => {
  const [toDoArray, setToDoArray] = useState<string[]>(() => {
    const storedToDoArray = localStorage.getItem("toDoArray");
    return storedToDoArray ? JSON.parse(storedToDoArray) : [];
  });
  const [userInput, setUserInput] = useState("");

  const handleUserInput = () => {
    if (userInput.trim() !== "") {
      setToDoArray((prevArray) => [...prevArray, userInput]);
      localStorage.setItem(
        "toDoArray",
        JSON.stringify([...toDoArray, userInput])
      );
      setUserInput("");
    }
  };

  const [isClickable, setIsClickable] = useState(false);

  const handleButtonClick = (value: string) => {
    if (value.trim() !== "") {
      setUserInput(value);
      setIsClickable(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add New Eco Activity</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          value={userInput}
          onIonInput={(e) => handleButtonClick(e.detail.value!)}
          type="text"
          placeholder="e.g. Plant a tree"
        ></IonInput>

        <IonToolbar>
          <IonButton
            routerLink="/home"
            routerDirection="back"
            fill="clear"
            color={"medium"}
            slot="end"
          >
            Cancel
          </IonButton>
          <IonButton
            disabled={!isClickable}
            onClick={handleUserInput}
            routerLink="/home"
            routerDirection="back"
            slot="end"
          >
            Add
          </IonButton>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default NewActivity;
``;
