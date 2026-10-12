import { AppRoutes } from './routes/AppRoutes';
import { SnackbarProvider } from './components/global/SnackbarProvider';
import { PageEntranceAnimations } from './components/global/PageEntranceAnimations';

function App() {
  return (
    <SnackbarProvider>
      <PageEntranceAnimations />
      <AppRoutes />
    </SnackbarProvider>
  );
}

export default App;
