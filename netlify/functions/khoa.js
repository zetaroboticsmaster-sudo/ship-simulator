exports.handler = async (event) => {
  const params = event.queryStringParameters;
  const endpoint = params.endpoint || 'tidalCurrentArea/search.do';
  delete params.endpoint;
  
  const qs = Object.entries(params).map(([k,v]) => k+'='+encodeURIComponent(v)).join('&');
  const url = 'https://www.khoa.go.kr/api/oceangrid/' + endpoint + '?' + qs;
  
  try {
    const res = await fetch(url);
    const data = await res.text();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: data
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({error: e.message}) };
  }
};
