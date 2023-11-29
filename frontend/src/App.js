import Router from "./Router";
import Footer from "./components/layout/Footer/Footer";

function App() {
    return (
        <div className="App">
            <Router footer={<Footer />}/>
        </div>
    );
}

export default App;
