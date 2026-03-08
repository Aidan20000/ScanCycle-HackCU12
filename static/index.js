let scanned = false;

function displayResult(data) {
  const container = document.getElementById("results");
  if(data.error) {
    console.log("Product Not Found");
    container.innerHTML = `<p>Product Not Found</p>\
                           <a class="submit-btn" href="https://world.openfoodfacts.org/cgi/product.pl?code=${data.code}" target="_blank">
                           Add Product to Database
                           </a>`

    return;
  }

  let recycleable = false;
  const recycleableMaterials = ["pet", "hdpe", "aluminium", "steel", "glass", "paper", "cardboard"]
  if(data["packaging"]) {
    for(const material of recycleableMaterials) {
      if(data["packaging"].toLowerCase().includes(material)) {
        recycleable = true;
      }
    }
  }
  
  container.innerHTML =`<p>Product Name: ${(data["product_name"] || "N/A")}</p>\
                        <p>Brands: ${(data["brands"] || "N/A")}</p>\
                        <p>Nutrition Score: ${data["nutriscore_grade"] || "N/A"}</p>\
                        <p>Packaging: ${data["packaging"] || "N/A"}</p>\
                        <p>Recycleable: ${recycleable}</p>`
}

Quagga.init({
    inputStream : {
      name : "Live",
      type : "LiveStream",
      target: document.querySelector('#scanner')    // Or '#yourElement' (optional)
    },
    decoder : {
      readers : ["ean_reader", "upc_reader"]
    }
  }, function(err) {
      if (err) {
          console.log(err);
          return
      }
      console.log("Initialization finished. Ready to start");

      Quagga.start();
  });

  Quagga.onDetected(async function(result) {
    if(scanned) {return;}

    scanned = true;
    const barcode = result.codeResult.code;
    const response = await fetch(`/scan?barcode=${barcode}`);
    const data = await response.json();

    displayResult(data);

    Quagga.stop()
  });