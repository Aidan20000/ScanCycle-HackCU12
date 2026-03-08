import flask
import requests

app = flask.Flask(__name__)

@app.route('/')
def home():
    return flask.render_template("index.html")

@app.route('/scan')
def scan():
    barcode = flask.request.args.get("barcode")
    url = f"https://world.openfoodfacts.org/api/v2/product/{barcode}.json?fields=product_name,nutriscore_grade,packaging,packaging_materials_tags"
    response = requests.get(url).json()
    if response["status"] == 1:
        product = response["product"]

        result = {
            "product-name" : product.get("name", ""),
            "brands" : product.get("brands", ""),
            "packaging" : product.get("packaging", ""),
            "nutriscore_grade" : product.get("nutriscore_grade", "")
        }

    else:
        result = {"error" : "Product Not Found", "code" : barcode}
    
    return flask.jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)