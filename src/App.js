import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CrudUsuario from './components/CrudUsuario';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000',
      paper: '#000'
    },
    divider: '#000',
    primary: {
      main: '#ffde59'
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CrudUsuario />
    </ThemeProvider>
  );
}

export default App;
