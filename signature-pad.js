const SignaturePad = {
    load: (canvasId, storageKey) => {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        const data = localStorage.getItem(storageKey);
        if (data) {
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = data;
        }
    },
    clear: (canvasId, storageKey) => {
        if(confirm("Unterschrift wirklich löschen?")) {
            const canvas = document.getElementById(canvasId);
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            localStorage.removeItem(storageKey);
        }
    }
};
