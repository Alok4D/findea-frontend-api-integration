"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, X, Plus } from "lucide-react";

const categories = [
  "Beauty",
  "Home & Kitchen",
  "Ceramics",
  "Textiles",
  "Jewellery",
  "Art & Decor",
  "Stationery",
  "Gifting",
  "Other",
];

const statusOptions = ["Active", "Draft", "Pending"];

interface ProductImage {
  id: string;
  preview: string;
  file: File;
}

export default function AddProduct() {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
      file,
    }));
    setImages((prev) => [...prev, ...newImages].slice(0, 6));
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="mx-auto max-w-full pb-16">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="font-playfair text-3xl font-bold tracking-wide text-[#1A1A1A] hidden lg:block">
          Artisan & Co.
        </h1>
        <Link
          href="/dashboard/products"
          className="flex w-full sm:w-max justify-center items-center gap-2 border border-[#CFCAC1] bg-transparent px-6 py-2.5 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-[#DEDAD2] lg:ml-auto"
        >
          <ArrowLeft size={16} /> Back to Products
        </Link>
      </div>

      <hr className="mb-6 border-[#CFCAC1]" />

      <div className="mb-8">
        <h2 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-1">
          Add New Product
        </h2>
        <p className="text-sm text-[#4A4A4A]">
          Fill in the details below to add a new product to your catalog
        </p>
      </div>

      {/* Form */}
      <form className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT & CENTER: Main Form */}
        <div className="lg:col-span-2 space-y-6">

          {/* Basic Information */}
          <div className="border border-[#CFCAC1] bg-white/30 p-6">
            <h3 className="font-playfair text-lg font-bold text-[#1A1A1A] mb-5 pb-3 border-b border-[#CFCAC1]">
              Basic Information
            </h3>
            <div className="space-y-5">
              {/* Product Name */}
              <div>
                <label className="block text-[13px] italic mb-1.5 text-[#4A4A4A]">
                  Product Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Artisan Ceramic Bowl Set"
                  className="w-full border border-[#CFCAC1] bg-[#F5F3EE] py-3 px-4 text-sm outline-none focus:border-[#1A1A1A] transition-colors"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[13px] italic mb-1.5 text-[#4A4A4A]">
                  Product Description *
                </label>
                <textarea
                  rows={5}
                  placeholder="Describe your product in detail — materials, use cases, dimensions, etc."
                  className="w-full border border-[#CFCAC1] bg-[#F5F3EE] py-3 px-4 text-sm outline-none focus:border-[#1A1A1A] transition-colors resize-none"
                  required
                />
              </div>

              {/* Category & Store Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] italic mb-1.5 text-[#4A4A4A]">
                    Category *
                  </label>
                  <select
                    className="w-full border border-[#CFCAC1] bg-[#F5F3EE] py-3 px-4 text-sm outline-none focus:border-[#1A1A1A] transition-colors"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] italic mb-1.5 text-[#4A4A4A]">
                    Store / Brand Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ateliers Ifé"
                    className="w-full border border-[#CFCAC1] bg-[#F5F3EE] py-3 px-4 text-sm outline-none focus:border-[#1A1A1A] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-[13px] italic mb-1.5 text-[#4A4A4A]">
                  Tags (press Enter to add)
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 bg-[#DEDAD2] border border-[#CFCAC1] px-3 py-1 text-xs text-[#1A1A1A]"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-[#6E6A63] hover:text-[#1A1A1A]"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="e.g. handmade, ceramic, gift"
                    className="flex-1 border border-[#CFCAC1] bg-[#F5F3EE] py-2.5 px-4 text-sm outline-none focus:border-[#1A1A1A] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="border border-[#CFCAC1] bg-[#DEDAD2] px-4 py-2.5 text-sm hover:bg-[#cfc9bf] transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="border border-[#CFCAC1] bg-white/30 p-6">
            <h3 className="font-playfair text-lg font-bold text-[#1A1A1A] mb-5 pb-3 border-b border-[#CFCAC1]">
              Pricing & Inventory
            </h3>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Price */}
                <div>
                  <label className="block text-[13px] italic mb-1.5 text-[#4A4A4A]">
                    Price (USD) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#6E6A63]">
                      $
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full border border-[#CFCAC1] bg-[#F5F3EE] py-3 pl-8 pr-4 text-sm outline-none focus:border-[#1A1A1A] transition-colors"
                      required
                    />
                  </div>
                </div>
                {/* Discount Price */}
                <div>
                  <label className="block text-[13px] italic mb-1.5 text-[#4A4A4A]">
                    Discount Price (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#6E6A63]">
                      $
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full border border-[#CFCAC1] bg-[#F5F3EE] py-3 pl-8 pr-4 text-sm outline-none focus:border-[#1A1A1A] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Stock Quantity */}
                <div>
                  <label className="block text-[13px] italic mb-1.5 text-[#4A4A4A]">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 50"
                    className="w-full border border-[#CFCAC1] bg-[#F5F3EE] py-3 px-4 text-sm outline-none focus:border-[#1A1A1A] transition-colors"
                    required
                  />
                </div>
                {/* Stock Status */}
                <div>
                  <label className="block text-[13px] italic mb-1.5 text-[#4A4A4A]">
                    Stock Status *
                  </label>
                  <select
                    className="w-full border border-[#CFCAC1] bg-[#F5F3EE] py-3 px-4 text-sm outline-none focus:border-[#1A1A1A] transition-colors"
                    required
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Pre-order">Pre-order</option>
                  </select>
                </div>
              </div>

              {/* SKU */}
              <div>
                <label className="block text-[13px] italic mb-1.5 text-[#4A4A4A]">
                  SKU / Product Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. ART-CER-001"
                  className="w-full border border-[#CFCAC1] bg-[#F5F3EE] py-3 px-4 text-sm outline-none focus:border-[#1A1A1A] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Shipping & Dimensions */}
          <div className="border border-[#CFCAC1] bg-white/30 p-6">
            <h3 className="font-playfair text-lg font-bold text-[#1A1A1A] mb-5 pb-3 border-b border-[#CFCAC1]">
              Shipping & Dimensions
            </h3>
            <div className="space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[13px] italic mb-1.5 text-[#4A4A4A]">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.0"
                    className="w-full border border-[#CFCAC1] bg-[#F5F3EE] py-3 px-4 text-sm outline-none focus:border-[#1A1A1A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] italic mb-1.5 text-[#4A4A4A]">
                    Length (cm)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="0.0"
                    className="w-full border border-[#CFCAC1] bg-[#F5F3EE] py-3 px-4 text-sm outline-none focus:border-[#1A1A1A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] italic mb-1.5 text-[#4A4A4A]">
                    Width (cm)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="0.0"
                    className="w-full border border-[#CFCAC1] bg-[#F5F3EE] py-3 px-4 text-sm outline-none focus:border-[#1A1A1A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] italic mb-1.5 text-[#4A4A4A]">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="0.0"
                    className="w-full border border-[#CFCAC1] bg-[#F5F3EE] py-3 px-4 text-sm outline-none focus:border-[#1A1A1A] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] italic mb-1.5 text-[#4A4A4A]">
                  Shipping Note
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ships within 3–5 business days"
                  className="w-full border border-[#CFCAC1] bg-[#F5F3EE] py-3 px-4 text-sm outline-none focus:border-[#1A1A1A] transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Image Upload + Status */}
        <div className="space-y-6">
          {/* Product Images */}
          <div className="border border-[#CFCAC1] bg-white/30 p-6">
            <h3 className="font-playfair text-lg font-bold text-[#1A1A1A] mb-5 pb-3 border-b border-[#CFCAC1]">
              Product Images
            </h3>

            {/* Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="mb-4 flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-[#CFCAC1] bg-[#F5F3EE] py-8 px-4 transition-colors hover:border-[#1A1A1A] hover:bg-[#DEDAD2]/30"
            >
              <Upload size={28} className="text-[#6E6A63]" />
              <p className="text-sm font-medium text-[#1A1A1A]">Click to upload</p>
              <p className="text-xs text-[#6E6A63]">PNG, JPG, WEBP (max 6 images)</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {images.map((img) => (
                  <div key={img.id} className="relative group aspect-square">
                    <img
                      src={img.preview}
                      alt="preview"
                      className="h-full w-full object-cover border border-[#CFCAC1]"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="absolute top-1 right-1 bg-[#1A1A1A] text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {images.length > 0 && (
              <p className="mt-2 text-xs text-[#6E6A63]">
                {images.length}/6 images uploaded
              </p>
            )}
          </div>

          {/* Status */}
          <div className="border border-[#CFCAC1] bg-white/30 p-6">
            <h3 className="font-playfair text-lg font-bold text-[#1A1A1A] mb-5 pb-3 border-b border-[#CFCAC1]">
              Publication
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] italic mb-1.5 text-[#4A4A4A]">
                  Product Status *
                </label>
                <select
                  className="w-full border border-[#CFCAC1] bg-[#F5F3EE] py-3 px-4 text-sm outline-none focus:border-[#1A1A1A] transition-colors"
                  required
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[13px] italic mb-1.5 text-[#4A4A4A]">
                  Visibility
                </label>
                <select className="w-full border border-[#CFCAC1] bg-[#F5F3EE] py-3 px-4 text-sm outline-none focus:border-[#1A1A1A] transition-colors">
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                  <option value="Registry Only">Registry Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              type="submit"
              className="w-full bg-[#1A1A1A] text-[#F5F3EE] hover:bg-[#333333] py-3.5 text-[13px] font-bold uppercase tracking-[0.2em] transition-colors"
            >
              Publish Product
            </button>
            <button
              type="button"
              className="w-full border border-[#CFCAC1] bg-transparent hover:bg-[#DEDAD2] py-3.5 text-[13px] font-bold uppercase tracking-[0.2em] transition-colors text-[#1A1A1A]"
            >
              Save as Draft
            </button>
            <Link
              href="/dashboard/products"
              className="block text-center text-sm text-[#6E6A63] hover:text-[#1A1A1A] transition-colors"
            >
              Cancel & go back
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}