/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            backgroundColor: {
                primary: "var(--bg-primary)",
                secondary: "var(--bg-secondary)",
                hover: "var(--hover-bg)",
                division: "var(--bg-division)",
                tableHeader: "var(--bg-table-header)",
                tableZ1: "var(--bg-table-z1)",
                tableZ2: "var(--bg-table-z2)",
            },
            textColor: {
                primary: "var(--text-primary)",
                secondary: "var(--text-secondary)",
            },
            fontFamily: {
                primary: ["Montserrat", "sans-serif"],
                secondary: ["Poppins", "sans-serif"],
            },
            borderColor: {
                table: "var(--bg-table-border)"
            }
        },
    },
    plugins: [],
}