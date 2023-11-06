import AddBoloForm from './AddBoloForm';
import './App.css';
import {  Routes, Route} from 'react-router-dom';
function App() {
  return (
    <div className="allBackground">
   <Routes>
    <Route path='/' element={<AddBoloForm />}/>
   </Routes>
    </div>
  );
}

export default App;
