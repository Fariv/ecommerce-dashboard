import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Header from "./Header";
function Signin() {

    const history = useHistory();
    useEffect(() => {
        if (localStorage.getItem("user_info")) {
            history.push("/add");
        }
    });
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login(e) {
        
        e.preventDefault();
        let data = { email, password };
        const url = "http://127.0.0.1:8000/api/signin";
        let result = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data),
        });

        result = await result.json();
        if (result.success) {
            
            localStorage.setItem("user_info", JSON.stringify(result.data));
            history.push("/add");
        } else {
            alert(result.error);
        }
    }

    return (
        <>
        <Header />
        <div className="col-sm-4 offset-sm-4 my-3">
            <Card className="p-5">
                <h3>Signin</h3>
                
                <Form.Group className="text-left" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                
                <Form.Group className="text-left" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                
                <Button onClick={login} variant="primary" type="submit">Signin</Button>
            </Card>
        </div>
        </>
    );
}

export default Signin;