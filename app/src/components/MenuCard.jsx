import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MenuCard = () => {
  const url = "http://localhost:9000/";

  const [dishes, setDishes] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${url}dishes`);
        const data = await res.json();
        setDishes(data.data);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchData();
  }, [render]);

  const deleteDish = async (e, id) => {
    e.preventDefault();
    const deleteDish = await fetch(`${url}dishes/${id}`, {
      method: "DELETE",
    });
    const data = await deleteDish.json();
    console.log("data", data);
    setRender(!render);
  };

  return (
    <div className="bcontainer">
      {dishes.length ? (
        dishes.map((dish) => (
          <div className="container" key={dish._id}>
            <div className="card">
              <div className="box">
                <div className="content">
                  <h3>{dish.name}</h3>
                  <p>{dish.description}</p>
                  <h4>Price</h4>
                  <p>{`${dish.price}$`}</p>
                  <h4>Category</h4>
                  <p>{dish.category}</p>
                  <h4>Available for</h4>
                  <p>{dish.availability}</p>
                  <h4>Waiting time</h4>
                  <p>{`${dish.waitingTime} minutes`}</p>
                  <Link className="menu-edit" to={`edit/${dish._id}`}>
                    Edit
                  </Link>
                  <a
                    className="remove"
                    onClick={(e) => deleteDish(e, dish._id)}
                  >
                    Remove
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="container">
          <div className="card">
            <div className="box">
              <div className="content">
                <h3>No Dishes Added</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuCard;
