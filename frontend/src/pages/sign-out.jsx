import { useNavigate } from "react-router-dom";

function SignOutButton() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    const confirmSignOut = window.confirm("Are you sure you want to sign out?");
    if (!confirmSignOut) return;
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <button onClick={handleSignOut} style={{ backgroundColor: 'red', color: 'white', padding: '6px 12px' }}>
      Sign Out
    </button>
  );
}

export default SignOutButton;
