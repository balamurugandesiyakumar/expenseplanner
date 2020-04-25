import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import ExpenseList from "./expense-list/ExpenseList";

export default class Routes extends Component {
    render() {
        return (
            <Router basename="/expenseplanner">
                <Switch>
                    <Route path="/" exact>
                        <ExpenseList />
                    </Route>
                </Switch>
            </Router>
        )
    }
}
