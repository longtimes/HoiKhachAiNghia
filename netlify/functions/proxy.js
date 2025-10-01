export async function handler(event, context) {
  try {
    const matram = 553100; // trạm muốn xem

    // Lấy thời gian hôm nay
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const thoigianbd = `${today} 00:00:00`;
    const thoigiankt = `${today} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    // Tạo URL API với encodeURIComponent
    const apiUrl = `http://203.209.181.170:2018/API_TTB/XEM/solieu.php?matram=${matram}&ten_table=mucnuoc_oday&sophut=60&tinhtong=0&thoigianbd=${encodeURIComponent(thoigianbd)}&thoigiankt=${encodeURIComponent(thoigiankt)}`;

    // Dùng fetch có sẵn Node 18+ (Netlify Functions)
    const response = await fetch(apiUrl);
    let data = await response.json();

    // Nếu API trả object thay vì array, chuyển thành array
    if (!Array.isArray(data)) {
      data = Object.values(data);
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
