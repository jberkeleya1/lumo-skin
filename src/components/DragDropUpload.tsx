"use client"

import { useCallback, useState } from "react"

export default function DragDropUpload({
  onFileSelect,
}: {
  onFileSelect: (file: File | null) => void
}) {
  const [dragOver, setDragOver] = useState(false)
  const [filename, setFilename] = useState("No file selected")

  const handleFileChange = (fileList: FileList | null) => {
    const file = fileList?.[0] || null
    onFileSelect(file)
    setFilename(file ? file.name : "No file selected")
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
    handleFileChange(e.dataTransfer.files)
  }, [])

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`w-full border border-borderColor rounded-md bg-white p-3 text-center cursor-pointer transition ${
        dragOver ? "border-primary bg-[#f5f5f5]" : ""
      }`}
      
    >
      <label className="block text-sm text-textMuted cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files)}
        />
        <div className="flex flex-col items-center justify-center space-y-1">
          <span className="text-xl">📎</span>
          <p className="text-sm">{filename}</p>
          <p className="text-xs text-textMuted">Click or drag & drop a photo</p>
        </div>
      </label>
    </div>
  )
}
