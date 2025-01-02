/* eslint-disable react/prop-types */
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";


function ShoppingProductTile({ product, handleGetProductDetails, handleAddToCart }) {
    return (
        <Card className="w-full max-w-sm mx-auto">
            <div onClick={() => handleGetProductDetails(product?._id)} >
                <div className="relative">
                    <img
                        src={product?.image}
                        alt={product?.title}
                        className="w-full h-[250px] object-cover rounded-t-lg"

                    />
                    {

                        product?.totalStock === 0 ? <Badge className="absolute top-2 left-2 bg-red-500 hover-bg-red-600">Out of Stock
                        </Badge> : product?.totalStock < 10 ? <Badge className="absolute top-2 left-2 bg-red-500 hover-bg-red-600">{`only ${product.totalStock} items left`}
                        </Badge> :

                            product?.salePrice > 0 ? (
                                <Badge className="absolute top-2 left-2 bg-red-500 hover-bg-red-600">Sale
                                </Badge>
                            ) : null
                    }
                </div>
                <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">{product?.category}

                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>
                        ₹{product?.price}
                        </span>
                        {
                            product?.salePrice > 0 ? (
                                <span className="text-lg font-semibold text-primary">
                                    ₹{product?.salePrice}
                                </span>
                            ) : null
                        }
                    </div>
                </CardContent>

            </div>
            <CardFooter>
                {
                    product?.totalStock === 0 ? <Button className="w-full opacity-60 cursor-not-allowed">out of Stock</Button> :
                        <Button onClick={() =>
                            handleAddToCart(product?._id, product?.totalStock)} className="w-full">Add to Cart</Button>
                }

            </CardFooter>
        </Card>
    );
};

export default ShoppingProductTile;