document.querySelector('.btn').addEventListener('click', () => {
    let cycle_index = document.querySelector('#cycle_index')
    let f1 = document.querySelector('#f1')
    let f2 = document.querySelector('#f2')
    let f3 = document.querySelector('#f3')
    let f4 = document.querySelector('#f4')
    let f5 = document.querySelector('#f5')
    let f6 = document.querySelector('#f6')
    let f7 = document.querySelector('#f7')
    let dataToSend = {
        0: cycle_index.value,
        1: f1.value,
        2: f2.value,
        3: f3.value,
        4: f4.value,
        5: f5.value,
        6: f6.value,
        7: f7.value
    };
    fetch('/predict',
        {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/json'
            },
            body: JSON.stringify(dataToSend)
        }
    )
        .then(response => response.json()).then(result => {
            let brul = result['brul'];
            console.log(brul<0)
            let prediction = document.querySelector('#prediction');
            let status = document.querySelector('#status')
            let rul = document.querySelector('#rul')
                        console.log(status.innerText)

            if(brul<0){
                prediction.innerText = 'Invalid entry for input '+(-brul);
                prediction.style.color='white';
                prediction.style.backgroundColor = 'black';
                prediction.style.border = '1px solid maroon';
            }
            else if(brul < (0.2*1104))
            {
                prediction.style.backgroundColor = 'red';
                status.innerText = 'Status = Urgent replacement needed';
                rul.innerText = 'Battery Remaining Useful Life = '+brul + ' cycles';
            }
            else if(brul <= (0.5*1104))
            {
                prediction.style.backgroundColor = 'yellow';
                status.innerText = 'Status = Needs attention soon';
                rul.innerText = 'Battery Remaining Useful Life = '+brul + ' cycles';
            }
            else{
                prediction.style.backgroundColor = 'green';
                status.innerText = 'Status = Safe, good condition';
                rul.innerText = 'Battery Remaining Useful Life = '+brul + ' cycles';
            }
            prediction.style.visibility = 'visible';
            console.log(brul);
        }).catch(error => console.error('Error:', error)
        );
});
