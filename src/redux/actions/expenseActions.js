
import axios from 'axios';



export const getTransactions = () => (dispatch) => {

  console.log("getTransactions called in expenseActions.js")

    axios.get(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/getTransactions`)
.then(res => {


  console.log("this is getTransactions res.data : " + JSON.stringify(res.data))


    dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data
      });
})
.catch(err => {
    dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
});
}





  











  export const deleteTransaction = (id) => (dispatch) => {



    console.log("deleteTransactions in expenseActions - this is id: " + id)
    axios.delete(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/deleteTransaction/${id}`)
.then(res => {


    
    dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });


dispatch(getTransactions());
      
})
.catch(err => {
  console.log(" deleteTransaction error: + " + err)
    dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err
      });


});
  }






export const addTransaction = (transaction) => (dispatch) => {


    axios.post(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/addTransaction`,transaction)
.then(res => {

    
    dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data
       
      });

  dispatch(getTransactions());

})
.catch(err => {

    console.log("this is err: " + err)

    dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err
      });
});


}



