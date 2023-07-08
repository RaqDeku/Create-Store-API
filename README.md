# Create-Store-API

This is an API I created which handles a store catalog on a ecommerse website,
this API if modified can server as a microservice for the store catalog section.

This API utilises the [Authencation-API](https://github.com/RaqDeku/Authentication-API)
I created. The above API generates a jwt token which gets passed as a Bearer Header.
The token is used to validate users who wish to interact with the store catalog endpoint.

# Implementation

1. A user once validated can create a store via the **store/new** endpoint.
2. A user can add a review to a particular store aside thiers if any.
