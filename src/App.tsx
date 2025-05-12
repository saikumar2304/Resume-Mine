import React, { useState ,useEffect} from 'react';
import { Github, Linkedin, Mail, Phone, Download, Menu, X, ExternalLink, Code, Briefcase, GraduationCap, Award, User ,Moon, Sun} from 'lucide-react';
import avatar from './A_professional-looking_cartoon_avatar_of_a_young_m.png';
import CodingStats from "./CodingStats";
import CustomCursor from "./CustomCursor";
// import ContactForm from "./ContactForm";
import { CheckCircle } from "lucide-react";
import emailjs from "emailjs-com";
import { supabase } from "./supabaseClient";
import ReactionBar from "./ReactionBar";



function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const [stormMode, setStormMode] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "d") {
        setStormMode((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Thunder sound effect and shake when stormMode is activated
  useEffect(() => {
    if (stormMode) {
      const audio = new Audio("/thunder.mp3");
      audio.volume = 0.5;
      audio.play();
      document.body.classList.add("shake");
      setTimeout(() => document.body.classList.remove("shake"), 500);
    }
  }, [stormMode]);

  // Auto-disable stormMode after 15 seconds
  useEffect(() => {
    if (stormMode) {
      const timer = setTimeout(() => setStormMode(false), 15000);
      return () => clearTimeout(timer);
    }
  }, [stormMode]);

  const [downloadCount, setDownloadCount] = useState(0);

  // Page Views Counter State
  const [pageViews, setPageViews] = useState(0);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("Sending...");

  emailjs.send(
    "service_uajnzv6",  // ✅ EmailJS Service ID
    "template_4euaga9", // ✅ Contact Form Template ID
    {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    },
    "fYnLpUSg3a5bPuccA"  // ✅ Public Key
  )
  .then(() => {
    setStatus("");
    setShowSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
    setFormData({ name: "", email: "", message: "" });

    // ✅ Sending Auto-Reply to User
    emailjs.send(
      "service_uajnzv6",
      "template_go98314", // ✅ Auto-Reply Template ID
      {
        to_name: formData.name,
        to_email: formData.email,
      },
      "fYnLpUSg3a5bPuccA"
    );
  })
  .catch(() => setStatus("Failed to send message. Try again later."));
};

useEffect(() => {
  const savedCount = localStorage.getItem("resumeDownloads");
  setDownloadCount(savedCount ? parseInt(savedCount) : 0);
}, []);

const handleDownload = async () => {
  const newCount = downloadCount + 1;
  setDownloadCount(newCount);
  localStorage.setItem("resumeDownloads", newCount);

  try {
    const { error } = await supabase.from("resume_downloads").insert({});
  } catch (error) {
    console.error("Error logging resume download:", error);
  }
};

  const [commitCount, setCommitCount] = useState(0);

useEffect(() => {
  const fetchGitHubCommits = async () => {
    try {
      const response = await fetch("https://api.github.com/users/saikumar2304/events");
      const data = await response.json();

      // Filter push events (commits)
      const commitEvents = data.filter(event => event.type === "PushEvent");
      const totalCommits = commitEvents.reduce((acc, event) => acc + event.payload.commits.length, 0);

      setCommitCount(totalCommits);
    } catch (error) {
      console.error("Error fetching commit count:", error);
    }
  };

  fetchGitHubCommits();
}, []);

useEffect(() => {
  const fetchPageViews = async () => {
    const { count, error } = await supabase
      .from("page_visits")
      .select("*", { count: "exact", head: true });
    if (!error) setPageViews(count || 0);
  };
  const logVisit = async () => {
    const { error } = await supabase.from("page_visits").insert({});
    if (error) console.error("Error logging page visit:", error);
  };
  logVisit();
  fetchPageViews();
  const interval = setInterval(fetchPageViews, 10000);
  return () => clearInterval(interval);
}, []);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    
    <div className={`min-h-screen dark bg-slate-900 text-white ${stormMode ? "storm-active" : ""}`}>
      <CustomCursor />
      {/* Navigation */}
      <nav className="fixed w-full bg-slate-800 shadow-sm z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 font-bold text-xl text-indigo-600">
              SK
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <a href="#home" className="text-slate-300 hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors duration-300">Home</a>
                <a href="#about" className="text-slate-300 hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors duration-300">About</a>
                <a href="#experience" className="text-slate-300 hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors duration-300">Experience</a>
                <a href="#education" className="text-slate-300 hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors duration-300">Education</a>
                <a href="#contact" className="text-slate-300 hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors duration-300">Contact</a>
                <a 
                  onClick={handleDownload} 
                  href="/resume.pdf" 
                  download 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition flex items-center"
                >
                  <Download size={16} className="mr-2" /> Resume ({downloadCount})
                </a>
                {/* 🌙 Dark Mode Toggle
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all"
                >
                  {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-800" />}
                </button> */}
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-indigo-400 dark:hover:text-indigo-400 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a 
                href="#home" 
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-indigo-400 dark:hover:text-indigo-400 hover:bg-slate-900"
                onClick={toggleMenu}
              >
                Home
              </a>
              <a 
                href="#about" 
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-indigo-400 dark:hover:text-indigo-400 hover:bg-slate-900"
                onClick={toggleMenu}
              >
                About
              </a>
              <a 
                href="#experience" 
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-indigo-400 dark:hover:text-indigo-400 hover:bg-slate-900"
                onClick={toggleMenu}
              >
                Experience
              </a>
              <a 
                href="#education" 
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-indigo-400 dark:hover:text-indigo-400 hover:bg-slate-900"
                onClick={toggleMenu}
              >
                Education
              </a>
              <a 
                href="#contact" 
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-indigo-400 dark:hover:text-indigo-400 hover:bg-slate-900"
                onClick={toggleMenu}
              >
                Contact
              </a>
              <a 
                href="#" 
                className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700 mt-4 flex items-center"
                onClick={toggleMenu}
              >
                <Download size={16} className="mr-2" /> Resume
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                <span className="text-indigo-600">Sai</span> Kumar
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-slate-400 mb-6">Software Developer</h2>
              <p className="text-slate-400 mb-8 max-w-lg leading-relaxed">
                I build exceptional digital experiences with a focus on performance, accessibility, and user satisfaction. Let's create something amazing together.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#contact" 
                  className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 shadow-sm"
                >
                  Get in Touch
                </a>
                <a 
                  href="#experience" 
                  className="border border-slate-600 text-slate-300 px-6 py-3 rounded-md hover:border-indigo-600 hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors duration-300"
                >
                  View My Work
                </a>
              </div>
              <div className="flex mt-8 space-x-4">
                <a href="https://github.com/saikumar2304" className="text-slate-400 hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors duration-300">
                  <Github size={22} />
                </a>
                <a href="www.linkedin.com/in/saikumar2304" className="text-slate-400 hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors duration-300">
                  <Linkedin size={22} />
                </a>
                <a href="mailto:saikumar2304@gmail.com" className="text-slate-400 hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors duration-300">
                  <Mail size={22} />
                </a>
              </div>
              {/* Page Views Badge */}
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-full shadow-md text-sm text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405M15 17l-3-3m3 3l3 3m-6-6V5a1 1 0 00-2 0v6m0 0L9 8m3 3l3-3" />
                </svg>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 animate-gradient font-semibold">
                  {pageViews} Total Page Views
                </span>
              </div>
            </div>
            <div className="hidden md:block md:w-2/5">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-600 rounded-lg transform rotate-6"></div>
                <img 
                  src={avatar}
                  alt="Sai Kumar" 
                  className="relative z-10 rounded-lg shadow-xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
<section id="about" className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-800">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Section Heading */}
    <div className="max-w-3xl mx-auto text-center mb-16">
      <h2 className="text-4xl font-extrabold text-white mb-4">About Me</h2>
      <div className="h-1 w-24 bg-indigo-600 mx-auto mb-6"></div>
      <p className="text-lg text-slate-300 leading-relaxed">
        A passionate **Full Stack Developer** with a love for building scalable and user-friendly applications.  
        I specialize in **React, Node.js, and cloud-based architectures** and enjoy crafting high-performance experiences. 🚀
      </p>
    </div>

      {/* About Me Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      
      {/* Personal Details */}
      <div className={`bg-slate-800 rounded-lg p-8 shadow-lg border-l-4 border-indigo-600${stormMode ? " storm-pulse" : ""}`}>
        <div className="flex items-center mb-4">
          <User size={28} className="text-indigo-600 mr-3" />
          <h3 className="text-2xl font-semibold text-white">Personal Info</h3>
        </div>
        <ul className="text-slate-300 space-y-3">
          <li><strong>Name:</strong> Sai Kumar</li>
          <li><strong>Location:</strong> Hyderabad, India</li>
          <li><strong>Email:</strong> <a href="mailto:saikumar2304@gamil.com" className="text-indigo-400">saikumar2304@gmail.com</a></li>
          <li><strong>Languages:</strong> English, Telugu</li>
        </ul>
      </div>

      {/* Skills Section */}
      <div className={`bg-slate-800 rounded-lg p-8 shadow-lg border-l-4 border-indigo-600${stormMode ? " storm-pulse" : ""}`}>
        <div className="flex items-center mb-4">
          <Code size={28} className="text-indigo-600 mr-3" />
          <h3 className="text-2xl font-semibold text-white">Technical Skills</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {["JavaScript", "TypeScript", "React", "Node.js", "MongoDB", "AWS", "Express.js", "Tailwind CSS"].map(skill => (
            <span key={skill} className="bg-indigo-900 text-indigo-200 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>

    

    {/* Fun Facts & Achievements */}
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className={`bg-slate-800 p-6 rounded-lg shadow-lg border-t-4 border-indigo-600 text-center${stormMode ? " storm-pulse" : ""}`}>
        <Award size={40} className="text-indigo-600 mx-auto mb-3" />
        <h3 className="text-2xl font-semibold text-white">3+ Years</h3>
        <p className="text-slate-400 text-sm">Coding Experience</p>
      </div>
      <div className={`bg-slate-800 p-6 rounded-lg shadow-lg border-t-4 border-indigo-600 text-center${stormMode ? " storm-pulse" : ""}`}>
        <Github size={40} className="text-indigo-600 mx-auto mb-3" />
        <h3 className="text-2xl font-semibold text-white">{commitCount}+ Commits</h3>
        <p className="text-slate-400 text-sm">Open-source contributions</p>
      </div>
      <div className={`bg-slate-800 p-6 rounded-lg shadow-lg border-t-4 border-indigo-600 text-center${stormMode ? " storm-pulse" : ""}`}>
        <Briefcase size={40} className="text-indigo-600 mx-auto mb-3" />
        <h3 className="text-2xl font-semibold text-white">10+ Projects</h3>
        <p className="text-slate-400 text-sm">Developed for businesses</p>
      </div>
    </div>

    {/* Interests & Hobbies */}
    <div className="mt-16">
      <h3 className="text-2xl font-semibold text-white text-center mb-6">Interests & Hobbies</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {["Open Source", "Machine Learning", "UI/UX Design", "Blockchain", "Photography"].map(interest => (
          <span key={interest} className="bg-slate-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">
            {interest}
          </span>
        ))}
      </div>
    </div>

  </div>
</section>
      {/* Experience Section */}
      <section id="experience" className="py-16 md:py-24 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Work Experience</h2>
            <div className="h-1 w-20 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-slate-400 leading-relaxed">
              My professional journey and the companies I've had the privilege to work with.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative border-l-2 border-indigo-200 pl-8 ml-4 md:ml-6">
              <div className="mb-12">
                <div className="absolute -left-3 mt-1.5 h-6 w-6 rounded-full border-4 border-white bg-indigo-600"></div>
                <div className={`bg-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300${stormMode ? " storm-pulse" : ""}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">System Engineer</h3>
                      <p className="text-indigo-400 font-medium">Infosys Private Limited.</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="bg-indigo-900 text-indigo-200 text-sm font-medium px-3 py-1 rounded-full">
                        Dec 2024 - Present
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    Led the development of a scalable microservices architecture, resulting in a 40% improvement in system performance.
                    Mentored junior developers and implemented best practices for code quality and testing. Collaborated with product
                    managers to define and prioritize features based on user feedback and business goals.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm">Java</span>
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm">MySql</span>
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm">MongoDB</span>
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm">Data Structures and Algorithms</span>
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm">Artificial Intelligence</span>
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm">Prompt Engineering</span>
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm">SDLC</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-12">
                <div className="absolute -left-3 mt-1.5 h-6 w-6 rounded-full border-4 border-white bg-indigo-600"></div>
                <div className={`bg-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300${stormMode ? " storm-pulse" : ""}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Software Developer</h3>
                      <p className="text-indigo-400 font-medium">Genamplify Solutions.</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="bg-indigo-900 text-indigo-200 text-sm font-medium px-3 py-1 rounded-full">
                        Dec 2023 - Dec 2024
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    Developed and maintained multiple web applications using React and Node.js.
                    Collaborated with UX designers to implement responsive and accessible user interfaces.
                    Optimized application performance and reduced load times by 30% through code refactoring
                    and implementing efficient data fetching strategies.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm">JavaScript</span>
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm">React</span>
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm">Express</span>
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm">MongoDB</span>
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm">Redux</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="absolute -left-3 mt-1.5 h-6 w-6 rounded-full border-4 border-white bg-indigo-600"></div>
                <div className={`bg-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300${stormMode ? " storm-pulse" : ""}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Freelance Web Developer</h3>
                      <p className="text-indigo-400 font-medium"></p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="bg-indigo-900 text-indigo-200 text-sm font-medium px-3 py-1 rounded-full">
                        Apr 2021 - Present
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    Built responsive websites for clients across various industries.
                    Implemented front-end features using HTML, CSS, and JavaScript.
                    Worked closely with the design team to ensure pixel-perfect implementation
                    of designs and smooth user experiences across different devices and browsers.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm">HTML/CSS</span>
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm">JavaScript</span>
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm">jQuery</span>
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm">PHP</span>
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm">WordPress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 md:py-24 bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Education</h2>
            <div className="h-1 w-20 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-slate-400 leading-relaxed">
              My academic background and qualifications.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className={`bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-indigo-600${stormMode ? " storm-pulse" : ""}`}>
              <div className="bg-indigo-600 p-4">
                <GraduationCap size={28} className="text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Bachelor of Engineering and Technology</h3>
                <p className="text-indigo-400 font-medium mb-2">St. Ann's College of Engineering & Technology</p>
                <p className="text-slate-400 mb-4">2018 - 2022</p>
                <ul className="text-slate-400 space-y-2">
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">•</span>
                    Computer Science and Engineering
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">•</span>
                    Full Time
                  </li>
                  {/* <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    Member of the ACM student chapter
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">Featured Projects</h2>
            <div className="h-1 w-24 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-lg text-slate-300">
              Explore some of the impactful applications and tools I’ve created.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              
              {
                title: "Discord Game Bot (Clash of Cards)",
                description: "Where 10 players can play together with lot of cards and buffs",
                tech: ["JavaScript", "Discord.js"],
                github: "https://github.com/saikumar2304/Clash-of_Cards"
              },
              {
                title: "Resume Webpage",
                description: "Customizable resume with real-time tracking.",
                tech: ["React", "Vite", "Supabase", "EmailJS"],
                github: "https://github.com/saikumar2304/Resume-Mine",
                live: "https://www.saikumar.fun"
              },
              {
                title: "Food & Rides Admin Panel",
                description: "Multi-service app supporting food delivery, auto, and ride bookings with Mongo backend.",
                tech: ["ReactJs", "ExpressJS", "MongoDB"],
                github: "https://github.com/saikumar2304/Admin-Panel-for-Vehicle-Management",
                live : "https://demo-git-main-saikumar2304s-projects.vercel.app/"
              },
              {
                title: "Java Full Course",
                description: "Full course with quizes and assignments to solve",
                tech: ["ReactJs", "ExpressJS", "PostgresSQL", "Supabase"],
                github: "https://github.com/saikumar2304/Java-with-assignments",
                live : "https://www.javatute.in/home"
              }

            ].map((proj, index) => (
              <div key={index} className={`bg-slate-800 p-6 rounded-xl shadow-xl border-t-4 border-indigo-600 transition-transform transform hover:-translate-y-1 hover:shadow-2xl${stormMode ? ' storm-pulse' : ''}`}>
                <h3 className="text-2xl font-semibold mb-2">{proj.title}</h3>
                <p className="text-slate-400 mb-4">{proj.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.tech.map((tech, i) => (
                    <span key={i} className="bg-indigo-900 text-indigo-100 px-3 py-1 rounded-full text-xs">{tech}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={proj.github} target="_blank" className="text-indigo-400 hover:text-white transition">GitHub</a>
                  {proj.live && <a href={proj.live} target="_blank" className="text-green-400 hover:text-white transition">Live</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

              {/* GitHub Contributions Section */}
<section id="github" className="py-16 md:py-24 bg-slate-900">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-4xl font-extrabold text-white mb-4">
      GitHub Contributions
    </h2>
    <div className="h-1 w-24 bg-indigo-600 mx-auto mb-6"></div>
    <p className="text-lg text-slate-300 leading-relaxed mb-12">
      A snapshot of my open-source contributions and coding activity.
    </p>

    {/* GitHub Contributions Graph */}
    <div className="flex justify-center mb-12">
      <img 
        src="https://ghchart.rshah.org/2196F3/saikumar2304" 
        alt="GitHub Contributions Graph" 
        className="w-full max-w-3xl"
      />
    </div>

    {/* GitHub Stats & Streaks */}
    <div className="flex flex-col md:flex-row justify-center items-center gap-12">
      <div className={stormMode ? "storm-pulse" : ""}>
        <h3 className="text-2xl font-semibold text-white mb-4">GitHub Stats</h3>
        <img 
          src="https://github-readme-stats.vercel.app/api?username=saikumar2304&show_icons=true&theme=dark"
          alt="GitHub Stats"
        />
      </div>
      <div className={stormMode ? "storm-pulse" : ""}>
        <h3 className="text-2xl font-semibold text-white mb-4">GitHub Streak</h3>
        <img 
          src="https://github-readme-streak-stats.herokuapp.com/?user=saikumar2304&theme=dark"
          alt="GitHub Streak"
        />
      </div>
    </div>

    {/* Most Used Languages - Centered */}
    <div className={`mt-12 flex flex-col items-center${stormMode ? " storm-pulse" : ""}`}>
      <h3 className="text-2xl font-semibold text-white mb-4">Most Used Languages</h3>
      <img 
        src="https://github-readme-stats.vercel.app/api/top-langs/?username=saikumar2304&layout=compact&theme=dark"
        alt="Top Languages"
      />
    </div>

    {/* GitHub Badges */}
    <div className={`mt-12 flex flex-wrap justify-center gap-4${stormMode ? " storm-pulse" : ""}`}>
      <img src="https://img.shields.io/github/followers/saikumar2304?label=Followers&style=social" alt="GitHub Followers" />
      <img src="https://img.shields.io/github/stars/saikumar2304?label=GitHub%20Stars&style=social" alt="GitHub Stars" />
      <img src="https://img.shields.io/github/contributors/saikumar2304/portfolio?label=Contributors" alt="Contributors" />
      <img src="https://img.shields.io/github/issues/saikumar2304/portfolio?label=Issues" alt="GitHub Issues" />
    </div>
  </div>
</section>

      {/* Get in Touch Section */}
<section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-800">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Section Heading */}
    <div className="max-w-3xl mx-auto text-center mb-16">
      <h2 className="text-4xl font-extrabold text-white mb-4">Let's Connect</h2>
      <div className="h-1 w-24 bg-indigo-600 mx-auto mb-6"></div>
      <p className="text-lg text-slate-300 leading-relaxed">
        I'm always open to **new opportunities, collaborations, and discussions**.  
        Whether you have a question or just want to say hi, feel free to drop me a message! 🚀
      </p>
    </div>

    {/* Contact Section Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
      
      {/* Contact Information */}
      <div className={`bg-slate-800 p-8 rounded-lg shadow-lg border-l-4 border-indigo-600${stormMode ? " storm-pulse" : ""}`}>
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <Mail size={28} className="text-indigo-600 mr-3" /> Contact Info
        </h3>
        
          {/* Contact Items */}
          <div className="space-y-6">
            {/* Email */}
            <div className={`flex items-center bg-slate-700 p-4 rounded-lg shadow-sm${stormMode ? " storm-pulse" : ""}`}>
            <Mail size={20} className="text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm text-slate-400">Email</p>
              <a href="mailto:saikumar2304@gmail.com" className="text-white font-medium hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors duration-300">
                saikumar2304@gmail.com
              </a>
            </div>
          </div>

            {/* Phone */}
            <div className={`flex items-center bg-slate-700 p-4 rounded-lg shadow-sm${stormMode ? " storm-pulse" : ""}`}>
            <Phone size={20} className="text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm text-slate-400">Phone</p>
              <a href="tel:+91XXXXXXXXXX" className="text-white font-medium hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors duration-300">
                +91 XXXXXXXXXX
              </a>
            </div>
          </div>

            {/* Location */}
            <div className={`flex items-center bg-slate-700 p-4 rounded-lg shadow-sm${stormMode ? " storm-pulse" : ""}`}>
            <Briefcase size={20} className="text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm text-slate-400">Location</p>
              <p className="text-white font-medium">Hyderabad, India</p>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-white mb-4">Connect on Social Media</h4>
          <div className="flex space-x-4">
            <a href="https://github.com/saikumar2304" className={`bg-slate-700 p-3 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-md${stormMode ? " storm-pulse" : ""}`}>
              <Github size={22} />
            </a>
            <a href="https://linkedin.com/in/saikumar2304" className={`bg-slate-700 p-3 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-md${stormMode ? " storm-pulse" : ""}`}>
              <Linkedin size={22} />
            </a>
            <a href="#" className={`bg-slate-700 p-3 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-md${stormMode ? " storm-pulse" : ""}`}>
              <ExternalLink size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className={`bg-slate-800 p-8 rounded-lg shadow-lg border-l-4 border-indigo-600${stormMode ? " storm-pulse" : ""}`}>
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <Mail size={28} className="text-indigo-600 mr-3" /> Send Me a Message
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
  {showSuccess && (
    <div className="flex items-center justify-center bg-green-900 text-green-300 p-4 rounded-md shadow-md">
      <CheckCircle size={24} className="mr-2" />
      <span>Message sent successfully! ✅</span>
    </div>
  )}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-slate-600 bg-slate-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        placeholder="John Doe"
      />
    </div>

    <div>
      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Your Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-slate-600 bg-slate-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        placeholder="john@example.com"
      />
    </div>
  </div>

  <div>
    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
    <textarea
      id="message"
      name="message"
      value={formData.message}
      onChange={handleChange}
      required
      className="w-full px-4 py-3 border border-slate-600 bg-slate-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
      placeholder="Your message here..."
      rows={5}
    ></textarea>
  </div>

  <button
    type="submit"
    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors duration-300 font-medium shadow-lg"
  >
    {status === "Sending..." ? "Sending..." : "Send Message"}
  </button>

  {status && status !== "Sending..." && <p className="text-center text-slate-300 mt-4">{status}</p>}
</form>
      </div>

    </div>

  </div>
</section>



<section id="coding-stats" className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
    <div className="bg-transparent p-6">
      <CodingStats />
    </div>
</section>


      

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">Sai Kumar</h2>
              <p className="text-slate-400 mt-1">Software Developer</p>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-4 mb-4">
                <a href="https://github.com/saikumar2304" className="text-slate-400 hover:text-white transition-colors duration-300">
                  <Github size={20} />
                </a>
                <a href="www.linkedin.com/in/saikumar2304" className="text-slate-400 hover:text-white transition-colors duration-300">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:saikumar2304@gmail.com" className="text-slate-400 hover:text-white transition-colors duration-300">
                  <Mail size={20} />
                </a>
              </div>
              <p className="text-slate-400 text-sm">
                &copy; {new Date().getFullYear()} Sai Kumar. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
      <ReactionBar />
      <button
  onClick={() => setStormMode(prev => !prev)}
  className="fixed bottom-4 right-4 bg-yellow-400 text-black px-3 py-2 rounded-full shadow-lg z-50"
>
  ⚡
</button>
    </div>
  );
}
export default App

// Disco-style animated gradient for page views badge
// You can move this to your CSS file if preferred
const style = document.createElement('style');
style.innerHTML = `
@keyframes gradient-x {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-x 4s ease infinite;
}
`;
if (typeof document !== "undefined" && !document.getElementById('disco-gradient-style')) {
  style.id = 'disco-gradient-style';
  document.head.appendChild(style);
}

// Enhanced Storm Mode Visual & Audio Effects
const styleStorm = document.createElement("style");
styleStorm.innerHTML = `
@keyframes stormFlash {
  0%, 100% { background-color: transparent; }
  15% { background-color: rgba(255, 255, 255, 0.2); }
  30% { background-color: rgba(255, 255, 0, 0.6); }
  50% { background-color: rgba(255, 255, 255, 0.1); }
  75% { background-color: rgba(255, 255, 0, 0.4); }
}
.storm-active {
  animation: stormFlash 0.3s infinite;
}

@keyframes stormGlow {
  0%, 100% {
    box-shadow: 0 0 15px 4px rgba(252, 211, 77, 0.3);
  }
  50% {
    box-shadow: 0 0 30px 8px rgba(252, 211, 77, 0.8);
  }
}
.storm-pulse {
  animation: stormGlow 1s ease-in-out infinite;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
}
.shake {
  animation: shake 0.5s ease-in-out;
}
`;
if (typeof document !== "undefined" && !document.getElementById("storm-style-enhanced")) {
  styleStorm.id = "storm-style-enhanced";
  document.head.appendChild(styleStorm);
}