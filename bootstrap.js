requirejs.config({
    baseUrl: 'node_modules',
    paths: {
        react: 'react/dist/react-with-addons',
        'react-dom': 'react-dom/dist/react-dom',
        es6: 'requirejs-babel/es6',
        babel: 'requirejs-babel/babel-5.8.22.min',

        components: '../app/components',
        services: '../app/services'
    }
});

require([
    'react',
    'react-dom',
    'es6!components/app'
], function (React, ReactDOM, AppComponent) {

    ReactDOM.render(React.createElement(AppComponent),
        document.querySelector('.js-app-container'));
});