import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";

const AdminDashboard = () => {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: "monthly",
    features: "",
  });

  const fetchPlans = async () => {
    try {
      const res = await axiosInstance.get("/api/plans");
      setPlans(res.data);
    } catch (error) {
      console.error("ADMIN FETCH PLANS ERROR:", error);
      alert("Failed to load plans");
    }
  };

  const handleCreate = async () => {
    if (!form.name || !form.price) {
      return alert("Name and price are required");
    }

    try {
      await axiosInstance.post("/api/plans", {
        name: form.name,
        price: Number(form.price),
        duration: form.duration,
        features: form.features
          ? form.features.split(",").map((f) => f.trim())
          : [],
      });

      setForm({
        name: "",
        price: "",
        duration: "monthly",
        features: "",
      });

      fetchPlans();
    } catch (error) {
      console.error("ADMIN CREATE PLAN ERROR:", error.response?.data || error.message);
      alert("Failed to create plan");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/plans/${id}`);
      fetchPlans();
    } catch (error) {
      console.error("ADMIN DELETE PLAN ERROR:", error.response?.data || error.message);
      alert("Failed to delete plan");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="mb-6 p-4 border rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Create Plan</h2>

        <input
          type="text"
          placeholder="Plan name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />

        <select
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <input
          type="text"
          placeholder="Features (comma separated)"
          value={form.features}
          onChange={(e) => setForm({ ...form, features: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />

        <button
          onClick={handleCreate}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Create Plan
        </button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Existing Plans</h2>

        {plans.map((plan) => (
          <div key={plan._id} className="border p-4 mb-3 rounded shadow">
            <p>
              <strong>{plan.name}</strong> - ${plan.price} ({plan.duration})
            </p>

            {plan.features?.length > 0 && (
              <ul className="list-disc ml-5 mt-2">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            )}

            <button
              onClick={() => handleDelete(plan._id)}
              className="bg-red-500 text-white px-3 py-1 mt-3 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;