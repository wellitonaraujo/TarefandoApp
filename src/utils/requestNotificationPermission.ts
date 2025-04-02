import { PermissionsAndroid, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

export const requestNotificationPermission = async () => {
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