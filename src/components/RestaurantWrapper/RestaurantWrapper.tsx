import { Box, SimpleGrid, Button } from "@chakra-ui/react";
import RestaurantCard from "@/components/RestaurantCard";
import { RestaurantParams } from "@/pages/Home/Restaurant/Restaurant";

interface RestaurantWrapper {
  restaurants: RestaurantParams[];
  page: number;
  changePage: (page: number) => void;
  loadMore: number;
}

const RestaurantWrapper = (props: RestaurantWrapper) => {
  console.log(props.page, props.loadMore);

  return (
    <Box>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
        {props.restaurants.map((resto) => (
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
      {props.loadMore >= props.page && (
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
            onClick={() => props.changePage(props.page + 1)}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default RestaurantWrapper;
