import { useLogin } from "../../context/login-context";
import { userLogin } from "../../api/auth"
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { loginDispatch, email, password, token } = useLogin();
    const navigate = useNavigate();

    const onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await userLogin(email, password);
            if (!data?.access_token) {
                alert("Unable to log in. Please try again.");
                return;
            }
            localStorage.setItem("token", data.access_token);
            loginDispatch({
                type: "TOKEN",
                payload: {
                    token: data
                }
            });
            navigate('/');
        } catch (err) {
            alert(err.message);
        }
    }

    const onEmailChange = (e) => {
        loginDispatch({
            type: 'EMAIL',
            payload: {
                value: e.target.value
            }
        });
    };

    const onPasswordChange = (e) => {
        loginDispatch({
            type: 'PASSWORD',
            payload: {
                value: e.target.value
            }
        });
    };

    return (
        <form onSubmit={onFormSubmit} className="bg-white shadow-md w-[400px] rounded-md" style={{ padding: "22px" }}>
            <h2 className="flex justify-center text-3xl">Login</h2>
            <div className="flex flex-col gap-2">
                <span className="">Email *</span>
                <input className="border-b-2" type="email" required placeholder="john@mail.com" onChange={onEmailChange}></input>
            </div>
            <div className="flex flex-col gap-2">
                <span>Password *</span>
                <input className="border-b-2" type="password" required placeholder="changeme" onChange={onPasswordChange}></input>
            </div>
            <p className="text-sm text-gray-500" style={{ marginTop: "8px" }}>
                Demo login: john@mail.com / changeme
            </p>
            <div style={{ margin: "0px 10px" }}>
                <button type="submit" className="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin">
                    Login </button>
            </div>
            <div className="" style={{ margin: "8px 80px 0px 80px" }}>
                <button type="button" className="d-flex align-middle hover:cursor-pointer" onClick={()=>navigate("/auth/signup")}> Create New Account <span className="material-symbols-outlined">
                    chevron_forward
                </span></button>
            </div>
        </form>
    )
}