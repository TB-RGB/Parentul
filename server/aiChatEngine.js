const natural = require("natural");

class AIChatEngine {
  constructor() {
    this.classifier = new natural.BayesClassifier();
    this.initializeClassifier();
    this.conversationState = {
      stage: "initial",
      category: null,
      childName: null,
      specifics: null,
      frequency: null,
    };
  }

  initializeClassifier() {
   

    // this.addTrainingData("greeting", [
    //   "Hi",
    //   "Hello",
    //   "Hey",
    //   "Good morning",
    //   "Good afternoon",
    //   "Good evening",
    // ]);

    // New categories based on the new documents
    this.addTrainingData("lying", [
      "My child is lying",
      "How to handle child lying",
      "Why does my child lie?",
      "Dealing with dishonesty in children",
      "My child is lying to me",
      "They aren't honest with me",
      "What are they hiding?",
    ]);

    this.addTrainingData("meltdowns", [
      "How to handle meltdowns",
      "My child has frequent meltdowns",
      "Dealing with emotional outbursts",
      "Why does my child have meltdowns?",
      "My child is having a meltdown",
      "They're having a bad day",
      "What's wrong with them?",
      "What are they feeling when they're angry?",
    ]);

    this.addTrainingData("not listening", [
      "My child doesn't listen",
      "How to get my child to follow directions",
      "Child ignoring instructions",
      "Improving child's listening skills",
      "My child isn't listening",
      "They're not following instructions",
      "What's wrong with their ears?",
      "Are they paying attention?",
      "Are they deaf or hard of hearing?",
      "They're being rude",
    ]);

    this.addTrainingData("stealing", [
      "My child is stealing",
      "How to handle child theft",
      "Why does my child steal?",
      "Dealing with stealing behavior in children",
      "My child is stealing from me",
      "They're stealing from me",
      "What's my child stealing?",
      "My child stole something",
      "Taking something from me",
    ]);

    this.addTrainingData("temper tantrums", [
      "How to handle temper tantrums",
      "My child has frequent temper tantrums",
      "Dealing with angry outbursts",
      "Why does my child have temper tantrums?",
      "My child is having a temper tantrum",
      "They're having a temper tantrum",
      "They're exploding",
      "They're so loud",
      "They're screaming",
    ]);

    this.classifier.train();
  }

  addTrainingData(category, phrases) {
    phrases.forEach((phrase) => this.classifier.addDocument(phrase, category));
  }

  //   async generateResponse(message) {
  //     console.log("Generating response for:", message);
  //     if (!message || typeof message !== "string") {
  //       console.error("Invalid message received:", message);
  //       return {
  //         text: "I'm sorry, I didn't understand that. Could you please try again?",
  //         category: "error",
  //       };
  //     }

  //     if (!this.classifier) {
  //       console.error("Classifier is not initialized");
  //       return {
  //         text: "I'm sorry, I'm having technical difficulties. Please try again later.",
  //         category: "error",
  //       };
  //     }

  //     const classifications = this.classifier.getClassifications(message);
  //     console.log("Classifications:", classifications);
  //     const topClassification = classifications[0];

  //     const category =
  //       topClassification && topClassification.value > 0.03
  //         ? {
  //             category: topClassification.label,
  //             confidence: topClassification.value,
  //           }
  //         : {category: "unknown", confidence: 0};
  //     console.log("Chosen category:", category);

  //     let response;

  //     switch (category.category) {
  //       case "greeting":
  //         response = this.getGreeting();
  //         break;
  //       case "lying":
  //         response = this.getLyingAdvice();
  //         break;
  //       case "meltdowns":
  //         response = this.getMeltdownsAdvice();
  //         break;
  //       case "not_listening":
  //         response = this.getNotListeningAdvice();
  //         break;
  //       case "stealing":
  //         response = this.getStealingAdvice();
  //         break;
  //       case "temper_tantrums":
  //         response = this.getTemperTantrumsAdvice();
  //         break;
  //       default:
  //         response =
  //           "I'm not sure I understand. Could you please ask a question about parenting, child behavior, sleep, nutrition, or activities for children?";
  //     }

  //     return {
  //       text: response,
  //       category: category.category,
  //       confidence: category.confidence,
  //     };
  //   }

  async generateResponse(message) {
    console.log("Generating response for:", message);
    if (!message || typeof message !== "string") {
      console.error("Invalid message received:", message);
      return {
        text: "I'm sorry, I didn't understand that. Could you please try again?",
        category: "error",
      };
    }

    if (this.conversationState.stage === "initial") {
      const classification = this.classifyMessage(message);
      this.conversationState.category = classification.category;
      this.conversationState.confidence = classification.confidence;
      this.conversationState.stage = "asking_child_name";
      return {
        text: `I understand you're asking about ${this.conversationState.category}. To help you better, could you tell me which child you're concerned about?`,
        category: "Who",
      };
    } else if (this.conversationState.stage === "asking_child_name") {
      this.conversationState.childName = message;
      this.conversationState.stage = "asking_specifics";
      return {
        text: `Thank you. What specific ${this.conversationState.category} behavior did ${this.conversationState.childName} exhibit?`,
        category: "What",
      };
    } else if (this.conversationState.stage === "asking_specifics") {
      this.conversationState.specifics = message;
      this.conversationState.stage = "asking_frequency";
      return {
        text: `I see. Has this happened before? If so, how often?`,
        category: "When",
      };
    } else if (this.conversationState.stage === "asking_frequency") {
      this.conversationState.frequency = message;
      this.conversationState.stage = "providing_advice";
      return this.provideDetailedAdvice();
    }
    // else if (this.conversationState.stage === "providing_advice") {
    //   if (message.toLowerCase().includes("thumbs up")) {
    //     this.conversationState = { stage: "initial" };
    //     return {
    //       text: "I'm glad you found that helpful! Is there anything else I can assist you with regarding parenting?",
    //       category: "positive",
    //       confidence: 1,
    //     };
    //   } else if (message.toLowerCase().includes("thumbs down")) {
    //     return {
    //       text: "I'm sorry the advice wasn't helpful. Could you explain why, so I can try to provide better assistance?",
    //       category: "negative",
    //       confidence: 1,
    //     };
    //   } else {
    //     return {
    //       text: "Thank you for your feedback. Is there anything else I can help you with regarding parenting?",
    //       category: "follow_up",
    //       confidence: 1,
    //     };
    //   }
    // }
  }

  classifyMessage(message) {
    const classifications = this.classifier.getClassifications(message);
    const topClassification = classifications[0];
    return topClassification && topClassification.value > 0.03
      ? {
          category: topClassification.label,
          confidence: topClassification.value,
        }
      : { category: "unknown", confidence: 0 };
  }

  provideDetailedAdvice() {
    console.log(
      "Providing detailed advice. Conversation state:",
      this.conversationState
    );
    let adviceMessages = [];
    switch (this.conversationState.category) {
      case "stealing":
        adviceMessages = this.getDetailedStealingAdvice();
        break;
    //   case "greeting":
    //     adviceMessages = this.getDetailedGreetingAdvice();
    //     break;
      case "lying":
        adviceMessages = this.getDetailedLyingAdvice();
        break;
      case "meltdowns":
        adviceMessages = this.getDetailedMeltdownsAdvice();
        break;
      case "not listening":
        adviceMessages = this.getDetailedNotListeningAdvice();
        break;
      case "temper tantrums":
        adviceMessages = this.getDetailedTemperTantrumsAdvice();
        break;
      default:
        adviceMessages = [
          "I'm sorry, I don't have specific advice for this situation.",
          "However, it's important to approach the issue with understanding and open communication with your child.",
        ];
    }

    adviceMessages.unshift(
      `I understand you're concerned about ${this.conversationState.childName}'s ${this.conversationState.category} behavior. Here's some advice that might help:`
    );

    return {
      messages: adviceMessages,
      category: this.conversationState.category,
      confidence: this.conversationState.confidence,
    };
  }

//   getDetailedGreetingAdvice() {
//     return `Hello! Welcome to Parentul. I'm here to help you with any parenting questions or concerns you might have. 
    
//     Here are some topics I can assist you with:
//     1. Child behavior issues (like tantrums, meltdowns, or not listening)
//     2. Sleep routines and problems
//     3. Nutrition and eating habits
//     4. Educational activities and games
//     5. Dealing with lying or stealing

//     What specific area would you like help with regarding ${this.conversationState.childName}?`;
//   }

  getDetailedLyingAdvice() {
    return [
      `1. Stay calm and avoid showing strong emotional reactions when you catch ${this.conversationState.childName} in a lie. This helps create a safe space for honesty.`,
      `2. Try to understand the reason behind the lie. Is it fear of punishment, a desire for attention, or an attempt to avoid disappointing you? Understanding the motivation can help address the root cause.`,
      `3. Explain clearly why lying is harmful. Use age-appropriate examples to illustrate how lying can damage trust and relationships.`,
      `4. Encourage truthfulness by praising honesty, even when ${this.conversationState.childName} admits to doing something wrong. This reinforces that honesty is valued more than perfect behavior.`,
      `5. Be a good role model. Children often learn by example, so be mindful of even small white lies in your own behavior.`,
      `6. Create an environment where ${this.conversationState.childName} feels safe telling the truth. Avoid harsh punishments for honesty, as this might encourage more lying to avoid consequences.`,
      `7. If lying persists, consider setting up a reward system for honesty or consulting with a child psychologist for more tailored strategies.`,
      `Remember, developing honesty is a process. Be patient and consistent in your approach.`,
    ];
  }

  getDetailedMeltdownsAdvice() {
    return [
      `I'm sorry to hear that ${this.conversationState.childName} is experiencing meltdowns. Here's some advice to help manage these situations:`,
      `1. Identify triggers: Keep a journal to note what situations or events seem to precede meltdowns. This can help you anticipate and possibly prevent them.`,
      `2. Create a calm-down space: Designate a quiet, comfortable area where ${this.conversationState.childName} can go to regulate emotions. Fill it with soothing items like soft toys, blankets, or calming pictures.`,
      `3. Develop a calming routine: Work with ${this.conversationState.childName} to create a series of steps to follow when feeling overwhelmed. This might include deep breathing, counting, or using a stress ball.`,
      `4. Use visual schedules: If transitions or unexpected changes trigger meltdowns, use picture schedules to help ${this.conversationState.childName} understand and prepare for daily activities.`,
      `5. Validate feelings: During a meltdown, acknowledge ${this.conversationState.childName}'s feelings without judgment. Say something like, "I can see you're feeling very upset right now."`,
      `6. Maintain your calm: Your calm demeanor can help ${this.conversationState.childName} regulate their own emotions. Take deep breaths and speak in a soft, reassuring tone.`,
      `7. Teach emotional vocabulary: Help ${this.conversationState.childName} name their feelings. This can make big emotions feel more manageable.`,
      `8. Offer choices: When possible, give ${this.conversationState.childName} some control by offering limited choices. This can help prevent feelings of powerlessness that might trigger a meltdown.`,
      `9. Praise calm behavior: When ${this.conversationState.childName} manages difficult emotions well, offer specific praise to reinforce this positive behavior.`,
      `Remember, meltdowns are often a sign that a child is overwhelmed, not that they're misbehaving. With patience and consistent strategies, you can help ${this.conversationState.childName} develop better emotional regulation skills.`,
    ];
  }

  getDetailedNotListeningAdvice() {
    return [
      `I understand you're having difficulties with ${this.conversationState.childName} not listening. Here are some strategies that might help:,``1. Ensure you have ${this.conversationState.childName}'s attention: Get down to their eye level and make gentle eye contact before giving instructions. You might also use a light touch on the shoulder.`,
      `2. Use clear, concise language: Keep instructions simple and direct. Avoid long explanations or multiple steps, especially for younger children.`,
      `3. Give choices: Instead of commands, offer limited choices. For example, "Would you like to put on your shoes now or after you finish your snack?" This gives ${this.conversationState.childName} a sense of control.`,
      `4. Use positive language: Frame instructions in a positive way. Instead of "Don't run," try "Please walk slowly."`,
      `5. Implement a reward system: Create a chart where ${this.conversationState.childName} can earn stickers or points for good listening. Decide on a reward when a certain number of points are reached.`,
      `6. Be consistent with consequences: If ${this.conversationState.childName} doesn't listen, follow through with an appropriate, previously discussed consequence every time.`,
      `7. Practice active listening yourself: Model good listening skills by giving ${this.conversationState.childName} your full attention when they speak to you.`,
      `8. Use "when-then" statements: For example, "When you've picked up your toys, then we can read a story." This clearly outlines expectations and consequences.`,
      `9. Praise good listening: When ${this.conversationState.childName} follows instructions well, offer specific praise like "Thank you for listening and putting your shoes on right away."`,
      `10. Consider the environment: Minimize distractions like TV or tablets when you need ${this.conversationState.childName} to listen.`,
      `Remember, improving listening skills takes time and patience. Consistency in your approach is key. If problems persist, consider consulting with a pediatrician or child psychologist to rule out any underlying issues like hearing problems or attention disorders.`,
    ];
  }

  getDetailedTemperTantrumsAdvice() {
    return [
      `I'm sorry to hear that ${this.conversationState.childName} is having temper tantrums. Here's some advice to help manage these challenging situations:`,
      `1. Stay calm: Your calm demeanor can help de-escalate the situation. Take deep breaths and speak in a soft, even tone.`,
      `2. Ensure safety: If ${this.conversationState.childName} is at risk of hurting themselves or others, calmly move them to a safe space.`,
      `3. Avoid giving in: Giving in to demands during a tantrum can reinforce the behavior. Stay firm but gentle.`,
      `4. Use distraction: For younger children, try redirecting attention to something else interesting or engaging.`,
      `5. Ignore the tantrum: If ${this.conversationState.childName} is safe, sometimes the best approach is to calmly continue what you were doing, showing that tantrums don't result in attention or desired outcomes.`,
      `6. Offer comfort: Some children need physical reassurance. If ${this.conversationState.childName} responds well to touch, a gentle hug might help calm them.`,
      `7. Identify triggers: Keep a log of when tantrums occur to identify patterns. Common triggers include hunger, fatigue, or transitions between activities.`,
      `8. Prepare for challenging situations: If you know a situation might be difficult (like leaving a playground), give ${this.conversationState.childName} advance warning and explain what's going to happen.`,
      `9. Teach coping skills: When ${this.conversationState.childName} is calm, practice techniques like deep breathing or counting to use during emotional moments.`,
      `10. Praise good behavior: When ${this.conversationState.childName} handles frustration well, offer specific praise to reinforce this positive behavior.`,
      `11. Offer choices: Giving ${this.conversationState.childName} some control can prevent tantrums. For example, "Would you like to wear the red shirt or the blue shirt today?"`,
      `12. Maintain routines: Consistent daily routines can provide a sense of security and reduce tantrums.`,
      `Remember, tantrums are often a normal part of development as children learn to handle big emotions. With patience and consistent strategies, you can help ${this.conversationState.childName} develop better emotional regulation skills. If tantrums are severe, frequent, or you're concerned about ${this.conversationState.childName}'s development, don't hesitate to consult with a pediatrician or child psychologist.`,
    ];
  }

  getDetailedStealingAdvice() {
    return [
      `1. Have a calm, non-judgmental conversation with ${this.conversationState.childName} about the incident. Try to understand their motivations without accusation.`,
      `2. Explain clearly why stealing is wrong and how it affects others. Use age-appropriate examples to illustrate the consequences.`,
      `3. Set clear expectations and boundaries. Before going to the store, remind ${this.conversationState.childName} that you're there to buy specific items and not extras.`,
      `4. Consider implementing a reward system for good behavior, which could include not taking things without permission.`,
      `5. If the behavior persists, it might be helpful to consult with a child psychologist to address any underlying issues.`,
      `Remember, your reaction is crucial. Stay calm, be consistent with consequences, and always reassure ${this.conversationState.childName} of your love and support.`,
    ];
  }
}

module.exports = { AIChatEngine };
