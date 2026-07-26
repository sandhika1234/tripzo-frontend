"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Camera, Upload, X, Loader2, ImagePlus } from "lucide-react";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  label?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export default function ImageUpload({
  images,
  onImagesChange,
  maxImages = 10,
  label = "Vehicle Photos",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File): Promise<string | null> => {
    const token = sessionStorage.getItem("tripzo_token");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${API_URL}/upload/image`, {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      return data.url;
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    }
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    if (images.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    setError("");
    setUploading(true);

    const uploadPromises = Array.from(files).map((file) => {
      // Validate file
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed");
        return null;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Max file size is 5MB");
        return null;
      }
      return uploadFile(file);
    });

    const results = await Promise.all(uploadPromises);
    const newUrls = results.filter(Boolean) as string[];

    if (newUrls.length > 0) {
      onImagesChange([...images, ...newUrls]);
    }

    setUploading(false);
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onImagesChange(updated);
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
        {label} ({images.length}/{maxImages})
      </label>

      {/* Image Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
        {/* Existing Images */}
        {images.map((url, i) => (
          <div
            key={i}
            className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 group"
          >
            <Image
              src={url}
              alt={`Vehicle photo ${i + 1}`}
              fill
              className="object-cover"
              sizes="150px"
            />
            <button
              onClick={() => removeImage(i)}
              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
            {i === 0 && (
              <span className="absolute bottom-1.5 left-1.5 bg-teal-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                COVER
              </span>
            )}
          </div>
        ))}

        {/* Upload Buttons */}
        {images.length < maxImages && !uploading && (
          <>
            {/* Gallery Upload */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="aspect-[4/3] rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1.5 hover:border-teal-400 hover:bg-teal-50 transition-all cursor-pointer"
            >
              <ImagePlus size={22} className="text-gray-400" />
              <span className="text-[10px] text-gray-400 font-medium">
                Gallery
              </span>
            </button>

            {/* Camera Upload */}
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="aspect-[4/3] rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1.5 hover:border-teal-400 hover:bg-teal-50 transition-all cursor-pointer"
            >
              <Camera size={22} className="text-gray-400" />
              <span className="text-[10px] text-gray-400 font-medium">
                Camera
              </span>
            </button>
          </>
        )}

        {/* Uploading State */}
        {uploading && (
          <div className="aspect-[4/3] rounded-xl border-2 border-teal-200 bg-teal-50 flex flex-col items-center justify-center gap-2">
            <Loader2 size={24} className="text-teal-600 animate-spin" />
            <span className="text-[10px] text-teal-600 font-medium">
              Uploading...
            </span>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

      <p className="text-xs text-gray-400">
        Upload clear photos of your vehicle. First image will be the cover.
        Max 5MB per image, up to {maxImages} photos.
      </p>

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
