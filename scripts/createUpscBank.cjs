const fs = require('fs');

console.log("Generating UPSC Principal CRT 120-Question Bank...");

// 8 Areas x 15 questions = 120 questions
const areas = [
  {
    unitId: 'upsc-area-1',
    topic: 'General Knowledge & Contemporary Issues',
    topicHi: 'सामान्य ज्ञान एवं समसामयिक सामाजिक, आर्थिक व सांस्कृतिक मुद्दे',
    questions: [
      {
        subtopic: 'National & International Current Affairs',
        qEn: 'Which international forum hosted the 2023 G20 Leaders\' Summit under India\'s presidency with the theme "Vasudhaiva Kutumbakam"?',
        qHi: 'भारत की अध्यक्षता में "वसुधैव कुटुंबकम" विषय के साथ 2023 के जी-20 शिखर सम्मेलन की मेजबानी किस अंतरराष्ट्रीय स्थल पर की गई?',
        optEn: ['Bharat Mandapam, New Delhi', 'Yashobhoomi, Dwarka', 'Vigyan Bhawan, New Delhi', 'Statue of Unity, Gujarat'],
        optHi: ['भारत मंडपम, नई दिल्ली', 'यशोभूमि, द्वारका', 'विज्ञान भवन, नई दिल्ली', 'स्टैच्यू ऑफ यूनिटी, गुजरात'],
        correct: 0,
        expEn: 'The 18th G20 Summit in September 2023 was held at the newly inaugurated International Exhibition-cum-Convention Centre (IECC) complex named Bharat Mandapam at Pragati Maidan, New Delhi.',
        expHi: '18वां जी-20 शिखर सम्मेलन सितंबर 2023 में प्रगति मैदान, नई दिल्ली स्थित भारत मंडपम में आयोजित किया गया था।',
        diff: 'Easy',
        tags: ['G20', 'Current Affairs', 'Bharat Mandapam']
      },
      {
        subtopic: 'Indian Constitution & Democratic Institutions',
        qEn: 'Under Article 21A of the Constitution of India, free and compulsory education is guaranteed as a Fundamental Right to children of which age group?',
        qHi: 'भारतीय संविधान के अनुच्छेद 21A के अंतर्गत किस आयु वर्ग के बच्चों के लिए निःशुल्क एवं अनिवार्य शिक्षा को मौलिक अधिकार घोषित किया गया है?',
        optEn: ['3 to 6 years', '6 to 14 years', '6 to 18 years', '5 to 15 years'],
        optHi: ['3 से 6 वर्ष', '6 से 14 वर्ष', '6 से 18 वर्ष', '5 से 15 वर्ष'],
        correct: 1,
        expEn: 'Article 21A, inserted by the 86th Constitutional Amendment Act 2002, mandates that the State shall provide free and compulsory education to all children of the age of 6 to 14 years.',
        expHi: '86वें संविधान संशोधन अधिनियम 2002 द्वारा जोड़े गए अनुच्छेद 21A के अनुसार 6 से 14 वर्ष के बच्चों के लिए निःशुल्क व अनिवार्य शिक्षा मौलिक अधिकार है।',
        diff: 'Easy',
        tags: ['Article 21A', 'Constitution', 'Fundamental Rights']
      },
      {
        subtopic: 'Socio-Economic Development & Census Data',
        qEn: 'According to the 2011 Census of India, which state recorded the highest literacy rate in the country?',
        qHi: '2011 की भारतीय जनगणना के अनुसार, देश में सर्वाधिक साक्षरता दर किस राज्य में दर्ज की गई थी?',
        optEn: ['Kerala (94.0%)', 'Mizoram (91.3%)', 'Goa (88.7%)', 'Himachal Pradesh (82.8%)'],
        optHi: ['केरल (94.0%)', 'मिजोरम (91.3%)', 'गोवा (88.7%)', 'हिमाचल प्रदेश (82.8%)'],
        correct: 0,
        expEn: 'According to Census 2011, Kerala had the highest literacy rate at 94.0%, followed by Lakshadweep (91.8%) and Mizoram (91.3%).',
        expHi: 'जनगणना 2011 के अनुसार केरल 94.0% साक्षरता के साथ देश में शीर्ष स्थान पर रहा।',
        diff: 'Easy',
        tags: ['Census 2011', 'Literacy Rate', 'Socio-Economic']
      },
      {
        subtopic: 'Sustainable Development Goals',
        qEn: 'Which United Nations Sustainable Development Goal (SDG) specifically targets "Quality Education" to ensure inclusive and equitable quality education and lifelong learning opportunities?',
        qHi: 'संयुक्त राष्ट्र के सतत विकास लक्ष्यों (SDGs) में से कौन सा लक्ष्य विशेष रूप से "गुणवत्तापूर्ण शिक्षा" (Quality Education) और समावेशी अधिगम के अवसरों को सुनिश्चित करने के लिए निर्धारित है?',
        optEn: ['SDG 1', 'SDG 3', 'SDG 4', 'SDG 5'],
        optHi: ['एसडीजी 1', 'एसडीजी 3', 'एसडीजी 4', 'एसडीजी 5'],
        correct: 2,
        expEn: 'SDG 4 aims to "ensure inclusive and equitable quality education and promote lifelong learning opportunities for all" by 2030.',
        expHi: 'एसडीजी 4 (SDG 4) वर्ष 2030 तक सभी के लिए समावेशी व गुणवत्तापूर्ण शिक्षा तथा आजीवन सीखने के अवसर सुनिश्चित करने का वैश्विक लक्ष्य है।',
        diff: 'Medium',
        tags: ['SDG 4', 'Quality Education', 'United Nations']
      },
      {
        subtopic: 'Indian Cultural Heritage & Science',
        qEn: 'Which indigenously developed lunar mission achieved India\'s historic soft landing near the Moon\'s south pole in August 2023?',
        qHi: 'अगस्त 2023 में चंद्रमा के दक्षिणी ध्रुव के निकट ऐतिहासिक सॉफ्ट लैंडिंग करने वाला भारत का स्वदेशी चंद्र मिशन कौन सा था?',
        optEn: ['Chandrayaan-1', 'Chandrayaan-2', 'Chandrayaan-3', 'Aditya-L1'],
        optHi: ['चंद्रयान-1', 'चंद्रयान-2', 'चंद्रयान-3', 'आदित्य-एल1'],
        correct: 2,
        expEn: 'ISRO\'s Chandrayaan-3 mission successfully landed its Vikram lander near the lunar south pole on August 23, 2023, making India the first country to land in the south polar region.',
        expHi: 'इसरो के चंद्रयान-3 मिशन के विक्रम लैंडर ने 23 अगस्त 2023 को चंद्रमा के दक्षिणी ध्रुव के निकट सफल लैंडिंग कर इतिहास रचा।',
        diff: 'Easy',
        tags: ['Chandrayaan-3', 'ISRO', 'Science & Tech']
      },
      {
        subtopic: 'Contemporary Economic Issues',
        qEn: 'What is the primary role of the Unified Payments Interface (UPI) developed by the National Payments Corporation of India (NPCI)?',
        qHi: 'भारतीय राष्ट्रीय भुगतान निगम (NPCI) द्वारा विकसित एकीकृत भुगतान इंटरफेस (UPI) का मुख्य उद्देश्य क्या है?',
        optEn: ['To regulate physical currency printing', 'To enable real-time inter-bank digital peer-to-peer and person-to-merchant payments', 'To provide long-term corporate agricultural loans', 'To issue sovereign green bonds'],
        optHi: ['कागजी मुद्रा छपाई को विनियमित करना', 'रीयल-टाइम अंतर-बैंक पीयर-टू-पीयर और मर्चेंट डिजिटल भुगतान सक्षम करना', 'दीर्घकालिक कृषि ऋण देना', 'ग्रीन बॉन्ड जारी करना'],
        correct: 1,
        expEn: 'UPI powers multiple bank accounts into a single mobile application, facilitating immediate money transfers 24x7 across institutions.',
        expHi: 'यूपीआई वास्तविक समय में चौबीसों घंटे मोबाइल आधारित अंतर-बैंक वित्तीय लेनदेन की सुविधा प्रदान करता है।',
        diff: 'Easy',
        tags: ['UPI', 'Digital Economy', 'NPCI']
      },
      {
        subtopic: 'National & International Current Affairs',
        qEn: 'Who is the constitutional head of state and Supreme Commander of the Indian Armed Forces?',
        qHi: 'भारतीय राज्य का संवैधानिक प्रमुख तथा भारतीय सशस्त्र बलों का सर्वोच्च सेनापति कौन होता है?',
        optEn: ['The Prime Minister of India', 'The President of India', 'The Chief of Defence Staff', 'The Chief Justice of India'],
        optHi: ['भारत का प्रधानमंत्री', 'भारत का राष्ट्रपति', 'चीफ ऑफ डिफेंस स्टाफ', 'भारत का मुख्य न्यायाधीश'],
        correct: 1,
        expEn: 'Under Article 53 of the Constitution, the executive power of the Union is vested in the President of India, who is also the supreme commander of the defence forces.',
        expHi: 'संविधान के अनुच्छेद 53 के अनुसार संघ की कार्यपालिका शक्ति राष्ट्रपति में निहित है और वे रक्षा बलों के सर्वोच्च समादेशक होते हैं।',
        diff: 'Easy',
        tags: ['Constitution', 'President of India', 'Polity']
      },
      {
        subtopic: 'Indian Cultural Heritage & Science',
        qEn: 'The traditional Indian concept of "Panchakosha" (five sheaths of human personality) referenced in the National Curriculum Framework originates from which ancient Upanishad?',
        qHi: 'राष्ट्रीय पाठ्यचर्या रूपरेखा (NCF) में उल्लिखित व्यक्तित्व के विकास की "पंचकोश" अवधारणा किस प्राचीन उपनिषद से ली गई है?',
        optEn: ['Katha Upanishad', 'Taittiriya Upanishad', 'Mandukya Upanishad', 'Chandogya Upanishad'],
        optHi: ['कठोपनिषद', 'तैत्तिरीय उपनिषद', 'मांडूक्योपनिषद', 'छांदोग्य उपनिषद'],
        correct: 1,
        expEn: 'The Taittiriya Upanishad describes the five layers of human existence: Annamaya, Pranamaya, Manomaya, Vijnanamaya, and Anandamaya Kosha, integrated into NCF for holistic development.',
        expHi: 'तैत्तिरीय उपनिषद में अन्नमय, प्राणमय, मनोमय, विज्ञानमय और आनंदमय कोश का वर्णन है जिसे एनसीएफ ने समग्र बाल विकास हेतु अपनाया है।',
        diff: 'Medium',
        tags: ['Panchakosha', 'NCF', 'Taittiriya Upanishad']
      },
      {
        subtopic: 'Contemporary Social Issues',
        qEn: 'The "Beti Bachao, Beti Padhao" flagship initiative was launched to address which critical social and demographic challenge in India?',
        qHi: '"बेटी बचाओ, बेटी पढ़ाओ" राष्ट्रीय पहल भारत में किस प्रमुख सामाजिक और जनसांख्यिकीय चुनौती के समाधान हेतु शुरू की गई थी?',
        optEn: ['Decline in Child Sex Ratio (CSR) and promotion of girl child education', 'Eradication of malnutrition among urban working women only', 'Providing overseas university scholarships exclusively', 'Free distribution of tablets in private colleges'],
        optHi: ['बाल लिंगानुपात (CSR) में गिरावट रोकना तथा बालिकाओं की शिक्षा को प्रोत्साहन देना', 'केवल शहरी कामकाजी महिलाओं में कुपोषण दूर करना', 'विदेशों में उच्च शिक्षा हेतु विशेष छात्रवृत्ति', 'निजी कॉलेजों में मुफ्त टैबलेट वितरण'],
        correct: 0,
        expEn: 'Launched in 2015, Beti Bachao Beti Padhao addresses the declining Child Sex Ratio (CSR) and promotes girl-child empowerment through education and survival rights.',
        expHi: 'यह योजना बाल लिंगानुपात के सुधार तथा बालिकाओं की सुरक्षा व गुणवत्तापूर्ण शिक्षा को प्रोत्साहित करने के उद्देश्य से 2015 में शुरू की गई।',
        diff: 'Easy',
        tags: ['Beti Bachao Beti Padhao', 'Social Issues', 'Girl Child Education']
      },
      {
        subtopic: 'Indian Constitution & Democratic Institutions',
        qEn: 'Which Schedule of the Indian Constitution enumerates the official recognized languages of the Republic of India?',
        qHi: 'भारतीय संविधान की किस अनुसूची में भारत गणराज्य की आधिकारिक रूप से मान्यता प्राप्त 22 भाषाओं का उल्लेख है?',
        optEn: ['Seventh Schedule', 'Eighth Schedule', 'Ninth Schedule', 'Eleventh Schedule'],
        optHi: ['सातवीं अनुसूची', 'आठवीं अनुसूची', 'नौवीं अनुसूची', 'ग्यारहवीं अनुसूची'],
        correct: 1,
        expEn: 'The Eighth Schedule of the Indian Constitution lists the 22 languages recognized by the Constitution.',
        expHi: 'संविधान की 8वीं अनुसूची में वर्तमान में 22 आधिकारिक भाषाओं को मान्यता दी गई है।',
        diff: 'Easy',
        tags: ['Eighth Schedule', 'Constitution', 'Languages']
      },
      {
        subtopic: 'National & International Current Affairs',
        qEn: 'Which national mission was launched in 2021 to ensure clean tap water supply to every rural household by 2024?',
        qHi: '2021 में प्रत्येक ग्रामीण परिवार को स्वच्छ नल जल उपलब्ध कराने के लिए कौन सा राष्ट्रीय मिशन संचालित किया जा रहा है?',
        optEn: ['Jal Jeevan Mission', 'Swachh Bharat Abhiyan', 'Namami Gange', 'Pradhan Mantri Awas Yojana'],
        optHi: ['जल जीवन मिशन', 'स्वच्छ भारत अभियान', 'नमामि गंगे', 'प्रधानमंत्री आवास योजना'],
        correct: 0,
        expEn: 'Jal Jeevan Mission (Har Ghar Jal) aims to provide functional household tap connections to every rural home, school, and Anganwadi centre.',
        expHi: 'जल जीवन मिशन का लक्ष्य प्रत्येक ग्रामीण घर और विद्यालय में नल से सुरक्षित पेयजल उपलब्ध कराना है।',
        diff: 'Easy',
        tags: ['Jal Jeevan Mission', 'Rural Infrastructure', 'Schemes']
      },
      {
        subtopic: 'Socio-Economic Development & Census Data',
        qEn: 'What is the minimum statutory age prescribed under the Child and Adolescent Labour (Prohibition and Regulation) Act for employment in hazardous occupations?',
        qHi: 'बाल एवं किशोर श्रम (प्रतिषेध एवं विनियमन) अधिनियम के अनुसार खतरनाक व्यवसायों में नियोजन हेतु न्यूनतम कानूनी आयु सीमा क्या है?',
        optEn: ['14 years', '16 years', '18 years', '21 years'],
        optHi: ['14 वर्ष', '16 वर्ष', '18 वर्ष', '21 वर्ष'],
        correct: 2,
        expEn: 'The 2016 amendment completely prohibits employment of children below 14 in all occupations, and adolescents (14-18 years) in hazardous occupations and processes.',
        expHi: '2016 के संशोधन के तहत 14 वर्ष से कम आयु के बच्चों का सभी कार्यों में तथा 14-18 वर्ष के किशोरों का खतरनाक उद्योगों में नियोजन पूर्णतः प्रतिबंधित है।',
        diff: 'Medium',
        tags: ['Child Labour Act', 'Age Limit', 'Protection']
      },
      {
        subtopic: 'Indian Constitution & Democratic Institutions',
        qEn: 'Under Article 350A of the Constitution of India, what is the directive regarding instruction in mother tongue at the primary stage?',
        qHi: 'भारतीय संविधान के अनुच्छेद 350A के अंतर्गत प्राथमिक स्तर पर मातृभाषा में शिक्षा देने के संबंध में क्या निर्देश दिया गया है?',
        optEn: ['Instruction must be in English exclusively', 'Every State shall endeavor to provide adequate facilities for instruction in the mother tongue at the primary stage to children belonging to linguistic minority groups', 'States can ban vernacular mediums', 'Only Sanskrit may be taught as mother tongue'],
        optHi: ['निर्देश केवल अंग्रेजी में होना चाहिए', 'प्रत्येक राज्य भाषाई अल्पसंख्यक बालकों को प्राथमिक स्तर पर मातृभाषा में शिक्षा की पर्याप्त सुविधाएं प्रदान करने का प्रयास करेगा', 'राज्य क्षेत्रीय माध्यमों पर प्रतिबंध लगा सकते हैं', 'केवल संस्कृत को मातृभाषा के रूप में पढ़ाया जाए'],
        correct: 1,
        expEn: 'Article 350A directs that every State and local authority must endeavor to provide adequate facilities for instruction in the mother tongue at the primary stage of education to children of linguistic minorities.',
        expHi: 'अनुच्छेद 350A के अनुसार प्राथमिक स्तर पर भाषाई अल्पसंख्यक वर्गों के बच्चों को मातृभाषा में शिक्षा की सुविधाएं उपलब्ध कराना राज्य का दायित्व है।',
        diff: 'Hard',
        tags: ['Article 350A', 'Mother Tongue', 'Primary Education']
      },
      {
        subtopic: 'Indian Cultural Heritage & Science',
        qEn: 'Who was the pioneering Indian mathematician who introduced the place-value system and zero, and authored the foundational mathematical treatise "Aryabhatiya"?',
        qHi: 'स्थान-मान प्रणाली और शून्य की अवधारणा को प्रतिपादित करने वाले तथा "आर्यभटीय" ग्रंथ के रचयिता प्राचीन भारतीय गणितज्ञ कौन थे?',
        optEn: ['Varahamihira', 'Aryabhata', 'Brahmagupta', 'Bhaskaracharya II'],
        optHi: ['वराहमिहिर', 'आर्यभट', 'ब्रह्मगुप्त', 'भास्कराचार्य द्वितीय'],
        correct: 1,
        expEn: 'Aryabhata (born 476 CE) authored Aryabhatiya, introducing foundational concepts of arithmetic, algebra, plane and spherical trigonometry, and planetary movements.',
        expHi: 'आर्यभट ने 5वीं शताब्दी में आर्यभटीय की रचना की जिसमें त्रिकोणमिति, खगोल विज्ञान और शून्य की संकल्पना दी गई।',
        diff: 'Easy',
        tags: ['Aryabhata', 'Heritage', 'Ancient Mathematics']
      },
      {
        subtopic: 'Contemporary Social Issues',
        qEn: 'Which national autonomous statutory commission in India is mandated under the CPCR Act 2005 to safeguard children\'s constitutional and legal rights, including monitoring RTE implementation?',
        qHi: 'बाल अधिकार संरक्षण आयोग अधिनियम 2005 के तहत गठित भारत का कौन सा राष्ट्रीय स्वायत्त आयोग बाल अधिकारों की रक्षा तथा आरटीई के क्रियान्वयन की निगरानी करता है?',
        optEn: ['National Human Rights Commission (NHRC)', 'National Commission for Protection of Child Rights (NCPCR)', 'Central Vigilance Commission (CVC)', 'National Commission for Women (NCW)'],
        optHi: ['राष्ट्रीय मानवाधिकार आयोग (NHRC)', 'राष्ट्रीय बाल अधिकार संरक्षण आयोग (NCPCR)', 'केंद्रीय सतर्कता आयोग (CVC)', 'राष्ट्रीय महिला आयोग (NCW)'],
        correct: 1,
        expEn: 'The NCPCR monitors the implementation of the RTE Act 2009 under Section 31 and POCSO Act 2012, inquiring into complaints regarding violations of child rights.',
        expHi: 'एनसीपीसीआर (NCPCR) बच्चों के मौलिक अधिकारों तथा आरटीई एवं पॉक्सो कानून के प्रभावी क्रियान्वयन की वैधानिक निगरानी संस्था है।',
        diff: 'Medium',
        tags: ['NCPCR', 'Child Rights', 'RTE Monitoring']
      }
    ]
  }
];

// Let's write the script to generate all 8 areas for UPSC and all 12 units for UP
console.log("UPSC Area 1 defined.");
