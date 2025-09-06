import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Headerbar from './HomePage/Headerbar.jsx';
import mainImage from './Images/mainImage.jpg';
import FeaturedSection from './HomePage/FeaturedSection.jsx';
import Articles from './Images/articles.jpg';
import Tutorials from './Images/tutorials.jpg';
import SubscribeBar from "./HomePage/SubscribeBar";
import Footer from './HomePage/FooterSection.jsx';
import PostPage from './pages/PostPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';

function HomePage({ articles, tutorials }) {
  return (
    <>
      <img src={mainImage} alt="Banner" className="full-width-banner" />
      <FeaturedSection title="Featured Articles" items={articles} />
      <FeaturedSection title="Featured Tutorials" items={tutorials} />
      <SubscribeBar />
      <Footer />
    </>
  );
}

function App() {
  const articles = [
    { title: "React Basics", description: "Learn React fundamentals", author: "John Doe", rating: 4.5, image: Articles },
    { title: "Mastering JavaScript", description: "Advanced JS concepts", author: "Jane Smith", rating: 4.8, image: Articles },
    { title: "CSS Grid & Flexbox", description: "Responsive layouts", author: "Alex Brown", rating: 4.2, image: Articles },
    { title: "Advanced Node.js", description: "Scaling backend apps", author: "Chris Green", rating: 4.7, image: Articles },
  ];

  const tutorials = [
    { title: "Intro to Git", description: "Version control basics", author: "Mark Lee", rating: 4.6, image: Tutorials },
    { title: "Python for Data Science", description: "Data analysis with Python", author: "Sara Kim", rating: 4.9, image: Tutorials },
    { title: "Machine Learning", description: "ML fundamentals", author: "Paul White", rating: 4.7, image: Tutorials },
    { title: "Docker Basics", description: "Containerization 101", author: "Amy Brown", rating: 4.4, image: Tutorials },
  ];

  return (
    <Router>
      <Headerbar />
      <Routes>
        <Route path="/" element={<HomePage articles={articles} tutorials={tutorials} />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
