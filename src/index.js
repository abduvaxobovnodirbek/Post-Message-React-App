import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import "./index.css"
import {Provider} from "react-redux"
import {compose,createStore,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import reducers from "./reducers/index"

const store = createStore(reducers,compose(applyMiddleware(thunk)))

ReactDom.render(
<Provider store = {store}>
  <App/>
</Provider>,
document.getElementById("root")
)