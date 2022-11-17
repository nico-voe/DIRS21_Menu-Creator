import { useState } from "react";
import "./App.css";
import Form from "./components/Form";

const App = () => {
  const [values, setValues] = useState({});

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Dishname",
      label: "Dishname",
      required: true,
    },
    {
      id: 2,
      name: "description",
      type: "text",
      placeholder: "Description",
      label: "Description",
      required: true,
    },
    {
      id: 3,
      name: "price",
      type: "text",
      placeholder: "Price",
      label: "Price",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Add Dish To Menu</h1>
        {inputs.map((input) => (
          <Form
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}{" "}
        <div className="formInput">
          <label>Category</label>
          <select onChange={onChange}>
            <option value="1">Starter</option>
            <option value="2">Main Course</option>
            <option value="3">Dessert</option>
            <option value="4">Beverage</option>
          </select>
        </div>
        <div className="formInput">
          <label>Availability</label>
          <select onChange={onChange}>
            <option value="1">Breakfast</option>
            <option value="2">Lunch</option>
            <option value="3">Dinner</option>
          </select>
          <select onChange={onChange}>
            <option value="1">Weekdays</option>
            <option value="2">Weekends</option>
          </select>
        </div>
        <div className="formInput">
          <label>Waiting time in minutes</label>
          <input type="number" min="0" max="100" onChange={onChange} />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default App;
