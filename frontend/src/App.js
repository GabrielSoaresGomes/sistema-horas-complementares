import Router from "./Router";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";

function App() {
    return (
        <div className="App">
            <Router navbar={<Navbar />} footer={<Footer />}/>
        </div>
    );
}

export default App;
