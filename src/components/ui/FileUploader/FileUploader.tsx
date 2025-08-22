import { cn } from "@/utils/cn";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { getMimeTypeFromExtension } from "@/utils/contentTypeDetector";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
  multiple = false,
  accept,
}: {
  onChange?: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Función para convertir extensiones a tipos MIME usando la utilidad existente
  const getAcceptObject = (acceptString?: string) => {
    if (!acceptString) return undefined;
    
    const extensions = acceptString.split(',').map(ext => ext.trim());
    const acceptObject: Record<string, string[]> = {};
    
    extensions.forEach(ext => {
      const mimeType = getMimeTypeFromExtension(ext);
      if (mimeType && mimeType !== 'application/octet-stream') {
        if (!acceptObject[mimeType]) {
          acceptObject[mimeType] = [];
        }
      }
    });
    
    return Object.keys(acceptObject).length > 0 ? acceptObject : undefined;
  };

  const handleFileChange = (newFiles: File[]) => {
    if (multiple) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    } else {
      setFiles(newFiles.slice(0, 1));
    }
    onChange && onChange(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange && onChange(updatedFiles);
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: multiple,
    noClick: true,
    accept: getAcceptObject(accept),
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block rounded-[12px] cursor-pointer w-full relative overflow-hidden border border-[rgba(190,221,125,0.15)] bg-[rgba(26,46,26,0.4)] transition-all duration-200 hover:border-[rgba(190,221,125,0.3)]"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-montserrat font-semibold text-primary-light text-base">
            {multiple ? 'Subir archivos' : 'Subir archivo'}
          </p>
          <p className="relative z-20 font-montserrat font-normal text-primary-light/70 text-sm mt-2">
            {multiple 
              ? 'Arrastra y suelta tus archivos aquí o haz clic para subir'
              : 'Arrastra y suelta tu archivo aquí o haz clic para subir'
            }
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-[rgba(26,46,26,0.6)] border border-[rgba(190,221,125,0.15)] flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-[12px]",
                    "shadow-sm"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-primary-light font-montserrat truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <div className="flex items-center gap-2">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-primary-light/70 bg-[rgba(190,221,125,0.1)] font-montserrat"
                      >
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </motion.p>
                      {multiple && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(idx);
                          }}
                          className="text-red-400 hover:text-red-300 transition-colors p-1"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-primary-light/70 font-montserrat">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-2 py-1 rounded-md bg-[rgba(190,221,125,0.1)] text-primary-light"
                    >
                      {file.type}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modificado{" "}
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-[rgba(26,46,26,0.6)] border border-[rgba(190,221,125,0.15)] flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-[12px]",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-primary-light flex flex-col items-center font-montserrat"
                  >
                    Soltar aquí
                    <IconUpload className="h-4 w-4 text-primary-light mt-1" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-primary-light" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-primary inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-[12px]"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-[rgba(26,46,26,0.2)] shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-[rgba(26,46,26,0.3)]"
                  : "bg-[rgba(26,46,26,0.3)] shadow-[0px_0px_1px_3px_rgba(190,221,125,0.05)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}
