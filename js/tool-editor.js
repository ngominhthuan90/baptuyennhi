const EditorTool = {
  canvas: null, ctx: null, image: null, isDrawing: false, startX: 0, startY: 0,
  init: function() {
    this.canvas = document.getElementById('editorCanvas');
    if(!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDrawing = true;
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width, scaleY = this.canvas.height / rect.height;
      this.startX = (e.clientX - rect.left) * scaleX; this.startY = (e.clientY - rect.top) * scaleY;
    });
    
    this.canvas.addEventListener('mouseup', (e) => {
      if(!this.isDrawing) return;
      this.isDrawing = false;
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width, scaleY = this.canvas.height / rect.height;
      const endX = (e.clientX - rect.left) * scaleX, endY = (e.clientY - rect.top) * scaleY;
      
      this.ctx.fillStyle = "#000000"; 
      this.ctx.fillRect(this.startX, this.startY, endX - this.startX, endY - this.startY);
    });
  },
  loadImage: function(e) {
    const file = e.target.files[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      this.image = new Image();
      this.image.onload = () => {
        document.getElementById('editorWorkspace').style.display = 'block';
        this.canvas.width = this.image.naturalWidth; this.canvas.height = this.image.naturalHeight;
        this.ctx.drawImage(this.image, 0, 0);
      };
      this.image.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  },
  addWatermark: function() {
    if(!this.image) return;
    const size = Math.floor(this.canvas.width / 15);
    this.ctx.font = `bold ${size}px Arial`;
    this.ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
    this.ctx.textAlign = "center"; this.ctx.textBaseline = "middle";
    this.ctx.save();
    this.ctx.translate(this.canvas.width/2, this.canvas.height/2);
    this.ctx.rotate(-Math.PI/6);
    this.ctx.fillText("BẢO MẬT - LƯU HÀNH NỘI BỘ", 0, 0);
    this.ctx.restore();
  },
  download: function() {
    if(!this.image) return;
    const a = document.createElement('a'); a.download = `baomat_${Date.now()}.jpg`;
    a.href = this.canvas.toDataURL('image/jpeg', 0.95); a.click();
  }
};
