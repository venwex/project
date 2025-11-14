export default function ErrorBox({ message }) {
  return (
    <div style={{ textAlign: "center", color: "red", margin: "20px" }}>
      Error: {message}
    </div>
  );
}
