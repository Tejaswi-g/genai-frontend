import requests

url = 'https://genai-backend-95pk.onrender.com/predict'
payload = {
    "smiles": "CCC"  # Ethanol as a simple test
}

try:
    response = requests.post(url, json=payload)
    response.raise_for_status()  # Will raise HTTPError if response code is not 200
    print("✅ Success:", response.json())
except requests.exceptions.HTTPError as http_err:
    print("🚫 HTTP Error:", http_err)
    print("Details:", response.text)
except Exception as err:
    print("🚫 Other Error:", err)
