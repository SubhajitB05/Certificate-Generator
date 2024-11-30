import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../../features/auth/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Certificate from '../../assets/Cert.jpeg';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const GenerateCertificate = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const certRef = useRef(null);
  const { isAuthenticated, token} = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutSuccess()); // Use logout action from Redux
    toast.success("Logout Successful");
    navigate("/login");
  };

  const [cert, setCert] = useState({
    name: "",
    email: "",
    course: "",
    date: "",
    certificateHTML: null,
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCert({ ...cert, [name]: value });
  };
  const handleGenerateCertificate = (e) => {
    e.preventDefault();

    const input = certRef.current;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png'); // Convert canvas to image

      // Get the dimensions of the captured HTML element
      const imgWidth = canvas.width; // Width of the canvas
      const imgHeight = canvas.height; // Height of the canvas

      // Create PDF with the exact same dimensions as the captured HTML element
      const pdf = new jsPDF({
        orientation: imgWidth > imgHeight ? 'landscape' : 'portrait', // Landscape or Portrait based on dimensions
        unit: 'px',
        format: [imgWidth, imgHeight], // Set the PDF size to the same as the captured element
      });

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight); // Add image to PDF
      pdf.save('certificate.pdf'); // Download the PDF
    })

  //   if(!isAuthenticated){
  //     navigate('/login');
  //     return;
  //   }
  //   if(token){
  //   axios.post('/generate-certificate', {...cert, certificateHTML: JSON.stringify(certRef.current.outerHTML)}, {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //       }
  //   })
  //   .then(({data})=>{
  //     console.log(data);
  //   })
  //   .catch(err=>{
  //     console.log(err);
  //   })
  //   setCert({
  //     name: "",
  //     email: "",
  //     course: "",
  //     date: "",
  //     certificateHTML:null,
  //   })
  // }
  };

  return (
    <div>
      <div className="menubar absolute py-6 top-0 w-[100vw] left-0">
        <ul className="flex justify-evenly">
          <li>
            <Link>Generate Certificate</Link>
          </li>
          <li>
            <Link>Manage Certificate</Link>
          </li>
          <li>
            <Link>Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
      <div className="flex justify-between items-center gap-16">
        <div>
          <h1 className="text-5xl mb-4">Generate Certificate</h1>

          <form
            onSubmit={handleGenerateCertificate}
            className="border p-4 min-w-[380px] rounded"
          >
            <div className="mb-4 flex flex-col">
              <label className="mb-2">Name</label>
              <input
                type="text"
                name="name"
                className="bg-transparent border h-[35px] px-2 rounded"
                onChange={handleInputChange}
                value={cert.name}
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="bg-transparent border h-[35px] px-2 rounded"
                onChange={handleInputChange}
                value={cert.email}
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="mb-2">Course</label>
              <input
                type="text"
                name="course"
                className="bg-transparent border h-[35px] px-2 rounded"
                onChange={handleInputChange}
                value={cert.course}
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="mb-2">Date</label>
              <input
                type="date"
                name="date"
                className="bg-transparent border h-[35px] px-2 rounded"
                onChange={handleInputChange}
                value={cert.date}
                required
              />
            </div>
            <button
              type="submit"
              className="btn bg-green-600 w-full p-2 rounded hover:bg-green-700 transition-all"
            >
              Generate
            </button>
          </form>
        </div>
        <div className="cert-container relative border p-4">
          <h4 className="">Preview</h4>
          <div ref={certRef}>
          <img src={Certificate} alt="Cert" width={700}/>
          <div className="cert-content absolute top-52 left-80 text-black">
            <h1 className="text-4xl font-mono">{cert.name}</h1>
            <p className="mt-4">Course: {cert.course}</p>
            <span>Date: {cert.date}</span>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateCertificate;
