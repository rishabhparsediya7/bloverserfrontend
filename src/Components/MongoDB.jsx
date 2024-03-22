import React, { useEffect, useState } from "react";
import axios from "axios";
const MongoDB = () => {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/blogs"); // Replace with your server URL
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchItems();
  }, []);
  return (
    <div className="w-screen h-screen">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {
        items.map((item) => {
          const blob = new Blob([Int8Array.from(item.image.data.data)], {
            type: item.image.contentType,
          });
          const image = window.URL.createObjectURL(blob);
          return (
            <div key={item._id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <img
                className="h-80 w-80 rounded-md"
                src={image}
                alt={item.title}
              />
            </div>
          );
        })
        }
      </div>
    </div>
  );
};

export default MongoDB;
