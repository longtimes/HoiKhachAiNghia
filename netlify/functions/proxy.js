export async function handler(event, context) {
  try {
    const matram = 553100;
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const thoigianbd = `${today} 00:00:00`;
    const thoigiankt = `${today} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    const apiUrl = `http://203.209.181.170:2018/API_TTB/XEM/solieu.php?matram=${matram}&ten_table=mucnuoc_oday&sophut=60&tinhtong=0&thoigianbd=${encodeURIComponent(thoigianbd)}&thoigiankt=${encodeURIComponent(thoigiankt)}`;

    const response = await fetch(apiUrl);
    const contentType = response.headers.get('content-type');
    let data = [];

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
      if (!Array.isArray(data)) data = Object.values(data);
    } else {
      const text = await response.text();
      console.error('API không trả JSON, trả về (200 ký tự đầu):', text.substring(0, 200));
      data = [];
    }

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
