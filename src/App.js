import './App.css';
import AdditemBar from './components/AdditemBar';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { Routes } from "react-router";
import { HashRouter as Router, Route } from 'react-router-dom';
import About from './components/About';
import TaskState from './Context/tasks/TaskState';
import Alert from './components/Alert';
import { useState } from 'react';


function App() {
  const [alert,setAlert] = useState(null);

  const showAlert = (type,message)=>{
        setAlert({type,message});
        setTimeout(()=>{
          setAlert(null);
        },2000);
  };

  return (
    <TaskState>
           <Router>
     <div className='container'>
        <Navbar showAlert={showAlert}/>
        <Alert alert={alert}/>
       <div className="d-flex justify-content-center align-items-center " >
            <div className="text-center d-inline-block hoverEffect" >
            TODO LIST
  </div>
</div>

        <hr />
        <Routes>
          <Route path='/' element={<AdditemBar showAlert={showAlert}/> }/>
          <Route path='/about' element={<About />} />
          <Route path='/signup' element={<Signup showAlert={showAlert}/>} />
          <Route path='/login' element={<Login showAlert={showAlert}/>} />
        </Routes>
      </div>
     </Router>
    </TaskState>
    

      
    

  );
}

export default App;

// Yes, the components defined in App.js are typically parent components or top-level components in your React application, as App.js serves as the root component in a standard React setup.