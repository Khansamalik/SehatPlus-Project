import { Link } from "react-router-dom";
import logo from "../../public/logo.png";
import login from "../../public/login.png";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Registration() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll("input");

    let allFilled = true;
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        allFilled = false;
        input.classList.add("border-red-500");
      } else {
        input.classList.remove("border-red-500");
      }
    });

    if (!allFilled) {
      alert("Please fill out all required fields.");
      return;
    }
    // Collect form data
  const data = {
    name: form[0].value,
    contact: form[1].value,
    cnic: form[2].value,
    email: form[3].value,
    password: form[4].value,
  };
   try {
    //  Send POST request to backend
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
     const result = await response.json();

    if (response.ok) {
      alert("Registration successful!");
      navigate("/login");
    } else {
      alert(result.message || "Registration failed.");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Something went wrong. Please try again.");
  }
};

  return (
  <div>
    <div className="h-24"></div>
    <div className="flex min-h-screen items-stretch justify-center font-poppins bg-white py-10">
      {/* Illustration side */}
      <div className="hidden md:flex w-1/2 justify-end pr-8">
        <div className="w-full max-w-md h-full flex">
          <img
            src={login}
            alt="Registration Illustration"
            className="w-full h-full object-contain bg-white rounded-lg shadow-md p-4"
          />
        </div>
      </div>

      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md h-full flex flex-col">
        <div className="flex justify-center mb-6">
          <img src={logo} className="w-32 h-auto rounded" alt="Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1 className="text-center text-2xl font-black mb-6">
            Welcome to Registration Page
          </h1>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter name"
              className="focus:outline-[#6C0B14] border h-10 w-full border-[#6C0B14] rounded px-3"
            />
            <input
              type="text"
              placeholder="Enter contact number"
              className="focus:outline-[#6C0B14] border h-10 w-full border-[#6C0B14] rounded px-3"
            />
            <input
              type="text"
              placeholder="Enter CNIC"
              className="focus:outline-[#6C0B14] border h-10 w-full border-[#6C0B14] rounded px-3"
            />
            <input
              type="email"
              placeholder="Enter email"
              className="focus:outline-[#6C0B14] border h-10 w-full border-[#6C0B14] rounded px-3"
            />
            <input
              type="password"
              placeholder="Enter password"
              className="focus:outline-[#6C0B14] border h-10 w-full border-[#6C0B14] rounded px-3"
            />
          </div>

          <div className="flex flex-col items-center justify-between gap-4 mt-6">
            <div className="text-sm">
              <p>
                Have an account?{" "}
                <Link to="/login" className="text-blue-500 underline">
                  Go to Sign in
                </Link>
              </p>
            </div>

            <button
              type="submit"
              className="border hover:bg-[#58595B] border-gray-300 h-10 w-48 text-white rounded-full bg-[#6C0B14]"
            >
              Sign Up
            </button>

            <div className="mt-8" />
          </div>
        </form>

       
      </div>
    </div>
   <Footer />
    </div>
  );
}
