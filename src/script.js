console.log('test');
 
let lastDrop;
let connectDrag = () => {
    document.querySelectorAll('div[draggable="true"]').forEach(drg => {
        drg.addEventListener('dragstart', e => {
            console.log(e.target.id)
            e.target.classList.add('drag');
            e.dataTransfer.setData('text/html', e.target.innerHTML);
            e.dataTransfer.effectAllowed = 'move';
        })
    })
}

let connectDrop = () => {
    const section = document.querySelectorAll('.container__main > main section[class$="section"]')

    section.forEach(sec => {
        sec.addEventListener('dragenter', e => {
            if (e.dataTransfer.types[0] === 'text/html') {
                sec.classList.add('droppable');
                e.preventDefault();
            }
    
        })

        sec.addEventListener('dragover', e => {
            if (e.dataTransfer.types[0] === 'text/html') {
                e.preventDefault();
            }
        })

        sec.addEventListener('dragleave', e => {
            console.log(e.relatedTarget)
            if (e.relatedTarget){
                if(e.relatedTarget.closest('section') !== sec){
                    sec.classList.remove('droppable');
                } 
            }
        })

        sec.addEventListener('drop', e => {
            const target = e.dataTransfer.getData('text/html');
            const newDiv = document.createElement('div');
            console.log(target,target.match(/(alt\=\"(fb|tw|ig|yt)\")/g)[0].split(`"`)[1])
            newDiv.classList = `card ${target.match(/(alt\=\"(fb|tw|ig|yt)\")/g)[0].split(`"`)[1]}`;
            newDiv.classList.add('new')
            newDiv.draggable = "true";
            newDiv.innerHTML = target;
            if(e.target.classList !== 'overview__cards'){
                console.log(e.target, e.target.draggable)
                if(e.target.draggable == true && e.target.localName !== "img" && e.target.localName === "div" && e.target.classList.contains("card")){
                    e.target.insertAdjacentHTML('beforebegin', newDiv.outerHTML)
                    let dr = document.querySelector('.drag')
                    dr.remove()
                } else {
                    console.log(e.target.parentElement)
                    if(!e.target.classList.contains('card')){
                        if (!e.target.parentElement.classList.contains('card')){
                            e.target.parentElement.parentElement.insertAdjacentHTML('beforebegin', newDiv.outerHTML)
                        }
                        console.log('hey')
                        e.target.parentElement.insertAdjacentHTML('beforebegin', newDiv.outerHTML)
                        let dr = document.querySelector('.drag')
                        dr.remove();
                    }
                }
            }
            document.querySelectorAll('.new').forEach(n => n.classList.remove('new'))
            sec.classList.remove('droppable')

            
        })
    })
    
}

connectDrag()
connectDrop()