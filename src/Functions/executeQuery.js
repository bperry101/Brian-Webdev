// This function executes KDB queries over qREST and passes the returned data to the App

// Fetch data from KDB instance
const executeQuery = async(kdbQuery) => {
  // Define url, kdb params and http params
  const url = 'https://192.168.1.98:8090/executeQuery'
  const kdbParams = {
    query: kdbQuery,
    response: true,
    type: 'sync'
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

export default executeQuery;