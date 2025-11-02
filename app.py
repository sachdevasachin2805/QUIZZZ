from flask import Flask, request, jsonify, render_template
import google.generativeai as genai

app = Flask(__name__)

# 🔑 Configure your Gemini API key
genai.configure(api_key="AIzaSyB1lCzVrKJ42ew4p6nbSOacfCp0OYUgArA")  # replace with your key

# Load the model
model = genai.GenerativeModel(model_name="gemini-1.5-flash-latest")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/generate_quiz", methods=["POST"])
def generate_quiz():
    try:
        data = request.get_json()
        topic = data.get("topic", "General Knowledge")

        prompt = (
            f"Generate 5 multiple-choice questions about {topic}. "
            "Each question should have 4 options (A, B, C, D) "
            "and mention the correct answer clearly."
        )

       response = model.generate_content([prompt])
quiz_text = response.candidates[0].content.parts[0].text
return jsonify({"quiz": quiz_text})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":

    app.run(debug=True)
