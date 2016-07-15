// npm modules
var React = require('react');

// react modules
const Header = require('./components/Header.js');
const BodyOne = require('./components/BodyOne.js');

const App = React.createClass({

    render: function() {
        return (
            <section>
                <Header />
                <main>
                    <BodyOne />
                    
                </main>
            </section>
        );
    }
});

module.exports = App;
