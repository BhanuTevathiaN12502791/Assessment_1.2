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
      setPlans(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      alert("Failed to load plans");
    } finally {
      setLoadingPlans(false);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      setLoadingSubs(true);
      const res = await axiosInstance.get("/api/subscriptions");
      setSubscriptions(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
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
      await axiosInstance.post("/api/subscriptions", {
        plan: selectedPlan,
      });
      alert("Subscription successful");
      fetchSubscriptions();
    } catch (error) {
      alert("Subscription failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/subscriptions/${id}`);
      fetchSubscriptions();
    } catch (error) {
      alert("Failed to cancel subscription");
    }
  };

  useEffect(() => {
    fetchPlans();
    fetchSubscriptions();
  }, []);

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Subscription Management
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your active subscriptions and plans
        </p>
      </div>

      {/* SUBSCRIBE SECTION */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 border border-gray-100">

        <div>
          <label className="text-sm text-gray-500 block mb-1">
            Select a plan
          </label>

          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select a Plan</option>
            {plans.map((plan) => (
              <option key={plan._id} value={plan._id}>
                {plan.name} - ${plan.price}
              </option>
            ))}
          </select>
        </div>

        {/* STATES */}
        {loadingPlans && (
          <p className="text-sm text-gray-500">Loading plans...</p>
        )}

        {!loadingPlans && plans.length === 0 && (
          <p className="text-sm text-red-500">
            No plans found. Create plans first.
          </p>
        )}

        <button
          onClick={handleSubscribe}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition w-full"
        >
          Subscribe
        </button>
      </div>

      {/* SUBSCRIPTIONS */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          My Subscriptions
        </h2>

        {loadingSubs && (
          <p className="text-gray-500">Loading subscriptions...</p>
        )}

        {!loadingSubs && subscriptions.length === 0 && (
          <p className="text-gray-500 text-sm">
            No subscriptions yet. Start by selecting a plan above.
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {subscriptions.map((sub) => (
            <div
              key={sub._id}
              className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center border border-gray-100 hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {sub.plan?.name || "Unknown plan"}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Status:{" "}
                  <span
                    className={`capitalize font-medium ${
                      sub.status === "active"
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {sub.status}
                  </span>
                </p>
              </div>

              <button
                onClick={() => handleDelete(sub._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;