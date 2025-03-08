import React from 'react';
import Footer from '../components/Footer';
import ExperienceCanvas from '../components/ExperienceCanvas';
import './Home.css';

const Home = () => {
//   console.log(`
//     _____                 _    _____ _  __           
//    / ____|               | |  / ____(_)/ _|          
//   | (___   __ _  __ _  __| | | (___  _| |_ __ _ _ __ 
//    \\___ \\ / _\` |/ _\` |/ _\` |  \\___ \\| |  _/ _\` | '__|
//    ____) | (_| | (_| | (_| |  ____) | | || (_| | |   
//   |_____/ \\__,_|\\__,_|\\__,_| |_____/|_|_| \\__,_|_|   
//  `);
 
  return (
    <div className="gradient home">
      <h1 className="main-heading animate-heading">Saad Sifar</h1>
      <ExperienceCanvas />
      <Footer /> 
    </div>
  );
};

export default Home;
