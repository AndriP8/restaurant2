import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { BsFillStarFill } from "react-icons/bs";

interface RestaurantCard {
  title: string;
  image: string;
  rating: number;
  category: string;
  price: number;
  open: boolean;
}

const RestaurantCard = (props: RestaurantCard) => {
  return (
    <Box>
      <Image src={props.image} alt={props.title} width={"full"} h={"52"} />
      <Heading as={"h3"} fontSize={"xl"} py={2}>
        {props.title}
      </Heading>
      <Flex>
        {Array(Math.floor(props.rating))
          .fill(0)
          .map((_, i) => (
            <BsFillStarFill
              key={i}
              style={{ color: "yellow", marginRight: "5px" }}
            />
          ))}
      </Flex>
      <Flex
        justifyContent={"space-between"}
        flexDirection={["row", "column", "row"]}
      >
        <Flex alignItems={"center"}>
          <Text>{props.category}</Text> {"-"}
          <Text>{props.price}</Text>
        </Flex>

        <HStack spacing={2} alignItems={"center"}>
          {props.open ? (
            <>
              <Text width={4} height={4} bg={"green"} borderRadius={"full"} />
              <Text>Open Now</Text>
            </>
          ) : (
            <>
              <Text width={4} height={4} bg={"red"} borderRadius={"full"} />
              <Text>Closed</Text>
            </>
          )}
        </HStack>
      </Flex>
      <Button
        bg={"gray.700"}
        _hover={{ backgroundColor: "gray.800" }}
        w={"full"}
        color={"white"}
        my={6}
      >
        LEARN MORE
      </Button>
    </Box>
  );
};

export default RestaurantCard;
