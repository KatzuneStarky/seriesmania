import './App.scss';
import RoutesPage from './Components/RoutesPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SkeletonTheme } from 'react-loading-skeleton';


function App() {
  return (
    <div className="App">
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <RoutesPage />
        <ToastContainer />
      </SkeletonTheme>
    </div>
  );
}

export default App;