import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import './App.scss';
import HomePage from "./pages/HomePage";
import HeaderComponent from "./components/header/Header";
import MainComponent from "./components/main/Main";

function App() {

  const Skeleton = (Component, props) => (
    <>
      <HeaderComponent {...props} />
      <MainComponent>
        <Component {...props}/>
      </MainComponent>
    </>
  )

  const HomeComponent = () =>
    Skeleton(HomePage, {page: "Home"});

  const RouterComponent = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={
            <HomeComponent />
          }>
          </Route>
        </Routes>
      </Router>
    );
  }

  return (
    <>
      <RouterComponent />
    </>
  );
}

export default App;
