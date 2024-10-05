import { useState } from "react";
import { useFileDropzone } from "../hooks/useFileDropzone";

export const Payments = () => {
  const [files, setFiles] = useState([]);

  const { getRootPropsFile, getInputPropsFile, removeFile } = useFileDropzone(
    files,
    setFiles
  );

  return (
    <>
      <div
        {...getRootPropsFile()}
        className="rounded cursor-pointer text-sm text-center bg-danger mx-2"
      >
        <input {...getInputPropsFile()} />
        <p>Adjuntar comprobante de pago</p>
      </div>
      {files.length > 0 && (
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
          {files.map((file, index) => (
            <div
              key={index}
              className="d-flex flex-column align-items-center gap-2"
            >
              {!file.type.startsWith("image/") ? (
                <>
                  <i className="ri-file-text-fill text-4xl text-dark"></i>
                  <a
                    href={URL.createObjectURL(file)}
                    download={file.name}
                    className="text-xs"
                  >
                    {file.name.length > 20
                      ? file.name.slice(0, 20) + "..."
                      : file.name}
                  </a>
                </>
              ) : (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="rounded-lg"
                  style={{ maxWidth: "100px" }}
                />
              )}
              <button
                className="btn btn-sm btn-outline-danger input-none"
                type="button"
                onClick={() => removeFile(index, "dni")}
              >
                <i className="ri-delete-bin-line"></i>
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="p-2 mx-2 bg-dark rounded border-2 flex flex-col gap-2">
        <h1 className="text-light text-base text-center m-0">
          Historial de pagos
        </h1>
        <div className="flex flex-wrap gap-3 rounded border text-light justify-start px-2 items-center h-10">
          <p>dia</p>
          <p>pago</p>
          <p>adjunto</p>
        </div>
        <div className="flex flex-wrap gap-3 rounded border text-light justify-start px-2 items-center h-10">
          <p>dia</p>
          <p>pago</p>
          <p>adjunto</p>
        </div>
      </div>
    </>
  );
};
