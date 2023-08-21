"use client";
import React, { useCallback, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Modal = ({
  children,
  noEscape,
}: {
  children: ReactNode;
  noEscape?: boolean;
}) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    if (noEscape) return;
    router.push("/");
  }, [router]);

  //   to cancel the modal when clicking outside
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current && onDismiss) onDismiss();
    },
    [onDismiss, overlay]
  );

  return (
    <div ref={overlay} onClick={handleClick} className="modal h-full">
      {!noEscape && (
        <button
          type="button"
          onClick={onDismiss}
          className="absolute top-4 right-8"
        >
          <Image src="/close.svg" width={17} height={17} alt="close" />
        </button>
      )}
      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
};

export default Modal;
