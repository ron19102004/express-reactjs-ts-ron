import { Button, Text, ButtonGroup, Card, CardBody, CardFooter, Image, Divider, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getProduct } from "../services/product";
import '../styles/product.scss';

const Product: React.FC = (): any => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        getProduct().then((data: any): any => {
            data && setProduct(data.data);
        })
    }, [])
    return (
        <div className="product">
            <SimpleGrid spacing={6} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                {product.map((item: any, index) => {
                    return (
                        <Card maxW='sm' key={index}>
                            <CardBody>
                                <Image
                                    src={item.product.picture}
                                    alt="img"
                                    borderRadius='lg'
                                    justifyItems='center'
                                />
                                <Stack mt='6' spacing='3'>
                                    <Heading size='md'>{item.product.name}</Heading>
                                    <Text>
                                    {item.product.description}
                                    </Text>
                                    <Text color='blue.600' fontSize='2xl'>
                                        $450
                                    </Text>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <ButtonGroup spacing='2'>
                                    <Button variant='solid' colorScheme='teal'>
                                        Buy now
                                    </Button>
                                    <Button variant='solid' colorScheme='teal'>
                                        Info It
                                    </Button>
                                    <Button colorScheme='teal' variant='outline'>
                                        Add bags
                                    </Button>
                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                    )
                })}
            </SimpleGrid>
        </div>
    )
}
export default Product;