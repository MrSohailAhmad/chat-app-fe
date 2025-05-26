import React from "react";

const AuthLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <div>
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <div
        className="bg-no-repeat bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1951&q=80)",
        }}
      >
        <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0" />

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
