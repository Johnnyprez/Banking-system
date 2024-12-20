import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import { useAuth } from "./AuthContext";
import "./styles.css"; // Import the CSS

function Register() {
    const { currentUser } = useAuth();
    const [name, setName] = useState(""); // New state for the name
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    if (currentUser) {
        navigate("/dashboard");
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Create a new user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update the user's profile with the display name
            await updateProfile(user, {
                displayName: name,
            });

            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            {error && <p>{error}</p>}
            <p>
                Already have an account? <a href="/">Login</a>
            </p>
        </div>
    );
}

export default Register;
