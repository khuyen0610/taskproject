import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import TaskList from './components/TaskList';
import theme from './theme/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: 20 }}>
        <h1>Task Management</h1>
        <TaskList />
      </div>
    </ThemeProvider>
  );
};

export default App;
