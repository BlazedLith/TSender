'use client';

type InputFieldProps = {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    textarea?: boolean;
};

export default function InputField({
    label,
    placeholder,
    value,
    onChange,
    textarea = false,
}: InputFieldProps) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">
                {label}
            </label>
            {textarea ? (
                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={4}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                />
            ) : (
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                />
            )}
        </div>
    );
}
