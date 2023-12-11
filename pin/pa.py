import nltk
from nltk.chat.util import Chat, reflections

# Define a set of patterns and responses
patterns = [
    (r'hi|hello|hey', ['Hello!', 'Hi there!', 'Hello, how can I help you?']),
    (r'bye|quit', ['Goodbye!', 'See you later!', 'Have a great day!']),
    (r'(.*) Acts, Rules and Regulations', ['There are various Acts, Rules, and Regulations that apply to different industries. Could you specify which industry you are interested in?']),
    (r'(.*)', ['I'm sorry, I'm a basic chatbot and cannot provide specific legal information. You may want to consult a legal expert for detailed information.'])
]

# Create a chatbot instance
chatbot = Chat(patterns, reflections)

# Start the chat
print("Chatbot: Hello! I'm here to help you with your questions.")
print("Chatbot: You can type 'bye' to exit the chat.")
chatbot.converse()
