/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif']
            },
            colors: {
                redPrincipal: {
                    200: "#FFDBDB",
                    900: "#C60606"
                }
            }
        },
    },
    plugins: [],
}