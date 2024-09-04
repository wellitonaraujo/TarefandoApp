import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { imgs } from '@/src/screens/imgs';
import React from 'react';

interface TaskCardProps {
  description: string;
  time: string;
  completed: boolean;
  onPress: () => void;
  onToggleComplete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  description,
  time,
  completed,
  onPress,
  onToggleComplete,
}) => {
  return (
    <TouchableOpacity
      style={[styles.cardContainer, completed && styles.completedCard]}
      onPress={onPress}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.cardDescription, completed && styles.completedText]}>
          {description}
        </Text>
        <TouchableOpacity onPress={() => console.log('Ellipsis pressed')}>
          <Image source={imgs.ellipsis} style={styles.ellipsisIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardInfo}>
        <Image source={imgs.clock} style={styles.icon} />
        <Text style={[styles.cardTime, completed && styles.completedText]}>{time}</Text>
      </View>
    </TouchableOpacity>
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
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#D9D9D9',
    flex: 1,
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
    resizeMode: 'contain'
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTime: {
    fontSize: 12,
    color: '#706F6F',
    paddingLeft: 5,
    flex: 1,
  },
  icon: {
    width: 15,
    height: 15,
    tintColor: '#706F6F',
    resizeMode: 'contain'
  },
});

export default TaskCard;
