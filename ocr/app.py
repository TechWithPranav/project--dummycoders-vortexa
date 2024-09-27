# app.py
import easyocr
import cv2
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from io import BytesIO
from PIL import Image

# Initialize FastAPI
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # Update this if your frontend runs on a different port
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize EasyOCR Reader
reader = easyocr.Reader(['en'])

# Function to read and process image
def process_image(image_bytes):
    # Convert bytes data to numpy array for OpenCV processing
    image = np.array(Image.open(BytesIO(image_bytes)))
    results = reader.readtext(image)

    # Process each detection
    extracted_text = []
    for detection in results:
        text = detection[1]
        extracted_text.append(text)

    return extracted_text

# API route to receive image and return extracted text
@app.get("/")
async def read_root():
    return {"message": "Welcome to OCR API"}

@app.post("/ocr")
async def ocr(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()  # Read uploaded image
        extracted_text = process_image(image_bytes)
        return JSONResponse(content={"extracted_text": extracted_text})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# To run the server: Uncomment below for running in local
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7777)
