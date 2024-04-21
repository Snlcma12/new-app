import React, { useState } from "react";
import Header from "./components/Header/Header";
import TargetShooter from "./components/TargetShooter/TargetShooter";
import StudentSimulator from "./components/StudentSimulator/StudentSimulator";
import Graph2D from "./components/Graph2D/Graph2D";
import UniversalCalculator from "./components/UniversalCalculator/UniversalCalculator";
import Graph3D from "./components/Graph3D/Graph3D";

import "./App.css";

const App = () => {
    const [pageName, setPageName] = useState('Graph3D');
    
    return (
        <div className='app'>
            <Header setPageName={setPageName} />
            {pageName === 'TargetShooter' && <TargetShooter />}
            {pageName === 'StudentSimulator' && <StudentSimulator />}
            {pageName === 'Graph2D' && <Graph2D />}
            {pageName === 'UniversalCalculator' && <UniversalCalculator />}
            {pageName === 'Graph3D' && <Graph3D />}
        </div>
    );
};

export default App;
