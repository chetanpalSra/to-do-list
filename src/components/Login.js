import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8005/auth/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });

        const json = await response.json();

        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate('/');
            props.showAlert('success','Login Successful!');
        }
        else {
            props.showAlert( "danger","Invalid Credentials or this account doesn't exists.");
        }
    };
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className="container text-center my-4">
                <h1 className="fw-bold">Unlock Your Productivity: Log in and Start Organizing Your Tasks</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-3" style={{ width: '50%' }}>
                    <label htmlFor="Email" className="form-label">Email address</label>
                    <input type="email" required className="form-control" id="Email" name="email" aria-describedby="emailHelp" onChange={onChange} />
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
              
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
};

export default Login
