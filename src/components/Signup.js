import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
    const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = credentials;
        const response = await fetch("http://localhost:8005/auth/signup", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password })
        });
        const json = await response.json();
      
        if (json.success) {
            // Save authToken and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert('success', 'SignUp Successful!');
        } else {
            props.showAlert('danger',json.msg)
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className="container text-center my-4">
                <h1 className="fw-bold">Unlock Your Productivity: Sign Up and Start Organizing Your Tasks</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-3" style={{ width: '50%' }}>
                    <label htmlFor="Username" className="form-label">Username</label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        id="Username"
                        name="username"
                        minLength={3}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3" style={{ width: '50%' }}>
                    <label htmlFor="Email" className="form-label">Email address</label>
                    <input
                        type="email"
                        required
                        className="form-control"
                        id="Email"
                        name="email"
                        aria-describedby="emailHelp"
                        onChange={onChange}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3" style={{ width: '50%' }}>
                    <label htmlFor="Password" className="form-label">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            onChange={onChange}
                            className="form-control"
                            id="Password"
                            required
                            minLength={6}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={togglePasswordVisibility}
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? (
                                <i className="fa fa-eye-slash"></i>
                            ) : (
                                <i className="fa fa-eye"></i>
                            )}
                        </button>
                    </div>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
                    <label className="form-check-label" htmlFor="exampleCheck1">Let's go!</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Signup;
