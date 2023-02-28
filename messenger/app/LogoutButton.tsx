"use client";
const LogoutButton = () => {
  return (
    <button
      onClick={() => {
        console.log("ss");
      }}
      className="py-3 px-6 bg-blue-400 rounded text-white"
    >
      SignOut
    </button>
  );
};

export default LogoutButton;
