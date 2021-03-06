import React, { useState, useEffect, Fragment } from "react";
import Header from "./Header";
import { Button, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function ProductList() {
    
    const history = useHistory();
    const [response, setResponse] = useState("");
    useEffect(() => {
        fetchData();
    }, []);

    async function editRecord(e, id) {
        
        e.preventDefault();
        history.push("/update/" + id);
    }

    async function deleteRecord(e, id) {
        
        e.preventDefault();
        if (window.confirm("Are you sure to Delete?")) {
            
            const url = "http://127.0.0.1:8000/api/products/" + id;
            let result = await fetch(url, {
                method: "DELETE"
            });
            result = await result.json();
            if (result.success) {
                alert(result.message);
            }
            fetchData();
        }
    }

    async function fetchData() {
            
        const url = "http://127.0.0.1:8000/api/products";
        let result = await fetch(url);
        result = await result.json();
        setResponse(result);
    }

    function showSingleProductPage(e, id) {
        
        e.preventDefault();
        history.push("/product-show/" + id);
    }
    
    console.log(response);
    return (
        <>
        <Header />
        <div className="col-sm-10 offset-sm-1 my-4">
            <h1>Product List</h1>
            <Table responsive bordered striped hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        response.data ?
                        response.data.map((item, i) => 
                            <tr key={i}>
                                <td style={{ cursor: "pointer" }} align="left" onClick={(e) => showSingleProductPage(e, item.id)}>{item.name}</td>
                                <td style={{ cursor: "pointer" }} onClick={(e) => showSingleProductPage(e, item.id)}>{
                                    item.get_files && item.get_files.length ?
                                    (<img width="196" src={"http://127.0.0.1:8000/" + item.get_files[0].product_filepath} alt="product_image" />) :
                                    null
                                }
                                </td>
                                <td style={{ cursor: "pointer" }} align="left" onClick={(e) => showSingleProductPage(e, item.id)}>
                                    {item.description.split('\n').map(function (v, key) {
                                        return <Fragment key={key}>{v}<br/></Fragment>
                                    })}
                                </td>
                                <td style={{ cursor: "pointer" }} align="right" onClick={(e) => showSingleProductPage(e, item.id)}>{item.price}</td>
                                <td><Button variant="info" onClick={(e) => editRecord(e, item.id)}>Edit</Button></td>
                                <td><Button variant="danger" onClick={(e) => deleteRecord(e, item.id)}>Delete</Button></td>
                            </tr>
                        ) :
                        null        
                    }    
                </tbody>
            </Table>    
        </div>
        </>
    );
}

export default ProductList;