let scanned = false;


function attachScannerDetection() {
  Quagga.onDetected(async function(result) {

    if(scanned) return;

    scanned = true;
    document.getElementById("results").innerHTML = "<p>Scanning...</p>";

    const barcode = result.codeResult.code;

    const response = await fetch(`/scan?barcode=${barcode}`);
    const data = await response.json();

    displayResult(data);

    Quagga.stop();
  });
}

function startScanner() {

  Quagga.init({
    inputStream : {
      name : "Live",
      type : "LiveStream",
      target: document.querySelector('#scanner')
    },
    decoder : {
      readers : ["ean_reader", "upc_reader"]
    }
  }, function(err) {
      if (err) {
          console.log(err);
          return
      }

      console.log("Scanner started");
      Quagga.start();
  });

  attachScannerDetection();
}

startScanner();

function displayResult(data) {
  const container = document.getElementById("results");
  container.innerHTML = "";
  if(data.error) {
    console.log("Product Not Found");
    container.innerHTML = `<p>Product Not Found</p>\
                           <a class="submit-btn" href="https://world.openfoodfacts.org/cgi/product.pl?code=${data.code}" target="_blank">
                           Add Product to Database
                           </a>`

    return;
  }

  score = data["sustainability_score"];
  console.log(data);
  const recycleableMaterials = ["pet", "hdpe", "aluminium", "steel", "glass", "paper", "cardboard"]
  let recycleable;
  if(!data["packaging"]) {
    recycleable = "N/A";
  } else {
    recycleable = false;
    for(const material of recycleableMaterials) {
      if(data["packaging"].toLowerCase().includes(material)) {
        recycleable = true;
      }
    }
  }
  if(recycleable) {score += 20;}

  if (["d", "e"].includes(data["nutriscore_grade"])) {
    container.innerHTML += `<p>Try healthier alternatives</p>`;
  } else if(data["packaging"] && data["packaging"].toLowerCase().includes("plastic")) {
    container.innerHTML += `<p>Try aluminium or glass packaging</p>`;
  }
  
  container.innerHTML +=`<p>Product Name: ${(data["product_name"] || "N/A")}</p>\
                        <p>Brands: ${(data["brands"] || "N/A")}</p>\
                        <p>Nutrition Score: ${data["nutriscore_grade"] || "N/A"}</p>\
                        <p>Packaging: ${data["packaging"] || "N/A"}</p>\
                        <p>Recycleable: ${recycleable}</p>\
                        <p><strong>Sustainability Score:</strong> <span id="score">${score}</span></p>`
  const scoreText = document.getElementById("score");

  if(score >= 80) {scoreText.style.color = "green"}
  else if(score >= 50) {scoreText.style.color = "orange"}
  else {scoreText.style.color = "red"}
}