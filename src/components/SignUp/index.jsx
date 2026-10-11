import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUpUser } from '../../api/auth';

function SignUp() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        if (formData.password.length < 4) {
            alert("Password must be at least 4 characters.");
            return;
        }
        try {
            const data = await signUpUser(formData);
            if (!data?.id) {
                alert("Error creating account. Please try again.");
                return;
            }
            alert("Sign-up successful! Please log in.");
            navigate("/auth/login");
        } catch (err) {
            alert(err.message);
        }
    };

    const navigate = useNavigate()

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <div className='d-flex justify-center' style={{ padding: "22px" }} >
            <form onSubmit={onFormSubmit} className="bg-white shadow-md w-[400px] rounded-md" style={{ padding: "22px" }}>
                <h2 className="flex justify-center text-3xl">Sign Up</h2>
                {["firstName", "lastName", "email", "password", "confirmPassword"].map((field, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        <span>{field.replace(/([A-Z])/g, " $1")}</span>
                        <input
                            className="border-b-2"
                            type={field.toLowerCase().includes("password") ? "password" : "text"}
                            name={field}
                            value={formData[field]}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                ))}
                <div style={{ margin: "0px 10px" }}>
                    <button type="submit" className="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin">
                        Create New Account </button>
                </div>
                <div className="" style={{ margin: "8px 80px 0px 80px" }}>
                    <button type="button" className="d-flex align-middle hover:cursor-pointer" style={{ alignItems: "center" }} onClick={() => navigate("/auth/login")}> Already have an Account <span className="material-symbols-outlined">
                        chevron_forward
                    </span></button>
                </div>
            </form>
        </div>
    )
}

export default SignUp
