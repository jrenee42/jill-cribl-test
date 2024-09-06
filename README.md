# Event Log: Jill Pelavin's cribl tech screen


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). (CRA)

this project streams the data from a given url and presents in a table that can be expanded to better read the entries.

usage:  just go to the page, load it; and then expand or contract the rows to view the data
note that while it is loading the expand/contract does not respond well.

also; while testing this in code sandbox (see: https://codesandbox.io/p/sandbox/boring-feistel-99jnjs?file=%2Fsrc%2FApp.js)
the expand button does not show up in the normal preview, but if you pop out the preview into it's own window then the expand/contract button does show up.

given more time, I would:
1. put in a textfield above the table to change the url
2. show the number of items that are in the table; updating it as more entries are added
3. add unit tests to test recursive parsing of the values for display in the expanded, detail view
4. install font awesome to show better icons than the current characters
5. add an echarts table on top to show entries by timestamp
6. add sass (better than css only)
7. make the width more responsive to different devices/screen widths
8. fix the bug in create-react-app in which the app crashes when it reloads:
   1. CRA has a mechanism that reloads the page every time a change is made in development
   2. when the list is small and static (ie, using a test file) the reload works just fine
   3. when the list is huge; as with the test url; it crashes
   4. I spent some time trying to fix this; but the bug is non trivial so is outside the scope of this tech screening
9. put in user preferences to allow the json to still have the 'quotes' around it or not
10.  optimize the table so that if the line is not showing on the screen (or is more than 100 ilens off; then it is not rendered till the user gets close)
    1.  on Code sandbox; the expand/contract action is slow to respond; it is much faster when run natively on my macbook air
    2.  but then, if you only show part of the table; searching for a particular entry needs to be done via code and not just via the browser


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
