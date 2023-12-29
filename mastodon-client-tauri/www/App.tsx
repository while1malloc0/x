import { invoke } from "https://esm.sh/@tauri-apps/api";
import React, { useState } from "https://esm.sh/react@18";

export default function App(){

    const [state, setState] = useState("Click the button!")
    const [ret, setRet] = useState("");

    function askUser(){
        invoke<string>("greet", {name: state}).then(res => setRet(res))
    }

    return (
        <div>
            {ret && <h1>{ret}</h1>}
            <input type="text" placeholder="what is your name?" onChange={e => setState(e.target.value)}></input>
            <button onClick={askUser}>Click me :)</button>
        </div>
    )
}