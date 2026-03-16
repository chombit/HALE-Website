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
      name: "Woyesa Woka Worana",
      image: "https://i.postimg.cc/k5SxcjDG/6U5A9080.jpg",
      position:
        "Founder of HALE: Human Rights and Inclusion Network (H-HRIN) | Human Rights Lawyer | Policy Leader & Advocate | Climate Justice Activist | Social Impact Leader | Inclusion Champion | SDG Advocate | Gold Medalist",
      description: [
        "Woyesa is the founder of HALE: Human Rights and Inclusion Network (H-HRIN), a youth-led civil society organization dedicated to advancing human rights, fostering inclusion, and empowering marginalized communities. As a Human Rights Lawyer and Policy Advocate, Woyesa commited to advancing human rights, develops and promotes inclusive policies that protect vulnerable populations, advance gender equality, and strengthen democratic governance.",
        "With a passion for social impact, Woyesa also founded KEAB Africa Community Development and Human Rights Promotion Organization (KACDHRPO), leading efforts in community-centered justice, environmental protection, and civic engagement. Believing in the power of policy reform and grassroots advocacy, they are committed to driving meaningful, sustainable change.",
        "A distinguished academic, Woyesa graduated with honors from Hawassa University, earning an LLB and the prestigious Gold Medal Award for Academic Excellence. Their thesis, 'Recognition of Formal and Substantive Gender Equality and Policies under Ethiopian Labor Law,' explored gaps in labor law implementation and proposed strategies for gender-inclusive reforms. Woyesa has also contributed to research on women’s land rights within Ethiopia’s plural justice system, highlighting critical intersections of gender equality and legal frameworks.",

        "Beyond professional achievements, Woyesa is dedicated to community service, offering pro bono legal aid to underserved populations and mentoring young professionals. Through their work at H-HRIN and beyond, Woyesa strives to advance the Sustainable Development Goals (SDGs) and foster a future of inclusion, justice, and sustainability."
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
      name: "Dr. Shiferaw Muleta Eyana (PhD)",
      position:
        "Associate Professor | Tourism Entrepreneurship Development Expert | Co-founder & Board Member, HALE: Human Rights and Inclusion Network |SDGs & Human Rights Rights Advocate",
      image: "https://i.postimg.cc/WzKKSxmc/shif-new-photo.jpg",
      description: [
        "Dr. Shiferaw Muleta Eyana is a distinguished academic and expert in Tourism Entrepreneurship Development, currently serving as an Associate Professor at the College of Development Studies, Addis Ababa University (AAU). With a rich academic background in geography and environmental studies, Dr. Shiferaw has devoted over eighteen years to teaching and research across various higher education institutions in Ethiopia.",
        "Recently, Dr. Shiferaw was elected as an Executive Member of AAU's Teacher Association, further demonstrating his leadership and dedication to advancing education and academic governance in Ethiopia.",
        "Dr. Shiferaw earned his PhD from Vrije Universiteit Amsterdam, where he successfully defended his dissertation titled 'Entrepreneurial Behaviour and Firm Performance of Ethiopian Tour Operators' in November 2017. His academic journey also includes a Bachelor of Arts in Geography and History and a Master of Science in Geography and Environmental Studies from Kotebe Metropolitan University and Addis Ababa University, respectively.",
        "At AAU, Dr. Shiferaw is actively engaged in numerous initiatives, including PhD curriculum design and MA curriculum reviews in Tourism Development and Management (TDDM). He contributes significantly to the academic community as a member of various committees, such as the National Conference of CDS and the Strategic Directions of the CDS, reflecting his collaborative and forward-thinking approach.",
        "Dr. Shiferaw's previous roles include PhD Researcher at the Center for Entrepreneurship, Vrije Universiteit Amsterdam, and Lecturer at the Institute of Development Studies, Addis Ababa University. He has also served as a Lecturer at the Department of Geography and Environmental Education, AAU, and Dilla University, as well as a Teacher Educator at Arbaminch Teacher Training College.",
        "Beyond his academic pursuits, Dr. Shiferaw has played a crucial role in Ethiopia's democratic processes, serving as a Moderator of Inter-party Dialogue (IPD) under the National Election Board of Ethiopia (NEBE). His commitment to impartiality and fairness led to his unanimous selection by the Joint Council of Political Parties of Ethiopia in 2019. Additionally, he has contributed as an Environmentalist for the UN-Habitat's Regional Development and Spatial Planning project, focusing on regions such as Sidama and Southwest Ethiopia.",
        "As a co-founder and board member of the HALE: Human Rights and Inclusion Network, Dr. Shiferaw leverages his extensive experience in education, research, and public service to drive the organization's mission of promoting human rights, inclusion, and sustainable development. His work continues to inspire and influence both his students and colleagues, as well as the broader community.",
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
    {
      name: "Biniam Solomon Lale",
      position:
        "Board Chairman at HALE: Human Rights and Inclusion Network | President at Northern Sidaama Zone High Court | Former Judge | Legal Drafting Expert | LLM in International Law",
      image: "https://i.postimg.cc/XYRD14L8/6U5A8870.jpg",
      description: [
        "Biniam Solomon Lale is a distinguished legal professional and jurist with a profound commitment to justice, ethics, and human rights in Ethiopia. As the Board Chairman of HALE: Human Rights and Inclusion Network (H-HRIN), Biniam plays a pivotal role in guiding the organization’s strategic vision and ensuring its mission to promote human rights and social inclusion is achieved.",
        "Biniam holds a Master of Laws (LLM) degree in International Laws from Ethiopian Civil Service University, where he graduated with Great Distinction, earning an Excellent grade for his thesis titled 'The Assessment of Practical Implementation of Prisoners' Rights at Some of the Former SNNPRS Prisons.' He also holds a Degree of Laws (LLB) from the School of Law at Jimma University, where he graduated with Distinction. His academic achievements reflect his deep expertise and dedication to the field of law.",
        "Currently, Biniam serves as the President of the Northern Sidaama Zone High Court. In this prominent role, he leads the judiciary with integrity and a steadfast commitment to delivering justice. His leadership is characterized by a strong adherence to ethical principles and a relentless pursuit of fair legal outcomes.",
        "Biniam’s career is marked by significant judicial and ethical contributions. He was not only one of the key drafters of the Sidama National Regional State Constitution but was also actively engaged in drafting all the establishing laws for the Sidama National Regional State as a member of the region's Legal Drafting Taskforce. These contributions have been instrumental in shaping the legal and governance framework of the region.",
        "In addition to his judicial roles, Biniam has been a strong advocate for ethical governance. He previously worked as the Ethics Education and Trainings Advisor and Trainer of Corruption Crime Laws at the Former Southern Nations, Nationalities, and Peoples' Region (SNNPR) Ethics and Anti-Corruption Commission, where he played a crucial role in promoting transparency and combating corruption.",
        "As the Board Chairman of HALE: Human Rights and Inclusion Network, Biniam Solomon Lale brings a wealth of experience, a passion for justice, and a commitment to ethical leadership. His guidance is vital to the organization’s efforts to advance human rights, foster social inclusion, and uphold the rule of law in Ethiopia.",
      ],
    },
    {
      name: "Meseret Melke Shibru ",
      position:
        "Co-Founder & Board Vice Chair of HALE: Human Rights and Inclusion Network | Legal Expert & Advocate for Human Rights",
      image: "https://i.postimg.cc/HLQcX9j2/6U5A8092.jpg",
      description: [
        "Ms. Meseret Melke Shibru is an accomplished legal professional and passionate advocate for human rights, serving as the Co-Founder and Board Vice Chair of HALE: Human Rights and Inclusion Network. With a strong academic background and extensive experience in law, Ms. Meseret brings a wealth of knowledge and dedication to advancing justice and human rights in Ethiopia.",
        "Ms. Meseret obtained her LLB degree in Law with Distinction from Hawassa University, where she excelled academically and laid the foundation for her legal career. She furthered her education by earning an LLM degree in International Law from Ethiopian Civil Service University, equipping herself with specialized knowledge to navigate complex legal challenges on both national and international levels.",
        "In her current role, Ms. Meseret serves as the Head of the Public Attorney's Regional Council Office at the Sidama Justice Bureau. In this capacity, she oversees legal proceedings and ensures that justice is administered fairly and effectively across the region.",
        "Ms. Meseret’s previous roles demonstrate her commitment to combating human rights abuses and illegal activities. She has served as the Head of the Illegal Human Trafficking and Human Rights Office at the Sidama Attorney General Office, where she played a pivotal role in addressing human trafficking and protecting vulnerable individuals. Her judicial experience includes positions as an Assistant Judge at the Sidama Zone High Court and the Dalle Woreda Court, where she made significant contributions to upholding the rule of law.",
        "During her final year at Hawassa University, Ms. Meseret also served as a Paralegal for the Addis Ababa University Human Rights Center, where she gained invaluable experience in human rights advocacy and legal support, further solidifying her dedication to justice and equality.",
        "As a Co-Founder and Board Vice Chair of HALE: Human Rights and Inclusion Network, Ms. Meseret leverages her extensive legal expertise and passion for human rights to help steer the organization toward achieving its mission. Her leadership and commitment are instrumental in shaping initiatives that promote justice, human rights, and social inclusion in Ethiopia and beyond.",
      ],
    },
    {
      name: "Wondewosen Yohanis Jekamo",
      position:
        "Co-Founder & Board Member at HALE: Human Rights and Inclusion Network |Lecturer | Legal Expert & Advocate for Justice",
      image: "https://i.postimg.cc/zf29CGb8/6U5A8862.jpg",
      description: [
        "Wondewosen Yohanis Jekamo is a distinguished legal professional and academic, serving as a Co-Founder and Board Member of HALE: Human Rights and Inclusion Network. With a profound commitment to justice, human rights, and legal education, Wondewosen brings a wealth of experience and expertise to the organization, contributing to its mission of promoting inclusion and protecting human rights.",
        "Wondewosen holds an LLM in Commercial Law from Hawassa University and an LLB in Law from Jimma University, where he graduated with distinction. His academic achievements have laid a strong foundation for his impactful career in the legal field.",
        "Currently, Wondewosen serves as a Lecturer at Hawassa University Law School, where he is dedicated to educating the next generation of legal professionals. In addition to his academic role, he works as a lawyer and consultant, offering legal expertise and guidance in various areas of law.",
        "Wondewosen's career is marked by significant judicial and legal roles. He previously served as a Supreme Court Judge in the Southern Nations, Nationalities, and Peoples' Region (SNNPR), where he was instrumental in upholding justice and the rule of law at the highest level within the region. His judicial experience also includes positions as a Judge at the Hawassa City High Court and the Hadiya Zone High Court, where he made substantial contributions to the legal system.",
        "In addition to his judicial roles, Wondewosen has also served as a Trainer at the SNNPR Judicial Center, where he played a key role in enhancing the skills and knowledge of judicial officers within the region. His early career included serving as a Public Prosecutor at the Hadiya Zone Justice Office, where he was committed to ensuring justice and fairness in legal proceedings.",
        "As a Co-Founder and Board Member of HALE: Human Rights and Inclusion Network, Wondewosen leverages his extensive legal experience and passion for human rights to help guide the organization in its efforts to create a more just and inclusive society. His dedication to justice, legal education, and human rights advocacy makes him an invaluable asset to the organization and its mission.",
      ],
    },
    {
      name: "Ashenafi Argata Yona",
      position:
        "Board Member, HALE: Human Rights and Inclusion Network | Dean at Hawassa Tegbar-ID Polytechnic College | Leadership & Civil Engineering Expert",
      image: "https://i.postimg.cc/nL1MScZb/6U5A8848.jpg",
      description: [
        "Ashenaf Argata Yona is a distinguished leader in the fields of education, management, and civil engineering. With an impressive academic background and extensive professional experience, Ashenaf has dedicated his career to advancing technical education and fostering leadership development in Ethiopia.",
        "Ashenaf holds a Master of Arts in Leadership and Management from the FDRE TVET Institute, where he graduated with great distinction. His advanced studies in leadership and management have equipped him with the skills to effectively guide educational institutions and drive organizational success. Additionally, he earned a Bachelor’s Degree in Civil Engineering from Hawassa University, graduating with distinction. His strong technical foundation in civil engineering has been instrumental in his professional roles, where he has applied his expertise to urban development and educational infrastructure.",
        "Currently, Ashenaf serves as the Dean of Hawassa Tegbar-ID Polytechnic College, a role he has held since Jan 2023. In this capacity, he oversees the college’s academic programs, faculty development, and institutional growth, ensuring that students receive a high-quality education that prepares them for the demands of the workforce. His leadership has been pivotal in positioning the college as a leading institution in technical and vocational education in the region.",
        "Before his tenure as Dean, Ashenaf was the Vice Dean at Hawassa City Administration’s Hawela Tula TVET College, where he played a key role in academic administration and institutional management. His experience also includes serving as a Lecturer at Silte Zone Dalocha Construction and Industrial College, where he imparted his knowledge and skills to aspiring engineers and technical professionals.",
        "In addition to his academic roles, Ashenaf has contributed to urban development as a Land Management and Preparation Expert at Bona Zurya Woreda Urban Development. His work in this area has involved planning and executing land development projects that support urban growth and infrastructure development.",
        "As a Board Member of HALE: Human Rights and Inclusion Network, Ashenaf brings his leadership expertise and commitment to education and development to the organization. He is passionate about promoting human rights, inclusion, and sustainable development, and his insights are invaluable in guiding the organization’s strategic direction.",
        "Ashenaf is committed to advancing technical education, fostering leadership, and contributing to Ethiopia's sustainable development. His work continues to inspire future generations of leaders, engineers, and professionals.",
      ],
    },
    {
      name: "Fenot Mekonen Hailu",
      position:
        "Co-Founder, HALE: Human Rights and Inclusion Network (H-HRIN) | Gender Issues and Human Rights Advocate | SDGs Enthusiast | LLM in Human Rights and Democratization in Africa Candidate at the University of Pretoria",
      image: "https://i.postimg.cc/TPxQVKNr/Team-photo.jpg",
      description: [
        "Fenot Mekonen Hailu is a dedicated human rights advocate and a co-founder of HALE: Human Rights and Inclusion Network (H-HRIN). With a deep commitment to gender equality, social justice, and the United Nations Sustainable Development Goals (SDGs), Fenot's work is centered on creating an inclusive society where everyone can thrive.",

        "She earned her LL.B. with distinction from Haramaya University College of Law in August 2022. During her academic journey, Fenot demonstrated exceptional leadership and advocacy, providing free legal aid to underserved communities and holding key leadership positions such as Vice President of the English Language Improvement Center, Executive Member of the Haramaya University Girls Union, Coordinator for Female Law Students and Legal Professionals Network, and Women's Affairs Head of the Haramaya University Peace Forum.",

        "After graduation, Fenot continued her commitment to human rights by interning at the Ethiopian Human Rights Commission under the socio-economic department and serving as a paralegal for the AAU-UNHRC free legal aid project. Her dedication to social impact is further exemplified by her involvement with the Aspire Institute and the Online Professional English Network at George Mason University.",

        "Currently, Fenot is pursuing her LLM in Human Rights and Democratization in Africa at the University of Pretoria, South Africa. Her ongoing internships with the Freedom of Expression, Information, and Digital Rights Unit, the Disability Unit at the Centre for Human Rights, and the Network of Public Interest Lawyers in Kampala, Uganda, reflect her unwavering commitment to advancing human rights on a global scale.",

        "Fenot's passion for gender issues, human rights, and sustainable development drives her work at H-HRIN, where she plays a crucial role in shaping initiatives that promote justice, equality, and inclusion for all.",
      ],
    },
    {
      name: "Essey Peteros Firiso",
      position:
        "Co-Founder of HALE: Human Rights and Inclusion Network (H-HRIN) | President of Hawassa University Student Union | Vice President of Ethiopian Higher Education Institutions Student Union | Human Rights and Social Justice Advocate",
      image: "https://i.postimg.cc/s239Bt1m/essey.jpg",
      description: [
        "Essey is an LLB candidate at Hawassa University with a profound dedication to human rights and social justice. As the Founder of Tesfa Counseling Association, Essey has established a platform that provides essential support and guidance to individuals in need, reflecting his commitment to making a positive impact in his community.",
        "In his role as President of the Hawassa University Student Union, Essey leads initiatives that empower students and enrich their educational experiences. His leadership extends beyond the university, serving as Vice President of the Ethiopian Higher Education Institutions Student Union, where he advocates for the rights and interests of students at a national level.",
        "Essey’s unwavering commitment to social causes, combined with his leadership in advancing human rights, makes him a vital part of HALE: Human Rights and Inclusion Network. As Co-Founder of H-HRIN, Essey is instrumental in driving the organization’s mission to foster a just and inclusive society for all.",
      ],
    },
    {
      name: "Tafesse Tekle Sokare",
      position:
        "Co-Founder at HALE: Human Rights and Inclusion Network | Lawyer at Commercial Bank of Ethiopia | Human Rights Advocate | Former Judge | LLM in Commercial Law",
      image: "https://i.postimg.cc/fbn3nhnC/6U5A7019.jpg",
      description: [
        "Tafesse Tekle Sokare is a seasoned legal expert with a deep commitment to justice, human rights, and social equity. As one of the Co-Founders of HALE: Human Rights and Inclusion Network (H-HRIN), Tafesse has been instrumental in establishing the organization’s foundation and driving its mission to advocate for human rights and promote social inclusion in Ethiopia.",
        "Tafesse holds a Master of Laws (LLM) in Commercial Law from Hawassa University, where he specialized in the intricacies of commercial law and its impact on both local and global economies. He also earned a Degree of Laws (LLB) from the School of Law at Hawassa University, graduating with Distinction, a testament to his academic excellence and profound understanding of the legal field.",
        "Currently, Tafesse serves as a Lawyer at the Commercial Bank of Ethiopia, where he applies his extensive legal knowledge to navigate the complex legal landscape of the banking sector. His role is pivotal in ensuring that the bank operates within the bounds of commercial law while upholding the highest standards of legal compliance and ethical practices.",
        "Tafesse’s career is distinguished by a diverse range of legal experiences. He has served as a General Attorney for the Sidama Region Attorney, where he provided legal counsel on matters of regional and national significance. His role as a Customs and Tax Related Crime Investigator and Prosecutor at the Ethiopia Revenue and Customs Authority involved rigorous investigations and prosecutions aimed at maintaining the integrity of Ethiopia’s revenue collection system.",
        "Moreover, Tafesse’s judicial experience is notable. He has served as a Judge at both the Sidama Zone High Court and the Hawassa Zuria First Instance Court. In these capacities, he was responsible for delivering justice in complex legal cases, demonstrating fairness, impartiality, and a deep commitment to the rule of law.",
      ],
    },
    {
      name: "Maregnesh Mengesha Worana",
      image: "https://i.postimg.cc/rFbMFwj6/6U5A9360.jpg",
      position:
        "Co-Founder & Communications Officer at HALE: Human Rights and Inclusion Network | Journalism and Communication Graduate | Human Rights & Gender Equality Advocate ",
      description: [
        "Maregnesh is a dedicated advocate for human rights and social inclusion, currently serving as the Communications Officer at HALE: Human Rights and Inclusion Network. With a strong passion for using media to drive positive change, Maregnesh brings her expertise in journalism and communication to amplify the voices of marginalized and vulnerable communities.",
        "Maregnesh graduated with distinction from Wollo University, earning a Bachelor of Arts degree in Journalism and Communication. Her academic journey was marked by her insightful research on 'The Impact of Facebook in the Case of Wollo University Students,' reflecting her keen interest in the intersection of social media and community engagement.",
        "Prior to her role at HALE: Human Rights and Inclusion Network, Maregnesh served as a Volunteer Event Coordinator at Wollo University, where she honed her skills in organizing impactful events and fostering community collaboration. Her commitment to advancing human rights and her dedication to effective communication make her an invaluable asset to the HALE: Human Rights and Inclusion Network team.",
      ],
    },
    {
      name: "Daniel Tamirat Maru",
      position:
        "Accountant of HALE: Human Rights and Inclusion Network | Finance Expert & Consultant",
      image: "https://i.postimg.cc/SQt6yV92/6U5A7716.jpg",
      description: [
        "Daniel Tamirat Maru is a seasoned finance professional with extensive experience in accounting and financial management. He serves as the Accountant at HALE: Human Rights and Inclusion Network, where he plays a crucial role in managing the organization's financial activities and ensuring transparency and accountability in financial reporting.",
        "Daniel is General Manager of Daniel Tamirat Authorized Accounting firm and holds a Master of Arts Degree in Business Administration with a specialization in Accounting from Dilla University, as well as a Bachelor of Arts Degree in Accounting from Hawassa University. His strong educational background has equipped him with the knowledge and skills needed to excel in various financial roles.",
        "Throughout his career, Daniel has held several significant positions in the finance sector. He served as a Financial Consultant at Isabella Socks and Manufacturing PLC, where he provided strategic financial guidance and contributed to the company's financial stability. At Indochine Apparel PLC, he worked as a Finance Senior Executive, overseeing financial operations and ensuring compliance with financial regulations.",
        "Daniel also gained valuable experience as an Assistant Finance Manager at JP Textile Ethiopia Company, where he managed financial planning and analysis, budgeting, and financial reporting. Additionally, he served as a Senior Accountant at PVH Arvind Manufacturing PLC, where he was responsible for maintaining accurate financial records and supporting the company's financial goals.",
        "With his deep expertise in accounting and finance, Daniel is dedicated to supporting HALE's mission by ensuring the organization's financial health and integrity. His commitment to excellence and his ability to navigate complex financial challenges make him an invaluable asset to the team.",
      ],
    },

    {
      name: "Basleal Mekonen Mengesha",
      position:
        "Co-Founder & Technology and Innovation Lead Officer at HALE: Human Rights and Inclusion Network | Technology Enthusiast",
      image: "https://i.postimg.cc/L4Cn4PFn/6U5A7482.jpg",
      description: [
        "Basleal Mekonen Mengesha is a dynamic and visionary leader with a passion for technology, youth empowerment, and community development. As a co-founder of HALE: Human Rights and Inclusion Network, Basleal brings a unique blend of expertise in information systems, youth engagement, and entrepreneurship to the organization's mission of promoting human rights and inclusion.",

        "Basleal holds a Bachelor's Degree in Information Systems from Hawassa University, where he developed a strong foundation in technology and its applications in solving real-world problems. His academic background equips him with the skills to leverage digital tools and platforms in driving social change.",

        "Basleal’s entrepreneurial spirit is evident in his role as the founder of Skill Connect Ethiopia, a gig website designed to connect skilled professionals with opportunities in various sectors. This platform not only bridges the gap between talent and opportunity but also empowers individuals to monetize their skills and contribute to the economy.",

        "In addition to his work with Skill Connect Ethiopia, Basleal is the co-founder of Unitatem Joint Venture Association, a collaborative savings partnership inspired by the traditional Ethiopian /'ekub/ system. This initiative reflects his commitment to financial empowerment and community building, providing members with a structured approach to saving and financial growth.",
        "Basleal's dedication to youth empowerment is demonstrated through his volunteer work as the Youth Engagement Coordinator at Hawassa University Student Union. In this role, he has been instrumental in organizing and leading initiatives that engage young people in meaningful activities, fostering leadership, and promoting active participation in community service.",
        "Through his various roles and initiatives, Basleal Mekonen Mengesha continues to inspire and empower young people across Ethiopia. His work at the intersection of technology, entrepreneurship, and community development positions him as a key driver of positive change, both within HALE and in the broader community.",
      ],
    },
    {
      name: "Nahom Worku Hanka",
      position:
        "Co-Founder and Digital Officer at HALE: Human Rights and Inclusion Network (H:HRIN) |Software Developer",
      image: "https://i.postimg.cc/HWcnXw1r/nahom.jpg",
      description: [
        "Nahom Worku Hanka is a recent Computer Science graduate with a deep commitment to leveraging technology to advance human rights, social inclusion, and justice. As Co-Founder and Digital Officer at HALE: Human Rights and Inclusion Network, Nahom applies his technical expertise to develop innovative digital solutions that support H:HRIN’s mission of promoting human rights and social equity.",
        "His academic journey, enriched by successful software development projects, has equipped him with strong skills in programming, mobile application development, and software engineering. Nahom's internship experience in creating an Android-based healthcare system reinforced his passion for developing technologies that positively impact people's lives. Driven by a desire to use technology as a force for good, Nahom is dedicated to contributing meaningfully to H:HRIN’s vision of a more just and inclusive society.",
      ],
    },
    {
      name: "Fekadu Paulos Gujo",
      position:
        "Co-founder, HALE: Human Rights and Inclusion Network | Assistant Professor of Law | PhD Candidate",
      image: "https://i.postimg.cc/0yxxpmpr/photo-2024-10-12-06-43-10.jpg",
      description: [
        "Fekadu Paulos Gujo is an accomplished legal professional and academic with a deep commitment to human rights and social justice. He holds an LL.B and LL.M and is currently an Assistant Professor of Law at Hawassa University, where he also pursues his PhD. His academic career has been marked by a passion for teaching and mentoring the next generation of legal experts, alongside his active work as an Attorney and Consultant at Law.",
        "Fekadu brings a wealth of experience to HALE: Human Rights and Inclusion Network, having held significant leadership roles in public service. He previously served as the Head of both the Trade and Industry Bureau and the Public Service and Human Resource Development Bureau of Sidama Region, where he played a key role in shaping policies that promote good governance and economic development. His judicial experience as a former judge at Hawassa City High Court adds further depth to his legal expertise, especially in matters of justice and governance.",
        "As a co-founder of H-HRIN, Fekadu is dedicated to advancing the organization's mission of fostering inclusion, equality, and human rights. His extensive experience in law, governance, and public service uniquely positions him to contribute to H-HRIN’s goal of creating a more just and equitable society, especially for marginalized and vulnerable communities.",
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
