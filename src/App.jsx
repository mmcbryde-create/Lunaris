import React, { useState, useEffect } from "react";
import "./App.css";
import LogCard from "./componets/LogCard";

function App() {
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/logs");
      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      }
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newLog.title || !newLog.content) return;

    try {
      const response = await fetch("http://localhost:3000/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLog),
      });

      if (response.ok) {
        setNewLog({ title: "", content: "" });
        fetchLogs();
      }
    } catch (error) {
      console.error("Failed to create log:", error);
    }
  };

  return (
    <div className="container">
      <header style={{ textAlign: "center", marginBottom: "4rem", paddingTop: "2rem" }}>
        <h1>Maceo F. McBryde</h1>
        <p style={{ fontSize: "1.2rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--accent-color)" }}>Developer's Log</p>
      </header>

      <section style={{ marginBottom: "4rem" }}>
        <h2>About Me</h2>
        <div style={{
          background: "rgba(0,0,0,0.2)",
          padding: "2rem",
          borderRadius: "16px",
          marginTop: "1rem",
          borderLeft: "4px solid var(--accent-color)"
        }}>
          <p>
            Hello, my name is <strong style={{ color: "#fff" }}>Maceo McBryde</strong>. I am a driven and passionate
            technologist with a focus on software development, web applications, and
            innovation. I believe in the power of technology to
            create meaningful change and empower others.
          </p>
          <p>
            My journey started through hands-on experiences where I built and designed
            solutions for a real world challenge. Improving digital workflows, charts, and ERD's to
            developing user centered web platforms. I’m currently building my career
            around full-stack development, cloud computing, and systems automation.
          </p>
          <p>
            Beyond code, I’m passionate about improving myself and others, exploring emerging
            tech like AI and data science, and combining creativity with problem-solving
            to push technology forward.
          </p>
        </div>
      </section>

      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2>Latest Logs</h2>
        </div>

        <div style={{ marginBottom: "3rem", background: "rgba(255,255,255,0.03)", padding: "2rem", borderRadius: "16px" }}>
          <h3 style={{ marginBottom: "1rem" }}>Add New Entry</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Log Title"
              value={newLog.title}
              onChange={(e) => setNewLog({ ...newLog, title: e.target.value })}
            />
            <textarea
              rows="4"
              placeholder="What did you learn today?"
              value={newLog.content}
              onChange={(e) => setNewLog({ ...newLog, content: e.target.value })}
            ></textarea>
            <button type="submit" className="btn">Publish Log</button>
          </form>
        </div>

        {loading ? (
          <p>Loading logs...</p>
        ) : (
          <div className="logs-grid">
            {logs.map((log) => (
              <LogCard key={log.id} logtitle={log.title} date={new Date(log.date).toLocaleDateString()}>
                {log.content}
              </LogCard>
            ))}
            {logs.length === 0 && (
              <LogCard logtitle="Welcome!" date={new Date().toLocaleDateString()}>
                No logs found. Create your first entry above!
              </LogCard>
            )}
          </div>
        )}
      </section>

      <footer style={{ textAlign: "center", marginTop: "4rem", padding: "2rem", borderTop: "1px solid var(--card-border)", color: "var(--text-secondary)" }}>
        &copy; 2025 Maceo F. McBryde | Developer's Log | All Rights Reserved
      </footer>
    </div>
  );
}

export default App;
