import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDish, fetchDishes } from "../APIS";

const MenuCard = () => {
  const url = "http://localhost:9000/";

  const [dishes, setDishes] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const getDishes = async () => {
      const res = await fetchDishes();
      console.log("res", res);
      setDishes(res.data);
    };
    getDishes();
  }, [render]);

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
                    onClick={async (e) => {
                      await deleteDish(e, dish._id);
                      setRender(!render);
                    }}
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
