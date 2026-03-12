import flask
import requests
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv("API_KEY")

app = flask.Flask(__name__)

@app.route('/')
def home():
    return flask.render_template("index.html")

@app.route('/scan')
def scan():

    barcode = flask.request.args.get("barcode")

    # default values
    product_name = ""
    brands = ""
    packaging = ""
    nutriscore = ""

    # ---- OpenFoodFacts API ----
    try:
        url = f"https://world.openfoodfacts.org/api/v2/product/{barcode}.json?fields=product_name,brands,nutriscore_grade,packaging"
        response = requests.get(url, timeout=5).json()

        if response.get("status") == 1:
            product = response["product"]

            product_name = product.get("product_name", "")
            brands = product.get("brands", "")
            packaging = product.get("packaging", "")
            nutriscore = product.get("nutriscore_grade", "")
    except:
        pass


    # ---- Backup UPC API ----
    try:
        url = f"https://api.searchupc.com/v1/product/upc/{barcode}?apikey={API_KEY}"
        try:
            response2 = requests.get(url, timeout=5)
            if response2.status_code == 200:
                response2 = response2.json()
            else:
                response2 = {}
        except:
            response2 = {}

        if response2.get("products"):
            item = response2["products"][0]

            if product_name == "":
                product_name = item.get("title", "")

            if brands == "":
                brands = item.get("brand", "")
    except:
        pass


    # ---- Final result ----
    if product_name == "" and brands == "":
        return flask.jsonify({"error": "Product Not Found", "code": barcode})

    # ---- Calc Sustainability Score ----
    score = 50
    
    if "plastic" in packaging.lower():
        score -= 15

    if "glass" in packaging.lower():
        score += 10

    if "recyclable" in packaging.lower():
        score += 10

    result = {
        "product-name": product_name,
        "brands": brands,
        "packaging": packaging,
        "nutriscore_grade": nutriscore,
        "sustainability_score": score
    }

    return flask.jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)