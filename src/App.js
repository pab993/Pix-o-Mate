import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import './App.scss';
import HomePage from "./pages/home/HomePage";
import HeaderComponent from "./components/header/Header";
import MainComponent from "./components/main/Main";
import OwnersPage from "./pages/owners/OwnersPage";
import SearchPage from "./pages/search/SearchPage";

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
    Skeleton(SearchPage, {page: "search"});

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
          <Route path="/owners" element={
            <SearchComponent />
          }/>
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
