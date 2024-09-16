import React from 'react';

interface ModalProps {
    title: string;
    content: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, content, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p className="mb-6">{content}</p>
                <div className="flex justify-end">
                    <button
                        onClick={onCancel}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
