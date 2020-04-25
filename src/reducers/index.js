const data = [
    {
        "id": 1,
        "expdate": '1.2.2019',
        "expname": "Groceries from Albert",
        "expamount": 1500,
        "type": "spending"
    },
    {
        "id": 2,
        "expdate": "12.2.2019",
        "expname": "Salary from work",
        "expamount": 42000,
        "type": "income"
    }
]

const expReducer = (state = data, action) => {
    switch (action.type) {
        case 'ADD_POST':
            return state.concat([action.data]);
        case 'DELETE_POST':
            return state.filter((expense) => expense.id !== action.id);

        default:
            return state;
    }
}
export default expReducer;