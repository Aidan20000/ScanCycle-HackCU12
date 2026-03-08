# ScanCycle

A smart barcode scanning application that provides real-time product information and sustainability insights. ScanCycle leverages computer vision and open data APIs to help users make informed purchasing and recycling decisions.

## Features

- **Real-time Barcode Scanning**: Uses Quagga2 library to scan EAN and UPC barcodes directly from your webcam
- **Product Information**: Retrieves comprehensive product details including:
  - Product name and brands
  - Nutrition scores (Nutri-Score)
  - Packaging materials
- **Recyclability Detection**: Automatically determines if product packaging is recyclable based on material composition
- **Open Data Integration**: Powered by Open Food Facts API for reliable product information
- **User-Friendly Interface**: Clean, responsive web-based interface for seamless scanning experience

## Technology Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS, JavaScript
- **Barcode Scanning**: Quagga2 (JavaScript barcode scanner library)
- **Data Source**: Open Food Facts API

## Installation

### Prerequisites
- Python 3.7 or higher
- Node.js and npm (for frontend dependencies)
- A modern web browser with webcam access

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ScanCycle-HackCU-12-
   ```

2. **Create a Python virtual environment**
   ```bash
   python -m venv .venv
   ```

3. **Activate the virtual environment**
   - **Windows:**
     ```bash
     .venv\Scripts\activate
     ```
   - **macOS/Linux:**
     ```bash
     source .venv/bin/activate
     ```

4. **Install Python dependencies**
   ```bash
   pip install flask requests
   ```

5. **Install JavaScript dependencies**
   ```bash
   npm install
   ```

## Usage

1. **Start the Flask server**
   ```bash
   python flask_app.py
   ```

2. **Open your browser**
   Navigate to `http://localhost:5000`

3. **Scan a barcode**
   - Grant camera permissions when prompted
   - Position a barcode in front of your webcam
   - The application will automatically detect and scan the barcode

4. **View results**
   - Product information will be displayed in real-time
   - Check the recyclability status of the packaging
   - If the product isn't found, you can add it to the Open Food Facts database via the provided link

## API Endpoints

### `GET /`
Serves the main application interface

### `GET /scan?barcode=<barcode_code>`
Scans and retrieves product information for the specified barcode

**Parameters:**
- `barcode` (string): The barcode code to scan (EAN or UPC)

**Response:**
```json
{
  "product-name": "Product Name",
  "brands": "Brand Name",
  "packaging": "Plastic, Paper",
  "nutriscore_grade": "A"
}
```

## Supported Barcode Formats

- **EAN** (European Article Number) - 13 digits
- **UPC** (Universal Product Code) - 12 digits

## Recyclable Materials
The application recognizes the following recyclable materials:
- PET (Polyethylene Terephthalate)
- HDPE (High-Density Polyethylene)
- Aluminium
- Steel
- Glass
- Paper
- Cardboard

## Project Structure

```
ScanCycle-HackCU-12-/
├── flask_app.py          # Flask backend application
├── templates/
│   └── index.html        # Main HTML template
├── static/
│   ├── index.css         # Stylesheet
│   └── index.js          # Frontend JavaScript logic
├── package.json          # JavaScript dependencies
└── README.md             # Project documentation
```

## Dependencies

### Python
- Flask - Web framework
- Requests - HTTP library for API calls

### JavaScript
- Quagga2 - Real-time barcode scanner library
- Open Food Facts API - Product database

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

## Acknowledgments

- [Open Food Facts](https://world.openfoodfacts.org/) - Comprehensive open food database
- [Quagga2](https://unpkg.com/@ericblade/quagga2/) - Advanced barcode scanning library
- Built for HackCU 12