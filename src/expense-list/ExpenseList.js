import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import dateFormat from "dateformat";
import { connect } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import './expenselist.scss';

const mapStateToProps = (state) => {
    return {
        expense: state
    }
}

class ExpenseList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            modalTitle: '',
            show: false,
            totalIncome: 0,
            totalSpending: 0,
            disabled: false,
            successMsg: false
        }
    }

    componentDidMount() {
        const expenses = this.props.expense;
        for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].type === 'income') {
                this.setState({ totalIncome: this.state.totalIncome + expenses[i].expamount })
            } else if (expenses[i].type === 'spending') {
                this.setState({ totalSpending: this.state.totalSpending + expenses[i].expamount })
            }
        }
    }




    handleChange = date => {


        this.setState({
            startDate: date
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.startDate !== '' && this.getName.value !== '' && this.getAmount.value !== '') {
            this.setState({ disabled: true })
            const expDate = dateFormat(this.state.startDate, "d.m.yyyy");

            const expName = this.getName.value;
            const expAmount = parseInt(this.getAmount.value);

            let typeName = '';
            if (this.state.modalTitle === 'Add Income') {
                typeName = 'income';
                this.setState({ totalIncome: this.state.totalIncome + expAmount })
            } else {
                typeName = 'spending';
                this.setState({ totalSpending: this.state.totalSpending + expAmount })
            }

            const data = {
                id: this.props.expense.length + 1,
                expdate: expDate,
                expname: expName,
                expamount: expAmount,
                type: typeName
            }

            this.props.dispatch({
                type: 'ADD_POST',
                data
            });

            this.setState({ successMsg: true })
            // this.getName.value = "";
            // this.getAmount.value = "";
            this.myFormRef.reset();
            setTimeout(() => {
                this.setState({ show: false })

            }, 2000);

        }


    }

    deleteExpense = (explist) => {
        this.setState({ totalIncome: 0, totalSpending: 0 })
        this.props.dispatch({ type: 'DELETE_POST', id: explist.id })
        setTimeout(() => {
            const expenses = this.props.expense;
            for (let i = 0; i < expenses.length; i++) {
                if (expenses[i].type === 'income') {
                    this.setState({ totalIncome: this.state.totalIncome + expenses[i].expamount })
                } else if (expenses[i].type === 'spending') {
                    this.setState({ totalSpending: this.state.totalSpending + expenses[i].expamount })
                }
            }
        }, 0);

    }

    addIncome = () => {
        this.setState({ show: true, modalTitle: 'Add Income', successMsg: false, disabled: false })
    }

    closeModal = () => {
        this.setState({ show: false, modalTitle: '' })
    }

    addSpending = () => {
        this.setState({ show: true, modalTitle: 'Add Spending', successMsg: false, disabled: false })
    }

    render() {

        const totalAmount = this.state.totalIncome - this.state.totalSpending;

        return (
            <section className="exp-section">
                {/* Header */}
                <section className="header-section">
                    <h6>Balance</h6>
                    <h2>{totalAmount} CZK</h2>
                    <h6><span>Income: {this.state.totalIncome} Kc</span> <span>Spendings: {this.state.totalSpending} Kc</span></h6>
                </section>

                {/* Expense List */}
                <section className="explist-section">
                    <ul className="list-section">
                        {
                            this.props.expense.map((explist, i) =>
                                <li key={explist.id}>
                                    <div>
                                        <span>{explist.expdate}</span>
                                        <h4 style={{ color: explist.type === 'income' ? 'green' : 'red' }}>{explist.expamount} Kc</h4>
                                    </div>
                                    <div className="list-name">
                                        {explist.expname}
                                    </div>
                                    <div>
                                        <i class="fas fa-trash-alt" onClick={() => this.deleteExpense(explist)}></i>
                                    </div>

                                </li>
                            )
                        }

                    </ul>

                </section>


                {/* Footer */}
                <section className="footer-section">
                    <button onClick={this.addIncome}>Add Income</button>
                    <button onClick={this.addSpending}>Add Spending</button>
                </section>

                {/* Modal Popup */}

                <section className="modal-bg" style={{ display: this.state.show ? 'flex' : 'none' }}>
                    <section className="modal-popup">
                        <div className="modal-header">
                            <h4>{this.state.modalTitle}</h4>
                            <i class="fas fa-times" onClick={this.closeModal}></i>
                        </div>
                        <form className="modal-content" onSubmit={this.handleSubmit} ref={(el) => this.myFormRef = el}>
                            <div className="field-col">
                                <label>Expense Date</label>
                                <DatePicker className="field-control"
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="field-col">
                                <label>Expense Name</label>
                                <input type="text" className="field-control" ref={(input) => this.getName = input} required />
                            </div>
                            <div className="field-col">
                                <label>Expense Amount</label>
                                <input type="number" className="field-control" ref={(input) => this.getAmount = input} required />
                            </div>
                            <div className="field-col">
                                <button className="btn-success" disabled={this.state.disabled}>
                                    Save
                             </button>
                                {this.state.successMsg ? <p>Successfully Added</p> : ""}
                            </div>
                        </form>
                    </section>
                </section>
            </section>
        )
    }
}
export default connect(mapStateToProps)(ExpenseList)
