import { createContext, useState } from "react";

export const GeneralContext = createContext();
export const API_BASE_URL = "http://localhost:8080/api";

export default function GeneralProvider({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const [messageData, setMessageData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  async function sendMessageFromContact(e) {
    e.preventDefault();
    if (
      messageData.name === "" ||
      messageData.email === "" ||
      messageData.message === ""
    ) {
      alert("Fill All Required Data");
      return;
    }
    try {
      setSending(true);
      const res = await fetch(`${API_BASE_URL}/messages.php`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: messageData.name,
          email: messageData.email,
          message: messageData.message,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        alert("Failed to send. Try again later");
        setSending(false);
        return;
      }
      setMessageData({
        name: "",
        email: "",
        message: "",
      });
      setSending(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      alert(err.message);
      setSending(false);
    }
  }

  const jobs = [
    {
      name: "Access to Justice",
      description:
        "Provide comprehensive free legal aid services to individuals who lack access to fair legal representation. This includes legal representation, counseling, and support to ensure fair treatment and justice for all. Engage in public interest litigation to address systemic injustices and uphold human rights.",
      image: "https://i.postimg.cc/7L548YyJ/access.jpg",
    },
    {
      name: "Advocacy and Awareness",
      description:
        "Conduct advocacy campaigns to promote gender equality, child rights, labor rights, disability inclusion, and cultural rights. Raise awareness about sexual and reproductive health and rights (SRHR) and environmental justice. Promote democracy and good governance through education and civic engagement initiatives.",
      image: "https://i.postimg.cc/CKZHM2rL/advocacy-2.jpg",
    },
    {
      name: "Education and Empowerment",
      description:
        "Implement educational programs to empower individuals with knowledge about their rights and how to assert them. Organize workshops, seminars, and community meetings to foster a culture of inclusion and respect for human rights.",
      image: "https://i.postimg.cc/m2Rw38k8/education-2.jpg",
    },
    {
      name: "Research and Analysis",
      description:
        "Conduct research activities to identify and address human rights issues, informing our advocacy and legal strategies. Publish reports and studies to highlight the challenges faced by marginalized communities and recommend policy changes.",
      image: "https://i.postimg.cc/LXjr2JQ5/research.jpg",
    },
    {
      name: "Civic Engagement",
      description:
        "Facilitate civic engagement activities to encourage participation in democratic processes and community decision-making. Support initiatives that promote transparency, accountability, and good governance.",
      image: "https://i.postimg.cc/NMTwFJFg/civic-engagement.jpg",
    },
    {
      name: "Community Support",
      description:
        "Provide support services to marginalized communities, including assistance with accessing education, healthcare, and other essential services. Collaborate with local organizations to develop and implement community-driven solutions.",
      image: "https://i.postimg.cc/d0gYqPqH/community-support.jpg",
    },
    {
      name: "Environmental Sustainability",
      description:
        "Advocate for environmental justice and work to address the impact of environmental degradation on vulnerable communities. Promote sustainable practices and support initiatives aimed at protecting the environment.",
      image: "https://i.postimg.cc/tR3jHM8k/environment.jpg",
    },
    {
      name: "Networking and Collaboration",
      description:
        "Build partnerships with local, national, and international organizations to enhance our impact and drive systemic change. Engage in collaborative projects to amplify our efforts and share best practices.",
      image: "https://i.postimg.cc/sgXd7DxH/network.jpg",
    },
    {
      name: "Peace Building",
      description:
        "Promoting conflict resolution and fostering harmonious coexistence.",
      image: "https://i.postimg.cc/nLjySRvv/peace.jpg",
    },
    {
      name: "Public Interest Litigation",
      description:
        "We engage in strategic litigation to challenge injustices and protect the rights of vulnerable groups, and to ensure environmental justice and protect environmental rights and fundamental freedoms in Ethiopia.",
      image: "https://i.postimg.cc/7LFpF3Vj/public-interest.jpg",
    },
    {
      name: "Democracy Promotion",
      description:
        "Encouraging active participation in democratic processes and monitoring elections to ensure fairness and transparency. Supporting democratic processes and institutions to ensure accountable and inclusive governance.",
      image: "https://i.postimg.cc/4xSC5khf/democracy.jpg",
    },
  ];

  const programs = [
    {
      name: "Human Rights Education",
      description: {
        dOne: "Workshops and seminars to educate communities about their rights and how to advocate for them.",
      },
    },
    {
      name: "Access to Justice",
      description: {
        dOne: "Free Legal Aid Services: Providing Comprehensive free legal aid services to ensure fair legal representation and justice",
        dTwo: "Public Interest Litigation: Engaging in strategic level actions to protect the rights of vulnerable groups and to ensure environmental justice and protect environmental rights in Ethiopia",
      },
    },
    {
      name: "Gender Equality",
      description: {
        dOne: "Gender-Based Violence Prevention: Implementing programs to combat violence against women and girls, and advocating for gender equality in all sectors. Gender equality campaigns to promote gender equality and combat violence against women.",
        dTwo: "Women's Empowerment: Promoting women's rights and leadership through education, advocacy, and capacity-building initiatives.",
      },
    },
    {
      name: "Child Rights",
      description: {
        dOne: "Child Protection: Focusing on eliminating child labor, child trafficking, and violence against children, and ensuring access to quality education for all children.",
        dTwo: "Child Advocacy: Raising awareness about children's rights and advocating for policies that protect and promote the well-being of children.",
      },
    },
    {
      name: "Disability Inclusion",
      description: {
        dOne: "Inclusive Education: Advocating for and supporting inclusive education practices that ensure persons with disabilities have access to quality education.",
        dTwo: "Disability Rights Awareness: Promoting awareness about the rights of persons with disabilities and working to eliminate barriers to their full participation in society.",
      },
    },
    {
      name: "Cultural Rights",
      description: {
        dOne: "Cultural Heritage Preservation: Protecting and promoting the rights of individuals to participate in their cultural life and preserving cultural heritage.",
        dTwo: "Cultural Awareness Programs: Conducting programs to celebrate and promote understanding of diverse cultural practices and traditions.",
      },
    },
    {
      name: "Environmetal Justice",
      description: {
        dOne: "Environmental Advocacy: Addressing the impact of environmental degradation on vulnerable communities and advocating for their rights to a healthy environment.",
        dTwo: "Sustainable Practices: Promoting environmental sustainability through community-based initiatives and education programs.",
      },
    },
    {
      name: "Labor Rights",
      description: {
        dOne: "Workers' Rights Protection: Advocating for fair wages, safe working conditions, and the right to organize for workers in various sectors.",
        dTwo: "Labor Education: Educating workers about their rights and supporting efforts to improve labor standards.",
      },
    },
    {
      name: "Sexual and Reproductive Health and Rights (SRHR)",
      description: {
        dOne: "SRHR Advocacy: Promoting awareness and advocacy for sexual and reproductive health and rights, ensuring access to services and education.",
        dTwo: "Health Services: Supporting initiatives that provide comprehensive SRHR services to marginalized communities.",
      },
    },
    {
      name: "Democracy and Good Governance",
      description: {
        dOne: "Democracy Promotion: Engaging in activities that promote democratic values, free and fair elections, and civic participation.",
        dTwo: "Good Governance Initiatives: Advocating for transparency, accountability, and good governance practices at all levels of government.",
      },
    },
    {
      name: "Research and Education",
      description: {
        dOne: "Research Activities: Conducting research to identify human rights issues and inform our advocacy and legal strategies.",
        dTwo: "Educational Programs: Implementing educational initiatives to empower individuals with knowledge about their rights and how to assert them.",
      },
    },
    {
      name: "Civic Engagement",
      description: {
        dOne: "Community Outreach: Facilitating civic engagement activities to encourage community participation in democratic processes and decision-making.",
        dTwo: "Youth Engagement: Supporting youth-led initiatives and empowering young people to become active participants in their communities.",
      },
    },
    {
      name: "Networking and Collaboration",
      description: {
        dOne: "Partnership Building: Building partnerships with local, national, and international organizations to enhance our impact and drive systemic change.",
        dTwo: "Collaborative Projects: Engaging in collaborative projects to amplify our efforts and .share best practices.",
      },
    },
    {
      name: "Peace Building",
      description: {
        dOne: "Promoting conflict resolution, reconciliation, and fostering harmonious coexistence.",
      },
    },
  ];

  return (
    <GeneralContext.Provider
      value={{
        jobs,
        programs,
        navOpen,
        setNavOpen,
        messageData,
        setMessageData,
        sendMessageFromContact,
        sending,
        success,
      }}>
      {children}
    </GeneralContext.Provider>
  );
}
