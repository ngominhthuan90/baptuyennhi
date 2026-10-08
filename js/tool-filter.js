const FilterTool = {
  rawPhoto: null, activeFilter: 'korean',
  loadPhotoForFilter: function(e) {
    const file = e.target.files[0]; if (!file) return;
    const r = new FileReader();
    r.onload = evt => {
      this.rawPhoto = new Image();
      this.rawPhoto.onload = () => {
        document.getElementById('origImg').src = evt.target.result;
        document.getElementById('filterBar').style.display = 'grid';
        document.getElementById('filterSliderRow').style.display = 'flex';
        document.getElementById('filterPreviewGrid').style.display = 'grid';
        document.getElementById('btnDownloadPhoto').style.display = 'block';
        this.applyCurrentFilter();
      };
      this.rawPhoto.src = evt.target.result;
    };
    r.readAsDataURL(file);
  },
  setFilter: function(filterName, btnElement) {
    document.querySelectorAll('#page-filter .filter-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    this.activeFilter = filterName;
    this.applyCurrentFilter();
  },
  applyCurrentFilter: function() {
    if (!this.rawPhoto) return;
    const intensity = parseFloat(document.getElementById('filterIntensity').value) / 100;
    document.getElementById('intensityVal').innerText = Math.round(intensity * 100) + '%';
    const canvas = document.getElementById('filteredCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = this.rawPhoto.naturalWidth; canvas.height = this.rawPhoto.naturalHeight;
    ctx.drawImage(this.rawPhoto, 0, 0);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = imgData.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i+1], b = d[i+2]; let tr = r, tg = g, tb = b;
      switch (this.activeFilter) {
        case 'korean': tr=r*1.06+10; tg=g*0.98+6; tb=b*1.05+14; tr=(tr*0.9)+(r*0.1); break;
        case 'airy': tr=(r>120)?r*1.08:r*1.02+8; tg=(g>120)?g*1.05:g*1.01+6; tb=b*1.14+14; break;
        case 'vintage': tr=r*1.05+18; tg=g*0.96+12; tb=b*0.82+28; break;
        case 'warm': tr=r*1.14+10; tg=g*1.02+5; tb=b*0.88; break;
        case 'japan': tr=r*0.98+14; tg=g*1.04+12; tb=b*1.08+18; break;
        case 'cinematic': const gray=(r+g+b)/3; if(gray>120){tr=r*1.15;tg=g*1.02;tb=b*0.88;}else{tr=r*0.85;tg=g*1.05;tb=b*1.20;} break;
        case 'golden': tr=r*1.18+15; tg=g*1.08+8; tb=b*0.78; break;
        case 'bw': const bVal=0.299*r+0.587*g+0.114*b; const cVal=(bVal>128)?bVal*1.1:bVal*0.9; tr=tg=tb=cVal; break;
      }
      d[i]=Math.min(255,Math.max(0,r+(tr-r)*intensity)); d[i+1]=Math.min(255,Math.max(0,g+(tg-g)*intensity)); d[i+2]=Math.min(255,Math.max(0,b+(tb-b)*intensity));
    }
    ctx.putImageData(imgData, 0, 0);
  },
  downloadFilteredPhoto: function() {
    const a = document.createElement('a'); a.download = `anh_loc_${this.activeFilter}.jpg`;
    a.href = document.getElementById('filteredCanvas').toDataURL('image/jpeg', 0.95); a.click();
  }
};
