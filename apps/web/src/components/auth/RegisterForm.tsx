import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import type { RegisterRequest } from "../../types/api/auth";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<RegisterRequest>({
    name: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    pincode: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await authService.register(form);

      localStorage.setItem("token", result.token);

      navigate("/dashboard");
    } catch (error: any) {
      setError( error?.response?.data?.message ?? "Registration failed." );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm"
    >
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900">
          Register your business
        </h1>

        <p className="mt-3 text-slate-500">
          Join DiscoverDisco and start promoting your
          offers to customers nearby.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Field
          label="Business Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="ABC Stationery"
        />

        <Field
          label="Owner Name"
          name="ownerName"
          value={form.ownerName}
          onChange={handleChange}
          placeholder="Ajay Aggarwal"
        />

        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="abc@gmail.com"
        />

        <Field
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="9876543210"
        />

        <Field
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
        />

        <Field
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Shop No. 12"
        />

        <Field
          label="Locality"
          name="locality"
          value={form.locality}
          onChange={handleChange}
          placeholder="Dwarka Sector 10"
        />

        <Field
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="New Delhi"
        />

        <Field
          label="State"
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="Delhi"
        />

        <Field
          label="Pincode"
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
          placeholder="110075"
        />

      </div>

      {
        error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
        </div>
        )
      }

      <button
        type="submit"
        disabled={loading}
        className="mt-10 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 py-4 text-lg font-semibold text-white transition hover:scale-[1.01] hover:shadow-lg disabled:opacity-50"
      >
        {loading
          ? "Creating your account..."
          : "Register Business"}
      </button>

      <p className="mt-8 text-center text-slate-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-orange-600 hover:text-orange-700"
        >
          Login
        </Link>
      </p>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  type?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function Field({
  label,
  name,
  value,
  placeholder,
  onChange,
  type = "text",
}: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        required
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
      />
    </div>
  );
}