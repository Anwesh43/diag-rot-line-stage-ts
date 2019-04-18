const scGap : number = 0.05
const scDiv : number = 0.51
const strokeFactor : number = 90
const sizeFactor : number = 2.9
const nodes : number = 5
const lines : number = 4
const foreColor : string = "green"
const backColor : string = "#BDBDBD"
const w : number = window.innerWidth
const h : number = window.innerHeight

class ScaleUtil {

    static scaleFactor(scale : number) : number {
        return Math.floor(scale / scDiv)
    }

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n
    }

    static mirrorValue(scale : number, a : number, b : number) : number {
        const k : number = ScaleUtil.scaleFactor(scale)
        return (1 - k) / a + k / b
    }

    static updateValue(scale : number, dir : number, a : number, b : number) : number {
        return ScaleUtil.mirrorValue(scale, a, b) * dir * scGap
    }
}

class DrawingUtil {

    static drawDiagRotLine(context : CanvasRenderingContext2D, deg : number, size : number, sc : number) {
          context.save()
          context.rotate(deg)
          context.beginPath()
          context.moveTo(0, 0)
          context.lineTo(size * Math.sqrt(2), size * Math.sqrt(2))
          context.stroke()
          context.beginPath()
          context.moveTo(size, size)
          context.lineTo(size - 2 * size * sc, size)
          context.stroke()
          context.restore()
    }

    static drawDRLNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        const gap : number = w / (nodes + 1)
        const sc1 : number = ScaleUtil.divideScale(scale, 0, 2)
        const sc2 : number = ScaleUtil.divideScale(scale, 1, 2)
        const size : number = gap / sizeFactor
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor
        context.strokeStyle = foreColor
        context.save()
        context.translate(gap * (i + 1), h / 2)
        var deg = 0
        for (var j = 0; j < lines; j++) {
            const sc : number = ScaleUtil.divideScale(sc1, j, lines)
            deg += (Math.PI / 2) * sc
            DrawingUtil.drawDiagRotLine(context, deg, size, sc)
        }
        context.restore()
    }
}

class DiagRotLineStage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D

    initCanvas() {
        this.canvas.width = w
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : DiagRotLineStage = new DiagRotLineStage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}
