import Header from "./components/layout/header/Header";
import Body from "./Body";
import Footer from "./components/layout/footer/Footer";
import Login from "./components/auth/login/Login";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header />
      <div className="flex flex-1 pt-14">
        <Body />
      </div>
      <Footer /> */}
       <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration:3000 ,
       success:{
            style: {
            background: '#4caf50',
            color: '#fff',
          }
       },
       error:{
        style:{
          background: '#f44336',
          color: '#fff',
        }
       }

        }} />
      <Login/>
    </div>
  );
}

export default App;
