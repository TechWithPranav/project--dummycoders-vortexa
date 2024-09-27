from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Dummy function to simulate risk assessment
def assess_hypertension_risk(data):
    # Simple logic for demonstration purposes
    # In a real scenario, you'd use a machine learning model or similar
    risk_score = 0

    if data['male'] == 1:
        risk_score += 1
    if data['age'] > 40:
        risk_score += 2
    if data['cigsPerDay'] > 0:
        risk_score += 1
    if data['BMI'] > 25:
        risk_score += 1
    if data['heartRate'] > 80:
        risk_score += 1
    
    return risk_score

@app.route('/predictRisk', methods=['POST'])
def predict_risk():
    try:
        # Retrieve the JSON data from the form
        data = request.form.get('hypertension')
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        htdata = json.loads(data)
        
        # Assess risk
        risk_score = assess_hypertension_risk(htdata)
        
        return jsonify({'risk_score': risk_score}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=8000)
