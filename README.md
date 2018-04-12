## Back4App Cloud Code Testing Example

* Clone this repo
```
git clone https://github.com/considine/b4a-cloud-code-test-example.git
cd b4a-cloud-code-test-example.git
```
* Install the dependencies
```
npm install
```
* Create a test Parse Server. You can set up your own [local](https://github.com/parse-community/parse-server) instance, or create an app on [Back4App](https://www.back4app.com/docs/overview/parse-create-new-app) (call it test-app or something to differentiate between production applications)
* - This will be used to run tests without corrupting live production data

* Grab your keys from the Parse Dashboard
 - Go to your Parse Dashboard
 - Select the **test** application
 - Click 'App Settings' on the left hand side, and then select 'Security and Keys'

* Open up the file spec/constants.js, and paste in your master and application keys FROM YOUR TEST SERVER!

* Run the tests:
```
./node_modules/jasmine/bin/jasmine.js spec/signup-user.spec.js
```
You can also install [Jasmine](https://github.com/jasmine/jasmine) globally if you prefer the command be prettier:
```
npm install -g jasmine
jasmine spec/signup-user.spec.js
```

OR you can use the npm command
```
npm run test
```
