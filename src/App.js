import Header from "./Components/Headerpart";
import { HashRouter, Routes, Route } from "react-router-dom";
import CreateTask from "./Components/NewTasks";
import Taskbucket from "./Components/Alltasks";
import Editmytasks from "./Components/Edittasks";

function App() {

  return (
    <div className="App">

      <HashRouter>
        <div className="container-fluid newtask-box">
          <div className="row">
            <Header />
            <Routes>
              <Route exact path="/" element={<CreateTask />} />
              <Route exact path="/alltasks" element={<Taskbucket />} />
              <Route exact path="/edituser/:taskid" element={<Editmytasks />} />
            </Routes>
          </div>
        </div>
      </HashRouter>

    </div>
  )
}

export default App;
