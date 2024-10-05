import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";

export const useFileDropzone = (files, setFiles) => {
  const onDropFiles = useCallback(
    (acceptedFiles) => {
      let allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ];

      const invalidFiles = acceptedFiles.filter(
        (file) => !allowedTypes.some((type) => file.type.includes(type))
      );

      if (invalidFiles.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Solo se permiten archivos de tipo: ${allowedTypes
            .map((type) => type.split("/").pop())
            .join(", ")}.`,
        });
      } else {
        // LIMITAR A UN SOLO ARCHIVO
        if (acceptedFiles.length > 1) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Solo se puede subir un archivo.",
          });
        } else {
          setFiles([acceptedFiles[0]]); // Set a single file only
        }
      }
    },
    [setFiles]
  );

  const removeFile = useCallback(
    (index) => {
      const updatedFileList = files.slice();
      updatedFileList.splice(index, 1);
      setFiles(updatedFileList);
    },
    [files, setFiles]
  );

  const {
    getRootProps: getRootPropsFile,
    getInputProps: getInputPropsFile,
    isDragActive: isDragActiveFile,
  } = useDropzone({
    onDrop: onDropFiles,
  });

  return {
    getRootPropsFile,
    getInputPropsFile,
    isDragActiveFile,
    removeFile,
  };
};
