DB Updating Table Dev Challenge
===============================

The solution is in the `site/index.html` file.

To view the solution, run

```
npm install
npm start
```

from within this directory.  This will start a development server (using webpack). Once the development server has started, navigate to [http://localhost:8011](http://localhost:8011) to see the solution

To run test,

```
npm test
```

Test framework is used is `mocha` and test runner is `karma` alongwith the `expect` assertion library. All test files are in `test/specs` and the name ends with `.spec.js`.


All the new files have been added in `es6` directory.

* `Currency` -> Model to represent the currency data.
* `TableRow` -> Encapsulates `Currency` and creates a table row node.
* `Table` -> Represents a list of `TableRows` items. On every new `Currency` is received or updates, it sorts the list in increasing order of `lastChangeBid` and fires all the subscribed listeners. It also fires all the listeners subscribed to sparkline event every given interval while creating the object.
* `AppView` -> This is the main view that represents the table data. This class performs functionality specific to browser, like --
    * subscribing to the `/fx/prices` channel to get updates
    * render the table data on every update received
    * render the sparkline every 30 seconds from the history of updates
    * first sparkline is generated when first data comes for each of the currency pair. Then it refreshes every 30 seconds as stated above.
* Tests have been written for all files except `AppView`

```
Name - Rohit Rai
Email - rohitkrai03@gmail.com
```
