export default function Circle({ circle, onClick, isFading }) {
  const R = 24;

  return (
    <div
      onClick={() => onClick(circle.id)}
      style={{
        position: "absolute",
        width: R * 2,
        height: R * 2,
        left: circle.x - R,
        top: circle.y - R,
        borderRadius: "50%",
        border: "2px solid #FF9500",
        background: `linear-gradient(135deg, #FF6B6B 0%, #FF9500 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none",
        opacity: isFading ? 0 : 1,
        transition:
          "opacity 0.85s ease, transform 0.2s ease, box-shadow 0.2s ease",
        pointerEvents: isFading ? "none" : "auto",
        boxShadow: "0 4px 12px rgba(255, 107, 107, 0.5)",
        transform: "scale(1)",
      }}
      onMouseEnter={(e) => {
        if (!isFading) {
          e.currentTarget.style.transform = "scale(1.15)";
          e.currentTarget.style.boxShadow =
            "0 6px 16px rgba(255, 107, 107, 0.7)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isFading) {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow =
            "0 4px 12px rgba(255, 107, 107, 0.5)";
        }
      }}
    >
      <span style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>
        {circle.id}
      </span>
    </div>
  );
}
