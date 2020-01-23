// This function calls KDB functions over qREST and passes the returned data to the App

// Fetch data from KDB instance
const executeFunction = async(fname, fargs) => {
  // Define url, kdb params and http params
  const url = 'https://192.168.1.98:8090/executeFunction'
  const kdbParams = {
    arguments: fargs,
    function_name: fname
  }
  const httpParams = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa('user:pass')}`  // Basic dXNlcjpwYXNz
    },
    body: JSON.stringify(kdbParams),
  }

  // Fetch data from server
  const response = await fetch(url,httpParams)
  const queryData = await response.json()

  return queryData.result
}

export default executeFunction;
