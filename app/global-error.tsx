"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#F7F5EF", color: "#171A18" }}>
        <div style={{ maxWidth: 480, margin: "120px auto", textAlign: "center", padding: "0 24px" }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: "#17382F" }}>Something went wrong.</h1>
          <p style={{ marginTop: 12, fontSize: 14, color: "#6B716D" }}>
            The team has been notified. Please try again.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: 24,
              padding: "12px 24px",
              borderRadius: 6,
              background: "#17382F",
              color: "#F7F5EF",
              border: "none",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
