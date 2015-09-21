# Nodejs Stripe Sample

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and NPM](nodejs.org) >= v0.12.0
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Enter your publishable key in ./client/app/purchase/puchase.controller.js & secret key in ./server/components/payment_handlers/stripe.payment_handler.js.

2. Run `npm install` to install server dependencies.

3. Run `bower install` to install front-end dependencies.

4. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

5. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.
