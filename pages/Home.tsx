import {
  IonAlert,
  IonBadge,
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
  useIonViewWillEnter,
} from "@ionic/react";

import React, { useState } from "react";
import { add } from "ionicons/icons";

const Home: React.FC = () => {
  const [toDoArray, setToDoArray] = useState<string[]>([]);

  useIonViewWillEnter(() => {
    const storedToDoArray = localStorage.getItem("toDoArray");
    if (storedToDoArray) {
      setToDoArray(JSON.parse(storedToDoArray));
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const removeItem = (deletingItem: any) => {
    const newItems = toDoArray.filter((toDo) => toDo !== deletingItem);
    setToDoArray(newItems);
    localStorage.setItem("toDoArray", JSON.stringify(newItems));
  };

  const handleDeleteClick = (item: string) => {
    setItemToDelete(item);
    setIsOpen(true);
  };

  const [count, setCount] = useState<number>(() => {
    const storedCounter = localStorage.getItem("storedCounter");
    return storedCounter ? parseInt(storedCounter) : 0;
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"success"}>
          <IonTitle color={"light"} slot="start">
            Eco Tracker
          </IonTitle>
          <IonBadge color={"warning"} slot="start">
            {count}
          </IonBadge>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          {toDoArray.map((toDo, index) => {
            return (
              <IonItem key={index}>
                <IonCheckbox
                  slot="start"
                  onIonChange={(e) => {
                    const newCount = count + (e.detail.checked ? 1 : -1);
                    setCount(newCount);
                    localStorage.setItem("storedCounter", newCount.toString());
                  }}
                ></IonCheckbox>
                <IonLabel>{toDo}</IonLabel>
                <IonButton
                  color={"warning"}
                  onClick={() => {
                    handleDeleteClick(toDo);
                  }}
                >
                  Delete
                </IonButton>
                <IonAlert
                  isOpen={isOpen && itemToDelete === toDo}
                  header="Confirm Delete"
                  message="Are you sure you want to delete this item?"
                  buttons={[
                    "Cancel",
                    {
                      text: "Delete",
                      handler: () => {
                        if (itemToDelete) {
                          removeItem(itemToDelete);
                        }
                        setIsOpen(false);
                        setItemToDelete(null);
                      },
                    },
                  ]}
                  onDidDismiss={() => {
                    setIsOpen(false);
                    setItemToDelete(null);
                  }}
                ></IonAlert>
              </IonItem>
            );
          })}
        </IonList>

        <IonFab slot="fixed" horizontal="center" vertical="bottom">
          <IonFabButton
            color={"success"}
            routerLink="/newActivity"
            routerDirection="forward"
          >
            <IonIcon icon={add} color="light"></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
``;
