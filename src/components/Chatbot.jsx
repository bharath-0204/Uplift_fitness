import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

import botImage from "../img/bot.jpg"; // Bot avatar image

function Chatbot() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatHistoryRef = useRef(null);

  const handleChatClick = () => {
    setShowChatbot(!showChatbot);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSend = () => {
    if (userInput.trim() === "") return;

    const newMessage = { sender: "user", text: userInput };
    setChatHistory((prevHistory) => [...prevHistory, newMessage]);

    const response = getAnswer(userInput);
    const botMessage = { sender: "bot", text: response };
    setChatHistory((prevHistory) => [...prevHistory, botMessage]);

    setUserInput("");
  };

  const getAnswer = (question) => {
    const data = {
      "What are some nutrition tips?":
        "Eat a balanced diet rich in fruits and vegetables, whole grains, and lean proteins. Avoid processed foods and sugary drinks.",
      "Can you suggest a healthy meal plan?":
        "For a healthy meal plan, include a variety of foods in each meal. Start with a portion of protein, add vegetables, and include some healthy fats.",
      "What are the benefits of regular exercise?":
        "Regular exercise improves cardiovascular health, boosts mood, increases strength and flexibility, and helps maintain a healthy weight.",
      "How can I start a workout routine?":
        "Begin with simple exercises like walking or jogging. Gradually add strength training and flexibility exercises to your routine.",
      "What are some stress management techniques?":
        "Practice deep breathing, meditation, and regular physical activity to manage stress effectively.",
      "How much water should I drink daily?":
        "Aim for 8-10 glasses of water per day, but adjust based on activity level and climate.",
      "What are some tips for better sleep?":
        "Maintain a consistent sleep schedule, create a relaxing bedtime routine, and avoid screens before bed.",
      "How can I improve my mental health?":
        "Engage in regular physical activity, practice mindfulness, stay connected with loved ones, and seek professional help if needed.",
      "What are the benefits of meditation?":
        "Meditation reduces stress, improves concentration, and enhances emotional well-being.",
      "What foods are good for brain health?":
        "Foods rich in omega-3 fatty acids, antioxidants, and vitamins, like fish, nuts, and berries, are great for brain health.",
      "How can I improve my digestion?":
        "Eat fiber-rich foods, stay hydrated, and include probiotics in your diet to improve digestion.",
      "What are some tips for healthy skin?":
        "Keep your skin hydrated, protect it from the sun, and eat a diet rich in fruits and vegetables.",
      "What are the benefits of a plant-based diet?":
        "A plant-based diet can lower the risk of chronic diseases, improve digestion, and promote a healthy weight.",
      "How can I increase my energy levels?":
        "Get regular exercise, eat balanced meals, stay hydrated, and ensure you're getting enough sleep.",
      "What are some healthy snacks?":
        "Healthy snacks include fruits, nuts, yogurt, and vegetables with hummus.",
      "How can I reduce sugar intake?":
        "Read labels to identify added sugars, choose whole foods over processed ones, and use natural sweeteners like honey or maple syrup sparingly.",
      "What are the benefits of yoga?":
        "Yoga improves flexibility, strength, and balance while promoting relaxation and stress relief.",
      "How can I improve my posture?":
        "Strengthen your core muscles, practice good sitting and standing habits, and be mindful of your posture throughout the day.",
      "What are some tips for weight management?":
        "Eat a balanced diet, exercise regularly, and monitor your portions to manage weight effectively.",
      "How can I stay motivated to exercise?":
        "Set realistic goals, track your progress, and find activities you enjoy to stay motivated.",
      "What are the benefits of outdoor activities?":
        "Outdoor activities provide fresh air, exposure to sunlight, and a change of scenery, which can improve mood and energy levels.",
      "How can I boost my immune system?":
        "Eat a diet rich in fruits and vegetables, get regular exercise, and ensure adequate sleep to boost your immune system.",
      "What are some tips for managing time effectively?":
        "Prioritize tasks, set realistic goals, and use tools like calendars and to-do lists to manage time effectively.",
      "How can I improve my flexibility?":
        "Incorporate stretching exercises and yoga into your routine to improve flexibility.",
      "What are the benefits of strength training?":
        "Strength training builds muscle, increases metabolism, and improves bone density.",
      "How can I stay active at work?":
        "Take short breaks to stand, walk, or stretch, and consider using a standing desk to stay active at work.",
      "What are some ways to reduce anxiety?":
        "Practice deep breathing, engage in regular physical activity, and seek support from friends, family, or a therapist.",
      "How can I improve my cardiovascular health?":
        "Engage in regular aerobic exercise, eat a heart-healthy diet, and avoid smoking to improve cardiovascular health.",
      "What are the benefits of a balanced diet?":
        "A balanced diet provides essential nutrients, supports overall health, and helps maintain a healthy weight.",
      "How can I improve my focus and concentration?":
        "Get enough sleep, eat a balanced diet, stay hydrated, and practice mindfulness to improve focus and concentration.",
      "What are some tips for managing blood pressure?":
        "Maintain a healthy weight, reduce salt intake, and engage in regular exercise to manage blood pressure.",
      "How can I improve my memory?":
        "Stay mentally active, eat brain-healthy foods, and engage in regular physical activity to improve memory.",
      "What are the benefits of cycling?":
        "Cycling is a low-impact exercise that improves cardiovascular health, strengthens muscles, and enhances mental well-being.",
      "How can I improve my mental resilience?":
        "Develop a positive mindset, practice stress management techniques, and stay connected with a supportive community.",
      "What are some tips for healthy aging?":
        "Stay physically active, eat a balanced diet, and engage in activities that stimulate the mind for healthy aging.",
      "How can I manage cholesterol levels?":
        "Eat a diet low in saturated fats, increase fiber intake, and engage in regular physical activity to manage cholesterol levels.",
      "What are the benefits of swimming?":
        "Swimming is a full-body workout that improves cardiovascular health, builds muscle, and reduces stress.",
      "How can I improve my breathing?":
        "Practice deep breathing exercises, engage in regular physical activity, and maintain good posture to improve breathing.",
      "What are some tips for managing diabetes?":
        "Monitor blood sugar levels, eat a balanced diet, and engage in regular physical activity to manage diabetes.",
      "How can I improve my emotional well-being?":
        "Practice mindfulness, stay connected with loved ones, and engage in activities that bring joy to improve emotional well-being.",
      "What are the benefits of regular walking?":
        "Regular walking improves cardiovascular health, helps maintain a healthy weight, and reduces stress.",
      "How can I maintain a healthy lifestyle while traveling?":
        "Plan ahead, choose healthy meals, and stay active by walking or exercising in your hotel room while traveling.",
      "What are some ways to stay active during the winter?":
        "Engage in indoor exercises like yoga, strength training, or use home workout videos to stay active during the winter.",
      "How can I improve my immune response?":
        "Eat a nutrient-rich diet, stay active, and get enough sleep to strengthen your immune response.",
      "What are the benefits of drinking green tea?":
        "Green tea is rich in antioxidants, supports weight loss, and improves brain function.",
      "How can I maintain healthy bones?":
        "Eat a diet rich in calcium and vitamin D, engage in weight-bearing exercises, and avoid smoking to maintain healthy bones.",
      "What are some tips for reducing caffeine intake?":
        "Gradually reduce the amount of caffeine you consume, switch to decaffeinated beverages, and drink more water to reduce caffeine intake.",
      "How can I improve my digestive health?":
        "Eat a diet rich in fiber, stay hydrated, and include probiotics in your diet to improve digestive health.",
      "What are the benefits of laughter?":
        "Laughter reduces stress, boosts the immune system, and improves mood and overall well-being.",
      "What should I include in a balanced breakfast?":
        "Include protein, healthy fats, and fiber, such as eggs, whole-grain toast, and fruit.",
      "How can I manage my time for workouts?":
        "Schedule workouts like appointments, set reminders, and find a routine that fits into your daily schedule.",
      "What are some techniques for mindfulness?":
        "Practice focusing on your breath, engage in body scans, and incorporate mindfulness into daily activities.",
      "How can I set achievable fitness goals?":
        "Use the SMART criteria: Specific, Measurable, Achievable, Relevant, Time-bound for setting goals.",
      "What are the effects of stress on health?":
        "Chronic stress can lead to headaches, digestive issues, high blood pressure, and weakened immune response.",
      "How can I maintain motivation for my health goals?":
        "Track your progress, celebrate small victories, and surround yourself with supportive people.",
      "What are some easy ways to incorporate physical activity into my day?":
        "Use stairs instead of elevators, walk or bike instead of driving, and take short exercise breaks during work.",
      "How does nutrition affect mental health?":
        "A balanced diet rich in nutrients can improve mood, reduce anxiety, and enhance cognitive function.",
      "What are the benefits of deep breathing exercises?":
        "Deep breathing helps reduce stress, lowers blood pressure, and promotes relaxation.",
      "How can I create a healthy meal plan for my family?":
        "Involve the family in planning, include a variety of foods, and aim for balanced meals at every dining occasion.",
      "What are some strategies for healthy eating on a budget?":
        "Plan meals ahead, buy in bulk, and choose seasonal fruits and vegetables to save money.",
      "How can I prevent emotional eating?":
        "Identify triggers, practice mindful eating, and find healthy coping strategies for emotions.",
      "What are the health benefits of maintaining a healthy weight?":
        "It reduces the risk of chronic diseases, improves mental health, and enhances overall quality of life.",
      "How can I stay active in a sedentary job?":
        "Take regular breaks to stand up, stretch, and walk around to combat the effects of prolonged sitting.",
      "What are some ways to make healthy food choices when dining out?":
        "Check menus in advance, choose grilled over fried, and watch portion sizes.",
      "How can I enhance my mental clarity?":
        "Stay hydrated, eat brain-boosting foods, and engage in activities that challenge your mind.",
      "What are the benefits of having a support system for health goals?":
        "Support systems provide encouragement, accountability, and motivation, making it easier to achieve goals.",
      "How can I incorporate more vegetables into my diet?":
        "Add veggies to smoothies, include them in every meal, and experiment with new recipes.",
      "What are some activities to boost my creativity?":
        "Engage in artistic pursuits, explore new hobbies, and allow yourself time for free thinking.",
      "How can I balance work and personal life?":
        "Set boundaries, prioritize tasks, and make time for self-care and leisure activities.",
      "What are some tips for better mental focus?":
        "Minimize distractions, take regular breaks, and practice concentration techniques like the Pomodoro method.",
      "How can I enhance my resilience during challenging times?":
        "Practice self-care, stay connected with others, and focus on positive thinking.",
      "What are the health benefits of volunteering?":
        "Volunteering can reduce stress, enhance mood, and foster a sense of community and purpose.",
      "How can I make healthier choices when snacking?":
        "Opt for whole foods like fruits, nuts, and yogurt instead of processed snacks.",
      "What are the benefits of a daily gratitude practice?":
        "Practicing gratitude can improve mental health, enhance relationships, and boost overall well-being.",
      "How can I improve my financial health as part of my lifestyle?":
        "Create a budget, save regularly, and invest in your future for better financial health.",
      "What are some tips for developing a positive body image?":
        "Practice self-acceptance, focus on your strengths, and limit exposure to negative influences.",
      "How can I foster healthy relationships?":
        "Communicate openly, respect boundaries, and prioritize quality time with loved ones.",
      "What are the benefits of regular health screenings?":
        "Regular screenings can help detect potential health issues early and provide peace of mind.",
      "How can I cope with grief and loss?":
        "Allow yourself to grieve, seek support, and engage in self-care during the healing process.",
      "What are some tips for achieving work-life balance?":
        "Establish clear boundaries, prioritize tasks, and make time for relaxation and hobbies.",
    };

    const preprocessText = (text) => {
      return text.toLowerCase().replace(/[^\w\s]/gi, "");
    };

    const preprocessedQuestion = preprocessText(question);
    const preprocessedData = Object.fromEntries(
      Object.entries(data).map(([k, v]) => [preprocessText(k), v])
    );

    if (preprocessedQuestion in preprocessedData) {
      return preprocessedData[preprocessedQuestion];
    }

    let bestMatch = null;
    let maxMatchRatio = 0;

    for (let key in preprocessedData) {
      const keyWords = new Set(key.split(" "));
      const questionWords = new Set(preprocessedQuestion.split(" "));
      const matchingWords = new Set(
        [...keyWords].filter((x) => questionWords.has(x))
      );
      const matchRatio = matchingWords.size / keyWords.size;

      if (matchRatio > maxMatchRatio) {
        maxMatchRatio = matchRatio;
        bestMatch = key;
      }
    }

    if (maxMatchRatio > 0.5) {
      return preprocessedData[bestMatch];
    }

    return "I'm sorry, I don't have specific information on that. Can you try rephrasing your question or ask about another topic?";
  };

  // Scroll to the bottom of the chat history whenever it updates
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="chatbot-entry">
      {/* Chat Now Button */}
      <button className="chat-button" onClick={handleChatClick}>
      <img
          src={botImage} // Replace with your chatbot icon URL
          alt="Chatbot"
          className="bot-image"
        />
        
      </button>

      {/* Chatbot Popup */}
      {showChatbot && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <h4>Chat with Us</h4>
            <button onClick={handleChatClick}>&times;</button>
          </div>
          <div className="chatbot-body">
            <div className="chat-history" ref={chatHistoryRef}>
              {chatHistory.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender}`}>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="chatbot-input">
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="Type your question..."
              />
              <button onClick={handleSend} className="send-button">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
    

      
}

export default Chatbot;
