import { StyleSheet, Text, View } from "react-native"

interface HeaderCardProps {
    totalTasks: number;
    completedTasks: number;
}

const HeaderCard: React.FC<HeaderCardProps> = ({ totalTasks, completedTasks }) => {

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); 
    const monthNames = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    const month = monthNames[today.getMonth()];

    return(
        <View style={styles.container}>
           <View style={styles.test}>
                <Text style={styles.title}>Tarefas concluídas</Text>
                <Text style={styles.value}></Text>
                <View style={styles.currentDate}>
                    <Text style={styles.dateValue}>{day}, {month}</Text> 
                </View>
           </View>

           <View style={styles.percentageChart}>
                <Text style={styles.value}>{completedTasks}/{totalTasks}</Text>
           </View>
        </View>
    )
}

export default HeaderCard

const styles = StyleSheet.create({
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