import "./Programs.css";
import Activities from "./../components/Programs/Activities/Activities";
import Hero from "./../components/Programs/Hero/Hero";
import AboutUs from "./../components/Programs/About us/AboutUs";
import Events from "./../components/Programs/Events/Events";
// import Footer from "../Footer/Footer";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const hero = [
  {
    title: "Human Rights Education",
    description:
      "Engaging in policy advocacy to influence legislation and policies that promote human rights and social justice.",
    imgName: "./assets/hero/humanrights-hero.jpg",
  },
  {
    title: "Access To Justice",
    description:
      "Ensuring fair legal representation and justice for all, especially for marginalized communities",
    imgName: "./assets/hero/access-to-justice.jpg",
  },
  {
    title: "Child Rights",
    description:
      "Addressing issues like child labor, trafficking, access to education, and protection from violence",
    imgName: "./assets/hero/child-rights.jpg",
  },
  {
    title: "Democracy Promotion",
    description:
      "Encouraging active participation in democratic processes and monitoring elections to ensure fairness and transparency. Supporting democratic processes and institutions to ensure accountable and inclusive governance",
    imgName: "./assets/hero/democracy-promotion.png",
  },
  {
    title: "Education And Training",
    description:
      "Conducting workshops, seminars, and training and educational programs to empower individuals and communities with knowledge about their rights and how to advocate for them, and to raise awareness and build capacity on human rights and inclusion",
    imgName: "./assets/hero/education-and-training.jpg",
  },
  {
    title: "Good Governance",
    description:
      "Promoting transparency, accountability, and integrity in public administration",
    imgName: "./assets/hero/good-governance.jpg",
  },
  {
    title: "Sexual and reproductive Health",
    description:
      "Advocating for comprehensive sexual and reproductive health services and education",
    imgName: "./assets/hero/sexual-and-reproductive-education.jpg",
  },
  {
    title: "Community Dialogues Engagement",
    description:
      "Facilitating dialogues and engagement activities to promote civic participation and democratic governance. Promoting active participation in civic life, encouraging individuals to engage in democratic processes and community activities",
    imgName: "./assets/hero/community-engagement.jpg",
  },
  {
    title: "Environmental Justice",
    description:
      "Addressing the effects of environmental degradation on vulnerable communities and advocating for a healthy environment",
    imgName: "./assets/hero/environmental-justice.jpg",
  },
  {
    title: "Labour Rights",
    description:
      "Protecting workers’ rights, including fair wages, safe working conditions, and the right to organize",
    imgName: "./assets/hero/labour-rights.jpg",
  },
  {
    title: "Free Legal Aid Services",
    description:
      "We provide comprehensive free legal aid to individuals who lack access to justice. This includes legal representation, counseling, and support to ensure fair treatment and  access to justice for all",
    imgName: "./assets/hero/free-legal-aid-service.jpg",
  },
  {
    title: "Awareness Campaign",
    description:
      "Raising awareness about human rights, gender equality, children’s rights, and environmental sustainability through community outreach and media campaigns",
    imgName: "./assets/hero/Awareness-campaign.jpg",
  },
  {
    title: "Community Support",
    description:
      "Providing resources, counseling, and support services to marginalized individuals and communities",
    imgName: "./assets/hero/community-support.jpg",
  },
];

const activity = [
  {
    imageName: "./assets/activities/human-rights.jpg",
    title: "Human Rights Education",
    details: {
      d1: "Workshops and seminars to educate communities about their rights and how to advocate for them",
      d2: "",
    },
  },
  {
    imageName: "./assets/activities/access-to-justice.jpg",
    title: "Access to Justice",
    details: {
      d1: "Free Legal Aid Services: Providing comprehensive free legal aid services to ensure fair legal representation and justice",
      d2: "Public Interest Litigation: Engaging in strategic legal actions to protect the rights of vulnerable groups and to ensure environmental justice and protect environmental rights in Ethiopia",
    },
  },
  {
    imageName: "./assets/activities/gender-equality-2.jpg",
    title: "Gender Equality",
    details: {
      d1: "Gender-Based Violence Prevention: Implementing programs to combat violence against women and girls, and advocating for gender equality in all sectors. Gender equality campaigns to promote gender equality and combat violence against women",
      d2: "Women's Empowerment: Promoting women's rights and leadership through education, advocacy, and capacity-building initiatives",
    },
  },
  {
    imageName: "./assets/activities/child-rights.jpg",
    title: "Child Rights",
    details: {
      d1: "Child Protection: Focusing on eliminating child labor, child trafficking, and violence against children, and ensuring access to quality education for all children",
      d2: "Child Advocacy: Raising awareness about children's rights and advocating for policies that protect and promote the well-being of children",
    },
  },
  {
    imageName: "./assets/activities/disability-inclusion.jpg",
    title: "Disability Inclusion",
    details: {
      d1: "Inclusive Education: Advocating for and supporting inclusive education practices that ensure persons with disabilities have access to quality education.",
      d2: "Disability Rights Awareness: Promoting awareness about the rights of persons with disabilities and working to eliminate barriers to their full participation in society.",
    },
  },
  {
    imageName: "./assets/activities/cultural-rights-2.jpg",
    title: "Cultural Rights",
    details: {
      d1: "Cultural Heritage Preservation: Protecting and promoting the rights of individuals to participate in their cultural life and preserving cultural heritage",
      d2: "Cultural Awareness Programs: Conducting programs to celebrate and promote understanding of diverse cultural practices and traditions",
    },
  },
  {
    imageName: "./assets/activities/environmental-justice.jpg",
    title: "Environmental Justice",
    details: {
      d1: "Environmental Advocacy: Addressing the impact of environmental degradation on vulnerable communities and advocating for their rights to a healthy environment.",
      d2: "Sustainable Practices: Promoting environmental sustainability through community-based initiatives and education programs",
    },
  },
  {
    imageName: "./assets/activities/labour-rights.jpg",
    title: "Labour Rights",
    details: {
      d1: "Workers' Rights Protection: Advocating for fair wages, safe working conditions, and the right to organize for workers in various sectors",
      d2: "Labor Education: Educating workers about their rights and supporting efforts to improve labor standards",
    },
  },
  {
    imageName: "./assets/activities/sexual-and-reproductive-education.jpg",
    title: "Sexual and Reproductive Health and Rights ",
    details: {
      d1: "SRHR Advocacy: Promoting awareness and advocacy for sexual and reproductive health and rights, ensuring access to services and education",
      d2: "Health Services: Supporting initiatives that provide comprehensive SRHR services to marginalized communities",
    },
  },
  {
    imageName: "./assets/activities/good-governance-2.jpg",
    title: "Democracy and Good Govenance",
    details: {
      d1: "Democracy Promotion: Engaging in activities that promote democratic values, free and fair elections, and civic participation",
      d2: "Good Governance Initiatives: Advocating for transparency, accountability, and good governance practices at all levels of government",
    },
  },
  {
    imageName: "./assets/activities/education-and-training.jpg",
    title: "Research And Education",
    details: {
      d1: "Research Activities: Conducting research to identify human rights issues and inform our advocacy and legal strategies",
      d2: "Educational Programs: Implementing educational initiatives to empower individuals with knowledge about their rights and how to assert them",
    },
  },
 
  {
    imageName: "./assets/activities/civic-engagement-2.jpg",
    title: "Civic Engagement",
    details: {
      d1: "Community Outreach: Facilitating civic engagement activities to encourage community participation in democratic processes and decision-making",
      d2: "Youth Engagement: Supporting youth-led initiatives and empowering young people to become active participants in their communities",
    },
  },
  {
    imageName: "./assets/activities/networking-and-collaboration.jpg",
    title: "Networking And Collaboration",
    details: {
      d1: "Partnership Building: Building partnerships with local, national, and international organizations to enhance our impact and drive systemic change",
      d2: "Collaborative Projects: Engaging in collaborative projects to amplify our efforts and share best practices",
    },
  },
  {
    imageName: "./assets/activities/peace-building-2.jpg",
    title: "Peace Building",
    details: {
      d1: "Promoting conflict resolution, reconciliation, and fostering harmonious coexistence",
      d2: "",
    },
  },
];

const Event = [
  {
    title: "Planting the seeds of change:",
    imgName: "./assets/Event/event-img.jpg",
  },
  {
    title: "Planting the seeds of change:",
    imgName: "./assets/Event/event-img.jpg",
  },
  {
    title: "Planting the seeds of change:",
    imgName: "./assets/Event/event-img.jpg",
  },
];

function Programs() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [Heros, setHeros] = useState(0);
  function changeHeroInc() {
    if (Heros === hero.length - 1) {
      setHeros(0);
    } else {
      setHeros((prev) => prev + 1);
    }
  }
  function changeHeroDec() {
    if (Heros === 0) {
      setHeros(hero.length - 1);
    } else {
      setHeros((prev) => prev - 1);
    }
  }

  const descriptionH2 = useRef();
  const descriptionP = useRef();
  const [pVisible, setPVisible] = useState(false);
  const [h2Visible, setH2Visible] = useState(false);
  const navigate = useNavigate();
  useEffect(function () {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setH2Visible(true);
        }
      },
      {
        threshold: [0.5, 1],
      }
    );
    observer.observe(descriptionH2.current);
  }, []);
  useEffect(function () {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setPVisible(true);
        }
      },
      {
        threshold: [0.5, 1],
      }
    );
    observer.observe(descriptionP.current);
  }, []);

  useEffect(function () {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="programs">
      <Hero
        title={hero[Heros].title}
        description={hero[Heros].description}
        imgName={hero[Heros].imgName}
        titleWidth={hero[Heros].titleWidth}
        pWidth={hero[Heros].pWidth}
        changeHeroInc={changeHeroInc}
        changeHeroDec={changeHeroDec}
        key={Heros}
      />
      <div className="description">
        <div className="heading">
          <h2 className={h2Visible ? "visible" : ""} ref={descriptionH2}>
            Advancing Human Rights Gender Equality, Children's Rights,
            Disability Inclusion, and Environmental Sustainability
          </h2>
        </div>
        <div className="detail">
          <p className={pVisible ? "visible" : ""} ref={descriptionP}>
            At HALE, we are dedicated to promote human rights, gender equality,
            protecting childeren's rights, fostering disability inclusion, and
            supporting environmental sustainability. Through our research,
            public interest litigation, civic engagement, and advocacy, we
            strive to create a just and equitable society where marginalixed and
            vulnerable communities are empowered and their voices are heard.
          </p>
        </div>
      </div>
      <div className="activities">
        <h1>Programs</h1>
        <hr />
        <div className="activities-container">
          {activity.map((act, index) => (
            <Activities
              title={act.title}
              img={act.imageName}
              details={act.details}
              selectedProgram={selectedProgram}
              setSelectedProgram={setSelectedProgram}
              index={index}
            />
          ))}
        </div>
      </div>
      <div className="program-events">
        <header>
          <h1>Events</h1>
          <hr />
        </header>
        <main>
          <div className="program-events-container">
            <Events title={Event[0].title} imgName={Event[0].imgName} />
          </div>
          <div className="more-events">
            <h1>Stay updated on all our events</h1>
            <button onClick={() => navigate("/events")}>See All Events</button>
          </div>
        </main>
      </div>
      <AboutUs />
      {/* <Footer /> */}
    </div>
  );
}

export default Programs;
