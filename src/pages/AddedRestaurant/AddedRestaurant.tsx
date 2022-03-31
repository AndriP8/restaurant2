import React from "react";
import { v4 as uuidV4 } from "uuid";
import axios from "axios";
import { Box, Heading } from "@chakra-ui/react";
import CreateRestaurant from "@/components/CreateRestaurant";

const AddedRestaurant = () => {
  const [restaurantName, setRestaurantName] = React.useState("");
  const [restaurantRating, setRestaurantRating] = React.useState(1);
  const [restaurantPrice, setRestaurantPrice] = React.useState(0);
  const [restaurantCategory, setRestaurantCategory] = React.useState("");
  const [restaurantIsOpen, setRestaurantIsOpen] = React.useState(false);

  const restaurant = {
    id: uuidV4(),
    name: restaurantName,
    rating: restaurantRating,
    price: restaurantPrice,
    images: [
      "https://media-cdn.tripadvisor.com/media/photo-s/08/f0/6d/b2/latin-grill.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/10/34/b4/d1/latin-grill.jpg",
    ],
    category: {
      id: uuidV4(),
      name: restaurantCategory,
    },
    open: restaurantIsOpen,
  };

  const handleFormAdd = () => {
    axios
      .post("http://sekawan-restaurant.herokuapp.com/restaurants", restaurant)
      .then((res) =>
        res.status === 201 ? alert("Sucees added restaurant") : null
      )
      .catch((err) => err);
  };

  return (
    <Box>
      <Heading fontSize={"4xl"}>Added Restaurant</Heading>
      <CreateRestaurant
        name={restaurantName}
        onChangeName={setRestaurantName}
        rating={restaurantRating}
        onChangeRating={setRestaurantRating}
        price={restaurantPrice}
        onChangePrice={setRestaurantPrice}
        category={restaurantCategory}
        onChangeCategory={setRestaurantCategory}
        onChangeRestaurantIsOpen={setRestaurantIsOpen}
        onSubmit={handleFormAdd}
      />
    </Box>
  );
};

export default AddedRestaurant;
