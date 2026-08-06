import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login as loginRequest } from "../../services/auth.service";
import { useAuth } from "../../hooks/useAuth";

export default function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

	const handleSubmit = async (
		e: React.FormEvent
	) => {
		e.preventDefault();

	try {
			setLoading(true);
			setError("");

			const result =
			await loginRequest({
					email,
					password,
			});

			login(
				result.token,
				result.business
			);

			navigate("/dashboard");
	} catch (err: any) {
			setError(
			err?.response?.data?.message ??
					"Login failed."
			);
	} finally {
			setLoading(false);
	}
	};

	return (
  <form onSubmit={handleSubmit}>

    <h1>Business Login</h1>

    {error && <p>{error}</p>}

    <input
      type="email"
      value={email}
      placeholder="Email"
      onChange={(e) =>
        setEmail(e.target.value)
      }
    />

    <input
      type="password"
      value={password}
      placeholder="Password"
      onChange={(e) =>
        setPassword(e.target.value)
      }
    />

    <button
      disabled={loading}
    >
      {loading
        ? "Logging in..."
        : "Login"}
    </button>

  </form>
	);

}