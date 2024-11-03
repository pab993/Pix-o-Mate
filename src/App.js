import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import './App.scss';
import HomePage from "./pages/home/HomePage";
import HeaderComponent from "./components/header/Header";
import MainComponent from "./components/main/Main";
import OwnersPage from "./pages/owners/OwnersPage";
import StatusProvider from './context/Status';
import InterceptorProvider from "./context/Interceptor";

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
    Skeleton(HomePage, {page: "home"});
  const OwnersComponent = () =>
    Skeleton(OwnersPage, {page: "owners"});
  const SearchComponent = () =>
    Skeleton(OwnersPage, {page: "search", text: true});

  const RouterComponent = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={
            <HomeComponent />
          }/>
          <Route path="/owners" element={
            <OwnersComponent />
          }/>
          <Route path="/search" element={
            <SearchComponent />
          }/>
        </Routes>
      </Router>
    );
  }

  return (
    <>
      <InterceptorProvider >
        {/*<StatusProvider>*/}
          <RouterComponent />
        {/*</StatusProvider>*/}
      </InterceptorProvider>
    </>
  );
}

export default App;
