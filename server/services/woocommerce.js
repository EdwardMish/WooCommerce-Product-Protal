const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const credentials = require("../config/WOO_API");
const WooCommerce = new WooCommerceRestApi({
  url: credentials.url,
  consumerKey: credentials.key,
  consumerSecret: credentials.secret,
  wpAPI: true,
  version: "wc/v3",
});

module.exports = WooCommerce;
