export async function handler(event, context) {
  try {
    const matram = '552600'; // hoặc 553100, 553300
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const today = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
    const thoigianbd = `${today} 00:00:00`;
    const thoigiankt = `${today} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    const apiUrl = `http://203.209.181.170:2018/API_TTB/json/solieu.php?matram=${matram}&ten_table=mucnuoc_oday&sophut=60&tinhtong=0&thoigianbd=${encodeURIComponent("'" + thoigianbd + "'")}&thoigiankt=${encodeURIComponent("'" + thoigiankt + "'")}`;

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
