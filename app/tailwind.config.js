module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false,
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            cursor: ['hover'],
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
