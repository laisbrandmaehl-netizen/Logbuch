const SignatureModal = {
    open: (displayCanvasId, storageKey) => {
        const modal = document.createElement('div');
        modal.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:white; z-index:10000; display:flex; flex-direction:column; padding:20px; box-sizing:border-box;";
        modal.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                <h3 style="margin:0; color:#1a302b;">Unterschrift</h3>
                <button id="modal-cancel" style="background:none; border:none; font-size:1.5rem;">&times;</button>
            </div>
            <canvas id="modal-canvas" style="flex:1; border:2px dashed #e2e8e7; border-radius:15px; background:#fcfbf9; touch-action:none;"></canvas>
            <div style="margin-top:20px;">
                <button id="modal-save" class="btn" style="width:100%;">UNTERSCHRIFT SPEICHERN</button>
            </div>
        `;
        document.body.appendChild(modal);

        const canvas = document.getElementById('modal-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.strokeStyle = "#1a302b";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";

        let drawing = false;
        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return { x: clientX - rect.left, y: clientY - rect.top };
        };

        const start = (e) => { drawing = true; ctx.beginPath(); const p = getPos(e); ctx.moveTo(p.x, p.y); };
        const move = (e) => { if(!drawing) return; e.preventDefault(); const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); };
        const end = () => drawing = false;

        canvas.addEventListener('mousedown', start); canvas.addEventListener('mousemove', move); window.addEventListener('mouseup', end);
        canvas.addEventListener('touchstart', start, {passive: false}); canvas.addEventListener('touchmove', move, {passive: false}); canvas.addEventListener('touchend', end);

        document.getElementById('modal-save').onclick = () => {
            const data = canvas.toDataURL();
            localStorage.setItem(storageKey, data);
            SignaturePad.load(displayCanvasId, storageKey);
            document.body.removeChild(modal);
        };
        document.getElementById('modal-cancel').onclick = () => document.body.removeChild(modal);
    }
};
