const Img2PdfTool = {
  imageFiles: [],
  onImagesPicked: function(e) {
    this.imageFiles = Array.from(e.target.files);
    if (this.imageFiles.length) {
      document.getElementById('imgPickedHint').innerText = `Đã chọn: ${this.imageFiles.length} ảnh`;
      document.getElementById('btnMakePdf').disabled = false;
    }
  },
  convertImagesToPdf: async function() {
    const status = document.getElementById('imgPdfStatus');
    status.className = 'status-box'; status.innerText = 'Đang xử lý ghép ảnh vào PDF…';
    try {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      for (let i = 0; i < this.imageFiles.length; i++) {
        const file = this.imageFiles[i];
        const dataUrl = await new Promise(res => { const r = new FileReader(); r.onload = e => res(e.target.result); r.readAsDataURL(file); });
        const props = await new Promise(res => { const img = new Image(); img.onload = () => res({ w: img.width, h: img.height }); img.src = dataUrl; });
        if (i > 0) pdf.addPage('a4', 'portrait');
        const maxW = 190, maxH = 277;
        let rw = maxW, rh = (props.h * maxW) / props.w;
        if (rh > maxH) { rh = maxH; rw = (props.w * maxH) / props.h; }
        pdf.addImage(dataUrl, 'JPEG', (210 - rw) / 2, (297 - rh) / 2, rw, rh);
      }
      pdf.save('tai-lieu-ghep.pdf');
      status.className = 'status-box success'; status.innerText = '✓ Đã tạo và tải file PDF thành công!';
    } catch (err) { status.className = 'status-box error'; status.innerText = 'Lỗi: ' + err.message; }
  }
};
