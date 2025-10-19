import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 pt-14">
        <Outlet/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
