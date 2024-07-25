const natural = require("natural");

class AIChatEngine {
  constructor() {
    this.classifier = new natural.BayesClassifier();
    this.initializeClassifier();
  }

  initializeClassifier() {
    // Expand training data
    this.classifier.addDocument("How do I handle tantrums?", "behavior");
    this.classifier.addDocument("My child is throwing a tantrum", "behavior");
    this.classifier.addDocument("Dealing with tantrums", "behavior");
    this.classifier.addDocument("Toddler meltdowns", "behavior");
    this.classifier.addDocument("Child won't stop screaming", "behavior");
    this.classifier.addDocument("How can I help my child deal with anger?", "behavior");
    this.classifier.addDocument("What are some tips for dealing with my child when they're angry?", "behavior");
    

    this.classifier.addDocument("What's a good bedtime routine?", "sleep");
    this.classifier.addDocument("My child won't go to sleep", "sleep");
    this.classifier.addDocument("My child isn't sleeping too much", "sleep");
    this.classifier.addDocument("How much sleep does my child need?", "sleep");
    this.classifier.addDocument("How long does it take for my child to sleep?", "sleep");
    this.classifier.addDocument("What are some good bedtime routines for kids?", "sleep");

    this.classifier.addDocument("Healthy meals for kids", "nutrition");
    this.classifier.addDocument("My child is a picky eater", "nutrition");
    this.classifier.addDocument("My child is not eating well", "nutrition");
    this.classifier.addDocument("How to introduce new foods", "nutrition");
    this.classifier.addDocument("My children only eat junk food", "nutrition");
    this.classifier.addDocument("What are some healthy snacks for kids?", "nutrition");
    this.classifier.addDocument("How can I encourage my child to eat healthy?", "nutrition");

    this.classifier.addDocument("Activities for toddlers", "activities");
    this.classifier.addDocument("How to keep my child entertained", "activities");
    this.classifier.addDocument("I want my child to have more fun", "activities");
    this.classifier.addDocument("Educational games for kids", "activities");
    this.classifier.addDocument("What are some fun activities for toddlers?", "activities");
    this.classifier.addDocument("What are some educational games for kids?", "activities");

    this.classifier.addDocument("Hi", "greeting");
    this.classifier.addDocument("Hello", "greeting");
    this.classifier.addDocument("Hey", "greeting");
    this.classifier.addDocument("Good morning", "greeting");
    this.classifier.addDocument("Good afternoon", "greeting");
    this.classifier.addDocument("Good evening", "greeting");

    this.classifier.train();
  }

  async generateResponse(message) {
    console.log("Generating response for:", message);
    if (!message || typeof message !== 'string') {
      console.error("Invalid message received:", message);
      return { text: "I'm sorry, I didn't understand that. Could you please try again?", category: "error" };
    }

    if (!this.classifier) {
        console.error("Classifier is not initialized");
        return { text: "I'm sorry, I'm having technical difficulties. Please try again later.", category: "error" };
    }
  
    const classifications = this.classifier.getClassifications(message);
    console.log("Classifications:", classifications);
    const topClassification = classifications[0];
  
    // Only use the classification if it's above a certain confidence threshold
    const category = topClassification && topClassification.value > 0.03 ? {category: topClassification.label, confidence: topClassification.value} : 'unknown';
    console.log("Chosen category:", category);
  
    let response;
  
    switch (category.category) {
      case "behavior":
        response = this.getBehaviorAdvice();
        break;
      case "sleep":
        response = this.getSleepAdvice();
        break;
      case "nutrition":
        response = this.getNutritionAdvice();
        break;
      case "activities":
        response = this.getActivityIdeas();
        break;
      case "greeting":
        response = this.getGreeting();
        break;
      default:
        response = "I'm not sure I understand. Could you please ask a question about parenting, child behavior, sleep, nutrition, or activities for children?";
    }
  
    return { text: response, category: category.category, confidence: category.confidence };
  }

  getBehaviorAdvice() {
    const advice = [
      "Stay calm and try to understand the underlying cause of the behavior.",
      "Set clear, consistent boundaries and explain them to your child.",
      "Use positive reinforcement to encourage good behavior.",
      "Offer choices to give your child a sense of control.",
      "Create a routine to help your child feel secure and know what to expect.",
    ];
    return advice[Math.floor(Math.random() * advice.length)];
  }

  getSleepAdvice() {
    const advice = [
      "Establish a consistent bedtime routine to signal it's time to wind down.",
      "Create a calm sleep environment with dim lights and comfortable temperature.",
      "Limit screen time before bed as blue light can interfere with sleep.",
      "Ensure your child is getting enough physical activity during the day.",
      "Consider using white noise or soft music to help your child relax.",
    ];
    return advice[Math.floor(Math.random() * advice.length)];
  }

  getNutritionAdvice() {
    const advice = [
      "Offer a variety of healthy foods and let your child choose from them.",
      "Make mealtimes fun and involve your child in food preparation.",
      "Be a good role model by eating healthy foods yourself.",
      "Don't force your child to eat, but encourage them to try new foods.",
      "Ensure regular meal and snack times to establish healthy eating habits.",
    ];
    return advice[Math.floor(Math.random() * advice.length)];
  }

  getActivityIdeas() {
    const ideas = [
      "Try simple art projects like finger painting or playdough sculpting.",
      "Engage in outdoor activities like nature walks or playground visits.",
      "Read books together and ask questions about the story.",
      "Play educational games that teach numbers, letters, or colors.",
      "Encourage imaginative play with dress-up clothes or building blocks.",
    ];
    return ideas[Math.floor(Math.random() * ideas.length)];
  }

  getGreeting() {
    const greetings = [
      "Hello! How can I assist you with parenting today?",
      "Hi there! What parenting question can I help you with?",
      "Welcome to Parentul! What would you like to know about childcare?",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
}

module.exports = { AIChatEngine };
