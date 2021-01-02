
// Get all the timezones from moment.js

var timeZones = moment.tz.names()
console.log(moment.tz.names())

// Update select list with all timezones
updateTimezoneList()

//draw the canvas
canvas = document.getElementById("canvas")

// console.log(select.options)
radius=50;
//center
xc=100
yc=100
theta=0
//x,y coord of dial position
x=xc
y=yc

//init function
if(canvas.getContext){
    ctx = canvas.getContext("2d")
    ctx.translate(xc,yc)
    //move to tranlated center
    xc=0
    yc=0
    ctx.beginPath()
    ctx.arc( xc, yc, radius + 15 , 0, 2*Math.PI)
    ctx.lineWidth=6
    ctx.strokeStyle='rgb(255 255,0)'
    ctx.stroke()

    // Hour marks
    ctx.save()
    for (i=0 ; i<= 12; i++){
        ctx.beginPath()
        ctx.rotate(Math.PI/6.0)
        ctx.moveTo( radius-5, 0)
        ctx.lineTo (radius+20,0)
        ctx.strokeStyle='rgb(0,255,255)'
        ctx.stroke()
    }
    ctx.restore()
}


setInterval(drawAllDials, 2000)


//Draw all dials
function drawAllDials(){
  curtime = new Date()
 /* 
  hour = now.getHours()
  minute = now.getMinutes()
  sec = now.getSeconds()
*/
  selectedTimezone = document.getElementById("timezones")
  console.log("Zone"+ selectedTimezone.value + curtime)
  //Change time to selected timezone 

  updateDigitaltime( moment.tz(curtime,selectedTimezone.value ).format("hh mm a z"))
  hour = moment.tz(curtime,selectedTimezone.value ).format("hh")
  minute = moment.tz(curtime,selectedTimezone.value ).format("mm")
  sec = moment.tz(curtime,selectedTimezone.value ).format("ss")
  hour= (hour>12) ?(hour-12):hour
  console.log("hrs:"+hour+"min=" + minute)
  ctx.save()
    
    //erase old dial position
      ctx.strokeStyle='white'
      ctx.lineWidth=10
      ctx.stroke()

    //Compute Hours dial angle
    theta = (Math.PI/6)*hour + (Math.PI/360)*minute
   
    //compute new hour dial position
    x=xc + (radius-5) * Math.sin(theta)
    y=yc - (radius-5) * Math.cos(theta)

    //draw new hour dial position
    ctx.beginPath(xc,yc)
    ctx.moveTo(xc,yc)
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 10
    ctx.lineCap='round'
    ctx.lineTo (x,y)
    

    //Compute new Minutes dial 
    theta = (Math.PI/30)*minute + (Math.PI/1800)*sec
    

   //compute new minutes dial position
    x=xc + (radius+5) * Math.sin(theta)
    y=yc - (radius+5) * Math.cos(theta)

    //draw new minutes dial position
    ctx.moveTo(xc,yc)
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 8
    ctx.lineCap='round'
    ctx.lineTo (x,y)

    //Compute new seconds dial 
    theta = (Math.PI/30)*sec
   

   //compute new seconds dial position
    x=xc + (radius+ 8) * Math.sin(theta)
    y=yc - (radius+ 8) * Math.cos(theta)

    //draw new seconds dial position
    ctx.moveTo(xc,yc)
    //ctx.save()
    //ctx.strokeStyle = 'red'
    
    ctx.lineWidth = 2
    ctx.lineCap='round'
    ctx.lineTo (x,y)
   // ctx.stroke()
   // ctx.restore()

    //update the lines
    ctx.stroke()

    ctx.restore()
}
//Add all the time zones as drop down select options 
function updateTimezoneList(){
   select = document.getElementById("timezones")
   timeZones.forEach(e => {
     opt = document.createElement("option")
     opt.value=e.toString()
     opt.text=e.toString()
     select.add(opt)
   })
}

function updateDigitaltime(time){
 disp=document.getElementById("digitalDisplay")
 disp.innerHTML= time
 console.log("updatetime"+time)

}