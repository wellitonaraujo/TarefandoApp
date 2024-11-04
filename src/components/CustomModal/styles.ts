import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: '#313747',
      padding: 20,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      alignItems: 'center',
    },
    modalBar: {
      width: 40,
      height: 5,
      backgroundColor: '#666',
      borderRadius: 2.5,
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 55,
      backgroundColor: '#4b536a',
      borderRadius: 50,
      paddingHorizontal: 16,
      color: '#FFFFFF',
      fontSize: 16,
      marginBottom: 20,
    },
    createButton: {
      width: '100%',
      height: 55,
      backgroundColor: '#1E90FF',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    createButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });