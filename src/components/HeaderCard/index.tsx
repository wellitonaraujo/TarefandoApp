import { Text, View } from "react-native"
import { styles } from "./styles";

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

