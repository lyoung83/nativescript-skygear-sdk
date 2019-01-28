# Nativescript Skygear-Sdk Plugin

This plugin allows you to use your nativescript application with a skygear.io or skygear-server applicaton



## Installation

Describe your plugin installation steps. Ideally it would be something like:

```javascript
tns plugin add nativescript-skygear-sdk
```

## Usage

To get started import the sdk, put in your app api key and the address to your skygear server

	```javascript
    import { SkygearSdk } from 'nativescript-skygear-sdk';

    const config = { apiKey: "plugintest123", address: "localhost:3000" }

    const skygearSDK = new SkygearSdk(config);
    ```
    and then you can use it like this:
     ```javascript
      skygearSDK.auth.signupWithEmailPassword("email@example.com", "password")
      .then(user => console.log(user))
      .catch(error => console.log(error))
    ```


## API

Describe your plugin methods and properties here. See [nativescript-feedback](https://github.com/EddyVerbruggen/nativescript-feedback) for example.

| Module | Description |
| --- | --- |
| auth | handles signup, login, and logout. --password reset coming soon. |
| chat | handles interaction with the skygear chat plugin |
|db(database)|handles interaction with the public and private cloud database|
|pubsub| handles interaction with the skygear pubsub module, --will eventually have support for push notifications.|

## License

Apache License Version 2.0, January 2004
