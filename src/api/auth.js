import axios from "axios";

const API_URL = "https://api.escuelajs.co/api/v1";

const getAuthErrorMessage = (err, fallback) => {
    const status = err?.response?.status;
    const apiMessage = err?.response?.data?.message;

    if (status === 401) {
        return "Invalid email or password.";
    }
    if (Array.isArray(apiMessage)) {
        return apiMessage.join(", ");
    }
    if (typeof apiMessage === "string") {
        return apiMessage;
    }
    return fallback;
};

export const userLogin = async (email, password) => {
    try {
        const { data } = await axios.post(`${API_URL}/auth/login`, {
            email,
            password,
        });
        return data;
    } catch (err) {
        throw new Error(getAuthErrorMessage(err, "Unable to log in. Please try again."));
    }
};

export const signUpUser = async (formData) => {
    try {
        const { data } = await axios.post(`${API_URL}/users/`, {
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            password: formData.password,
            avatar: "https://i.imgur.com/LDOO4Qs.jpg",
        });
        return data;
    } catch (err) {
        throw new Error(getAuthErrorMessage(err, "Unable to create account. Please try again."));
    }
};
