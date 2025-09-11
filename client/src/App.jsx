import Header from "./components/layout/header/Header";
import Body from "./Body";
import Footer from "./components/layout/footer/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 pt-14">
        <Body />
      </div>
      <Footer />
    </div>
  );
}

export default App;
