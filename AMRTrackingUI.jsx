import React, { useState } from "react";

export default function AMRTrackingUI() {
  const [form, setForm] = useState({
    drug: "",
    dose: "",
    animal: "",
    species: "",
  });
  const [alert, setAlert] = useState(null);
  const [usageHistory, setUsageHistory] = useState([]);

  const WHO_LIMITS = {
    penicillin: { max: 500, min: 100 },
    amoxicillin: { max: 600, min: 150 },
    tetracycline: { max: 400, min: 100 },
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { drug, dose } = form;
    const limit = WHO_LIMITS[drug.toLowerCase()];
    let status = "GREEN";
    let message = "Within safe dose limits.";

    if (!limit) {
      status = "AMBER";
      message = "No WHO guideline found.";
    } else if (dose > limit.max) {
      status = "RED";
      message = "Dose exceeds WHO recommendation.";
    } else if (dose < limit.min) {
      status = "AMBER";
      message = "Dose below WHO minimum.";
    }

    const newAlert = {
      status,
      message,
      drug,
      dose,
      date: new Date().toLocaleString(),
    };
    setAlert(newAlert);
    setUsageHistory([newAlert, ...usageHistory]);
  };

  const getAlertColor = (status) => {
    if (status === "RED") return "#f8d7da";
    if (status === "AMBER") return "#fff3cd";
    return "#d4edda";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f2f2f2", padding: "40px" }}>
      <h1
        style={{ textAlign: "center", fontSize: "28px", marginBottom: "30px" }}
      >
        AMR Tracking System (Prototype)
      </h1>

      <div
        style={{
          background: "#fff",
          maxWidth: "400px",
          margin: "0 auto",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 8px rgba(0,0,0,0.1)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            name="drug"
            placeholder="Enter drug name"
            value={form.drug}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <input
            name="dose"
            type="number"
            placeholder="Enter dose (mg)"
            value={form.dose}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <input
            name="animal"
            placeholder="Animal ID or name"
            value={form.animal}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <input
            name="species"
            placeholder="Species (e.g., Cow, Chicken)"
            value={form.species}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Check AMR Risk
          </button>
        </form>
      </div>

      {alert && (
        <div
          style={{
            background: getAlertColor(alert.status),
            maxWidth: "400px",
            margin: "20px auto",
            padding: "20px",
            textAlign: "center",
            borderRadius: "8px",
          }}
        >
          <h2>{alert.status} ALERT</h2>
          <p>{alert.message}</p>
        </div>
      )}

      <div style={{ maxWidth: "600px", margin: "40px auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Recent Usage Records
        </h2>
        {usageHistory.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>No records yet.</p>
        ) : (
          usageHistory.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                marginBottom: "10px",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              }}
            >
              <p>
                <strong>Drug:</strong> {item.drug}
              </p>
              <p>
                <strong>Dose:</strong> {item.dose} mg
              </p>
              <p>
                <strong>Status:</strong> {item.status}
              </p>
              <p style={{ fontSize: "12px", color: "#888" }}>{item.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
