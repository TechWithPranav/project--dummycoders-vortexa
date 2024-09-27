"use client";
import { useState } from 'react';
import axios from 'axios';

export default function OCRPage() {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle image input
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setExtractedText('');

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post('http://127.0.0.1:8000/ocr', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setExtractedText(response.data.extracted_text.join('\n')); // Display extracted text in textarea
    } catch (err) {
      setError('Failed to extract text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Upload an Image for OCR</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />
        <button
          type="submit"
          disabled={loading || !image}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Extract Text'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {extractedText && (
        <div className="mt-6">
          <label htmlFor="extractedText" className="block font-bold mb-2">
            Extracted Text:
          </label>
          <textarea
            id="extractedText"
            value={extractedText}
            rows="10"
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      )}
    </div>
  );
}
