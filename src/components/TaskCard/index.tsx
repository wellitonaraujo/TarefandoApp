import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { TaskCardProps } from '@/src/models/TaskType';
import { imgs } from '@/src/screens/imgs';
import colors from '@/src/styles/colors';
import React, { useState } from 'react';

interface TaskCard extends TaskCardProps {
  onToggleComplete: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCard> = ({
  title,
  startTime,
  endTime,
  completed,
  onDelete,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const screenWidth = Dimensions.get('window').width;

  const formatTimeRange = (start: string | Date, end: string | Date) => {
    if (start && end) {
      return `${start} - ${end}`;
    }
    if (start) {
      return `${start}`;
    }
    return 'Horário indefinido';
  };

  const toggleMenu = (event: any) => {
    event.target.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
      let calculatedLeft = pageX;
      const menuWidth = 150;
  
      if (pageX + menuWidth > screenWidth) {
        calculatedLeft = screenWidth - menuWidth - 10;
      }
  
      const menuOffset = 10;
      setMenuPosition({ top: pageY - menuOffset, left: calculatedLeft });
      setMenuVisible(!menuVisible);
    });
  };
  
  return (
    <View style={[styles.cardContainer, completed && styles.completedCard]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardDescription, completed && styles.completedText]}>
          {title}
        </Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Image source={imgs.ellipsis} style={styles.ellipsisIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardInfo}>
        <Image source={imgs.clock} style={styles.icon} />
        <Text style={[styles.cardTime, completed && styles.completedText]}>{formatTimeRange(startTime, endTime)}</Text>
      </View>

      {/* Modal for Edit/Delete Menu */}
      {menuVisible && (
        <Modal transparent={true} visible={menuVisible} animationType="fade">
          <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={[styles.menuContainer, { top: menuPosition.top, left: menuPosition.left }]}>
            <TouchableOpacity onPress={() => console.log('Edit pressed')}>
              <Text style={styles.menuItem}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
              <Text style={styles.menuItem}>Deletar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#21242D',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#21242D',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  completedCard: {
    opacity: 0.5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#D9D9D9',
    fontWeight: 'bold',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#A9A9A9',
  },
  ellipsisIcon: {
    width: 18,
    height: 18,
    tintColor: '#D9D9D9',
    marginLeft: 10,
    resizeMode: 'contain',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTime: {
    fontSize: 13,
    color: '#706F6F',
    paddingLeft: 5,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: '#706F6F',
    resizeMode: 'contain',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  menuContainer: {
    position: 'absolute',
    backgroundColor: colors.primary,
    flexDirection: 'row',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  menuItem: {
    padding: 9,
    fontSize: 13,
    color: '#fff',
  },
});

export default TaskCard;
