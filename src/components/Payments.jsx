export const Payments = () => {
  return (
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
  );
};
