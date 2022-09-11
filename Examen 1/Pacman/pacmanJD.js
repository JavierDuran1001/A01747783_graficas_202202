let canvas = null
let ctx = null
class Pacman{
    constructor(x, y, r, b, c){
        this.x = x
        this.y = y
        this.r = r //r = radio
        this.b = b //b = boca
        this.c = c //c = color
        this.derecha = true
        this.velocidadPacman = 2
        this.velocidadBoca = 0.1
    }

    draw(){
        ctx.fillStyle = this.c
        ctx.beginPath()
        ctx.arc(this.x, this.y, 69, this.b, Math.PI * 2 - this.b)
        ctx.lineTo(this.x, this.y)
        ctx.fill()

    }

    update(minXPos, maxXPos){
        let bocaAbierta = Math.PI * 0.25
        let entradaCanvas = minXPos - this.r
        let salidaDeCanvas = maxXPos + this.r
        
        if(0 > this.b || this.b > bocaAbierta){
            this.velocidadBoca = this.velocidadBoca * (-1)
        }
        if(this.derecha){
            this.x += this.velocidadPacman
        }
        if(this.x > salidaDeCanvas){
            this.x = entradaCanvas
        }

        this.b += this.velocidadBoca
    }
}

function update(pacman){
    requestAnimationFrame(()=>update(pacman))
    ctx.clearRect(0,0,canvas.width,canvas.height)
    pacman.draw()
    pacman.update(0, canvas.width)
}



function main(){
    canvas = document.getElementById("2dCanvas")
    ctx = canvas.getContext("2d")
    const pacman = new Pacman(300, 150, 50, (1/4) * Math.PI, "Yellow")
    update(pacman)
}
