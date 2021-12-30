
import { MDI } from './MDI.js'

let Icons = new MDI()

window.onload = () => {

    let myInputs = document.querySelectorAll('myinput')

    myInputs.forEach(item => {
        MyInput(item)
    })

    console.info('APP : Rendered <MyInput>');

    function MyInput (element) {
        let select = document.createElement('div');
        select.classList.add('select')


        let text = document.createElement('div')
        text.classList.add('select-text')
        text.innerText = element.id


        let arrow = document.createElement('img')
        arrow.classList.add('select-arrow')
        // arrow.classList.add('down')
        arrow.src = Icons.arrow_drop_down



        select.appendChild(text)
        select.appendChild(arrow)


        let 견본 = ["alpha","beta","gamma","delta","epsilon","zeta","eta","theta","iota","kappa","lambda","mu","nu","ksi","omicron","pi","rho","sigma","tau","upsilon","phi","chi","psi","omega"]

        let options = document.createElement('div')
        options.classList.add('options')

        if ( element.id == 'Year' ) {
            견본 = ['12,021', '12,022', '12,023', '12,024', '12,025']
        } else if ( element.id == 'Month' ) {
            견본 = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        } else if ( element.id == 'Date' ) {
            견본 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
        }

        견본.forEach(item => {
            let option = document.createElement('div')
            option.classList.add('option')
            option.innerText = item

            option.addEventListener('click', function (event) {
                // console.log()

                let target = event.target
                let options = target.parentElement
                let input = options.parentElement
                let selectText = input.getElementsByClassName('select-text')[0]
                
                selectText.innerText = target.innerText
                // event.target.parent
            })
            
            options.appendChild(option)
        })


        element.appendChild(select)
        element.appendChild(options)

        element.addEventListener('click', function (event) {

            let target = event.target

            if ( target.classList.toString() != 'select' ) {
                target = target.parentElement
            }

            if ( target.tagName != 'MYINPUT' ) {
                target = target.parentElement
            }

            let bg = document.createElement('div')
            bg.id = target.id + '-bg'
            bg.classList.add('bg')
            bg.style.display = 'block'

            bg.addEventListener('click', function (event) {
                document.getElementById(event.target.id.replace('-bg', '')).getElementsByClassName('select')[0].click()
            })

            target.parentElement.appendChild(bg)

            target.style.zIndex = '100'

            let input = target

            let options = input.getElementsByClassName('options')[0]
            let arrow = input.getElementsByClassName('select-arrow')[0]

            if ( options.style.display == '' || options.style.display == 'none') {
                

                options.style.display = 'block'
                arrow.classList.add('arrow-up')

            } else {
                options.style.display = 'none'
                arrow.classList.remove('arrow-up')

                if (options.parentElement.id == 'Month' || options.parentElement.id == 'Year') {
                    let y = document.getElementById('Year').getElementsByClassName('select-text')[0].innerText
                    let s = document.getElementById('Month').getElementsByClassName('select-text')[0].innerText
                    let d = document.getElementById('Date').getElementsByClassName('select-text')[0].innerText
                    console.log(s)
                    if ( s == 'February') {
                        document.getElementById('Date').getElementsByClassName('option')[28].style.display = 'none'
                        document.getElementById('Date').getElementsByClassName('option')[29].style.display = 'none'
                        document.getElementById('Date').getElementsByClassName('option')[30].style.display = 'none'
                        console.log(d)

                        let gregorianYear = parseInt(y.replace(',', '')) - 10000
                        if ( ((gregorianYear % 4 == 0) && (gregorianYear % 100 != 0)) || (gregorianYear % 400 == 0) ) {
                            console.log('윤년임')
                            document.getElementById('Date').getElementsByClassName('option')[28].style.display = ''
                        } else {
                            console.log('윤년아님')
                            console.log(document.getElementById('Date').getElementsByClassName('option')[28].style.display)
                            document.getElementById('Date').getElementsByClassName('option')[28].style.display = 'none'

                            if ( d == '29' || d == '30' || d == '31') {
                                document.getElementById('Date').getElementsByClassName('select-text')[0].innerText = '28'
                            }
                        }
                        
                    } else if ( s == 'April' || s == 'June' || s == 'September' || s == 'November') {
                        document.getElementById('Date').getElementsByClassName('option')[28].style.display = ''
                        document.getElementById('Date').getElementsByClassName('option')[29].style.display = ''
                        document.getElementById('Date').getElementsByClassName('option')[30].style.display = 'none'
                        console.log(d)
                        if ( d == '31') {
                            document.getElementById('Date').getElementsByClassName('select-text')[0].innerText = '30'
                        }
                    } else if ( s == 'January' || s == 'March' || s == 'May' || s == 'July' || s == 'August' || s == 'October' || s == 'December') {
                        document.getElementById('Date').getElementsByClassName('option')[28].style.display = ''
                        document.getElementById('Date').getElementsByClassName('option')[29].style.display = ''
                        document.getElementById('Date').getElementsByClassName('option')[30].style.display = ''
                    }
                }

                target.style.zIndex = ''
                Array.from(document.getElementsByClassName('bg')).forEach(e => {e.remove()})
            }

            
        })
    }

    Circular()

    window.addEventListener('resize', function () {
        Array.from(document.getElementsByClassName('tag')).forEach(e => {
            e.remove()})
        Array.from(document.getElementsByClassName('line')).forEach(e => {
            e.remove()})
            Array.from(document.getElementsByClassName('circle-sector')).forEach(e => {
                e.remove()})

        console.log('Resize Event : ReRendering <Circular>')
        Circular()
    })

    function Circular () {
        let circle = document.getElementById('circle')
        
        // console.log(circle)

        let data = circle.getBoundingClientRect()

        // console.log(data)

        

        // for ( let i = 0; i <= 360; i++ ) {

        //     circle.appendChild(drawline(data, i))
        // }

        var i = 1;                  //  set your counter to 1

        function myLoop() {         //  create a loop function
          setTimeout(function() {   //  call a 3s setTimeout when the loop is called
            circle.appendChild(drawline(data, i))  //  your code here
            i++;                    //  increment the counter
            if (i <= 360) {           //  if the counter < 10, call the loop function
              myLoop();             //  ..  again which will trigger another 
            }                       //  ..  setTimeout()
          }, 10)
        }

        // myLoop();                   //  start the loop

        let a = [['0000'],['0800'], ['1200'], ['1600'], ['2200'], ['2300']]

        let now = new Date()
        // console.log(, now.getMonth(), now.getDate())

        // console.log(date1)

        let today = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`

        let endOfToday = new Date(`${today} 23:59:59`)
        // console.log(endOfToday)

        function sec2time(timeInSeconds) {
            var pad = function(num, size) { return ('000' + num).slice(size * -1); },
            time = parseFloat(timeInSeconds).toFixed(3),
            hours = Math.floor(time / 60 / 60),
            minutes = Math.floor(time / 60) % 60,
            seconds = Math.floor(time - minutes * 60),
            milliseconds = time.slice(-3);
        
            return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + ',' + pad(milliseconds, 3);
        }

        for ( let i = 0; i < a.length; i++ ) {
            let item = a[i]

            let date1 = new Date(`${today} ${item[0].slice(0, 2)}:${item[0].slice(2, 4)}`)
            
            let date2 = new Date(1970, 0, 1)
            date2.setSeconds(endOfToday - date1)

            let degress = Math.round((date1 - new Date(`${today} 00:00:00`)) / 86399000 * 360) - 90
            let line = drawline(data, degress)
            circle.appendChild(line)

            let first
            let second

            if ( a[i+1] != undefined ) {
                first = a[i]
                second = a[i+1]
            } else { 
                first = a[i]
                second = a[0]
            }

            

            let date12 = new Date(`${today} ${first[0].slice(0, 2)}:${first[0].slice(2, 4)}`)
            let date22 = new Date(`${today} ${second[0].slice(0, 2)}:${second[0].slice(2, 4)}`)
            let degress2 = Math.round((date12 - date22) / 86399000 * 360) - 90

            let cs = drawCircleSector(data, degress2, degress + 180)
            circle.appendChild(cs)
             

            let linedata = line.getBoundingClientRect()



            let tag = document.createElement('div')
            tag.style.position = 'absolute'
            tag.classList.add('tag')

            tag.style.left = linedata.left + linedata.width / 2 - data.left + 'px'
            tag.style.top = linedata.y + linedata.height / 2 - data.top + 'px'

            tag.innerHTML = item[0]

            circle.appendChild(tag)
        }


    }

    function drawline (data, degress) {
        let line = document.createElement('div')
        line.classList.add('line')
        line.style.position = 'absolute'
        line.style.transformOrigin = '0% 0%'

        line.style.left = data.width / 2 + 'px'
        line.style.top = data.height / 2 + 'px'

        line.style.width = ( data.width / 2 ) + 'px'
        line.style.height = '1px'

        line.style.background = 'black'



        line.style.transform = 'rotate(' + degress + 'deg)'

        return line
    }

    function drawCircleSector (data, innerdeg, degress) {
        let cs = document.createElement('div')
        cs.classList.add('circle-sector')
        cs.style.position = 'absolute'
        cs.style.transformOrigin = '100% 100%'


        

        cs.style.left = -(data.width / 2) + 'px'
        cs.style.top = -(data.height / 2) + 'px'
        cs.style.width = data.width + 'px'
        cs.style.height = data.height + 'px'
        // cs.style.borderRadius = '50%'
        cs.style.transform = 'rotate(' + degress + 'deg) skew(' + innerdeg + 'deg)'

        cs.style.background = '#' + Math.floor(Math.random()*16777215).toString(16);

        return cs
    }
}

