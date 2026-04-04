import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";

const Tasks = () => {
  const [plans, setPlans] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [loadingSubs, setLoadingSubs] = useState(false);

  const fetchPlans = async () => {
    try {
      setLoadingPlans(true);
      const res = await axiosInstance.get("/api/plans");
      console.log("PLANS RESPONSE:", res.data);
      setPlans(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("FETCH PLANS ERROR:", error.response?.data || error.message);
      alert("Failed to load plans");
    } finally {
      setLoadingPlans(false);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      setLoadingSubs(true);
      const res = await axiosInstance.get("/api/subscriptions");
      console.log("SUBSCRIPTIONS RESPONSE:", res.data);
      setSubscriptions(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("FETCH SUBSCRIPTIONS ERROR:", error.response?.data || error.message);
      alert("Failed to load subscriptions");
    } finally {
      setLoadingSubs(false);
    }
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      return alert("Please select a plan");
    }

    try {
      const res = await axiosInstance.post("/api/subscriptions", {
        plan: selectedPlan,
      });

      console.log("CREATE SUBSCRIPTION RESPONSE:", res.data);
      alert("Subscription successful");
      fetchSubscriptions();
    } catch (error) {
      console.error("CREATE SUBSCRIPTION ERROR:", error.response?.data || error.message);
      alert("Subscription failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/subscriptions/${id}`);
      fetchSubscriptions();
    } catch (error) {
      console.error("DELETE SUBSCRIPTION ERROR:", error.response?.data || error.message);
      alert("Failed to cancel subscription");
    }
  };

  useEffect(() => {
    fetchPlans();
    fetchSubscriptions();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">
        Subscription Management
      </h1>

      <div className="mb-6">
        <select
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="">Select a Plan</option>
          {plans.map((plan) => (
            <option key={plan._id} value={plan._id}>
              {plan.name} - ${plan.price}
            </option>
          ))}
        </select>

        {loadingPlans && <p className="mb-2">Loading plans...</p>}
        {!loadingPlans && plans.length === 0 && (
          <p className="mb-2 text-red-600">No plans found. Create plans first.</p>
        )}

        <button
          onClick={handleSubscribe}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Subscribe
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">My Subscriptions</h2>

        {loadingSubs && <p>Loading subscriptions...</p>}
        {!loadingSubs && subscriptions.length === 0 && <p>No subscriptions yet</p>}

        {subscriptions.map((sub) => (
          <div key={sub._id} className="border p-4 mb-3 rounded shadow">
            <p>
              <strong>Plan:</strong> {sub.plan?.name || "Unknown plan"}
            </p>
            <p>
              <strong>Status:</strong> {sub.status}
            </p>

            <button
              onClick={() => handleDelete(sub._id)}
              className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;