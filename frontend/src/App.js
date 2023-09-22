import Router from "./Router";

function App() {
    return (
        <div className="App">
            <Router navbar={<nav>NAV</nav>} footer={<footer>FOOTER</footer>}/>
        </div>
    );
}

export default App;
