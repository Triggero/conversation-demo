import { useEffect, useRef } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialogDimensions = e.currentTarget.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="
        w-1/3 z-20 h-fit rounded-md bg-white p-0 
        backdrop:bg-black backdrop:bg-opacity-30
        motion-safe:animate-in
        motion-safe:fade-in-0 
        motion-safe:zoom-in-95 
        motion-safe:duration-300
        motion-safe:ease-out
      "
      onClick={handleBackdropClick}
      onClose={() => onClose()}
    >
      <div className="p-4" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </dialog>
  );
}
