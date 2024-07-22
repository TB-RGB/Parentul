const natural = require("natural");
const classifier = new natural.BayesClassifier();

class AIChatEngine {
  constructor() {
    this.initializeClassifier();
  }

  initializeClassifier() {
    // Expand training data
    classifier.addDocument("How do I handle tantrums?", "behavior");
    classifier.addDocument("My child is throwing a tantrum", "behavior");
    classifier.addDocument("Dealing with tantrums", "behavior");
    classifier.addDocument("Toddler meltdowns", "behavior");
    classifier.addDocument("Child won't stop screaming", "behavior");
    classifier.addDocument("How can I help my child deal with anger?", "behavior");
    classifier.addDocument("What are some tips for dealing with my child when they're angry?", "behavior");
    

    classifier.addDocument("What's a good bedtime routine?", "sleep");
    classifier.addDocument("My child won't go to sleep", "sleep");
    classifier.addDocument("My child isn't sleeping too much", "sleep");
    classifier.addDocument("How much sleep does my child need?", "sleep");
    classifier.addDocument("How long does it take for my child to sleep?", "sleep");
    classifier.addDocument("What are some good bedtime routines for kids?", "sleep");

    classifier.addDocument("Healthy meals for kids", "nutrition");
    classifier.addDocument("My child is a picky eater", "nutrition");
    classifier.addDocument("My child is not eating well", "nutrition");
    classifier.addDocument("How to introduce new foods", "nutrition");
    classifier.addDocument("My children only eat junk food", "nutrition");
    classifier.addDocument("What are some healthy snacks for kids?", "nutrition");
    classifier.addDocument("How can I encourage my child to eat healthy?", "nutrition");

    classifier.addDocument("Activities for toddlers", "activities");
    classifier.addDocument("How to keep my child entertained", "activities");
    classifier.addDocument("I want my child to have more fun", "activities");
    classifier.addDocument("Educational games for kids", "activities");
    classifier.addDocument("What are some fun activities for toddlers?", "activities");
    classifier.addDocument("What are some educational games for kids?", "activities");

    classifier.addDocument("Hi", "greeting");
    classifier.addDocument("Hello", "greeting");
    classifier.addDocument("Hey", "greeting");
    classifier.addDocument("Good morning", "greeting");
    classifier.addDocument("Good afternoon", "greeting");
    classifier.addDocument("Good evening", "greeting");

    classifier.train();
  }

  async generateResponse(message) {
    // Use fuzzy matching to find the closest category
    console.log("Generating response for:", message);
    const classifications = classifier.getClassifications(message);
    console.log("Classifications:", classifications);
    const topClassification = classifications[0];

    // Only use the classification if it's above a certain confidence threshold
    const category = topClassification.value > 0.03 ? topClassification.label : 'unknown';
    console.log("Chosen category:", category);

    let response;

    switch (category) {
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
        response =
          "I'm not sure I understand. Could you please ask a question about parenting, child behavior, sleep, nutrition, or activities for children?";
    }

    return { text: response, category };
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
