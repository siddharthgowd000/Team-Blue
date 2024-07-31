import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../url';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState(''); // New state for fullname
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    setMsg(''); // Clear any previous messages
    try {
      // Log the payload to ensure it's correct
      console.log('Sending signup request with payload:', {
        username,
        email,
        fullname,
        password
      });

      const response = await axios.post(`${API_URL}/signup`, {
        username,
        email,
        fullname,
        password
      });

      if (response.status === 201) {
        navigate('/dashboard');
      } else if (response.status === 400) {
        setMsg(response.data.message || 'Invalid request');
      }
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      if (error.response?.data?.message) {
        setMsg(error.response.data.message);
      } else {
        setMsg('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="fullname" className="block text-gray-700 mb-2">Full Name:</label>
          <input
            id="fullname"
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email ID:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {msg && (
          <div className="mb-4 text-center">
            <p className="text-red-500">{msg}</p>
          </div>
        )}
        <div className="mb-4 text-center">
          <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleSignup}
            className="bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-800 transition duration-200"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => navigate('/signin')}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;





// import React, { useState } from 'react';
// import axios from 'axios';
// const Signup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://127.0.0.1:5000/signup', {
//         username,
//         email,
//         password
//       });
//       if(response.data.code===201){
        
//       }
//     } catch (error) {
//       console.error('signup error:', error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-grey-600">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center mb-6">sign up</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Name:</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Email id:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 mb-2">Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4 text-center">
//             <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
//           </div>
//           <div className="flex justify-between">
//             <button
//               type="submit"
//               className="bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-800 transition duration-200"
//             >
//               sign up
//             </button>
//             <button
//               type="button" // Change to type="button" to prevent form submission
//               onClick={() => { window.location.href = '/Signin'; }} // Navigate programmatically
//               className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;




