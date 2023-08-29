import { menuItemsData } from "./data/Menu";
import { useState, useEffect } from "react";

export const getTimeString = (time) => {
  const hour = Math.floor(time / 100);
  const minutes = time % 100;
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(
    new Date(
      `2000-01-01T${hour.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`
    )
  );
};

export const getDateInFormat = (date) => {
  // Return Date in : "weekday, Month Day" format
  const dateOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  var date = new Date(date);
  // date.toISOString().substring(0, 10);

  return new Intl.DateTimeFormat("en-IN").format(date);
};

export const convertTimeToFormat = (inputTime) => {
  var date = new Date(inputTime);
  var timeee = date.toLocaleTimeString("en-IN")
  // const [hours, minutes] = inputTime.split(":");
  // const formattedTime = hours + minutes;

  return timeee;
}

// export const calPrice = (selectedItems, itemQuantities) => {
//   const [items, setItems] = useState([]);
//   useEffect(() => {
//     setItems(menuItemsData.filter((item0) => { return(item0.id === parseInt(item));
//     })
//   );},[menuItemsData,item]);
//   console.log(parseInt(item),quantity);
//   const itemPrice = (items[0]? items[0].price: "0.00")
//   const iPN = itemPrice.replace(/[^0-9.]/g, '');
//   console.log(iPN);
//   const price = quantity * parseInt(iPN);
//   return price;
// };

export const calPrice = (selectedItems, itemQuantities) => {
  let price = 0;
  selectedItems.map((item) => {
    let itemId = item.itemId
    price = price + item.price * itemQuantities[itemId];
  })
  return price;
};