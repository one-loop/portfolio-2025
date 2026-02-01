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
        <title>Saad Sifar – Portfolio</title>
        <meta name="description" content="I'm Saad, a Software Engineer and CS student at NYU Abu Dhabi based in Abu Dhabi. Researching AI, ML & full-stack development — open to internships and full-time roles." />
        <meta property="og:title" content="Saad Sifar – Portfolio" />
        <meta property="og:description" content="I'm Saad, a Software Engineer and CS student at NYU Abu Dhabi based in Abu Dhabi. Researching AI, ML & full-stack development — open to internships and full-time roles." />
        <meta property="og:url" content="https://saadsifar.com/" />
        <meta name="twitter:title" content="Saad Sifar – Portfolio" />
        <meta name="twitter:description" content="I'm Saad, a Software Engineer and CS student at NYU Abu Dhabi based in Abu Dhabi. Researching AI, ML & full-stack development — open to internships and full-time roles." />
        <link rel="canonical" href="https://saadsifar.com/" />
      </Helmet>
      <h1 className="main-heading animate-heading">Saad Sifar</h1>
      <ExperienceCanvas />
      <Footer /> 
    </div>
  );
};

export default Home;
