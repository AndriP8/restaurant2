import React from "react";
import axios from "axios";
import { Box, Heading, Text } from "@chakra-ui/react";
import RestaurantFilter from "@/components/RestaurantFilter";
import RestaurantWrapper from "@/components/RestaurantWrapper";

export interface RestaurantParams {
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
const Restaurant = () => {
  const [restaurants, setRestaurants] = React.useState<RestaurantParams[]>([]);
  const [restaurantIsOpen, setRestaurantIsOpen] =
    React.useState<boolean>(false);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(0);
  const [categories, setCategories] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [itemPerPage, setItemPerPage] = React.useState(8);

  React.useEffect(() => {
    axios
      .get("https://sekawan-restaurant.herokuapp.com/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch((err) => err);
  }, []);

  const filteredCategoryRestaurant = restaurants
    .filter((restaurant) => (restaurantIsOpen ? restaurant.open : restaurant))
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
      categories ? restaurant.category.name === categories : restaurant
    );

  const clearFilter = () => {
    setRestaurantIsOpen(false);
    setMinPrice(0);
    setMaxPrice(0);
    setCategories("");
  };

  const filteredRestaurant = filteredCategoryRestaurant.slice(
    0,
    itemPerPage * page
  );

  const loadMore = Math.floor(filteredRestaurant.length / itemPerPage);

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
        restaurantOpenClosed={restaurantIsOpen}
        filterRestaurantOpenClosed={setRestaurantIsOpen}
        minPrice={minPrice}
        changeMinPrice={setMinPrice}
        maxPrice={maxPrice}
        changeMaxPrice={setMaxPrice}
        changeCategory={setCategories}
        clearFilter={clearFilter}
      />
      <RestaurantWrapper
        restaurants={filteredRestaurant}
        page={page}
        changePage={setPage}
        loadMore={loadMore}
      />
    </Box>
  );
};

export default Restaurant;
