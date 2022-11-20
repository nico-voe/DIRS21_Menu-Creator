import "./App.css";

import Form from "./components/Form";
import MenuCard from "./components/MenuCard";
import { useState } from "react";

export default function App() {
  const [showMenuCards, setShowMenuCards] = useState(false);
  return (
    <div className="app">
      {showMenuCards ? (
        <MenuCard
          showMenuCards={showMenuCards}
          setShowMenuCards={setShowMenuCards}
        />
      ) : (
        <>
          <Form />
          <div className="open-search">
            <a onClick={() => setShowMenuCards(!showMenuCards)}>Go to Menu</a>
          </div>
        </>
      )}
    </div>
  );
}
