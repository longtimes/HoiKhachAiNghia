import fetch from 'node-fetch';

export async function handler(event, context) {
  try {
    // Hai trạm
    const tramList = [553100, 553300];

    // Lấy ngày hôm nay
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');

    const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const thoigianbd = `'${today} 00:00:00'`;
    const thoigiankt = `'${today} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}'`;

    const results = [];

    for (const matram of tramList) {
      const apiUrl = `http://203.209.181.170:2018/API_TTB/XEM/solieu.php?matram=${matram}&ten_table=mucnuoc_oday&sophut=60&tinhtong=0&thoigianbd=${thoigianbd}&thoigiankt=${thoigiankt}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      // Thêm thông tin trạm vào dữ liệu
      results.push({ matram, data });
    }

    return {
      statusCode: 200,
      body: JSON.stringify(results)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
