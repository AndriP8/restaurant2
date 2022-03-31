import React from "react";
import { Box, SimpleGrid, Button } from "@chakra-ui/react";
import RestaurantCard from "@/components/RestaurantCard";
import { Restaurant, itemPerPage } from "@/pages/Home/Restaurant/Restaurant";

interface RestaurantList {
  restaurants: Restaurant[];
}

const RestaurantList = (props: RestaurantList) => {
  const [page, setPage] = React.useState(1);

  const maxPage = Math.floor(props.restaurants.length / itemPerPage);

  const paginatedRestaurant = props.restaurants.slice(0, itemPerPage * page);

  return (
    <Box>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
        {paginatedRestaurant.map((resto) => (
          <RestaurantCard
            key={resto.id}
            title={resto.name}
            image={resto.images[0]}
            rating={resto.rating}
            category={resto.category.name}
            price={resto.price}
            open={resto.open}
          />
        ))}
      </SimpleGrid>
      {maxPage >= page && (
        <Box
          w={36}
          border={"1px"}
          borderColor={"gray.900"}
          borderRadius={4}
          my={6}
          mx={"auto"}
        >
          <Button
            borderColor={"gray.900"}
            bg={"white"}
            w={"full"}
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default RestaurantList;
