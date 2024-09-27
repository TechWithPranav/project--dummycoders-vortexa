// components/ImageUpload.js
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getBase64 } from './ImageHelper';
import ReactMarkdown from 'react-markdown';
import { Button } from '../ui/button';
import {
  AudioWaveform,
  File,
  FileImage,
  FolderArchive,
  UploadCloud,
  Video,
  X
} from 'lucide-react';

const ImageColor = {
  bgColor: 'bg-purple-600',
  fillColor: 'fill-purple-600',
};

const PdfColor = {
  bgColor: 'bg-blue-400',
  fillColor: 'fill-blue-400',
};

const AudioColor = {
  bgColor: 'bg-yellow-400',
  fillColor: 'fill-yellow-400',
};

const VideoColor = {
  bgColor: 'bg-green-400',
  fillColor: 'fill-green-400',
};

const OtherColor = {
  bgColor: 'bg-gray-400',
  fillColor: 'fill-gray-400',
};

const FileTypes = {
  Image: 'image',
  Pdf: 'pdf',
  Audio: 'audio',
  Video: 'video',
  Other: 'other',
};

export default function ImageUpload() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [textareaValue, setTextareaValue] = useState('');
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_AI_API_KEY);

  const getFileIconAndColor = (file) => {
    if (file.type.includes(FileTypes.Image)) {
      return {
        icon: <FileImage size={40} className={ImageColor.fillColor} />,
        color: ImageColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Pdf)) {
      return {
        icon: <File size={40} className={PdfColor.fillColor} />,
        color: PdfColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Audio)) {
      return {
        icon: <AudioWaveform size={40} className={AudioColor.fillColor} />,
        color: AudioColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Video)) {
      return {
        icon: <Video size={40} className={VideoColor.fillColor} />,
        color: VideoColor.bgColor,
      };
    }

    return {
      icon: <FolderArchive size={40} className={OtherColor.fillColor} />,
      color: OtherColor.bgColor,
    };
  };

  const fetchPrescriptionDetails = async (imageInlineData) => {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent([
        'Write a prescription in pointer format ordered by name of medicine, symptoms, primary diagnosis, usage and dosage of medicine in the image',
        imageInlineData
      ]);
      const response = await result.response;
      const text = response.text();
      setTextareaValue(text);
    } catch (error) {
      console.error('Error fetching prescription details:', error);
      setTextareaValue('Failed to get prescription details from the AI.');
    }
  };

  const handleProceedClick = async () => {
    if (filesToUpload.length > 0) {
      setLoading(true);
      const file = filesToUpload[0].file;
      const base64Image = await getBase64(file);
      const imageInlineData = {
        inlineData: { data: base64Image.split(',')[1], mimeType: file.type },
      };
      await fetchPrescriptionDetails(imageInlineData);
      setLoading(false);
    }
  };

  const removeFile = (file) => {
    setFilesToUpload((prevUploadProgress) =>
      prevUploadProgress.filter((item) => item.file !== file)
    );
    setUploadedFiles((prevUploadedFiles) =>
      prevUploadedFiles.filter((item) => item !== file)
    );
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFilesToUpload((prevUploadProgress) => [
      ...prevUploadProgress,
      ...acceptedFiles.map((file) => ({ progress: 0, file, source: null })),
    ]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div>
        <label
          {...getRootProps()}
          className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 h-[200px]"
        >
          <div className="text-center">
            <div className="border p-2 rounded-md max-w-min mx-auto">
              <UploadCloud size={20} />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Drag files</span>
            </p>
            <p className="text-xs text-gray-500">
              Click to upload files (files should be under 10 MB)
            </p>
          </div>
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg"
          type="file"
          className="hidden"
        />
      </div>

      {filesToUpload.length > 0 && (
        <div>
          <ScrollArea className="h-40 mt-5">
            <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
              Files to upload
            </p>
            <div className="space-y-2 pr-3">
              {filesToUpload.map((fileUploadProgress, index) => (
                <div
                  key={index}
                  className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2"
                >
                  <div className="flex items-center flex-1 p-2">
                    <div className="text-white">
                      {getFileIconAndColor(fileUploadProgress.file).icon}
                    </div>
                    <div className="w-full ml-2 space-y-1">
                      <div className="text-sm flex justify-between">
                        <p className="text-muted-foreground">
                          {fileUploadProgress.file.name.slice(0, 25)}
                        </p>
                        <span className="text-xs">
                          {/* {fileUploadProgress.progress}% */}
                          100%
                        </span>
                      </div>
                      <Progress
                        progress={fileUploadProgress.progress}
                        className={
                          getFileIconAndColor(fileUploadProgress.file).color
                        }
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (fileUploadProgress.source)
                        fileUploadProgress.source.cancel('Upload cancelled');
                      removeFile(fileUploadProgress.file);
                    }}
                    className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div>
          <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
            Uploaded Files
          </p>
          <div className="space-y-2 pr-3">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center flex-1 p-2">
                  <div className="text-white">
                    {getFileIconAndColor(file).icon}
                  </div>
                  <div className="w-full ml-2 space-y-1">
                    <div className="text-sm flex justify-between">
                      <p className="text-muted-foreground">
                        {file.name.slice(0, 25)}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file)}
                  className="bg-red-500 text-white transition-all items-center justify-center px-2 hidden group-hover:flex"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-center">
        <Button
          onClick={handleProceedClick}
          className="px-4 py-2 bg-green-700 text-white rounded">
            Proceed
        </Button>
      </div>
      {loading ? (
        <p className="text-center my-4">Loading...</p>
      ) : (
        <div className="w-full mt-4">
          <div className="mt-4 p-4 border rounded-lg bg-white">
            <ReactMarkdown>{textareaValue}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
