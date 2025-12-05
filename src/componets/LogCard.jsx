import React from "react";

export default function LogCard({ logtitle, date, children }) {
    return (
        <div className="log-card" style={{
            background: "var(--card-bg)",
            backdropFilter: "blur(10px)",
            border: "1px solid var(--card-border)",
            borderRadius: "16px",
            padding: "1.5rem",
            marginBottom: "1.5rem",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer"
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
                e.currentTarget.style.background = "var(--card-hover-bg)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background = "var(--card-bg)";
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ margin: 0, fontSize: "1.5rem", color: "#fff" }}>{logtitle}</h3>
                {date && <span style={{
                    fontSize: "0.9rem",
                    color: "var(--accent-color)",
                    background: "rgba(127, 90, 240, 0.1)",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "20px"
                }}>{date}</span>}
            </div>
            <div className="log-content" style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>{children}</div>
        </div>
    );
}
