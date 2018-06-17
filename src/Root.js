import App from "./containers/App";

const Root = ({ store }) => (
  <Provider store={store}>
    {/* Router implementation */}
    <App />
  </Provider>
);

export default Root;
