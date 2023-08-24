from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/submitQuestion', methods=['POST'])
def submit_question():
    try:
        data = request.get_json()
        user_question = data['question']

        # TODO: Implement your bot logic here to generate the bot's response
        bot_response = generate_bot_response(user_question)

        return jsonify({'message': bot_response})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def generate_bot_response(user_question):
   
    return "This is the bot's response to your question."

if __name__ == '__main__':
    app.run(debug=True)
