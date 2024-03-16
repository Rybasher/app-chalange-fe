import { Dialog } from "@headlessui/react";

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Dialog
        className="relative z-auto "
        open={isOpen}
        onClose={() => onClose()}
      >
        <div className="fixed inset-0  w-screen h-screen  bg-zinc-800">
          <div className="flex flex-col items-center">
            <Dialog.Panel className="w-5/12 h-screen border-2 rounded-lg border-sky-400/100 py-10 bg-zinc-900">
              {children}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
