class Circle {
    constructor({origin: t, speed: i, color: e, angle: s, context: n}) {
        this.origin = t, this.position = {...this.origin}, this.color = e, this.speed = i, this.angle = s, this.context = n, this.renderCount = 0
    }
    
    draw() {
        this.context.fillStyle = this.color, this.context.beginPath(), this.context.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI), this.context.fill()
    }
    
    move() {
        this.position.x = Math.sin(this.angle) * this.speed + this.position.x, this.position.y = Math.cos(this.angle) * this.speed + this.position.y + .3 * this.renderCount, this.renderCount++
    }
}

class Boom {
    constructor({origin: t, context: i, circleCount: e = 10, area: s}) {
        this.origin = t, this.context = i, this.circleCount = e, this.area = s, this.stop = !1, this.circles = []
    }
    
    randomArray(t) {
        const i = t.length;
        return t[Math.floor(i * Math.random())]
    }
    
    randomColor() {
        const t = ["8", "9", "A", "B", "C", "D", "E", "F"];
        return "#" + this.randomArray(t) + this.randomArray(t) + this.randomArray(t) + this.randomArray(t) + this.randomArray(t) + this.randomArray(t)
    }
    
    randomRange(t, i) {
        return (i - t) * Math.random() + t
    }
    
    init() {
        for (let t = 0; t < this.circleCount; t++) {
            const t = new Circle({
                context: this.context,
                origin: this.origin,
                color: this.randomColor(),
                angle: this.randomRange(Math.PI - 1, Math.PI + 1),
                speed: this.randomRange(1, 6)
            });
            this.circles.push(t)
        }
    }
    
    move() {
        this.circles.forEach(((t, i) => {
            if (t.position.x > this.area.width || t.position.y > this.area.height) return this.circles.splice(i, 1);
            t.move()
        })), 0 == this.circles.length && (this.stop = !0)
    }
    
    draw() {
        this.circles.forEach((t => t.draw()))
    }
}

class CursorSpecialEffects {
    constructor() {
        this.computerCanvas = document.createElement("canvas"), this.renderCanvas = document.createElement("canvas"), this.computerContext = this.computerCanvas.getContext("2d"), this.renderContext = this.renderCanvas.getContext("2d"), this.globalWidth = window.innerWidth, this.globalHeight = window.innerHeight, this.booms = [], this.running = !1
    }
    
    handleMouseDown(t) {
        const i = new Boom({
            origin: {x: t.clientX, y: t.clientY},
            context: this.computerContext,
            area: {width: this.globalWidth, height: this.globalHeight}
        });
        i.init(), this.booms.push(i), this.running || this.run()
    }
    
    handlePageHide() {
        this.booms = [], this.running = !1
    }
    
    init() {
        const t = this.renderCanvas.style;
        t.position = "fixed", t.top = t.left = 0, t.zIndex = "1809185784", t.pointerEvents = "none", t.width = this.renderCanvas.width = this.computerCanvas.width = this.globalWidth, t.height = this.renderCanvas.height = this.computerCanvas.height = this.globalHeight, document.body.append(this.renderCanvas), window.addEventListener("mousedown", this.handleMouseDown.bind(this)), window.addEventListener("pagehide", this.handlePageHide.bind(this))
    }
    
    run() {
        if (this.running = !0, 0 == this.booms.length) return this.running = !1;
        requestAnimationFrame(this.run.bind(this)), this.computerContext.clearRect(0, 0, this.globalWidth, this.globalHeight), this.renderContext.clearRect(0, 0, this.globalWidth, this.globalHeight), this.booms.forEach(((t, i) => {
            if (t.stop) return this.booms.splice(i, 1);
            t.move(), t.draw()
        })), this.renderContext.drawImage(this.computerCanvas, 0, 0, this.globalWidth, this.globalHeight)
    }
}
const cursorSpecialEffects = new CursorSpecialEffects;
cursorSpecialEffects.init()
