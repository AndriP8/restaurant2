import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

interface CreateRestaurantProps {
  name: string;
  onChangeName: (name: string) => void;
  rating: number;
  onChangeRating: (rating: number) => void;
  price: number;
  onChangePrice: (price: number) => void;
  image: string;
  onChangeImage: (image: string) => void;
  category: string;
  onChangeCategory: (category: string) => void;
  onChangeRestaurantIsOpen: (isOpen: boolean) => void;
  onSubmit: () => void;
}

const CreateRestaurant = (props: CreateRestaurantProps) => {
  return (
    <FormControl
      maxWidth={"96"}
      mx={"auto"}
      border={"1px"}
      borderRadius={"8"}
      p={"4"}
    >
      <Stack spacing={2}>
        <FormLabel htmlFor="name">Name Restaurant</FormLabel>
        <Input
          id="name"
          type="text"
          value={props.name}
          onChange={(e) => props.onChangeName(e.target.value)}
        />
        <FormLabel htmlFor="rating">Rating</FormLabel>
        <Input
          id="rating"
          type="number"
          min={1}
          max={5}
          value={props.rating}
          onChange={(e) => props.onChangeRating(e.target.valueAsNumber)}
        />
        <FormLabel htmlFor="price">Price</FormLabel>
        <Input
          id="price"
          type="number"
          min={1}
          max={5}
          value={props.price}
          onChange={(e) => props.onChangePrice(e.target.valueAsNumber)}
        />
        <FormLabel htmlFor="image">Image</FormLabel>
        <Input
          id="image"
          type="string"
          value={props.image}
          onChange={(e) => props.onChangeImage(e.target.value)}
        />
        <FormLabel htmlFor="category">Category</FormLabel>
        <Input
          id="category"
          type="text"
          value={props.category}
          onChange={(e) => props.onChangeCategory(e.target.value)}
        />
        <RadioGroup
          onChange={(e) =>
            e === "open"
              ? props.onChangeRestaurantIsOpen(true)
              : props.onChangeRestaurantIsOpen(false)
          }
        >
          <Radio value={"open"}>Open</Radio>
          <Radio value={"closed"}>Closed</Radio>
        </RadioGroup>
        <Button w={"full"} type={"submit"} onClick={() => props.onSubmit()}>
          Submit
        </Button>
      </Stack>
    </FormControl>
  );
};

export default CreateRestaurant;
