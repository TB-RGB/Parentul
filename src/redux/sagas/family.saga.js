import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchFamily() {

    try {
        //retrieves the compounds from the compounds table
        const family = yield axios.get('/api/children/family')
        ///api/children
        
        //put communicates with the reducer after retrieving a server call
        yield put({ type: 'SET_FAMILY', payload: family.data})
    }

    catch (error) {

        console.log("error with fetch family")
    }


}

//retrieves a single compound based on id 
//used for edit page
function* setFamily(action) {

    let getid = action.payload 

    try {
        //retrieves the compounds from the compounds table
        const compound = yield axios.get(`/api/compounds/${getid}`)

        //you use compound.data not action.payload here because the 
        //action.payload will only contain the id of the element we want to retrieve
        yield put({ type: 'SET_COMPOUND', payload: compound.data})
        
    }

    catch (error) {

        console.log("error with fetchCompound")
    }


}

//this addCompounds function will be called by the compoundsSaga function below
//when dispatch with the type ADD_COMPOUNDS is called

//addCompounds adds a new compound to the database
 function* unsetFamily(action) {

    try {
        //syntax for add is 
         yield axios.post('/api/compounds', action.payload)

         //want to reupdate dom after a new element is added 
         yield put({type: 'FETCH_COMPOUNDS'})
     }

     catch (error) {
        console.log("error with addCompounds")
    }

 }

//deletes a single compound in database via a deleteid
 function* deleteCompound(action) {


    let deleteid = action.payload

    try {
         yield axios.delete(`/api/compounds/${deleteid}`)

         //want to reupdate dom after a new element is added 
         yield put({type: 'FETCH_COMPOUNDS'})
     }

     catch (error) {
        console.log("error with delete Compounds")
    }

 }

//will edit a single compound by id
 function* editCompound(action) {

    //specifies which compound we want to edit
    let editid = action.payload
    
    //specfies what the item we want to replace with is
    let newCompound = action.payload1

    try {
        
         yield axios.put(`/api/compounds/${editid}`, newCompound)

         //want to reupdate dom after a new element is added 
         yield put({type: 'FETCH_COMPOUNDS'})
     }

     catch (error) {
        console.log("error with edit Compounds")
    }

 }

 //saga function which communicates directly with the dispatch on the front-end
function* compoundsSaga() {

    
    //communicates with the dispatch in compopnent file
    yield takeLatest('FETCH_FAMILY', fetchFamily);

    //retrieve a single compound based on id
    yield takeLatest('FETCH_COMPOUND', fetchCompound);

    //this statement will couple ADD_COMPOUNDS with the addCompounds function
    yield takeLatest('ADD_COMPOUND', addCompounds);

    yield takeLatest('DELETE_COMPOUND', deleteCompound);

    yield takeLatest('EDIT_COMPOUND', editCompound);
    
}


export default compoundsSaga;