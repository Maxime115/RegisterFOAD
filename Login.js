import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

export default function Login({ changeView }) {
    const [feedback, setFeedback] = useState({
        message: "",
        color: ""
    });

    const yupSchema = yup.object().shape({
        email: yup
            .string()
            .required("Le champ est obligatoire"),
        password: yup
            .string()
            .required("Le champ est obligatoire")
    });

    const defaultValues = {
        email: "",
        password: ""
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(yupSchema)
    });

    async function submit(values) {
        console.log(values);
        let user = {
            email: values.email,
            password: values.password
        };

        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                const res = await response.json();
                console.log(res);
                reset(defaultValues);
                setFeedback({
                    message: "Connexion réussie redirection en cours...",
                    color: "text-good"
                });
                setTimeout(() => {
                    changeView("homepage");
                }, 3000);
            } else {
                const errorData = await response.json();
                setFeedback({
                    message: errorData.message,
                    color: "text-error"
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="mh100 d-flex flex-column justify-content-center align-items-center">
            <form onSubmit={handleSubmit(submit)}>
                <div className="d-flex flex-column mb20">
                    <label htmlFor="email">Adresse Email</label>
                    <input {...register("email")} type="text" id="email" aria-required="true" />
                    {errors.email && <p className="text-error" role="alert">{errors.email.message}</p>}
                    <br />
                    <label htmlFor="password">Mot de passe</label>
                    <input {...register("password")} type="password" id="password" aria-required="true" />
                    {errors.password && <p className="text-error" role="alert">{errors.password.message}</p>}
                    <br />

                    <button type="submit" className="btn btn-primary" aria-label="Login">Login</button>
                </div>
            </form>
        </div>
    );
}
