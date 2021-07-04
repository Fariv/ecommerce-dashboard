import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import { Form, Button, Card } from "react-bootstrap";

function AddProduct() {

    useEffect(() => {
        if (localStorage.getItem("user_info")) {
            history.push("/add");
        }
    });
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [productImages, setProductImages] = useState("");

    const history = useHistory();

    async function addProduct(e) {
        
        e.preventDefault();
        const formData = new FormData()
        formData.append("name", name);
        for (const productImage of productImages) {
            formData.append("product_filepath[]", productImage);
        }
        formData.append("description", description);
        formData.append("price", price);
        const url = "http://127.0.0.1:8000/api/products";
        let result = await fetch(url, {
            method: "POST",
            body: formData,
        });
        result = await result.json();

        if (!result.success) {
            alert(result.error);
        } else {
            alert(result.message);
            history.push("/");
        }
    }

    return (
        <>
        <Header />
        <div className="col-sm-4 offset-sm-4 my-3">
            <Card className="p-5">
                <h3>Add Product</h3>
                <Form.Group className="text-left" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="text-left" controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Description"
                            style={{ height: '100px' }}
                            value={description} onChange={(e) => setDescription(e.target.value)}
                        />
                </Form.Group>

                <Form.Group className="text-left" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </Form.Group>
                
                <Form.Group className="text-left" controlId="formBasicProductFiles">
                    <Form.Label>Product Images</Form.Label>
                    <Form.Control name="product_filepath" type="file" multiple onChange={(e) => setProductImages(Array.from(e.target.files))} />
                </Form.Group>
                
                <Button onClick={addProduct} variant="primary" type="submit">Add Product</Button>
            </Card>
        </div>
        </>
    );
}

export default AddProduct;