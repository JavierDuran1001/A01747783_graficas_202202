let ctx = null, canvas = null;

function drawRect(ctx, color, x,y,width,height)
{
    ctx.fillStyle = color;
    ctx.fillRect(x,y,width,height);
}

class balls
{
    constructor(xPos, yPos, radius, color)
    {
        this.color = color;
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;

        this.up = false;
        this.right = true;

        this.speed = 0.5;
    }

    draw()
    {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update(xMin, xMax, yMin, yMax)
    {
        if(this.xPos < (xMin + this.radius)) this.right = true;
        if(this.xPos > (xMax - this.radius)) this.right = false;

        if(this.yPos > (yMax - this.radius)) this.up = true;
        if(this.yPos < (yMin + this.radius)) this.up = false;

        if(this.right)
            this.xPos += this.speed;
        else
            this.xPos -= this.speed;

        if(this.up)
            this.yPos -= this.speed;
        else    
            this.yPos += this.speed;
    }
}

class bar {

    constructor (color, xPos, yPos, width, height){
        this.color = color;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
    }

    draw()
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }

    update(balls)
    {
        let xP = this.xPos + this.width
        let yP = this.yPos + this.height

        let lD = balls.xPos - balls.radius
        let lI = balls.xPos + balls.radius
        let lAbajo = balls.yPos - balls.radius
        let lArriba = balls.yPos + balls.radius
    
        if (this.xPos < canvas.width/2){
            if (lD < xP && lAbajo < yP && lAbajo > this.yPos){ 
                balls.right = true;
                balls.up = false;
            }
            if (lD < xP && lArriba > this.yPos && lArriba < yP) {
                balls.right = true;
                balls.up = true;
            }
        }

        if (this.xPos > canvas.width/2){
            if (lI > this.xPos && lAbajo < yP && lAbajo > this.yPos) {
                balls.right= false;
                balls. up = false;   
            }
            if(lI > this.xPos && lArriba > this.yPos && lArriba < yP){
                balls.right = false;
                balls.up = true;
            }
        }
            
        if(balls.right)
            balls.xPos += balls.speed;
        else
            balls.xPos -= balls.speed;

        if(balls.up)
            balls.yPos -= balls.speed;
        else    
            balls.yPos += balls.speed;

    }
}

function update(spheres,bars)
{
    requestAnimationFrame(()=>update(spheres,bars));

    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    spheres.draw()
    spheres.update(0,canvas.width,0,canvas.height)

    bars.forEach(bar =>{
        bar.draw();
        bar.update(spheres);
    });
}

function inputHandlers (canvas, bar_l, bar_r){
    document.addEventListener("keydown", event => { //Event registra la tecla presionada
        if (event.key == "q") bar_l.yPos -= 10
        if (event.key == "a") bar_l.yPos += 10
        if (event.key == "o") bar_r.yPos -= 10
        if (event.key == "l") bar_r.yPos += 10
    })
}

function main()
{
    canvas = document.getElementById("animationCanvas");
    ctx = canvas.getContext("2d");

    let sphere1 = new balls(Math.random() * canvas.width, Math.random() * canvas.height, 10, 'white');
    let sphere2 = new balls(Math.random() * canvas.width, Math.random() * canvas.height, 10, 'white');
    let sphere3 = new balls(Math.random() * canvas.width, Math.random() * canvas.height, 10, 'white');
    let bar_left = new bar('purple',10,30,20,50);
    let bar_right = new bar('blue',canvas.width - 30,30,20,50);

    inputHandlers(canvas, bar_left, bar_right)
    update(sphere1,[bar_left,bar_right]);
}