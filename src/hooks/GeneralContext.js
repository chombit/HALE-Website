import { createContext, useEffect, useState } from "react";

export const GeneralContext = createContext();

export default function GeneralProvider({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const [messageData, setMessageData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  useEffect(function () {
    async function activateApi() {
      const res = await fetch("https://hale-backend.onrender.com/test");
      const data = await res.json();
      console.log(data);
    }
    activateApi();
  });

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
      const res = await fetch("https://hale-backend.onrender.com/message", {
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
      if (data.status === "fail") {
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
    // {
    //   name: "Legal Aid Services",
    //   description:
    //     "We provide comprehensive legal aid to individuals who lack access to justice. This includes legal representation, counseling, and support to ensure fair treatment and justice for all.",
    //   image: "https://i.postimg.cc/tC9HRzjj/legal-aid.jpg",
    // },
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

  const events = [
    {
      images: [
        "https://i.postimg.cc/XvZmwC1M/event9-img1.jpg",
        "https://i.postimg.cc/cJVjTLPv/event9-img2.jpg",
      ],
      name:"🚀 Youth as Catalysts for Change 🚀",
      description:{
        p1: {
          heading: "",
          content:
            "Our Executive Director, Mr. Woyesa Woka, led an energizing session on youth as the 'catalysts for change'. He inspired participants to embrace their roles as community change-makers and challenged them to take active steps toward building a just and inclusive society",
        },
        p2: {
          heading: "",
          content:
            "It’s inspiring to see our young leaders driven by a shared vision of impact!",
        },
        p3: {
          heading: "",
          content: "",
        },
        p4: {
          heading: "",
          content: "",
        },
        p5: {
          heading: "",
          content: "",
        },
        p6: {
          heading: "",
          content: "",
        },
        p7: {
          heading: "",
          content: "",
        },
      }
    },
    {
      images: [
        "https://i.postimg.cc/wMhdDmvx/event8-img1.jpg",
        "https://i.postimg.cc/15QSsJC8/event8-img2.jpg",
        "https://i.postimg.cc/fWXsG6K4/event8-img3.jpg",
      ],
      name: "💬 Inspiring Words from University Leaders 💬",
      description: {
        p1: {
          heading: "",
          content:
            "Our Human Rights Advocacy Training was launched with powerful messages from Dr. Debrework Debebe(PhD), Dean of the College of Law and Governance,Hawassa University and Mr. Dagne, Head of the Governance and Development Studies Department,Hawassa University.",
        },
        p2: {
          heading: "",
          content:
            "Dr. Debrework highlighted the role of universities in preparing students for social justice, while Mr. Dagne emphasized the importance of youth-led change. Their commitment inspires us and our young leaders to take bold steps in human rights advocacy.",
        },
        p3: {
          heading: "",
          content: "",
        },
        p4: {
          heading: "",
          content: "",
        },
        p5: {
          heading: "",
          content: "",
        },
        p6: {
          heading: "",
          content: "",
        },
        p7: {
          heading: "",
          content: "",
        },
      },
    },
    {
      images: ["https://i.postimg.cc/QC5jSz63/event7-img1.jpg"],
      name: "💙 Reflecting and Grateful",
      description: {
        p1: {
          heading: "",
          content:
            "As we look back at our International Human Rights Day Celebration on December 10, 2024, we at HALE – Human Rights and Inclusion Network (H-HRIN) feel immense gratitude for the partnerships, energy, and inspiration that made the day truly unforgettable.",
        },
        p2: {
          heading: "",
          content: "✨ A huge thank you to:",
        },
        p3: {
          heading: "",
          content:
            "HUGASA and Interact Club for their unwavering support. The passionate youth who joined us to make their voices heard. Everyone who contributed to advancing the message of human rights. Even today, the conversations and actions sparked during the event are driving us forward. Together, let’s keep championing inclusion, justice, and equality.",
        },
        p4: {
          heading: "",
          content: "",
        },
        p5: {
          heading: "",
          content: "",
        },
        p6: {
          heading: "",
          content: "",
        },
        p7: {
          heading: "",
          content: "",
        },
      },
    },
    {
      images: [
        "https://i.postimg.cc/gc4XZXCk/event6-img1.jpg",
        "https://i.postimg.cc/02Q6d5vG/event6-img2.jpg",
        "https://i.postimg.cc/RVDWPrCk/event6-img3.jpg",
      ],
      name: "Human Rights Advocacy on the Ground 🌟 Spreading the Message – One Step at a Time! 🌟",
      description: {
        p1: {
          heading: "",
          content:
            "On December 10, 2024, as part of our International Human Rights Day Celebration, we took advocacy to the streets of Hawassa City in a bold and creative way.",
        },
        p2: {
          heading: "",
          content:
            "📍 With vibrant posters displayed on the asphalt, human rights advocates and youth delivered powerful messages about justice, equality, and inclusion for all.",
        },
        p3: {
          heading: "",
          content:
            "🗣 These impactful statements sparked conversations, raised awareness, and reminded everyone that human rights belong in every corner of our lives—not just in formal venues.",
        },
        p4: {
          heading: "",
          content:
            "This grassroots initiative highlighted the creativity, commitment, and passion of young advocates determined to champion human rights wherever they are. Together, we showed that advocacy lives in the hearts and streets of our communities.",
        },
        p5: {
          heading: "",
          content:
            "✨ Let’s keep walking this path—how will you advocate for a more just and equitable society today?",
        },
        p6: {
          heading: "",
          content: "",
        },
        p7: {
          heading: "",
          content: "",
        },
      },
    },
    {
      name: "🎙 A Powerful Start to International Human Rights Day!",
      images: [
        "https://i.postimg.cc/jddfgQH7/event5-img1.jpg",
        "https://i.postimg.cc/8cw6kjSc/event5-img2.jpg",
        "https://i.postimg.cc/fWvXfg9s/event5-img3.jpg",
      ],
      description: {
        p1: {
          heading: "",
          content:
            "On December 10, 2024, our International Human Rights Day Celebration kicked off with inspiring speeches and meaningful activities, emphasizing the vital role of youth as agents of change in their communities.",
        },
        p2: {
          heading: "",
          content:
            "💡 Key takeaway: Empowering youth is the pathway to a more inclusive and equitable future.",
        },
        p3: {
          heading: "",
          content:
            "While the event may have been a week ago, the passion and ideas it ignited continue to inspire us. Let’s carry this momentum forward!",
        },
        p4: {
          heading: "",
          content: "",
        },
        p5: {
          heading: "",
          content: "",
        },
        p6: {
          heading: "",
          content: "",
        },
        p7: {
          heading: "",
          content: "",
        },
      },
    },
    {
      images: [
        "https://i.postimg.cc/QC7yRZGf/event4-img1.jpg",
        "https://i.postimg.cc/ZYv29pB6/event4-img2.jpg",
      ],
      name: "🌟 Reflecting on an Amazing Day! 🌟",
      description: {
        p1: {
          heading: "",
          content:
            "On December 10, 2024, we at HALE-Human Rights and Inclusion Network(H-HRIN) proudly hosted a remarkable International Human Rights Day Celebration in collaboration with Hawassa University Governance and Development Studies Students Association (HUGASA) and the Interact Club of St. Daniel Comboni Catholic Secondary and Preparatory School.",
        },
        p2: {
          heading: "",
          content:
            "Under the theme 'Empowering Youth for Human Rights,' the event united high school students, university students, and youth leaders to inspire meaningful discussions and actions toward justice, inclusion, and equality.",
        },
        p3: {
          heading: "",
          content:
            "Though a few days have passed, the impact of this event continues to resonate. Stay tuned as we share inspiring highlights and memorable moments from this impactful day!",
        },
        p4: {
          heading: "",
          content:
            "📍 Venue: St. Daniel Comboni Catholic Secondary and Preparatory School, Hawassa, Ethiopia, Africa",
        },
        p5: {
          heading: "",
          content: "",
        },
        p6: {
          heading: "",
          content: "",
        },
        p7: {
          heading: "",
          content: "",
        },
      },
    },
    {
      images: [
        "https://i.postimg.cc/wTr8BFcV/event3-img1.jpg",
        "https://i.postimg.cc/PqYk9ZDM/event3-img2.jpg",
        "https://i.postimg.cc/26xN8D2b/event3-img3.jpg",
        "https://i.postimg.cc/V6KZVLKR/event3-img4.jpg",
      ],
      name: "🗣️ Youth Advocacy for a Just Future 🗣️",
      description: {
        p1: {
          heading: "",
          content:
            "We believe in the power of youth to drive real change. Through this training, young leaders gain tools to take on the challenges of human rights and social justice. Youth voices are crucial in the fight for equality and human dignity—they have the passion, vision, and determination to make a difference.",
        },
        p2: {
          heading: "",
          content:
            "Together, let’s empower a generation to stand up for justice and inclusion.",
        },
        p3: {
          heading: "",
          content: "",
        },
        p4: {
          heading: "",
          content: "",
        },
        p5: {
          heading: "",
          content: "",
        },
        p6: {
          heading: "",
          content: "",
        },
        p7: {
          heading: "",
          content: "",
        },
      },
    },
    {
      images: [
        "https://i.postimg.cc/1tPRmMct/event2-img3.jpg",
        "https://i.postimg.cc/bJMtsxZt/event2-img1.jpg",
        "https://i.postimg.cc/KjMgL1Ts/event2-img3.jpg",
      ],
      name: "🌍 Empowering Change: Human Rights Advocacy Training for Young Leaders at Hawassa University 🌍",
      description: {
        p1: {
          heading: "",
          content:
            "At HALE-Human Rights and Inclusion Network, we’re excited to partner with the College of Law and Governance at Hawassa University and HUGADSSA to launch a transformative human rights advocacy training for young leaders. Through this initiative, we aim to equip university students with the knowledge and skills to champion human rights and foster a culture of inclusion and justice.",
        },
        p2: {
          heading: "",
          content:
            "Stay tuned to hear inspiring messages from key speakers and see highlights from this impactful event!",
        },
        p3: {
          heading: "",
          content: "",
        },
        p4: {
          heading: "",
          content: "",
        },
        p5: {
          heading: "",
          content: "",
        },
        p6: {
          heading: "",
          content: "",
        },
        p7: {
          heading: "",
          content: "",
        },
      },
    },
    {
      numOfImages: 4,
      images: [
        "https://i.postimg.cc/TYP6cSb7/img1.jpg",
        "https://i.postimg.cc/ncwtSkYH/img2.jpg",
        "https://i.postimg.cc/vZgwJV35/img3.jpg",
        "https://i.postimg.cc/g2Cbm2TQ/img4.jpg",
      ],
      name: "🌍 Planting the Seeds of Change: H-HRIN's Tree Planting Initiative in Hawassa, Ethiopia 🌱",
      description: {
        p1: {
          content:
            "Today, our team at HALE: Human Rights and Inclusion Network (H-HRIN) took a significant step towards environmental protection and climate justice by organizing a tree-planting event in Tabor Mountain, Hawassa, Ethiopia. This initiative is part of one of our ongoing commitment to creating a sustainable future for our communities and the planet.",
        },
        p2: {
          content:
            "In the heart of Hawassa ,Tabor mountain , we gathered with passionate volunteers, local community members, and environmental advocates to plant trees that will grow into powerful symbols of resilience and hope. By planting these trees, we are not only contributing to the restoration of our environment but also taking concrete action to combat climate change, which disproportionately affects vulnerable populations.",
        },
        p3: {
          heading: "Why Trees Matter",
          content:
            "Trees play a crucial role in our fight against climate change. They absorb carbon dioxide, one of the leading contributors to global warming, and provide oxygen that we all need to survive. But beyond their environmental benefits, trees are also a source of livelihood, food, and shelter for many communities in Ethiopia.",
        },
        p4: {
          heading: "Our Commitment to Climate Justice",
          content:
            "At H-HRIN, we believe that environmental protection and human rights are deeply interconnected. Climate change is not just an environmental issue; it is a social justice issue. Those who are least responsible for climate change often suffer the most from its impacts. That's why we are dedicated to promoting climate justice through initiatives like this tree-planting event. We aim to raise awareness about the importance of environmental stewardship and empower communities to take action.",
        },
        p5: {
          heading: "A Community Effort",
          content:
            "This tree-planting event was a collaborative effort, made possible by the support and participation of local residents, volunteers, and our dedicated team members. Together, we planted 500 trees across Tabor sub-city Tabor mountain in Hawassa, helping to green our city and contribute to global reforestation efforts.",
        },
        p6: {
          heading: "Looking Ahead",
          content:
            "This is just the beginning. We are committed to continuing our work in environmental protection and climate justice. We will keep engaging with communities, advocating for sustainable policies, and implementing projects that make a tangible difference.",
        },
        p7: {
          heading: "Join Us in one of Our Mission",
          content:
            "We invite everyone to join us in one of our mission to protect our environment and promote climate justice. Whether it's by planting trees, reducing carbon footprints, or advocating for change, every action counts. Together, we can create a greener, fairer, and more just world for all.",
        },
      },
    },
  ];

  const teams = [
    {
      name: "Derara Ansha Roba",
      image: "https://i.postimg.cc/J49mTfq5/Whats-App-Image-2025-08-09-at-9-58-59-PM.jpg",
      position:
        " Co-Founder and Executive Director of HALE: Human Rights and Inclusion Network (H-HRIN) |Lecturer and Researcher at Oromia State University| Consultant at Law, LawBridge Partners| Legal Trainer| Committed Human Rights and Peace Advocate| SDGs Enthusiast | Former Lecturer of Laws at Dilla University | Former Project Reviewer and Coordinator-UNHCR & Dilla University | Former Free Legal Aid Service Provider: European Union Sponsored | Moot Court Champion and Best Oralist of 2018 | LLB from Hawassa University |Postgraduate from UiT-The Arctic University of Norway",
      description: [
        "Derara Ansha Roba is Co-Founder and Executive Director of HALE: Human Rights and Inclusion Network (H-HRIN). He is a passionate advocate for human rights, peace, conflict dynamics, legal pluralism, and indigenous justice institutions, working to create inclusive societies where every voice is valued.",
        "He earned his LLB with great distinction from Hawassa University, where he won the Third National Moot Court Competition on International Humanitarian Law as Best Oralist and became the first student to represent the university at the All Africa Moot Court Competition in Arusha, Tanzania. His commitment to service was equally notable; under his leadership and active participation, the Hawassa University Free Legal Aid Centre received an Award of Excellence from Shashemene Woreda Court.",
        "He later obtained his Master of Philosophy in Indigenous Studies from UiT – The Arctic University of Norway, where he engaged in interdisciplinary studies combining law, anthropology, political science, history, and indigenous methodologies. His outstanding thesis on legal pluralism integrated doctrinal legal and ethnographic research methods, earning top recognition. His scholarship has since contributed to the field through publications in prestigious journals such as the African Journal on Conflict Resolution and the Journal of Law and Conflict Resolution.",
        "Currently, Derara serves as Executive Director at HALE, Lecturer and Researcher of Law at Oromia State University, and Legal Consultant at LawBridge Partners. He also works as a Legal Trainer on GBV, child rights, and peacebuilding, while continuing to advance human rights, peace, and the SDGs nationally and globally.",

      ],
    },
    {
      name: " Fenot Mekonen Hailu",
      image: "https://i.postimg.cc/N0rwRpT8/Photo.jpg",
      position:
        "Deputy Director & Lead for Partnership and External Representation, Human Rights and Inclusion Network (H-HRIN) | Legal Trainee, EU Delegation to AU | Disability Rights Advocate | Child, Governance & Business and Human Rights | Peace & SDGs Enthusiast | Former Associate Human Rights Officer, EHRC | Legal Assistant, FIDA Uganda | Intern, Centre for Human Rights, University of Pretoria | LLB, Haramaya University | LLM, University of Pretoria",
      description: [
        "Fenot Mekonen Hailu is a dedicated human rights advocate and co-founder of HALE: Human Rights and Inclusion Network (H-HRIN). Her work focuses on gender equality, disability, child rights, peace, governance, social justice, and the SDGs, aiming to create an inclusive society where everyone can thrive. She earned her LLB with distinction from Haramaya University College of Law, where she demonstrated exceptional leadership through initiatives such as providing free legal aid to underserved communities and holding key positions, including Vice President of the English Language Improvement Center, Executive Member of the Haramaya University Girls Union, Coordinator for the Female Law Students and Legal Professionals Network, and Women's Affairs Head of the Haramaya University Peace Forum.",
        "She holds an LLM in Human Rights and Democratisation in Africa from the University of Pretoria, South Africa. Her professional experience includes internships at the Centre for Human Rights (Freedom of Expression and Disability Units), serving as a Legal Assistant at FIDA Uganda, and working as an Intern and Associate Human Rights Officer at the Ethiopian Human Rights Commission. She also contributed to the AAU-UNHRC free legal aid project and participated in international programs such as the Aspire Institute and the Online Professional English Network at the University of Arizona. , and inclusion.",
        "Currently, she serves as Deputy Director & Lead for Partnership and External Representation at HALE: Human Rights and Inclusion Network and Legal Trainee at the European Union Delegation to the African Union, continuing her commitment to advancing human rights both locally and globally.",
      ],
    },
    {
      name: "Woyesa Woka Worana",
      image: "https://i.postimg.cc/Bbzr8F6T/photo-2026-03-16-09-39-14.jpg",
      position:
        "Human Rights and Policy Advocate",
      description: [
        "Woyesa is a graduate student at the Max Bell School of Public Policy, McGill University. He holds a law degree and serves as a human rights advocate with HALE-Human Rights and Inclusion Network.",
      ],
    },
    {
      name: "Dansita Asefa Adela",
      position:
        "Co-Founder at HALE: Human Rights and Inclusion Network| Gender Equality & Human Rights Advocate | Researcher |SDGs | Social Impact Leader",
      image: "https://i.postimg.cc/tJ1g4s8f/6-U5-A0123edited.jpg",
      description: [
        "Dansita is a distinguished researcher and advocate with extensive experience in the fields of human rights, gender equality, and sustainable development. As the Co-Founder of HALE: Human Rights and Inclusion Network (H-HRIN), Dansita plays a pivotal role in steering the organization’s mission to promote human rights, social inclusion, and gender equality across Ethiopia.",
        "Dansita holds a Master of Arts in International Relations and Foreign Diplomacy from the College of Law and Governance at Hawassa University, where she also earned her Bachelor of Laws (LLB) degree. Her academic background provides a strong foundation for her work in advocating for legal reforms, human rights education, and social justice.",
        "In her professional career, Dansita has served as the Regional Director at the Ethiopian Women Lawyers Association (EWLA), where she led initiatives aimed at empowering women and advancing their legal rights. Her leadership in this role has been instrumental in driving gender-sensitive legal practices and supporting vulnerable women through legal aid and advocacy.",
        "Dansita’s previous roles further highlight her commitment to social change and legal empowerment. As a Project Officer at the Resource Centre for Sustainable Change (RCSC), she coordinated projects focused on sustainable development and community empowerment. Additionally, she served as the Focal Person for Gender Mainstreaming at the Sidama Industrial Parks Development Corporation, where she worked to integrate gender perspectives into development projects and policies.",
        "Her experience as a Lecturer at Hawassa University, School of Law, and as a Human Rights Volunteer at the Hawassa University Legal Aid Center, reflects her dedication to education and capacity building in the legal field. Dansita’s work in academia and her volunteer efforts have contributed to the development of future legal professionals and the provision of essential legal services to marginalized communities.",
        "Dansita’s unwavering commitment to human rights, gender equality, and sustainable development continues to inspire her work at HALE: Human Rights and Inclusion Network, where she strives to create a more just and inclusive society.",
      ],
    },
    {
      name: "Tsion Gamme Gatisso",

      image: "https://i.ibb.co/gVzdr8K/tsion.jpg",
      position:
        "Co-Founder of HALE: Human Rights and Inclusion Network (H-HRIN) | Human Rights, Gender Equality, & SDGs Advocate | International Law graduate at University of New Haven",
      description: [
        "Tsion Gamme Gatisso is a dedicated advocate for human rights, gender equality, and the United Nations Sustainable Development Goals (SDGs). With an academic background in international law, she brings a global perspective to her work at HALE: Human Rights and Inclusion Network (H-HRIN), where she co-founded the organization to promote justice, inclusion, and human rights across Ethiopia and beyond.",

        "Currently, Tsion is an International Law graduate from the University of New Haven in East Haven, United States. She also holds an LLB in Law from the Ternopil Academy of National Economy at West Ukrainian National University, where she laid the foundation for her deep commitment to legal advocacy and social justice.",

        "Her professional journey includes participation in the Africa Sustainable Development Goals Mentorship Programme, where she gained a profound understanding of promoting inclusive societies, ensuring access to justice, and building accountable institutions. Tsion’s dedication to these causes was recognized with a Certificate of Excellence, highlighting her commitment to advancing the SDGs.",

        "In addition to her professional achievements, Tsion has volunteered at the YWCA in Addis Ababa, where she collaborated with individuals from diverse backgrounds. During her tenure, she played a pivotal role in fostering confidence and developing new skills among the participants, reflecting her passion for empowerment and social change.",

        "Tsion’s leadership, advocacy, and unwavering commitment to human rights and gender equality make her an invaluable asset to HALE: Human Rights and Inclusion Network. Her work continues to inspire and drive meaningful impact in the pursuit of a more just and inclusive world.",
      ],
    },
    
  ];

  const resources = [
    {
      name: "Gender Equality and Social Inclusion in Ethiopia Policy Brief Published",
      path: "./assets/resources/gesi_polciy_brief_published.pdf",
      imgPath: "./assets/resources/gender-equality-social-inclusion.png",
    },
    {
      name: "Handbook on the Rights of Children in Ethiopia",
      path: "./assets/resources/handbook_on_the_rights_of_children_in_Ethiopia.pdf",
      imgPath:
        "./assets/resources/handbook_on_the_rights_of_children_in_Ethiopia.png",
    },
    {
      name: "Inclusion of People with Disabilities in Ethiopia",
      path: "./assets/resources/inclusion-of-people-with-disabilities-in-ethiopia.pdf",
      imgPath:
        "./assets/resources/inclusion-of-people-with-disabilities-in-ethiopia.png",
    },
    {
      name: "Closing the Gender Gap: Women's Right in Ethiopia and Mexico",
      path: "./assets/resources/closing-the-gender-gap-ethiopia-and-mexico.pdf",
      imgPath:
        "./assets/resources/closing-the-gender-gap-ethiopia-and-mexico.png",
    },
    {
      name: "Hanbook on the Rights of the Child in Ethiopia",
      path: "./assets/resources/HandbookontheRightsoftheChildinEthiopia.pdf",
      imgPath: "./assets/resources/HandbookontheRightsoftheChildinEthiopia.png",
    },
    {
      name: "Ethiopian Environmental Policy: Challenges and Prospects on Sustainable Social and Economic Development",
      path: "./assets/resources/ethiopian-environmental-policy-challenges-and-prospects.pdf",
      imgPath:
        "./assets/resources/ethiopian-environmental-policy-challenges-and-prospects.png",
    },
    {
      name: "Ethiopia: Gender Issues Briefing Note",
      path: "./assets/resources/ethiopia-gender-issues-briefing-note.pdf",
      imgPath: "./assets/resources/ethiopia-gender-issues-briefing-note.png",
    },
    {
      name: "Disability Rights are Human Rights: Pushing Ethiopia Towards a rights-based Movement",
      path: "./assets/resources/disability-rights-are-human-rights.pdf",
      imgPath: "./assets/resources/disability-rights-are-human-rights.png",
    },
    {
      name: "Children's Rights in Contemporary Ethiopia",
      path: "./assets/resources/childrens-rights-in-contemporary-ethiopia.pdf",
      imgPath:
        "./assets/resources/childrens-rights-in-contemporary-ethiopia.png",
    },
    {
      name: "Conditions of Human Rights in Ethiopia in the Aftermath of Political Reform",
      path: "./assets/resources/Conditions_of_Human_Rights_in_Ethiopia.pdf",
      imgPath: "./assets/resources/Conditions_of_Human_Rights_in_Ethiopia.png",
    },
    {
      name: "Ethiopian Human Rights System: an overview",
      path: "./assets/resources/ethiopian-human-rights-system.pdf",
      imgPath: "./assets/resources/ethiopian-human-rights-system.png",
    },
    {
      name: "Potential for Democratization in Ethiopia",
      path: "./assets/resources/Potential-for-Democratization-in-Ethiopia.pdf",
      imgPath:
        "./assets/resources/Potential-for-Democratization-in-Ethiopia.png",
    },
    {
      name: "Sexual and Reproductive Health and Rights Infographic Snapshot",
      path: "./assets/resources/sexual-and-reproductive-health-and-rights.pdf",
      imgPath:
        "./assets/resources/sexual-and-reproductive-health-and-rights.png",
    },
    {
      name: "Youth People On Their Successes, Challenges, and Motivations For Youth-Led SRHR Advocacy in Ethiopia",
      path: "./assets/resources/Youth-SRHR-Advocacy-in-Ethiopia.pdf",
      imgPath: "./assets/resources/Youth-SRHR-Advocacy-in-Ethiopia.png",
    },
    {
      name: "Sexual and Reproductive Health and Rights in National Adaptation Plan Processes",
      path: "./assets/resources/SRHR-in-national-adaptation-plan.pdf",
      imgPath: "./assets/resources/SRHR-in-national-adaptation-plan.png",
    },
    {
      name: "Youth Participation in Ethiopia",
      path: "./assets/resources/youth-participation-in-ethiopia.pdf",
      imgPath: "./assets/resources/youth-participation-in-ethiopia.png",
    },
    {
      name: "Global Strategy for Social Inclusion and Protection",
      path: "./assets/resources/global-strategy-for-inclusion-and-protection.pdf",
      imgPath:
        "./assets/resources/global-strategy-for-inclusion-and-protection.png",
    },
    {
      name: "Social Inclusion and Human Rights",
      path: "./assets/resources/social-inclusion-and-human-rights.pdf",
      imgPath: "./assets/resources/social-inclusion-and-human-rights.png",
    },
    {
      name: "Inclusive Sustainable Development: a human's right perspective",
      path: "./assets/resources/COSUST_final_published.pdf",
      imgPath: "./assets/resources/COSUST_final_published.png",
    },
    {
      name: "Guidance Note on Integrating Health Equity, Gender Equality, Disability Inclusion, and Human Rights in WHO Evaluations",
      path: "./assets/resources/guidance-note-on-integrating.pdf",
      imgPath: "./assets/resources/guidance-note-on-integrating.png",
    },
    {
      name: "Human Rights, Equity and Inclusion Policy",
      path: "./assets/resources/Human_Rights_Equity_Inclusion_Policy.pdf",
      imgPath: "./assets/resources/Human_Rights_Equity_Inclusion_Policy.png",
    },
  ];

  return (
    <GeneralContext.Provider
      value={{
        jobs,
        programs,
        events,
        teams,
        resources,
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
