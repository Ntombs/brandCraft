import React, { useState, useEffect } from 'react';
import { Upload, ImageIcon, Sliders } from 'lucide-react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import ImageEditor from '@uppy/image-editor';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/image-editor/dist/style.css';
import { Slider } from "@/components/ui/slider";

interface ImageUploadProps {
  title: string;
  subtitle: string;
  aspectRatio?: string;
  onImageUploaded?: (url: string) => void;
  className?: string;
  initialOpacity?: number;
}

export function ImageUpload({
  title,
  subtitle,
  aspectRatio = "4/3",
  onImageUploaded,
  className = "",
  initialOpacity = 100
}: ImageUploadProps) {
  const [uppy] = useState(() => new Uppy({
    restrictions: {
      maxNumberOfFiles: 1,
      allowedFileTypes: ['image/*']
    },
    autoProceed: true
  }).use(ImageEditor, {
    quality: 0.9,
    cropperOptions: {
      aspectRatio: Number(aspectRatio.split('/')[0]) / Number(aspectRatio.split('/')[1])
    }
  }));

  const [showUploader, setShowUploader] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageOpacity, setImageOpacity] = useState(initialOpacity);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    // Subscribe to upload completion and handle the result
    uppy.on('complete', (result) => {
      if (result.successful && result.successful.length > 0) {
        const file = result.successful[0];
        const imageDataUrl = URL.createObjectURL(file.data);
        setImageUrl(imageDataUrl);
        onImageUploaded?.(imageDataUrl);
        setShowUploader(false);
      }
    });

    // Clean up the subscription when component unmounts
    return () => {
      uppy.cancelAll();
      // Properly dispose of uppy plugin instances when component unmounts
    };
  }, [uppy, onImageUploaded]);

  // Handle opacity change
  const handleOpacityChange = (value: number[]) => {
    setImageOpacity(value[0]);
  };

  return (
    <div className={`relative rounded-md shadow-sm overflow-hidden ${className}`}>
      <div 
        className="aspect-[4/3] flex items-center justify-center bg-gray-100"
        style={{ aspectRatio }}
      >
        {imageUrl ? (
          <div className="relative w-full h-full">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover"
              style={{ opacity: imageOpacity / 100 }}
            />
            <button 
              className="absolute top-2 right-2 bg-black/70 p-2 rounded-full text-white hover:bg-black/90 transition-colors"
              onClick={() => setShowControls(!showControls)}
            >
              <Sliders className="w-4 h-4" />
            </button>
            {showControls && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                <div className="flex items-center gap-4">
                  <span className="text-white text-sm">Opacity:</span>
                  <Slider
                    defaultValue={[imageOpacity]}
                    max={100}
                    step={1}
                    className="flex-1"
                    onValueChange={handleOpacityChange}
                  />
                  <span className="text-white text-sm w-8">{imageOpacity}%</span>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => setShowUploader(true)}
                    className="text-sm text-white hover:text-[#a98a55] transition-colors"
                  >
                    Replace Image
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center flex-col cursor-pointer"
            onClick={() => setShowUploader(true)}
          >
            <Upload className="w-10 h-10 text-[#a98a55] mb-4 opacity-60" />
            <p className="text-gray-400 font-medium">{title}</p>
            <p className="text-xs text-gray-400">{subtitle}</p>
          </div>
        )}
      </div>

      {showUploader && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold">Upload Image</h3>
              <button 
                onClick={() => setShowUploader(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <div className="p-4">
              <Dashboard 
                uppy={uppy}
                plugins={['ImageEditor']}
                width="100%"
                height={450}
                proudlyDisplayPoweredByUppy={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}