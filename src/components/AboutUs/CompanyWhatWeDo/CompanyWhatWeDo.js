import { useContext, useEffect, useRef, useState } from "react";
import "./CompanyWhatWeDo.css";
import Job from "./Job";
import { GeneralContext } from "../../../hooks/GeneralContext";
export default function CompanyWhatWeDo() {
  const { jobs } = useContext(GeneralContext);
  const [currentJob, setCurrentJob] = useState(1);
  const [pVisible, setPVisible] = useState(false)
  const [h1Visible, setH1Visible] = useState(false)
  const whatWeDoh1 = useRef()
  const whatWeDop = useRef()

  useEffect(function(){
    const observer = new IntersectionObserver((entries)=>{
      const entry = entries[0]
      if (entry.isIntersecting){
        setPVisible(true)
      }
    },{
      threshold:[0.8, 1]
    })
    observer.observe(whatWeDop.current)
  },[])
  useEffect(function(){
    const observer = new IntersectionObserver((entries)=>{
      const entry = entries[0]
      if (entry.isIntersecting){
        setH1Visible(true)
      }
    },{
      threshold:[0.8, 1]
    })
    observer.observe(whatWeDop.current)
  },[])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJob((prevJob) => (prevJob + 1) % jobs.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [jobs.length, currentJob]);

  function handleLeft() {
    if (currentJob === 0) {
      setCurrentJob(jobs.length - 1);
    } else {
      setCurrentJob((j) => j - 1);
    }
  }
  function handleRight() {
    if (currentJob === jobs.length - 1) {
      setCurrentJob(0);
    } else {
      setCurrentJob((j) => j + 1);
    }
  }

  return (
    <div className="what-we-do">
      <div className="jobs-txt">
        <h1 className={h1Visible ? "visible" : ""} ref={whatWeDoh1.current}>What We Do</h1>
        <hr></hr>
        <p className={pVisible ? "visible" : ""} ref={whatWeDop}>
          At HALE: Human Rights and Inclusion Network (H-HRIN), we are committed
          to advancing human rights and fostering a culture of inclusion. Our
          diverse range of activities and initiatives are designed to address
          the needs of marginalized and vulnerable communities in Ethiopia,
          ensuring they have access to justice, equal rights, and opportunities.
          Our work is driven by a commitment to systemic change and sustainable
          impact. Here’s how we make a difference/ here’s what we do:
        </p>
      </div>
      <div className="jobs-container">
        <button onClick={handleLeft} className="jobs-btn left">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </button>
        <Job
          key={jobs[currentJob].name}
          name={jobs[currentJob].name}
          description={jobs[currentJob].description}
          image={jobs[currentJob].image}
          currentJob={currentJob}
        />
        <button onClick={handleRight} className="jobs-btn right">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
          </svg>
        </button>
      </div>

    </div>
  );
}
