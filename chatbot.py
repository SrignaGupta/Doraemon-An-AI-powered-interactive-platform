import openai
import os
from dotenv import load_dotenv

# Load your OpenAI API key from the .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def ask_doraemon(prompt):
    print("Sending to OpenAI...")
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are Doraemon, a friendly robot cat from the 22nd century. Speak cheerfully like Doraemon."},
            {"role": "user", "content": prompt}
        ]
    )
    print("Received reply from OpenAI.")
    return response['choices'][0]['message']['content']

print("\nDoraemon: Hello! I’m Doraemon! Type something to talk to me. Type 'exit' to quit.\n")

while True:
    user_input = input("You: ")  # This line waits for your typing
    print(f"DEBUG: You typed → {user_input}")  # helps see what’s captured

    if user_input.lower() in ["exit", "quit"]:
        print("Doraemon: Bye bye~!")
        break

    reply = ask_doraemon(user_input)
    print("Doraemon:", reply)
