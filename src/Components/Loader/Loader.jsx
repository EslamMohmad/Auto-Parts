import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loader = () => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "rgba(255,255,255,0.95)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      width: "100vw",
    }}
  >
    <FontAwesomeIcon
      icon="fa-solid fa-circle-notch"
      style={{
        fontSize: "3rem",
        color: "#007bff",
        animation: "spin 1s linear infinite",
      }}
    />

    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}
    </style>
  </div>
);

export default Loader;
