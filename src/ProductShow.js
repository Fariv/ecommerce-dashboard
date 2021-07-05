import React, { useEffect, useState } from "react";
import Header from "./Header";
import { withRouter, useHistory } from "react-router-dom";
import { Carousel, Row, Col, Button } from "react-bootstrap";
function ProductShow({ match }) {
    
    const history = useHistory();
    const [productData, setProductData] = useState("");
    useEffect(() => {
        fetchData()
    }, []);

    async function fetchData() {
        const url = "http://127.0.0.1:8000/api/products/" + match.params.id;
        let result = await fetch(url);
        result = await result.json();
        setProductData(result);
    }

    function goToList(e) {

        e.preventDefault();
        history.push("/");
    }

    console.log(productData.success);
    console.log(productData.data);
    return (
        <>
            <Header />
            <Row style={{marginTop: "20px"}}>
                <Col sm={{ span: 8, offset: 2 }} >
                    <Row style={{ textAlign: "left" }}>
                        <Col sm={12} >
                            <Button variant="dark" onClick={goToList}>Back</Button>
                        </Col>
                    </Row>
                    <Row style={{marginTop: "20px"}}>
                        <Col sm={7} >
                            {
                                productData.success && productData.data?.get_files.length ?
                                <Carousel>
                                {
                                    productData.data.get_files.map((v, i) => {
                                        return (<Carousel.Item style={{backgroundColor: "rgba(50, 50, 50, 0.2)"}}>
                                            <img className="d-block mx-auto" width="512" src={"http://127.0.0.1:8000/" + v.product_filepath} alt={(v.id + i)} />
                                        </Carousel.Item>);
                                    })
                                }
                                </Carousel> : null
                            }
                        </Col>

                        <Col sm={5} style={{ textAlign: "left" }}>
                            {
                                productData.success && productData.data ?
                                (<div>
                                    <h3>{productData.data.name}</h3>
                                    <h5>{productData.data.description.split('\n').map(function (v, key) {
                                        return <React.Fragment key={key}>{v}<br/></React.Fragment>
                                    })}</h5>
                                    <h4>BDT {productData.data.price}</h4>
                                </div>) : null
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default withRouter(ProductShow);