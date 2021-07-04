import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Header from "./Header";

function Signup() {

    useEffect(() => {
        if (localStorage.getItem("user_info")) {
            history.push("/add");
        }
    });
    
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    async function register(e) {
        
        e.preventDefault();
        let data = { name, username, email, password };
        const url = "http://127.0.0.1:8000/api/signup";
        let result = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data),
        });

        result = await result.json();
        localStorage.setItem("user_info", JSON.stringify(result));
        history.push("/add");
    }

    return (
        <>
        <Header />
        <div className="col-sm-4 offset-sm-4 my-3">
            <Card className="p-5">
                <h3>Signup</h3>
                <Form.Group className="text-left" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="text-left" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group className="text-left" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                
                <Form.Group className="text-left" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                
                <Button onClick={register} variant="primary" type="submit">Signup</Button>
            </Card>
        </div>
        </>
    );
}

export default Signup;