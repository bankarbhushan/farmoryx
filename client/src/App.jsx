import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import { Outlet } from "react-router-dom";
import CustomToaster from "./utils/CustomToaster";

import UserContextProvider from "./context/userContextProvider";
UserContextProvider
function App() {
  return (
    <UserContextProvider >
        <CustomToaster/>
        <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 pt-14">
          <Outlet/>
        </div>
      <Footer />
      </div>
    </UserContextProvider>
  );
}

export default App;
