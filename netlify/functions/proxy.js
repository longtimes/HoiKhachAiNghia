export async function handler(event, context) {
  try {
    const matram = event.queryStringParameters?.matram || '553100';
    const thoigianbd = event.queryStringParameters?.thoigianbd || "'2025-10-01 00:00:00'";
    const thoigiankt = event.queryStringParameters?.thoigiankt || "'2025-10-01 23:59:00'";

    const apiUrl = `http://203.209.181.170:2018/API_TTB/json/solieu.php?matram=${matram}&ten_table=mucnuoc_oday&sophut=60&tinhtong=0&thoigianbd=${encodeURIComponent(thoigianbd)}&thoigiankt=${encodeURIComponent(thoigiankt)}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ matram, data })
    };
  } catch (error) {
    console.error('Error in proxy function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
