import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '../components/Footer';
import ExperienceCanvas from '../components/ExperienceCanvas';
import './Home.css';

const Home = () => {
//   console.log(`
//     _____                 _    _____ _  __           
//    / ____|               | |  / ____(_)/ _|          
//   | (___   __ _  __ _  __| | | (___  _| |_ __ _ _ __ 
//    \___ \ / _\` |/ _\` |/ _\` |  \___ \| |  _/ _\` | '__|
//    ____) | (_| | (_| | (_| |  ____) | | || (_| | |   
//   |_____/ \__,_|\__,_|\__,_| |_____/|_|_| \__,_|_|   
//  `);
 
  return (
    <div className="gradient home">
      <Helmet>
        <title>Saad Sifar • Portfolio</title>
        <meta name="description" content="Portfolio of Saad Sifar, Computer Science student at NYU Abu Dhabi, showcasing projects in software development, research, and creative technology." />
        <meta property="og:title" content="Saad Sifar • Portfolio" />
        <meta property="og:description" content="Portfolio of Saad Sifar, Computer Science student at NYU Abu Dhabi, showcasing projects in software development, research, and creative technology." />
        <meta property="og:url" content="https://saadsifar.com/" />
        <meta name="twitter:title" content="Saad Sifar • Portfolio" />
        <meta name="twitter:description" content="Portfolio of Saad Sifar, Computer Science student at NYU Abu Dhabi, showcasing projects in software development, research, and creative technology." />
        <link rel="canonical" href="https://saadsifar.com/" />
      </Helmet>
      <h1 className="main-heading animate-heading">Saad Sifar</h1>
      <ExperienceCanvas />
      <Footer /> 
    </div>
  );
};

export default Home;
