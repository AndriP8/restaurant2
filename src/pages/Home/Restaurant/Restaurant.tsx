import React from "react";
import axios from "axios";
import { Box, Heading, Text } from "@chakra-ui/react";
import RestaurantFilter from "@/components/RestaurantFilter";
import RestaurantList from "@/components/RestaurantList";

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  price: number;
  images: string[];
  category: {
    name: string;
  };
  open: boolean;
}

export const itemPerPage = 8;

const Restaurant = () => {
  const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);
  const [restaurantIsOpen, setRestaurantIsOpen] =
    React.useState<boolean>(false);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(0);
  const [category, setCategory] = React.useState("");

  React.useEffect(() => {
    axios
      .get("https://sekawan-restaurant.herokuapp.com/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch((err) => err);
  }, []);

  const filteredRestaurant = restaurants
    .filter((restaurant) => (restaurantIsOpen ? restaurant.open : true))
    .filter((restaurant) => {
      if (minPrice > 0 && maxPrice > 0) {
        return restaurant.price >= minPrice && restaurant.price <= maxPrice;
      } else if (minPrice > 0) {
        return restaurant.price >= minPrice;
      } else if (maxPrice > 0) {
        return restaurant.price <= maxPrice;
      } else {
        return true;
      }
    })
    .filter((restaurant) =>
      category ? restaurant.category.name === category : restaurant
    );

  const clearFilter = () => {
    setRestaurantIsOpen(false);
    setMinPrice(0);
    setMaxPrice(0);
    setCategory("");
  };

  return (
    <Box>
      <Heading as={"h2"} fontSize={"4xl"}>
        Restaurants
      </Heading>
      <Text maxW={"600px"} my={6}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur
        eius, quam voluptatum fuga ad velit at iusto ipsum id ex.
      </Text>
      <RestaurantFilter
        isRestaurantOpen={restaurantIsOpen}
        onFilterRestaurantOpen={setRestaurantIsOpen}
        minPrice={minPrice}
        onChangeMinPrice={setMinPrice}
        maxPrice={maxPrice}
        onChangeMaxPrice={setMaxPrice}
        onChangeCategory={setCategory}
        onClearFilter={clearFilter}
      />
      <RestaurantList restaurants={filteredRestaurant} />
    </Box>
  );
};

export default Restaurant;
