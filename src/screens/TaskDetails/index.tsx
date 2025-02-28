import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/AppNavigator';
import useTaskManager, { Subtask } from '../Home/hooks/useTaskManager';

type TaskDetailsRouteProp = RouteProp<RootStackParamList, 'TaskDetails'>;

interface TaskDetailsProps {
  route: TaskDetailsRouteProp;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ route }) => {
  const { id, name, date, subtasks: initialSubtasks } = route.params;
  const { handleDeleteSubtask} = useTaskManager()
  
  const [subtasks, setSubtasks] = useState<Subtask[]>(
    initialSubtasks && Array.isArray(initialSubtasks)
      ? initialSubtasks.map((subtask, index) =>
          typeof subtask === 'string'
            ? { id: String(index + 1), name: subtask, completed: false }
            : subtask
        )
      : []
  );

  const handleDelete = async (taskId: string, subtaskId: string) => {
    if (!subtaskId) {
      console.error("ID da subtarefa não encontrado!");
      return;
    }
  
    // Atualizando a lista de subtarefas localmente
    const updatedSubtasks = subtasks.filter(subtask => subtask.id !== subtaskId);
    setSubtasks(updatedSubtasks);
  
    // Deletando do AsyncStorage
    await handleDeleteSubtask(taskId, subtaskId);
  
    console.log('Subtarefa deletada:', subtaskId);
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <View>
        {subtasks && subtasks.length > 0 ? (
          subtasks.map((subtask, index) => {
           
            return (
              <View style={styles.subtaskContainer} key={index}>
                <View style={styles.subtaskLeft}>
                  <TouchableOpacity style={styles.radioButton} />
                  <Text style={styles.subtaskText}>{subtask.name}</Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(id, subtask.id)}
                >
                  <Image
                    source={require('../../assets/icons/close.png')}
                    style={styles.deleteIcon} 
                  />
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Text style={styles.noSubtasks}>Sem subtarefas disponíveis.</Text>
        )}


      </View>
      <TouchableOpacity>
        <Text style={styles.addSubtaskText}>Adicionar subtarefa</Text>
      </TouchableOpacity>
      <View style={styles.optionsContainer}>
        <View style={styles.optionRow}>
          <Image source={require('../../assets/icons/date-solid.png')} style={styles.icon} />
          <Text style={styles.optionText}>Finaliza em</Text>
          <Text style={styles.optionValue}>{date}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.optionRow}>
          <Image source={require('../../assets/icons/repeat-rounded.png')} style={styles.icon} />
          <Text style={styles.optionText}>Repetir</Text>
          <Text style={styles.optionValue}>Não</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.optionRow}>
          <Image source={require('../../assets/icons/notification-fill.png')} style={styles.icon} />
          <Text style={styles.optionText}>Lembrar</Text>
          <Text style={styles.optionValue}>Não</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Image source={require('../../assets/icons/check-fill.png')} style={styles.actionIcon} />
          <Text style={styles.actionText}>Concluir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Image source={require('../../assets/icons/share-filled.png')} style={styles.actionIcon} />
          <Text style={styles.actionText}>Compartilhar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Image source={require('../../assets/icons/delete-filled.png')} style={styles.actionIcon} />
          <Text style={styles.actionText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    padding: 16,
  },
  title: {
    color: '#D2D2D2',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  subtaskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D2D2D2',
    marginRight: 8,
  },
  subtaskText: {
    color: '#D2D2D2',
    fontSize: 16,
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    width: 8,
    height: 8,
    tintColor: '#D2D2D2',
  },
  noSubtasks: {
    color: '#D2D2D2',
    fontSize: 16,
    fontStyle: 'italic',
  },
  addSubtaskText: {
    color: '#5D9CEC',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    color: '#D2D2D2',
    fontSize: 16,
    flex: 1,
    marginLeft: 8,
  },
  optionValue: {
    color: '#D2D2D2',
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#313747',
    marginVertical: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#313747',
    borderRadius: 8,
    padding: 8,
  },
  actionIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    tintColor: '#D2D2D2',
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: '#D2D2D2',
  },
  actionText: {
    color: '#D2D2D2',
    fontSize: 13,
  },
});