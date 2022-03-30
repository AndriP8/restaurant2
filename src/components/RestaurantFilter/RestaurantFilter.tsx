import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

interface RestaurantFilterProps {
  restaurantOpenClosed: boolean;
  filterRestaurantOpenClosed: (isOpen: boolean) => void;
  minPrice: number;
  changeMinPrice: (price: number) => void;
  maxPrice: number;
  changeMaxPrice: (price: number) => void;
  changeCategory: (category: string) => void;
  clearFilter: () => void;
}

interface Category {
  id: string;
  name: string;
}

const RestaurantFilter = (props: RestaurantFilterProps) => {
  const [isModalPriceOpen, setIsModalPriceOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);

  axios
    .get("https://sekawan-restaurant.herokuapp.com/categories")
    .then((res) => setCategories(res.data))
    .catch((err) => err);

  return (
    <Flex
      justifyContent={"space-between"}
      py={4}
      mb={4}
      borderTop={"1px"}
      borderBottom={"1px"}
      flexDirection={["column", "row"]}
    >
      <HStack spacing={4} w={["full", "80%"]} mb={[4, 0]} position={"relative"}>
        <Text>Filter By:</Text>
        <Button
          bg={"white"}
          _hover={{ backgroundColor: "white" }}
          fontWeight={"normal"}
          border={"1px"}
          borderRadius={4}
          display={"flex"}
          padding={2}
          alignItems={"center"}
          justifyContent={"space-around"}
          onClick={() =>
            props.filterRestaurantOpenClosed(!props.restaurantOpenClosed)
          }
        >
          <Box
            width={4}
            height={4}
            border={"1px"}
            borderRadius={"full"}
            mr={2}
          />
          <Text>Open Now</Text>
        </Button>
        <Button
          bg={"white"}
          _hover={{ backgroundColor: "white" }}
          fontWeight={"normal"}
          border={"1px"}
          borderRadius={4}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          onClick={() => setIsModalPriceOpen(!isModalPriceOpen)}
        >
          <Text mr={2}>Price</Text>
          <Text>^</Text>
        </Button>
        {isModalPriceOpen && (
          <FormControl
            border={"1px"}
            borderRadius={8}
            w={"72"}
            p={4}
            bg={"white"}
            position={"absolute"}
            top={"14"}
            left={24}
          >
            <FormLabel htmlFor="min-price">Min Price</FormLabel>
            <Input
              type={"number"}
              value={props.minPrice}
              onChange={(e) => props.changeMinPrice(e.target.valueAsNumber)}
              id="min-price"
            />
            <FormLabel htmlFor="max-price">Max Price</FormLabel>
            <Input
              type={"number"}
              value={props.maxPrice}
              onChange={(e) => props.changeMaxPrice(e.target.valueAsNumber)}
              id="max-price"
            />
          </FormControl>
        )}
        <Select
          width={32}
          borderColor={"black"}
          _hover={{ borderColor: "black" }}
          onChange={(e) => props.changeCategory(e.target.value)}
        >
          <option>Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </Select>
      </HStack>
      <Box border={"1px"} borderRadius={"8"} width={20} textAlign={"center"}>
        <Button bg={"white"} w={"full"} onClick={() => props.clearFilter()}>
          Clear
        </Button>
      </Box>
    </Flex>
  );
};

export default RestaurantFilter;
