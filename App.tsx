import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import PushNotification from "react-native-push-notification";
import AppNavigator from './src/navigation/AppNavigator';
import  { TaskProvider } from "./src/context/TaskContext" 
import {toastConfig} from "./src/context/toastConfig"
import Toast from 'react-native-toast-message';
import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform, StatusBar } from 'react-native';
import colors from './src/themes/colors';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

function App(): React.JSX.Element {
  
  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Permissão de Notificação',
            message: 'Este app precisa de permissão para enviar notificações.',
            buttonPositive: 'Ok',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permissão de notificação concedida');
          await PushNotification.createChannel(
            {
              channelId: "task-reminders",
              channelName: "Lembretes de Tarefas",
              channelDescription: "Notificações para tarefas atrasadas",
              importance: 4,
              vibrate: true,
            },
            (created) => {
              if (created) {
                console.log("Canal criado!");
              } else {
                console.log("Falha ao criar o canal.");
              }
            }
          );
        } else {
          console.log('Permissão de notificação negada');
        }
      } catch (err) {
        console.warn('Erro ao solicitar permissão:', err);
      }
    }
  };

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: "task-reminders",
        channelName: "Tarefas de Lembrete",
        channelDescription: "Canal para notificações de tarefas",
        soundName: "default",
        vibrate: true,
      },
      (created) => console.log(`Canal criado? ${created}`)
    );

    requestNotificationPermission()
  }, []);
  
  return (
    <>
     <TaskProvider>
      <NavigationContainer theme={MyTheme}>
        <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
        <AppNavigator />
      </NavigationContainer>

      <Toast config={toastConfig}/>
      </TaskProvider>
    </>
  );
}

export default App;
