import { useState } from "react";
import "common.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import MyRouter from "./router";

/**
 * @return {SS} Component
 */
function App() {
    const [state, setState] = useState({
        isModifyMode: false,
        isComplete: false,
        boardId: 0,
    });

    /**
     * @return {Component} Component
     */
    return (
        <div className="App">
            <BrowserRouter>
                <MyRouter state={state} setState={setState}></MyRouter>
            </BrowserRouter>
        </div>
    );
}

export default App;
