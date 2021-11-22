import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const findTask = tasks.find(task => task.title === newTaskTitle);
    if (findTask) {
      Alert.alert('Task já cadastrada!', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    }
    const newTask: Task = {
      id: Math.round(Math.random() * Number.MAX_SAFE_INTEGER),
      title: newTaskTitle,
      done: false,
    };
    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        task.done = !task.done;
      }
      return task;
    });
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover tarefa', 'Você tem certeza que deseja remover esta tarefa?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => {
          const result = tasks.filter( task => task.id !== id);
          setTasks([...result]);
        }
      }
    ]);
  }

  function handleEditTask(taskId: number, newTaskTitle: string) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        task.title = newTaskTitle;
      }
      return task;
    });
    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})