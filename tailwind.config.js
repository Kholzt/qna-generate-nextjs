/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#6366f1", // Indigo
                    dark: "#4f46e5",
                },
                secondary: {
                    DEFAULT: "#8b5cf6", // Violet
                    dark: "#7c3aed",
                }
            },
            backgroundImage: {
                'gradient-brand': 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            }
        },
    },
    plugins: [],
};
