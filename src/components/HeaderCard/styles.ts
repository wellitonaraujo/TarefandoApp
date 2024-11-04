import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#262b39',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 118,
        marginTop: 26,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 25,
        borderBottomEndRadius: 25,
        borderBottomLeftRadius: 25,
        padding: 16,
    },
    title: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '500'
    },

    value: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500'
    },

    dateValue: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600'
    },

    test: {
        justifyContent: 'space-between',       
    },

    currentDate: {
        backgroundColor: '#1a72f3',
        color: '#fff',
        fontSize: 12,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 25,
        borderBottomEndRadius: 25,
        borderBottomLeftRadius: 25,
        padding: 8,
        width: 120,
        alignItems: 'center',
    },

    percentageChart: {
        backgroundColor: '#1a72f3',
        borderRadius: 70,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    }
})