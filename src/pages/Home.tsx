import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

type EditTaskArgs = {
  id: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const findTask =  tasks.find(item => item.title === newTaskTitle);
    
    if (findTask) {
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome.',
        [
          {
            text: 'Ok'
          }
        ],
        {
          cancelable: true
        }
      );
    }
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldState => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({...task}));
    const foundTask = updatedTasks.find(item => item.id == id);
    
    if (!foundTask)
      return;

    //Criamos uma cópia com MAP, encontramos o item com FIND e alteramos seu valor, automaticamente ele ajusta o valor do item na lista.
    foundTask.done = !foundTask.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: () => {
            const updatedTask = tasks.filter(task => task.id !== id);
            setTasks(updatedTask);
          }
        }
      ]
    );
  }

  function handleEditTask( id: number, taskNewTitle: string){
    const updatedTasks = tasks.map(task => ({...task}));
    const foundTask = updatedTasks.find(item => item.id === id);
    
    if (!foundTask)
      return;
    
    foundTask.title = taskNewTitle;
    setTasks(updatedTasks);
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