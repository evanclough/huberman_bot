from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv
from langchain.chains import ConversationalRetrievalChain, RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.document_loaders import DirectoryLoader, TextLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.indexes import VectorstoreIndexCreator
from langchain.indexes.vectorstore import VectorStoreIndexWrapper
from langchain.llms import OpenAI
from langchain.vectorstores import Chroma


#initialize flask
app = Flask(__name__)
CORS(app)

#load in env variables from .env
load_dotenv()
AUTH_TOKEN = os.getenv("AUTH_TOKEN")

#authentication decorator
def requires_auth_token(func):
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        print(token)
        if token == f'Bearer {AUTH_TOKEN}':
            return func(*args, **kwargs)
        else:
            return jsonify({"message": "Unauthorized"}), 401

    return decorated

# load in our data, which is a transcript of all andrew huberman podcasts
loader = TextLoader("data/data.txt") # Use this line if you only need data.txt
#create index from data
index = VectorstoreIndexCreator().from_loaders([loader])

#load in langchain
chain = ConversationalRetrievalChain.from_llm(
  llm=ChatOpenAI(model="gpt-3.5-turbo"),
  retriever=index.vectorstore.as_retriever(search_kwargs={"k": 1}),
)

#initialize chat_history global to handle multiple requests at once
chat_history = []


#this endpoint takes in a question as input, feeds it into the model,
# and returns the output.
@app.route('/submitQuestion', methods=['POST'])
@requires_auth_token
def submit_question():
    try:
        data = request.get_json()
        query = data['question']
        global chat_history
        global chain
        result = chain({"question": f"what would dr. andrew huberman 's answer be if i asked him the following question: {query}", "chat_history": chat_history})
        chat_history.append((query, result['answer']))

        return jsonify({'message': result['answer']})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
