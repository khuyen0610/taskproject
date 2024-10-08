import React, { useState } from 'react';
import { List, Button, TextField, Grid } from '@mui/material';
import { Task } from '../types/Task';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
  ]);

  const [newTask, setNewTask] = useState<Task>({
    id: 0, 
    title: '', 
    description: '', 
    isCompleted: false, 
    category: 'Work' 
  });

  // Hàm đánh dấu hoàn thành công việc
  const handleToggleComplete = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  // Hàm xóa công việc
  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Hàm chỉnh sửa công việc
  const handleEditTask = (editedTask: Task) => {
    setTasks(tasks.map(task =>
      task.id === editedTask.id ? editedTask : task
    ));
  };

  // Hàm xử lý khi nhập thông tin công việc mới
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Hàm thêm công việc mới
  const handleAddTask = () => {
    if (newTask.title.trim() !== '') {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
      setNewTask({ id: 0, title: '', description: '', isCompleted: false, category: 'Work' });
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      
      {/* Form thêm công việc mới */}
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Task Title"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Description"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleAddTask}>
            Add Task
          </Button>
        </Grid>
      </Grid>

      {/* Danh sách công việc */}
      <List>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        ))}
      </List>
    </div>
  );
};

export default TaskList;
