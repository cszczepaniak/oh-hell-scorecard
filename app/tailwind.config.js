module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false,
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            cursor: ['hover'],
            backgroundColor: ['disabled'],
            textColor: ['disabled'],
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
