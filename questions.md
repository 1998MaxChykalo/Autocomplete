1. What is the difference between Component and PureComponent? give an example where it might break my app.</br>
A Component is a basic building block in React that describes how a part of your app looks and behaves. A PureComponent is a type of Component that automatically checks whether its props have changed before re-rendering. This can make your app faster, but it might break if you're using a prop that's an object or an array, and you're modifying it in a way that doesn't create a new instance of the object or array.

1. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?</br>
Context is a way to pass data down through the component tree without having to pass it through every intermediate component. ShouldComponentUpdate is a lifecycle method that allows you to decide whether a component should re-render based on changes to its props or state. If you're using both of these together, you might run into problems where a component doesn't re-render when it should, because it thinks its props haven't changed.

1. Describe 3 ways to pass information from a component to its PARENT.</br>
Three ways to pass information from a component to its parent are:
    * Using props: you can pass a function from the parent component to the child component, and the child component can call that function with some data as an argument.
    * Using a callback function: the child component can define a callback function as a prop, and the parent component can call that function with some data as an argument.
    * Using a state management library like Redux: you can use a global store to hold data that can be accessed by any component.

1. Give 2 ways to prevent components from re-rendering.</br>
Two ways to prevent components from re-rendering are:
    * Using React.memo: this is a higher-order component (HOC) that can wrap a component and memoize it so that it only re-renders if its props have changed.
    * Using shouldComponentUpdate: this is a lifecycle method that allows you to decide whether a component should re-render based on changes to its props or state.

1. What is a fragment and why do we need it? Give an example where it might break my app.</br>
A fragment is a way to group a list of elements together without creating an extra DOM node. This can make your code cleaner and more efficient. An example where it might break your app is if you're using a third-party library that assumes all of its children are direct descendants of a single element.

1. Give 3 examples of the HOC pattern.</br>
Three examples of the HOC pattern are:
    * WithRouter: a HOC that provides access to the router props (match, location, and history) to a component that is not a direct child of a <Route> component.
    * Connect: a HOC that connects a component to a Redux store.
    * AuthenticatedComponent: a HOC that checks whether the user is authenticated and renders the component only if they are.

1. what's the difference in handling exceptions in promises, callbacks and async...await.</br>
    Promises, callbacks, and async/await are all ways to handle asynchronous code in JavaScript. The main difference in handling exceptions is that with promises and async/await, you can use try/catch blocks to catch errors, whereas with callbacks, you typically pass an error as the first argument of the callback function.

1. How many arguments does setState take and why is it async.</br>
    `setState` takes two arguments: an object that represents the new state, and an optional callback function that will be called after the state has been updated. It is async because React batches state updates and applies them asynchronously, in order to optimize performance.

1. List the steps needed to migrate a Class to Function Component.</br>
The steps needed to migrate a Class component to a Function component are:
    * Replace the class declaration with a function declaration.
    * Remove the render method and replace it with a return statement that returns JSX.
    * Replace this.props with props.
    * Replace this.state with useState.
    * Remove lifecycle methods that are not needed (such as componentDidMount or shouldComponentUpdate).

1. List a few ways styles can be used with components.</br>
Styles can be used with components in a few ways:
    * Inline styles: you can use the style prop to add inline styles to a component.
    * CSS files: you can import a CSS file into your component and use CSS classes to style your component.
    * CSS modules: this is a way to import CSS files and use them in a modular way, where the class names are scoped to the component.

1. How to render an HTML string coming from the server.</br>
To render an HTML string coming from the server, you can use the dangerouslySetInnerHTML prop. However, you should be careful when using this, because it can open your app up to XSS (cross-site scripting) attacks if you're not sanitizing the HTML string properly. A better approach would be to use a library like DOMPurify to sanitize the HTML before rendering it.