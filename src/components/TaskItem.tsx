import React, { useState } from 'react';
import { Task } from '../types/Task';
import { Checkbox, IconButton, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);

  // Hàm xử lý mở modal chỉnh sửa
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Hàm lưu thông tin công việc sau khi chỉnh sửa
  const handleSaveClick = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  // Hàm cập nhật thông tin trong form khi người dùng chỉnh sửa
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ListItem>
        <Checkbox
          checked={task.isCompleted}
          onChange={() => onToggleComplete(task.id)}
        />
        <ListItemText
          primary={task.title}
          secondary={task.description}
          style={{
            textDecoration: task.isCompleted ? 'line-through' : 'none',
          }}
        />
        <IconButton onClick={handleEditClick}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(task.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>

      {/* Dialog để chỉnh sửa công việc */}
      <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={editedTask.title}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
            style={{ marginTop: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button onClick={handleSaveClick} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskItem;
