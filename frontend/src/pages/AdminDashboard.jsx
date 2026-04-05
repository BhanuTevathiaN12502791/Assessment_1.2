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
      console.error(
        "ADMIN CREATE PLAN ERROR:",
        error.response?.data || error.message
      );
      alert("Failed to create plan");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/plans/${id}`);
      fetchPlans();
    } catch (error) {
      console.error(
        "ADMIN DELETE PLAN ERROR:",
        error.response?.data || error.message
      );
      alert("Failed to delete plan");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Create and manage subscription plans
        </p>
      </div>

      {/* CREATE PLAN */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Create New Plan
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Plan name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <select
            value={form.duration}
            onChange={(e) =>
              setForm({ ...form, duration: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          <input
            type="text"
            placeholder="Features (comma separated)"
            value={form.features}
            onChange={(e) =>
              setForm({ ...form, features: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <button
          onClick={handleCreate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition"
        >
          Create Plan
        </button>
      </div>

      {/* PLANS LIST */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Existing Plans
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {plan.name}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  ${plan.price} / {plan.duration}
                </p>

                {plan.features?.length > 0 && (
                  <ul className="mt-3 space-y-1 text-sm text-gray-600">
                    {plan.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                onClick={() => handleDelete(plan._id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;