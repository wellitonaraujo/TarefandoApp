import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1A1A2F',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      paddingHorizontal: 16,

    },
    tab: {
      paddingVertical: 5,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    selectedTab: {
    },

    tabText: {
      fontSize: 14,
    },
    selectedTabText: {
      color: '#fff',
    },
    deselectedTabText: {
      color: '#888888',
    },
  });