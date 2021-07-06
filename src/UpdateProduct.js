import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import Header from "./Header";
import { Row, Col, Form, Button, Card } from "react-bootstrap";

function UpdateProduct({ match }) {

    useEffect(() => {
        fetchData();
    }, []);
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [productImages, setProductImages] = useState("");

    const history = useHistory();

    async function fetchData() {
        const url = "http://127.0.0.1:8000/api/products/" + match.params.id + "/edit";
        let result = await fetch(url);
        result = await result.json();
        setName(result.data.name);
        setDescription(result.data.description);
        setPrice(result.data.price);
        setProductImages(result.data.get_files);
    }

    async function updateProduct(e) {
        
        e.preventDefault();
        const formData = new FormData()
        console.log(name)
        formData.append("name", name);
        for (const productImage of productImages) {
            formData.append("product_filepath[]", productImage);
        }
        formData.append("description", description);
        formData.append("price", price);
        const url = "http://127.0.0.1:8000/api/products/" + match.params.id +"?_method=PUT";
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

    function goToList(e) {

        e.preventDefault();
        history.push("/");
    }

    return (
        <>
        <Header />
        <div className="col-sm-4 offset-sm-4 my-3">
            <Row style={{ textAlign: "left", marginBottom: "20px" }}>
                <Col sm={12} >
                    <Button variant="dark" onClick={goToList}>Back</Button>
                </Col>
            </Row>    
            <Card className="p-5">
                <h3>Update Product</h3>
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
                
                <Button onClick={updateProduct} variant="primary" type="submit">Update Product</Button>
            </Card>
        </div>
        </>
    );
}

export default withRouter(UpdateProduct);