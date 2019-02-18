import ObservableModel from "./ObservableModel";

let API_KEY= '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767';

const BASE_URL =`http://sunset.nada.kth.se:8080/iprog/group/44`;
const httpOptions = {
  headers: { "X-Mashape-Key": API_KEY }
};



class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 4;
    this.getNumberOfGuests();
   
  }

  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    if (num<1){
			this._numberOfGuests = 1;
		}

		else{
			this._numberOfGuests = num;
		}
		this.notifyObservers("NumberOfGuests");
		
  }

  // API methods

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  getAllDishes(type, filter) {
    if (filter=== null){
    const url = `${BASE_URL}/recipes/search?type=${type}`;
    return fetch(url, httpOptions).then(this.processResponse);
  }
  else {
    const url = `${BASE_URL}/recipes/search?type=${type}&query=${filter}`;
    return fetch(url, httpOptions).then(this.processResponse);

  }}

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
}




// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;





