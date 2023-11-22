class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("next")) {
      this.actionProvider.handleNextQuestion();
    }
  }
}

export default MessageParser;
