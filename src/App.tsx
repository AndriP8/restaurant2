import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import AddedRestaurant from "@/pages/AddedRestaurant";

const App = () => {
  return (
    <Router>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/add-restaurant">Add restaurant</a>
        </li>
      </ul>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/add-restaurant" element={<AddedRestaurant />} />
      </Routes>
    </Router>
  );
};

export default App;
